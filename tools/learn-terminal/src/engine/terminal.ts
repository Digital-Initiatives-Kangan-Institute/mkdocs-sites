/* engine/terminal.ts — the shell: command processing, nano, challenges
 *
 * The engine owns all session state and mutates the shared VFS directly.
 * React components subscribe to it with useSyncExternalStore; every mutation
 * calls changed(), which publishes a fresh snapshot on the next microtask.
 *
 * Terminal output is kept as HTML strings (every interpolated value goes
 * through esc()). The same strings are persisted as termHistory, so existing
 * saved sessions from the vanilla build replay unchanged.
 */

import { HOME, setHome, getNode, resolvePath, normPath, makeNode } from '../lib/vfs.ts';
import { tokenize, parseFlags, nonFlags } from '../lib/utils.ts';
import * as commands from '../lib/commands.ts';
import { esc, stripTags, dispPath, isHidden, countLines, fmtPerms, fmtSize, fmtDate } from '../lib/format.ts';
import { CMD_HELP, ALL_CMDS } from './help.ts';
import { CHALLENGES, starCount, type Challenge, type ChallengeCtx } from './challenges.ts';
import { createVFS, ensureHome } from './defaultFs.ts';
import * as storage from './storage.ts';
import type { ChallengeState } from './storage.ts';
import { showDialog } from './dialog.ts';
import { launchConfetti } from './confetti.ts';
import { exportTXT, exportPDF, CLEAR_MARKER, challengeMarker, parseChallengeMarker } from './exportHistory.ts';
import { Store } from './store.ts';

export interface OutputLine { id: number; html: string }

export interface NanoState {
  filePath: string;
  original: string;
  content: string;
  msg: string;
  savePrompt: boolean;
}

export interface GridState {
  /** Changes whenever the file grid should replay its appear animation. */
  animKey: number;
  animate: boolean;
  highlight: string[];
}

export interface TerminalSnapshot {
  username: string;
  cwd: string;
  lines: OutputLine[];
  grid: GridState;
  nano: NanoState | null;
  challenge: ChallengeState;
  /** Bumped when the terminal input should take focus. */
  focusToken: number;
}

const HR = '<span class="t-muted" style="opacity:.4">──────────────────────────────────────────</span>';
const LINE_NUM = '<span class="t-muted" style="min-width:40px;display:inline-block;text-align:right;margin-right:8px">';

/** Index of the last occurrence of `pat` that is not inside quotes, or -1. */
function lastUnquoted(str: string, pat: string): number {
  let inQ = '', last = -1;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (inQ) { if (c === inQ) inQ = ''; continue; }
    if (c === '"' || c === "'") inQ = c;
    else if (str.startsWith(pat, i)) last = i;
  }
  return last;
}

function plainDesc(html: string) { return html.replace(/<[^>]+>/g, ''); }

function challengeBanner(title: string, reset: boolean): string[] {
  return [
    `<span style="color:var(--amber);font-weight:700;letter-spacing:.03em">═══ Challenge: ${esc(title)} ═══</span>`,
    `<span style="color:var(--text-muted);font-style:italic">${reset ? 'VFS has been reset. Good luck!' : 'Good luck!'}</span>`,
    '',
  ];
}

export class Terminal extends Store<TerminalSnapshot> {
  private username = '';
  private cwd = '';
  private lines: OutputLine[] = [];
  private nextLineId = 0;
  private termHistory: string[] = [];
  private cmdHistory: string[] = [];
  private nano: NanoState | null = null;
  private challenge: ChallengeState = { completed: [], active: null, activeSteps: [] };
  private grid: GridState = { animKey: 0, animate: false, highlight: [] };
  private focusToken = 0;
  private pendingConfirm: ((answer: string) => void) | null = null;
  private challengeCtx: Partial<ChallengeCtx> = {};
  /** Output capture stack for pipes and redirects; lines go to the top sink when non-empty. */
  private sinks: string[][] = [];
  private flushQueued = false;

  constructor() {
    super({
      username: '', cwd: '', lines: [], nano: null, focusToken: 0,
      grid: { animKey: 0, animate: false, highlight: [] },
      challenge: { completed: [], active: null, activeSteps: [] },
    });
  }

  /* ═══ snapshot publishing ═══ */

  private changed() {
    if (this.flushQueued) return;
    this.flushQueued = true;
    queueMicrotask(() => this.flush());
  }

  private flush() {
    this.flushQueued = false;
    this.set({
      username: this.username,
      cwd: this.cwd,
      lines: this.lines.slice(),
      grid: { ...this.grid },
      nano: this.nano && { ...this.nano },
      challenge: { ...this.challenge, completed: [...this.challenge.completed], activeSteps: [...this.challenge.activeSteps] },
      focusToken: this.focusToken,
    });
  }

  /** Previously run commands, newest first. */
  get history(): readonly string[] { return this.cmdHistory; }

  /* ═══ session lifecycle ═══ */

  login(name: string) {
    this.username = name;
    setHome('/home/' + name);
    this.cwd = HOME;
    if (!storage.loadVFS()) createVFS(name);
    ensureHome(name);
    storage.saveVFS();
    this.cmdHistory = []; this.termHistory = [];
    this.changed();
  }

