/* lib/commands.ts — pure command implementations used by the shell and tests
 *
 * Each function returns a structured result object. The caller (the terminal
 * engine) is responsible for formatting output, managing editor state, etc.
 */

import { normPath, getNode, resolvePath, makeNode, type DirNode, type VFSNode } from './vfs.ts';

export interface PathResult { name: string; path: string }
export interface CreatedResult extends PathResult { base: string }

function parentDir(path: string): DirNode {
  return getNode(normPath(path + '/..')) as DirNode;
}

function cloneNode<T extends VFSNode>(n: T): T {
  const copy = JSON.parse(JSON.stringify(n));
  // JSON round-trip turns Dates into strings; restore them so ls -t keeps working.
  const revive = (node: VFSNode) => {
    node.mtime = new Date(node.mtime);
    if (node.type === 'dir') Object.values(node.children).forEach(revive);
  };
  revive(copy);
  return copy;
}

// ═══════════════════════════════════════════════════════════════════
//  rm       — remove files or directories
// ═══════════════════════════════════════════════════════════════════
export function rm(cwd: string, ops: string[], flags: Set<string>) {
  const errs: string[] = [], removed: PathResult[] = [];
  const rec = flags.has('-r') || flags.has('-R') || flags.has('--recursive') || flags.has('-f');
  ops.forEach(f => {
    const rp = resolvePath(cwd, f);
    const rn = getNode(rp);
    if (!rn) {
      if (!flags.has('-f')) errs.push("rm: cannot remove '" + f + "': No such file or directory");
      return;
    }
    if (rn.type === 'dir' && !rec) {
      errs.push("rm: cannot remove '" + f + "': Is a directory");
      return;
    }
    delete parentDir(rp).children[rp.split('/').pop()!];
    removed.push({ name: f, path: rp });
  });
  return { errs, removed };
}

// ═══════════════════════════════════════════════════════════════════
//  rmdir    — remove empty directories
// ═══════════════════════════════════════════════════════════════════
export function rmdir(cwd: string, ops: string[], _flags?: Set<string>) {
  const errs: string[] = [], removed: PathResult[] = [];
  ops.forEach(f => {
    const rp = resolvePath(cwd, f);
    const rn = getNode(rp);
    if (!rn) {
      errs.push("rmdir: failed to remove '" + f + "': No such file or directory");
      return;
    }
    if (rn.type !== 'dir') {
      errs.push("rmdir: failed to remove '" + f + "': Not a directory");
      return;
    }
    if (Object.keys(rn.children).length) {
      errs.push("rmdir: failed to remove '" + f + "': Directory not empty");
      return;
    }
    delete parentDir(rp).children[rp.split('/').pop()!];
    removed.push({ name: f, path: rp });
  });
  return { errs, removed };
}

// ═══════════════════════════════════════════════════════════════════
//  mkdir    — create directories
// ═══════════════════════════════════════════════════════════════════
export function mkdir(cwd: string, ops: string[], flags: Set<string>) {
  const errs: string[] = [], created: CreatedResult[] = [];
  ops.forEach(name => {
    const rp = resolvePath(cwd, name);
    const parent = getNode(normPath(rp + '/..'));
    const base = rp.split('/').pop()!;
    if (!parent || parent.type !== 'dir') {
      errs.push("mkdir: cannot create directory '" + name + "': No such file or directory");
      return;
    }
    if (parent.children[base]) {
      if (!flags.has('-p')) errs.push("mkdir: cannot create directory '" + name + "': File exists");
      return;
    }
    parent.children[base] = makeNode('dir');
    created.push({ name, path: rp, base });
  });
  return { errs, created };
}

// ═══════════════════════════════════════════════════════════════════
//  touch    — create files or update timestamps
// ═══════════════════════════════════════════════════════════════════
export function touch(cwd: string, ops: string[]) {
  const errs: string[] = [], created: CreatedResult[] = [];
  ops.forEach(name => {
    const rp = resolvePath(cwd, name);
    const parent = getNode(normPath(rp + '/..'));
    const base = rp.split('/').pop()!;
    if (!parent || parent.type !== 'dir') {
      errs.push("touch: cannot touch '" + name + "': No such file or directory");
      return;
    }
    if (!parent.children[base]) {
      parent.children[base] = makeNode('file', '');
      created.push({ name, path: rp, base });
    } else {
      parent.children[base].mtime = new Date();
    }
  });
  return { errs, created };
}

// ═══════════════════════════════════════════════════════════════════
//  grep     — search for patterns in text
// ═══════════════════════════════════════════════════════════════════
export interface GrepMatch { lineNum: number; text: string }
export type GrepResult = { err: string } | { count: number } | { matches: GrepMatch[] };

