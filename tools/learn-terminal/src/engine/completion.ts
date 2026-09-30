/* engine/completion.ts — Tab / as-you-type autocomplete suggestions */

import { getNode, resolvePath } from '../lib/vfs.ts';
import { tokenize } from '../lib/utils.ts';
import { ALL_CMDS, CMD_HELP } from './help.ts';
import { CHALLENGES } from './challenges.ts';

export interface Completion {
  type: 'cmd' | 'flag' | 'dir' | 'file';
  text: string;
  insert: string;
  desc: string;
}

const CHALLENGE_SUBS: Record<string, string> = {
  list: 'list all challenges',
  start: 'start a challenge',
  status: 'show progress',
  tip: 'show step hint',
  abandon: 'abandon active challenge',
  reset: 'reset all progress',
};

const EXPORT_FMTS: Record<string, string> = {
  txt: 'download as text file',
  pdf: 'open print preview',
};

const GREP_PATTERNS = [
  { text: '[0-9]', desc: 'match digits' },
  { text: '[a-z]', desc: 'match lowercase letters' },
  { text: '^[A-Z]', desc: 'lines starting with uppercase' },
  { text: '\\.$', desc: 'lines ending with a period' },
  { text: '[a-zA-Z]+@[a-z]+\\.[a-z]+', desc: 'email-like patterns' },
  { text: '\\berror\\b', desc: 'word "error"' },
  { text: '\\bwarn(ing)?\\b', desc: 'word "warn" or "warning"' },
  { text: '^#', desc: 'comment lines' },
  { text: '^$', desc: 'empty lines' },
  { text: '\\.txt$', desc: 'lines ending with .txt' },
];

function subcommandCompletions(options: Record<string, string>, partial: string): Completion[] {
  const names = Object.keys(options);
  if (!names.some(s => s.startsWith(partial))) return [];
  return names.filter(s => s.startsWith(partial) && s !== partial)
    .map(s => ({ type: 'flag', text: s, insert: s, desc: options[s] }));
}

export function getCompletions(value: string, cwd: string): Completion[] {
  // pipe/redirect support: complete the segment after the last | or >
  let seg = value;
  for (let i = value.length - 1; i >= 0; i--) {
    if (value[i] === '|' || value[i] === '>') { seg = value.slice(i + 1); break; }
  }

  const parts = tokenize(seg);
  const isFirst = parts.length === 0 || (parts.length === 1 && !seg.endsWith(' '));
  if (isFirst) {
    const p = parts[0] || '';
    return ALL_CMDS.filter(c => c.startsWith(p) && c !== p).map(c => ({ type: 'cmd', text: c, insert: c, desc: CMD_HELP[c]?.short || '' }));
  }
  const cmd = parts.find(p => p && !p.match(/^[|><]$/)) || '';
  const last = seg.endsWith(' ') ? '' : (parts[parts.length - 1] || '');
  if (last.startsWith('-')) {
    const opts = (CMD_HELP[cmd]?.opts || []).flatMap(o => o.f.split(',').map(x => x.trim())).filter(f => f.startsWith('-'));
    return [...new Set(opts)].filter(f => f.startsWith(last) && f !== last).map(f => ({ type: 'flag', text: f, insert: f, desc: '' }));
  }
  // challenge: complete subcommands, and challenge IDs after "start"
  if (cmd === 'challenge') {
    if (parts[1] === 'start') {
      return CHALLENGES.filter(c => c.id.startsWith(last) && c.id !== last).map(c => ({ type: 'flag', text: c.id, insert: c.id, desc: c.title }));
    }
    return subcommandCompletions(CHALLENGE_SUBS, last);
  }
  if (cmd === 'export') return subcommandCompletions(EXPORT_FMTS, last);

  const wantDir = ['cd', 'rmdir'].includes(cmd);
  const wantFile = ['cat', 'nano'].includes(cmd);
  let base = cwd, partial = last;
  if (last.includes('/')) { const si = last.lastIndexOf('/'); base = resolvePath(cwd, last.slice(0, si) || '/'); partial = last.slice(si + 1); }
  const bn = getNode(base);
  if (!bn || bn.type !== 'dir') return [];
  // grep: first operand is a pattern, not a file — suggest example patterns
  if (cmd === 'grep' && parts.length <= 2) {
    return GREP_PATTERNS.filter(p => !last || p.text.startsWith(last) && p.text !== last).map(p => ({ type: 'flag', text: p.text, insert: p.text, desc: p.desc }));
  }
  const pfx = last.includes('/') ? last.slice(0, last.lastIndexOf('/') + 1) : '';
  const items: Completion[] = Object.entries(bn.children).filter(([n, nd]) => {
    if (!n.startsWith(partial)) return false;
    if (wantDir && nd.type !== 'dir') return false;
    if (wantFile && nd.type !== 'file') return false;
    return true;
  }).map(([n, nd]) => {
    const text = pfx + n + (nd.type === 'dir' ? '/' : '');
    return { type: nd.type, text, insert: text, desc: nd.type === 'dir' ? 'directory' : 'file' };
  });
  if (wantDir && cwd !== '/' && (!last || '..'.startsWith(last) && last !== '..')) items.unshift({ type: 'dir', text: '..', insert: '..', desc: 'parent directory' });
  return items;
}
