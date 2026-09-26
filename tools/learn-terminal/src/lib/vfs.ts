/* lib/vfs.ts — virtual filesystem core */

export interface FileNode {
  type: 'file';
  mtime: Date;
  size: number;
  content: string;
}

export interface DirNode {
  type: 'dir';
  mtime: Date;
  size: number;
  children: Record<string, VFSNode>;
}

export type VFSNode = FileNode | DirNode;

/** JSON shape used for localStorage and workspace export files. */
export interface SerializedNode {
  type: 'file' | 'dir';
  mtime: string;
  size: number;
  content?: string;
  children?: Record<string, SerializedNode>;
}

// Keyed by absolute path. '/' is the root; the logged-in user's home is also
// registered under its own path as a convenience alias.
export const VFS: Record<string, DirNode> = {};
export let HOME = '/home/user';

export function setHome(path: string) {
  HOME = path;
}

export function normPath(p: string): string {
  const parts = p.split('/').filter(Boolean), out: string[] = [];
  for (const x of parts) { if (x === '.') continue; if (x === '..') out.pop(); else out.push(x); }
  return '/' + out.join('/');
}

export function getNode(path: string): VFSNode | null {
  path = normPath(path);
  if (path === '/') return VFS['/'] ?? null;
  const parts = path.split('/').filter(Boolean);
  let n: VFSNode | undefined = VFS['/'];
  for (const p of parts) {
    if (!n || n.type !== 'dir' || !n.children[p]) return null;
    n = n.children[p];
  }
  return n ?? null;
}

/** getNode narrowed to directories. */
export function getDir(path: string): DirNode | null {
  const n = getNode(path);
  return n && n.type === 'dir' ? n : null;
}

export function resolvePath(cwd: string, rel?: string): string {
  if (!rel) return cwd;
  if (rel === '~') return HOME;
  if (rel.startsWith('/')) return normPath(rel);
  return normPath(cwd + '/' + rel);
}

export function makeNode(type: 'file', content?: string): FileNode;
export function makeNode(type: 'dir', content?: string): DirNode;
export function makeNode(type: 'file' | 'dir', content?: string): VFSNode;
export function makeNode(type: 'file' | 'dir', content?: string): VFSNode {
  content = content || '';
  if (type === 'dir') return { type, mtime: new Date(), size: 4096, children: {} };
  return { type, mtime: new Date(), size: content.length, content };
}

export function serializeNode(n: VFSNode): SerializedNode {
  const o: SerializedNode = { type: n.type, mtime: n.mtime instanceof Date ? n.mtime.toISOString() : n.mtime, size: n.size };
  if (n.type === 'file') o.content = n.content;
  else { o.children = {}; for (const [k, v] of Object.entries(n.children)) o.children[k] = serializeNode(v); }
  return o;
}

export function deserializeNode(o: SerializedNode): VFSNode {
  if (o.type === 'dir') {
    const children: Record<string, VFSNode> = {};
    for (const [k, v] of Object.entries(o.children || {})) children[k] = deserializeNode(v);
    return { type: 'dir', mtime: new Date(o.mtime), size: o.size, children };
  }
  return { type: 'file', mtime: new Date(o.mtime), size: o.size, content: o.content ?? '' };
}
