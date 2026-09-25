/* lib/vfs.js — virtual filesystem core */

let VFS = {};
let HOME = '/home/user';

function normPath(p) {
  const parts = p.split('/').filter(Boolean), out = [];
  for (const x of parts) { if (x === '.') continue; if (x === '..') out.pop(); else out.push(x); }
  return '/' + out.join('/');
}

function getNode(path) {
  path = normPath(path);
  if (path === '/') return VFS['/'];
  const parts = path.split('/').filter(Boolean);
  let n = VFS['/'];
  for (const p of parts) {
    if (!n || n.type !== 'dir' || !n.children[p]) return null;
    n = n.children[p];
  }
  return n;
}

function resolvePath(cwd, rel) {
  if (!rel) return cwd;
  if (rel === '~') return HOME;
  if (rel.startsWith('/')) return normPath(rel);
  return normPath(cwd + '/' + rel);
}

function makeNode(type, content) {
  content = content || '';
  return {
    type,
    mtime: new Date(),
    size: type === 'dir' ? 4096 : content.length,
    content: type === 'file' ? content : undefined,
    children: type === 'dir' ? {} : undefined,
  };
}

function serializeNode(n) {
  const o = { type: n.type, mtime: n.mtime instanceof Date ? n.mtime.toISOString() : n.mtime, size: n.size };
  if (n.content !== undefined) o.content = n.content;
  if (n.children) { o.children = {}; for (const [k, v] of Object.entries(n.children)) o.children[k] = serializeNode(v); }
  return o;
}

function deserializeNode(o) {
  const n = { type: o.type, mtime: new Date(o.mtime), size: o.size };
  if (o.content !== undefined) n.content = o.content;
  if (o.children) { n.children = {}; for (const [k, v] of Object.entries(o.children)) n.children[k] = deserializeNode(v); }
  return n;
}

// Node.js require support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VFS, HOME, normPath, getNode, resolvePath, makeNode, serializeNode, deserializeNode };
}