  /** Called once the login screen has faded out. */
  init() {
    this.challenge = storage.loadChallengeState();
    ({ cmdHistory: this.cmdHistory, termHistory: this.termHistory } = storage.loadHistory(this.username));
    this.renderGui(true);

    if (this.termHistory.length > 0) {
      const startIdx = this.termHistory.lastIndexOf(CLEAR_MARKER) + 1;
      this.termHistory.slice(startIdx).forEach(h => {
        const title = parseChallengeMarker(h);
        if (title !== null) challengeBanner(title, true).forEach(l => this.display(l));
        else this.display(h);
      });
    } else {
      const u = esc(this.username);
      this.addLine(`<span class="t-amber" style="font-weight:700;letter-spacing:.05em">Learn Linux - Terminal</span>`);
      this.addLine(`<span class="t-muted">─────────────────────────────────────────</span>`);
      this.addLine(`<span class="t-out">Welcome, <span style="color:var(--green)">${u}</span>! You are in <span class="t-path">~/</span></span>`);
      this.addLine(`<span class="t-out">The <span style="color:var(--cyan)">preview pane</span> on the right mirrors every command you run.</span>`);
      this.addLine(`<span class="t-muted"> • <span class="t-key">help</span> — browse all commands by category</span>`);
      this.addLine(`<span class="t-muted"> • <span class="t-key">ls -la</span> — long list + hidden files &nbsp; <span class="t-key">Tab</span> — autocomplete &nbsp; <span class="t-key">↑↓</span> — history</span>`);
      this.addLine(`<span class="t-muted"> • <span class="t-key">echo "text" >> file</span> — append to a file &nbsp; <span class="t-key">command --help</span> — usage info</span>`);
      this.addLine(`<span class="t-muted">─────────────────────────────────────────</span>`);
      this.addLine('');
    }
    this.focusInput();
  }

  /* ═══ output ═══ */

  /** Append to the visible terminal only (not saved to history). */
  private display(html: string) {
    this.lines.push({ id: this.nextLineId++, html });
    this.changed();
  }

  private addLine(html: string) {
    const sink = this.sinks[this.sinks.length - 1];
    if (sink) { sink.push(stripTags(html)); return; }
    this.display(html);
    this.termHistory.push(html);
  }

  private addText(t: string, cls = 't-out') {
    const sink = this.sinks[this.sinks.length - 1];
    if (sink) { sink.push(...t.split('\n')); return; }
    t.split('\n').forEach(l => this.addLine(`<span class="${cls}">${esc(l)}</span>`));
  }

  private printPrompt(path: string, cmd: string) {
    this.addLine(`<span class="t-prompt">${esc(this.username)}</span><span class="t-muted">@linux:</span><span class="t-path">${esc(dispPath(path))}</span><span class="t-dollar"> $ </span><span class="t-cmd">${esc(cmd)}</span>`);
  }

  private focusInput() {
    this.focusToken++;
    this.changed();
  }

  private renderGui(animate = false) {
    this.grid = animate
      ? { animKey: this.grid.animKey + 1, animate: true, highlight: [] }
      : { ...this.grid, animate: false };
    this.changed();
  }

  /** Pulse-highlight items in the file grid once the appear animation has started. */
  private highlightItems(names: string | string[]) {
    const list = Array.isArray(names) ? names : [names];
    setTimeout(() => {
      this.grid = { ...this.grid, highlight: list };
      this.changed();
    }, 60);
  }

  private persist() {
    storage.saveVFS();
    storage.saveHistory(this.username, this.cmdHistory, this.termHistory);
  }

  /* ═══ input ═══ */

  /** Handle Enter in the terminal input. */
  submit(value: string) {
    if (this.pendingConfirm) {
      const cb = this.pendingConfirm;
      this.pendingConfirm = null;
      this.printPrompt(this.cwd, value);
      cb(value.trim().toLowerCase());
      return;
    }
    this.runCmd(value);
  }

  private runCmd(raw: string) {
    const input = raw.trim(); if (!input) return;
    this.cmdHistory.unshift(input);
    this.printPrompt(this.cwd, input);

    // redirect support: command > file or command >> file
    const appendIdx = lastUnquoted(input, '>>');
    const overwriteIdx = appendIdx < 0 ? lastUnquoted(input, '>') : appendIdx;
    if (overwriteIdx >= 0) {
      const isAppend = appendIdx >= 0;
      const cmdPart = input.slice(0, overwriteIdx).trim();
      const filePath = input.slice(overwriteIdx + (isAppend ? 2 : 1)).trim();
      const output = this.captureCmdOutput(cmdPart);
      const rp = resolvePath(this.cwd, filePath);
      const parent = getNode(normPath(rp + '/..'));
      const base = rp.split('/').pop()!;
      if (!parent || parent.type !== 'dir') { this.addLine(`<span class="t-err">bash: ${esc(filePath)}: No such file or directory</span>`); return; }
      if (!parent.children[base]) parent.children[base] = makeNode('file', '');
      const target = parent.children[base];
      if (target.type === 'dir') { this.addLine(`<span class="t-err">bash: ${esc(filePath)}: Is a directory</span>`); return; }
      target.content = isAppend ? target.content + output : output + '\n';
      target.size = target.content.length;
      target.mtime = new Date();
      this.renderGui(true);
      this.challengeCtx = { raw: cmdPart, lastRedirect: { mode: isAppend ? 'append' : 'overwrite', file: filePath } };
      this.checkChallenges(); this.persist(); return;
    }

    // pipe support: split on | and chain commands
    if (input.includes('|')) {
      this.runPipeline(input);
      this.challengeCtx = { raw: input, usedPipe: true };
      this.checkChallenges(); this.persist(); return;
    }

    this.challengeCtx = { raw: input };
    this.runCmdSegment(input);
    this.checkChallenges(); this.persist();
  }

