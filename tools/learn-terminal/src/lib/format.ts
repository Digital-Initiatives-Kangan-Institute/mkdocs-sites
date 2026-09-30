/* lib/format.ts — display helpers shared by the terminal and the file pane */

import { HOME, type VFSNode } from './vfs.ts';

export function esc(s: unknown): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

export function dispPath(p: string): string { return p.replace(HOME, '~'); }
export function isHidden(n: string): boolean { return n.startsWith('.'); }
export function countLines(text: string): number { return (text.match(/\n/g) || []).length + 1; }

/* ls -l helpers (simplified: dirs rwxr-xr-x, files rw-r--r--) */
export function fmtPerms(node: VFSNode): string {
  return node.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
}

export function fmtSize(bytes: number, human: boolean): string {
  if (!human) return String(bytes).padStart(8);
  if (bytes < 1024) return (bytes + 'B').padStart(5);
  if (bytes < 1048576) return (Math.round(bytes / 1024) + 'K').padStart(5);
  return (Math.round(bytes / 1048576) + 'M').padStart(5);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDate(d: Date): string {
  const now = new Date();
  const sameYear = d.getFullYear() === now.getFullYear();
  const day = String(d.getDate()).padStart(2);
  const hr = sameYear ? String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') : String(d.getFullYear());
  return `${MONTHS[d.getMonth()]} ${day} ${hr}`;
}

/* File pane icons */
function ext(name: string) { return name.split('.').pop()!.toLowerCase(); }
const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];

export function fileEmoji(name: string, type: VFSNode['type']): string {
  if (type === 'dir') return '📁';
  const e = ext(name);
  if (IMAGE_EXTS.includes(e)) return '🖼️';
  if (['js', 'ts', 'py', 'c', 'cpp', 'java'].includes(e)) return '⚙️';
  if (['zip', 'tar', 'gz'].includes(e)) return '📦';
  return '📄';
}

export function fileIconCls(name: string, type: VFSNode['type']): string {
  if (type === 'dir') return 'fi-folder';
  return IMAGE_EXTS.includes(ext(name)) ? 'fi-image' : 'fi-text';
}