export function grep(cwd: string, pattern: string | undefined, fileOp: string | undefined, flags: Set<string>, pipeInput?: string): GrepResult {
  const invert = flags.has('-v');
  const ignoreCase = flags.has('-i');
  const countOnly = flags.has('-c');

  if (!pattern) return { err: 'grep: missing pattern' };

  let lines: string[];
  if (pipeInput !== undefined) {
    lines = pipeInput.split('\n');
  } else if (fileOp) {
    const cn = getNode(resolvePath(cwd, fileOp));
    if (!cn) return { err: 'grep: ' + fileOp + ': No such file or directory' };
    if (cn.type === 'dir') return { err: 'grep: ' + fileOp + ': Is a directory' };
    lines = (cn.content || '').split('\n');
  } else {
    return { err: 'grep: no input' };
  }

  const re = new RegExp(pattern, ignoreCase ? 'i' : '');
  const matches: GrepMatch[] = [];
  lines.forEach((text, idx) => {
    if (re.test(text) !== invert) matches.push({ lineNum: idx + 1, text });
  });

  if (countOnly) return { count: matches.length };
  return { matches };
}

// ═══════════════════════════════════════════════════════════════════
//  cat      — concatenate files and print
// ═══════════════════════════════════════════════════════════════════
export interface CatLine { text: string; lineNum: number | null }

export function cat(cwd: string, ops: string[], flags: Set<string>, pipeInput?: string) {
  const errs: string[] = [], lines: CatLine[] = [];
  const showNums = flags.has('-n');

  if (pipeInput !== undefined) {
    pipeInput.split('\n').forEach(l => {
      lines.push({ text: l, lineNum: showNums ? lines.length + 1 : null });
    });
    return { errs, lines };
  }

  ops.forEach(fname => {
    const cn = getNode(resolvePath(cwd, fname));
    if (!cn) {
      errs.push('cat: ' + fname + ': No such file or directory');
      return;
    }
    if (cn.type === 'dir') {
      errs.push('cat: ' + fname + ': Is a directory');
      return;
    }
    if (!cn.content.trim()) {
      lines.push({ text: '(empty file)', lineNum: showNums ? (lines.length + 1) : null });
    } else {
      cn.content.split('\n').forEach(l => {
        lines.push({ text: l, lineNum: showNums ? (lines.length + 1) : null });
      });
    }
  });

  return { errs, lines };
}

// ═══════════════════════════════════════════════════════════════════
//  cp       — copy files and directories
// ═══════════════════════════════════════════════════════════════════
export type CpResult = { error: string } | { ok: true; destName: string; destPath: string };

export function cp(cwd: string, srcOp: string, destOp: string, flags: Set<string>): CpResult {
  const sp = resolvePath(cwd, srcOp);
  const sn = getNode(sp);
  if (!sn) return { error: "cp: cannot stat '" + srcOp + "': No such file or directory" };

  if (sn.type === 'dir' && !(flags.has('-r') || flags.has('-R') || flags.has('--recursive'))) {
    return { error: "cp: -r not specified; omitting directory '" + srcOp + "'" };
  }

  const dp = resolvePath(cwd, destOp);
  const dNode = getNode(dp);
  const destHasSlash = /\/+$/.test(destOp);
  let dd: VFSNode | null, destName: string;

  if (dNode && dNode.type === 'dir') {
    dd = dNode;
    destName = srcOp.replace(/\/+$/, '').split('/').pop()!;
  } else if (destHasSlash) {
    if (dNode) return { error: "cp: cannot create regular file '" + destOp + "': Not a directory" };
    else return { error: "cp: cannot create regular file '" + destOp + "': No such file or directory" };
  } else {
    dd = getNode(normPath(dp + '/..'));
    destName = dp.split('/').pop()!;
  }

  if (!dd || dd.type !== 'dir') return { error: 'cp: destination directory not found' };

  dd.children[destName] = cloneNode(sn);
  dd.children[destName].mtime = new Date();
  return { ok: true, destName, destPath: normPath((dNode && dNode.type === 'dir' ? dp : normPath(dp + '/..')) + '/' + destName) };
}

// ═══════════════════════════════════════════════════════════════════
//  mv       — move (rename) files and directories
// ═══════════════════════════════════════════════════════════════════
export type MvResult = { error: string } | { newPath: string; destName: string };

export function mv(cwd: string, srcOp: string, destOp: string): MvResult {
  const msp = resolvePath(cwd, srcOp);
  const msn = getNode(msp);
  if (!msn) return { error: "mv: cannot stat '" + srcOp + "': No such file or directory" };

  const mdp = resolvePath(cwd, destOp);
  const mdNode = getNode(mdp);
  const destHasSlash = /\/+$/.test(destOp);
  let mdd: VFSNode | null, destName: string, newPath: string;

  if (mdNode && mdNode.type === 'dir') {
    mdd = mdNode;
    destName = srcOp.replace(/\/+$/, '').split('/').pop()!;
    newPath = normPath(mdp + '/' + destName);
  } else if (destHasSlash) {
    if (mdNode) return { error: "mv: cannot move '" + srcOp + "' to '" + destOp + "': Not a directory" };
    else return { error: "mv: cannot move '" + srcOp + "' to '" + destOp + "': No such file or directory" };
  } else {
    mdd = getNode(normPath(mdp + '/..'));
    destName = mdp.split('/').pop()!;
    newPath = mdp;
  }

  if (!mdd || mdd.type !== 'dir') return { error: 'mv: destination not found' };

  const mpar = parentDir(msp);
  mdd.children[destName] = cloneNode(msn);
  mdd.children[destName].mtime = new Date();
  delete mpar.children[msp.split('/').pop()!];
  return { newPath, destName };
}