  private runPipeline(input: string, pipeInput = '') {
    const segments = input.split('|').map(s => s.trim()).filter(Boolean);
    segments.forEach((seg, i) => {
      if (i === segments.length - 1) this.runCmdSegment(seg, pipeInput);
      else pipeInput = this.captureCmdOutput(seg, pipeInput);
    });
  }

  private captureCmdOutput(raw: string, pipeInput?: string): string {
    const out: string[] = [];
    this.sinks.push(out);
    try {
      const input = raw.trim();
      if (input.includes('|')) this.runPipeline(input, pipeInput || '');
      else this.runCmdSegment(raw, pipeInput);
    } finally {
      this.sinks.pop();
    }
    return out.join('\n');
  }

  /* ═══ commands ═══ */

  private runCmdSegment(raw: string, pipeInput?: string) {
    const input = raw.trim(); if (!input) return;
    const parts = tokenize(input);
    const cmd = parts[0], args = parts.slice(1);
    const flags = parseFlags(args);
    const operands = nonFlags(args);
    const node = getNode(this.cwd);
    const user = esc(this.username);

    // --help intercept
    if (flags.has('--help')) { this.printHelpPage(cmd); return; }

    switch (cmd) {

      case 'ls': {
        if (!node || node.type !== 'dir') { this.addLine('<span class="t-err">ls: cannot access directory</span>'); break; }
        const showAll = flags.has('-a') || flags.has('--all');
        const longFmt = flags.has('-l');
        const human = flags.has('-h') || flags.has('--human-readable');
        const rev = flags.has('-r') || flags.has('--reverse');
        const byTime = flags.has('-t');

        // determine target dir (if operand given)
        let targetDir = node;
        if (operands.length) {
          const target = getNode(resolvePath(this.cwd, operands[0]));
          if (!target) { this.addLine(`<span class="t-err">ls: cannot access '${esc(operands[0])}': No such file or directory</span>`); break; }
          if (target.type === 'file') {
            // ls on a single file
            if (longFmt) {
              this.addLine(`<span class="t-perm">${fmtPerms(target)}</span> <span class="t-out">1 ${user} ${user}</span> <span class="t-size">${fmtSize(target.size || 0, human)}</span> <span class="t-date">${fmtDate(target.mtime || new Date())}</span> <span class="t-file">${esc(operands[0])}</span>`);
            } else { this.addLine(`<span class="t-file">${esc(operands[0])}</span>`); }
            break;
          }
          targetDir = target;
        }

        const entries = Object.entries(targetDir.children).filter(([name]) => showAll || !isHidden(name));

        if (byTime) entries.sort((a, b) => (+b[1].mtime || 0) - (+a[1].mtime || 0));
        else entries.sort((a, b) => {
          if (a[1].type !== b[1].type) return a[1].type === 'dir' ? -1 : 1;
          return a[0].localeCompare(b[0]);
        });
        if (rev) entries.reverse();

        if (longFmt) {
          if (showAll) {
            this.addLine(`<span class="t-perm">drwxr-xr-x</span> <span class="t-out">2 ${user} ${user}</span> <span class="t-size">${fmtSize(4096, human)}</span> <span class="t-date">${fmtDate(new Date())}</span> <span class="t-hidden t-dir">.</span>`);
            this.addLine(`<span class="t-perm">drwxr-xr-x</span> <span class="t-out">3 ${user} ${user}</span> <span class="t-size">${fmtSize(4096, human)}</span> <span class="t-date">${fmtDate(new Date())}</span> <span class="t-hidden t-dir">..</span>`);
          }
          this.addLine(`<span class="t-muted">total ${entries.length}</span>`);
          entries.forEach(([name, nd]) => {
            const h = isHidden(name);
            const ncls = nd.type === 'dir' ? (h ? 't-hidden t-dir' : 't-dir') : (h ? 't-hidden t-file' : 't-file');
            this.addLine(`<span class="t-perm">${fmtPerms(nd)}</span> <span class="t-out">1 ${user} ${user}</span> <span class="t-size">${fmtSize(nd.size || 0, human)}</span> <span class="t-date"> ${fmtDate(nd.mtime || new Date())}</span> <span class="${ncls}">${esc(name)}${nd.type === 'dir' ? '/' : ''}</span>`);
          });
        } else if (!entries.length && !showAll) {
          this.addLine('<span class="t-muted">(empty directory)</span>');
        } else {
          const items: string[] = [];
          if (showAll) { items.push(`<span class="t-hidden t-dir">./</span>`); items.push(`<span class="t-hidden t-dir">../</span>`); }
          entries.forEach(([n, v]) => {
            const h = isHidden(n) ? 't-hidden ' : '';
            items.push(v.type === 'dir'
              ? `<span class="${h} t-dir">${esc(n)}/</span>`
              : `<span class="${h} t-file">${esc(n)}</span>`);
          });
          this.addLine(`<span>${items.join('  ')}</span>`);
        }
        this.renderGui(); break;
      }

      case 'pwd': { this.addText(this.cwd); break; }

      case 'cd': {
        const target = operands[0] || '~';
        const np = resolvePath(this.cwd, target);
        const tn = getNode(np);
        if (!tn) { this.addLine(`<span class="t-err">bash: cd: ${esc(target)}: No such file or directory</span>`); break; }
        if (tn.type !== 'dir') { this.addLine(`<span class="t-err">bash: cd: ${esc(target)}: Not a directory</span>`); break; }
        this.cwd = np;
        this.renderGui(true); break;
      }

      case 'mkdir': {
        if (!operands.length) { this.addLine('<span class="t-err">mkdir: missing operand</span><br><span class="t-muted">Try \'mkdir --help\' for more information.</span>'); break; }
        const result = commands.mkdir(this.cwd, operands, flags);
        result.errs.forEach(e => this.addLine(`<span class="t-err">${esc(e)}</span>`));
        if (result.created.length) {
          if (flags.has('-v')) result.created.forEach(c => this.addLine(`<span class="t-success">mkdir: created directory '${esc(c.name)}'</span>`));
          this.renderGui(true); this.highlightItems(result.created.map(c => c.base));
        }
        break;
      }

      case 'touch': {
        if (!operands.length) { this.addLine('<span class="t-err">touch: missing file operand</span><br><span class="t-muted">Try \'touch --help\' for more information.</span>'); break; }
        const result = commands.touch(this.cwd, operands);
        result.errs.forEach(e => this.addLine(`<span class="t-err">${esc(e)}</span>`));
        this.renderGui(true);
        if (result.created.length) this.highlightItems(result.created.map(c => c.base));
        break;
      }

      case 'nano': {
        if (!operands.length) { this.addLine('<span class="t-err">nano: missing filename</span>'); break; }
        this.openNano(resolvePath(this.cwd, operands[0])); break;
      }

      case 'cat': {
        if (pipeInput) {
          const showNums = flags.has('-n');
          pipeInput.split('\n').forEach((l, i) => {
            if (showNums) this.addLine(`${LINE_NUM}${i + 1}</span><span class="t-out">${esc(l)}</span>`);
            else this.addText(l);
          });
          break;
        }
        if (!operands.length) { this.addLine('<span class="t-err">cat: missing operand</span><br><span class="t-muted">Try \'cat --help\' for more information.</span>'); break; }
        const result = commands.cat(this.cwd, operands, flags);
        result.errs.forEach(e => this.addLine(`<span class="t-err">${esc(e)}</span>`));
        result.lines.forEach(l => {
          if (l.text === '(empty file)') this.addLine('<span class="t-muted">(empty file)</span>');
          else if (l.lineNum) this.addLine(`${LINE_NUM}${l.lineNum}</span><span class="t-out">${esc(l.text)}</span>`);
          else this.addText(l.text);
        });
        break;
      }

      case 'cp': {
        if (operands.length < 2) { this.addLine(`<span class="t-err">cp: missing destination file operand after '${esc(operands[0] || '')}'</span>`); break; }
        const result = commands.cp(this.cwd, operands[0], operands[1], flags);
        if ('error' in result) { this.addLine(`<span class="t-err">${esc(result.error)}</span>`); break; }
        if (flags.has('-v')) this.addLine(`<span class="t-success">'${esc(operands[0])}' -> '${esc(operands[1])}'</span>`);
        this.renderGui(true); this.highlightItems(result.destName); break;
      }

      case 'mv': {
        if (operands.length < 2) { this.addLine('<span class="t-err">mv: missing destination file operand</span>'); break; }
        const result = commands.mv(this.cwd, operands[0], operands[1]);
        if ('error' in result) { this.addLine(`<span class="t-err">${esc(result.error)}</span>`); break; }
        if (flags.has('-v')) this.addLine(`<span class="t-success">'${esc(operands[0])}' -> '${esc(operands[1])}'</span>`);
        this.renderGui(true); this.highlightItems(result.destName); break;
      }

      case 'rm': {
        if (!operands.length) { this.addLine('<span class="t-err">rm: missing operand</span><br><span class="t-muted">Try \'rm --help\' for more information.</span>'); break; }
        const result = commands.rm(this.cwd, operands, flags);
        result.errs.forEach(e => {
          this.addLine(`<span class="t-err">${esc(e)}</span>`);
          if (e.includes('Is a directory')) this.addLine('<span class="t-muted">  Add -r to remove directories</span>');
        });
        if (flags.has('-v')) result.removed.forEach(r => this.addLine(`<span class="t-success">removed '${esc(r.name)}'</span>`));
        this.renderGui(); break;
      }

      case 'rmdir': {
        if (!operands.length) { this.addLine('<span class="t-err">rmdir: missing operand</span>'); break; }
        const result = commands.rmdir(this.cwd, operands, flags);
        result.errs.forEach(e => this.addLine(`<span class="t-err">${esc(e)}</span>`));
        if (flags.has('-v')) result.removed.forEach(r => this.addLine(`<span class="t-success">rmdir: removing directory '${esc(r.name)}'</span>`));
        this.renderGui(); break;
      }

      case 'echo': {
        const txt = input.replace(/^echo\s*/, '').replace(/^['"]|['"]$/g, '');
        this.addLine(`<span class="t-out">${esc(txt)}</span>`);
        break;
      }

      case 'grep': {
        const pattern = operands[0];
        if (!pattern) { this.addLine('<span class="t-err">grep: missing pattern</span><br><span class="t-muted">Usage: grep [OPTIONS] PATTERN [FILE]</span>'); break; }
        const result = commands.grep(this.cwd, pattern, operands[1], flags, pipeInput);
        if ('err' in result) {
          this.addLine(`<span class="t-err">${esc(result.err)}</span>`);
          if (result.err.includes('no input')) this.addLine('<span class="t-muted">Usage: command | grep PATTERN  or  grep PATTERN FILE</span>');
          break;
        }
        if ('count' in result) { this.addText(String(result.count)); break; }
        const hlRe = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags.has('-i') ? 'gi' : 'g');
        result.matches.forEach(m => {
          const hl = esc(m.text).replace(hlRe, mh => `<span class="t-err">${mh}</span>`);
          if (flags.has('-n')) this.addLine(`${LINE_NUM}${m.lineNum}</span><span class="t-out">${hl}</span>`);
          else this.addLine(`<span class="t-out">${hl}</span>`);
        });
        break;
      }

      case 'clear': { this.lines = []; this.termHistory.push(CLEAR_MARKER); this.changed(); break; }
      case 'whoami': { this.addText(this.username); break; }
      case 'date': { this.addText(new Date().toString()); break; }

      case 'man': {
        if (!operands.length) { this.addLine(`<span class="t-err">What manual page do you want?</span><br><span class="t-out">For example: <span class="t-key">man ls</span></span>`); break; }
        if (CMD_HELP[operands[0]]) this.printHelpPage(operands[0]);
        else this.addLine(`<span class="t-err">No manual entry for ${esc(operands[0])}</span><br><span class="t-muted">Available: ${ALL_CMDS.join(', ')}</span>`);
        break;
      }

      case 'help': {
        if (operands.length && CMD_HELP[operands[0]]) { this.printHelpPage(operands[0]); break; }
        this.printHelpIndex(); break;
      }

      case 'challenge': {
        const sub = (operands[0] || '').toLowerCase();
        const id = operands[1];
        switch (sub) {
          case '': this.printChallengeHelp(); break;
          case 'list': this.printChallengeList(); break;
          case 'start': {
            if (!id) { this.addLine('<span class="t-err">challenge: missing challenge ID</span>'); this.addLine('<span class="t-muted">Usage: <span class="t-teal">challenge start &lt;id&gt;</span>  — run <span class="t-teal">challenge list</span> to see IDs.</span>'); break; }
            if (!CHALLENGES.some(c => c.id === id)) { this.addLine(`<span class="t-err">challenge: unknown challenge '<span class="t-amber">${esc(id)}</span>'</span>`); this.addLine('<span class="t-muted">Run <span class="t-teal">challenge list</span> to see available IDs.</span>'); break; }
            void this.startChallenge(id); break;
          }
          case 'status': this.printChallengeStatus(); break;
          case 'tip': this.printChallengeTip(); break;
          case 'abandon': void this.abandonChallenge(); break;
          case 'reset': void this.resetChallengeProgress(); break;
          default:
            this.addLine(`<span class="t-err">challenge: unknown subcommand '<span class="t-amber">${esc(sub)}</span>'</span>`);
            this.addLine('<span class="t-muted">Available: <span class="t-teal">list</span> <span class="t-teal">start</span> <span class="t-teal">status</span> <span class="t-teal">tip</span> <span class="t-teal">abandon</span> <span class="t-teal">reset</span></span>');
        }
        break;
      }

      case 'export': {
        const fmt = (operands[0] || '').toLowerCase();
        if (fmt === 'txt') exportTXT(this.termHistory);
        else if (fmt === 'pdf') exportPDF(this.termHistory, this.username);
        else {
          this.addLine('<span class="t-err">export: missing or unknown format</span>');
          this.addLine('<span class="t-muted">Usage: <span class="t-teal">export txt</span>  <span class="t-teal">export pdf</span></span>');
        }
        break;
      }

      default: {
        this.addLine(`<span class="t-err">bash: ${esc(cmd)}: command not found</span>`);
        this.addLine(`<span class="t-muted">Try '<span class="t-key">help</span>' for a list of commands.</span>`);
      }
    }
  }

  /* ═══ help ═══ */

  private printHelpPage(cmdName: string) {
    const h = CMD_HELP[cmdName];
    if (!h) { this.addLine(`<span class="t-err">No help entry for '${esc(cmdName)}'.</span>`); return; }
    this.addLine(HR);
    this.addLine(`<span class="t-synopsis" style="font-weight:700;font-size:14px">${esc(cmdName)}</span>  <span class="t-out">${esc(h.short)}</span>`);
    this.addLine('');
    this.addLine(`<span class="t-section">USAGE</span>`);
    this.addLine(`<span class="t-out">  <span class="t-synopsis">${esc(h.synopsis)}</span></span>`);
    this.addLine('');
    this.addLine(`<span class="t-section">DESCRIPTION</span>`);
    this.addLine(`<span class="t-out">  ${esc(h.desc)}</span>`);
    this.addLine('');
    if (h.opts && h.opts.length) {
      this.addLine(`<span class="t-section">OPTIONS</span>`);
      h.opts.forEach(({ f, d }) => {
        const pad = '·'.repeat(Math.max(1, 26 - f.length));
        this.addLine(`<span class="t-out">  <span class="t-flag">${esc(f)}</span><span style="opacity:.3">${pad}</span> ${esc(d)}</span>`);
      });
      this.addLine('');
    }
    if (h.example) {
      this.addLine(`<span class="t-section">EXAMPLES</span>`);
      h.example.split('\n').forEach(ex => this.addLine(`<span class="t-out">  <span class="t-synopsis">$ ${esc(ex)}</span></span>`));
      this.addLine('');
    }
    if (h.keys) {
      this.addLine(`<span class="t-section">KEY BINDINGS</span>`);
      h.keys.forEach(k => this.addLine(`<span class="t-out">  <span class="t-key">${esc(k)}</span></span>`));
      this.addLine('');
    }
    this.addLine(HR);
  }

  private printHelpIndex() {
    this.addLine(`<span class="t-out">GNU bash built-in commands. Type <span class="t-key">help NAME</span> or <span class="t-key">NAME --help</span> for details.</span>`);
    this.addLine('');
    const cats = [
      { label: 'Navigation', cmds: ['ls', 'cd', 'pwd'] },
      { label: 'Files', cmds: ['touch', 'cp', 'mv', 'rm', 'rmdir', 'mkdir'] },
      { label: 'Viewing', cmds: ['cat', 'nano', 'echo', 'grep'] },
      { label: 'System', cmds: ['whoami', 'date', 'clear', 'export'] },
      { label: 'Documentation', cmds: ['man', 'help'] },
      { label: 'Learning', cmds: ['challenge'] },
    ];
    cats.forEach(cat => {
      this.addLine(`<span class="t-section">── ${esc(cat.label)} ${'─'.repeat(Math.max(0, 30 - cat.label.length))}</span>`);
      cat.cmds.forEach(c => {
        const h = CMD_HELP[c]; if (!h) return;
        const syn = h.synopsis.replace(c + ' ', '').split(' ')[0] || '';
        const usage = (c + (syn ? ' ' + syn : '')).padEnd(20);
        this.addLine(`<span class="t-out">  <span class="t-key">${esc(usage)}</span> ${esc(h.short)}</span>`);
      });
      this.addLine('');
    });
    this.addLine(`<span class="t-muted">  <span class="t-key">Tab</span> autocomplete  ·  <span class="t-key">↑↓</span> history  ·  <span class="t-key">ls -a</span> show hidden files  ·  <span class="t-key">>></span> append to file</span>`);
  }

  /* ═══ nano ═══ */

  private openNano(fpath: string) {
    const fname = fpath.split('/').pop()!;
    const parentDir = getNode(normPath(fpath + '/..'));
    if (!parentDir || parentDir.type !== 'dir') {
      this.addLine('<span class="t-err">nano: ' + esc(fpath) + ': directory not found</span>');
      return;
    }
    if (!parentDir.children[fname]) parentDir.children[fname] = makeNode('file', '');
    const fileNode = parentDir.children[fname];
    if (fileNode.type === 'dir') {
      this.addLine('<span class="t-err">nano: ' + esc(fpath) + ': Is a directory</span>');
      return;
    }
    const content = fileNode.content;
    this.nano = {
      filePath: fpath,
      original: content,
      content,
      msg: content ? '[ Read ' + countLines(content) + ' lines ]' : '[ New File ]',
      savePrompt: false,
    };
    this.renderGui();
  }

  private writeNanoFile(): string {
    const nano = this.nano!;
    const node = getNode(nano.filePath);
    if (node && node.type === 'file') {
      node.content = nano.content;
      node.size = nano.content.length;
      node.mtime = new Date();
    }
    storage.saveVFS();
    return nano.content;
  }

  nanoIsModified(): boolean {
    return !!this.nano && this.nano.content !== this.nano.original;
  }

  /** Textarea edits. Published synchronously so the controlled textarea keeps its caret. */
  nanoInput(value: string) {
    if (!this.nano) return;
    this.nano.content = value;
    this.flush();
  }

  nanoSetMsg(msg: string) {
    if (!this.nano) return;
    this.nano.msg = msg;
    this.changed();
  }

  /** ^O — write the buffer without leaving the editor. */
  nanoSave() {
    if (!this.nano) return;
    const text = this.writeNanoFile();
    this.nano.original = text;
    this.nano.msg = `[ Wrote ${countLines(text)} lines ]`;
    this.renderGui();
  }

  /** ^X — exit, asking to save first if the buffer is modified. */
  nanoExit() {
    if (!this.nano) return;
    if (this.nanoIsModified()) { this.nano.savePrompt = true; this.changed(); }
    else this.closeNano(false);
  }

  /** ^K — cut the line containing the caret. */
  nanoCutLine(caret: number) {
    if (!this.nano) return;
    const lines = this.nano.content.split('\n');
    const currentLine = this.nano.content.substring(0, caret).split('\n').length - 1;
    lines.splice(currentLine, 1);
    this.nanoInput(lines.join('\n'));
  }

  nanoCancelSavePrompt() {
    if (!this.nano) return;
    this.nano.savePrompt = false;
    this.changed();
  }

  closeNano(save: boolean) {
    if (!this.nano) return;
    if (save) {
      const text = this.writeNanoFile();
      this.addLine(`<span class="t-success">[ Wrote ${countLines(text)} lines to ${esc(this.nano.filePath.split('/').pop())} ]</span>`);
    }
    this.nano = null;
    this.renderGui();
    this.focusInput();
  }

  /* ═══ challenges ═══ */

  private getActiveChallenge(): Challenge | null {
    return CHALLENGES.find(c => c.id === this.challenge.active) || null;
  }

  private saveChallenges() {
    storage.saveChallengeState(this.challenge);
    this.changed();
  }

  private async startChallenge(id: string) {
    const ch = CHALLENGES.find(c => c.id === id);
    if (!ch) return;
    if (ch.clearVFS) {
      this.addLine(`<span class="t-out"><span class="t-amber">⚠</span> Starting "${esc(ch.title)}" will reset the terminal to a clean state. Any files you created will be lost.</span>`);
      this.addLine(`<span class="t-out">Are you sure? <span class="t-key">[y/N]</span></span>`);
      const answer = await new Promise<string>(resolve => { this.pendingConfirm = resolve; });
      if (answer !== 'y' && answer !== 'yes') { this.addLine('<span class="t-muted">Cancelled.</span>'); return; }
      createVFS(this.username); storage.saveVFS();
      this.cwd = HOME;
      storage.saveHistory(this.username, this.cmdHistory, this.termHistory);
    }
    ch.setup();
    storage.saveVFS();
    this.termHistory.push(challengeMarker(ch.title));
    challengeBanner(ch.title, !!ch.clearVFS).forEach(l => this.display(l));
    this.challenge.active = id; this.challenge.activeSteps = [];
    this.saveChallenges(); this.renderGui(true);
    storage.saveHistory(this.username, this.cmdHistory, this.termHistory);
  }

  private async abandonChallenge() {
    const ch = this.getActiveChallenge();
    if (!ch) return;
    const stepCount = this.challenge.activeSteps.length;
    const ok = await showDialog(
      'Abandon challenge?',
      stepCount > 0 ? `You've completed ${stepCount}/${ch.steps.length} steps. All progress for "${ch.title}" will be lost.` : `Are you sure you want to abandon "${ch.title}"?`,
      'Abandon',
    );
    if (!ok) return;
    this.challenge.active = null; this.challenge.activeSteps = [];
    this.saveChallenges();
  }

  private async resetChallengeProgress() {
    const ok = await showDialog('Reset all progress?', 'This will erase all challenge progress and completed challenges. Are you sure?', 'Reset');
    if (!ok) return;
    this.challenge = { completed: [], active: null, activeSteps: [] };
    this.saveChallenges();
    this.addLine('<span class="t-green">All challenge progress has been reset.</span>');
    storage.saveHistory(this.username, this.cmdHistory, this.termHistory);
  }

  private checkChallenges() {
    const ch = this.getActiveChallenge();
    const extra = this.challengeCtx;
    this.challengeCtx = {};
    if (!ch) return;
    const ctx: ChallengeCtx = { ...extra, cwd: this.cwd, getNode, resolvePath };
    const parts = tokenize((extra.raw || '').trim());
    const cmd = parts[0] || '', args = parts.slice(1), flags = parseFlags(args), operands = nonFlags(args);
    const i = this.challenge.activeSteps.length;
    const step = ch.steps[i];
    if (!step) return;
    let passed = false;
    try { passed = !!step.validate(cmd, args, flags, operands, ctx); } catch { /* step not satisfied */ }
    if (!passed) return;

    this.challenge.activeSteps.push(i);
    if (this.challenge.activeSteps.length === ch.steps.length) {
      if (!this.challenge.completed.includes(ch.id)) this.challenge.completed.push(ch.id);
      this.addLine(`<span class="t-green">[challenge] Challenge "${esc(ch.title)}" completed! Well done!</span>`);
      launchConfetti();
      this.challenge.active = null; this.challenge.activeSteps = [];
    } else {
      const nextDesc = plainDesc(ch.steps[this.challenge.activeSteps.length].desc);
      this.addLine(`<span class="t-green">[challenge] Step ${i + 1}/${ch.steps.length} completed.</span> ${nextDesc ? `<span class="t-muted">Next: ${esc(nextDesc)}</span>` : ''}`);
    }
    this.saveChallenges();
  }

  private printChallengeHelp() {
    this.addLine('<span class="t-out"><span class="t-amber">★</span> <span class="t-key">challenge</span> <span class="t-muted">— interact with challenges from the terminal</span></span>');
    this.addLine('');
    this.addLine('<span class="t-section">── Usage ──────────────────────────────────────</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge list</span>              List all challenges</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge start</span> <span class="t-cyan">&lt;id&gt;</span>        Start a challenge by ID</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge status</span>             Show active challenge progress</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge tip</span>                Show tip for current step</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge abandon</span>            Abandon the active challenge</span>');
    this.addLine('<span class="t-out">  <span class="t-teal">challenge reset</span>              Reset all challenge progress</span>');
    this.addLine('');
    this.addLine('<span class="t-muted">  Run <span class="t-teal">challenge list</span> to see available challenge IDs.</span>');
  }

  private printChallengeList() {
    this.addLine('<span class="t-out"><span class="t-amber">★</span> <span class="t-key">Available challenges</span></span>');
    this.addLine('');
    const maxIdLen = Math.max(...CHALLENGES.map(c => c.id.length));
    CHALLENGES.forEach(ch => {
      const done = this.challenge.completed.includes(ch.id);
      const mark = done ? '<span class="t-green">✓</span>' : '<span class="t-muted">○</span>';
      const n = starCount(ch);
      const stars = '<span class="t-star">' + '★'.repeat(n) + '</span>' + '<span class="t-star-empty">' + '☆'.repeat(5 - n) + '</span>';
      const active = this.challenge.active === ch.id ? ' <span class="t-amber">(active)</span>' : '';
      this.addLine(`<span class="t-out">  ${mark} <span class="t-teal">${esc(ch.id.padEnd(maxIdLen + 2))}</span> ${stars}  <span class="${done ? 't-muted' : 't-cyan'}">${esc(ch.title)}</span>${active}</span>`);
    });
    this.addLine('');
    this.addLine(`<span class="t-muted">  <span class="t-cyan">${CHALLENGES.length}</span> challenges · <span class="t-green">${this.challenge.completed.length}</span> completed</span>`);
    this.addLine('<span class="t-muted">  Run <span class="t-teal">challenge start &lt;id&gt;</span> to begin.</span>');
  }

  private printNoActiveChallenge() {
    this.addLine('<span class="t-muted">No active challenge. Run <span class="t-teal">challenge list</span> to see available challenges.</span>');
  }

  private printChallengeStatus() {
    const ch = this.getActiveChallenge();
    if (!ch) { this.printNoActiveChallenge(); return; }
    const done = this.challenge.activeSteps.length;
    const total = ch.steps.length;
    const barLen = 20;
    const filled = Math.round((done / total) * barLen);
    const bar = '<span class="t-green">' + '█'.repeat(filled) + '</span>' + '<span class="t-muted">' + '░'.repeat(barLen - filled) + '</span>';
    this.addLine(`<span class="t-out"><span class="t-amber">▸</span> <span class="t-key">Active challenge:</span> <span class="t-cyan">${esc(ch.title)}</span></span>`);
    this.addLine(`<span class="t-out">  Progress: ${bar} <span class="t-green">${done}</span><span class="t-muted">/${total}</span> steps <span class="t-amber">(${Math.round((done / total) * 100)}%)</span></span>`);
    this.addLine('');
    ch.steps.forEach((step, i) => {
      const d = esc(plainDesc(step.desc));
      if (i < done) this.addLine(`<span class="t-out">  <span class="t-step-done">✓ ${d}</span></span>`);
      else if (i === done) this.addLine(`<span class="t-out">  <span class="t-step-current">▸ ${d}</span></span>`);
      else this.addLine(`<span class="t-out">  <span class="t-step-pending">○ ${d}</span></span>`);
    });
    this.addLine('');
    if (done < total) this.addLine('<span class="t-muted">  Run <span class="t-teal">challenge tip</span> for a hint.</span>');
  }

  private printChallengeTip() {
    const ch = this.getActiveChallenge();
    if (!ch) { this.printNoActiveChallenge(); return; }
    const idx = this.challenge.activeSteps.length;
    if (idx >= ch.steps.length) { this.addLine('<span class="t-green">All steps completed!</span>'); return; }
    this.addLine(`<span class="t-out"><span class="t-amber">?</span> <span class="t-key">Tip for step <span class="t-cyan">${idx + 1}/${ch.steps.length}</span>:</span></span>`);
    this.addLine(`<span class="t-out">  <span class="t-muted">${esc(ch.steps[idx].tip)}</span></span>`);
  }
}

export const terminal = new Terminal();
