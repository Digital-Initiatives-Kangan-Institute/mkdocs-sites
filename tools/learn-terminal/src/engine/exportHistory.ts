/* engine/exportHistory.ts — `export txt` / `export pdf` */

import { esc } from '../lib/format.ts';

export const CLEAR_MARKER = '---CLEAR---';
const CHALLENGE_PREFIX = '---CHALLENGE:';

export function challengeMarker(title: string) { return CHALLENGE_PREFIX + title + '---'; }

/** Title from a challenge-start marker in termHistory, or null for ordinary lines. */
export function parseChallengeMarker(h: string): string | null {
  return h.startsWith(CHALLENGE_PREFIX) ? h.replace(CHALLENGE_PREFIX, '').replace('---', '') : null;
}

function htmlToText(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function exportTXT(termHistory: string[]) {
  const lines = termHistory.map(h => {
    if (h === CLEAR_MARKER) return '\n--- terminal cleared ---\n';
    const title = parseChallengeMarker(h);
    if (title !== null) return `\n═══ Challenge: ${title} ═══\nVFS has been reset. Good luck!\n`;
    return htmlToText(h);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'terminal-history.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

const PRINT_VARS = [
  '--bg-deepest:#090c12', '--bg-deep:#0d1117', '--bg-mid:#161b24',
  '--bg-surface:#1c2230', '--text-primary:#e2e8f4', '--text-secondary:#8896b0',
  '--text-muted:#4a5568', '--green:#3dffa0', '--blue:#58a6ff',
  '--purple:#c792ea', '--amber:#ffd080', '--red:#ff7b7b',
  '--teal:#4dd9d9', '--cyan:#79c0ff',
].join(';');

export function exportPDF(termHistory: string[], username: string) {
  const bodyLines = termHistory.map(h => {
    if (h === CLEAR_MARKER) return '<div style="color:#4a5568;font-style:italic;padding:4px 0">--- terminal cleared ---</div>';
    const title = parseChallengeMarker(h);
    if (title !== null) {
      return `<div style="color:#ffd080;font-weight:700;letter-spacing:.03em;padding:8px 0;border-top:1px solid #333;margin-top:8px">═══ Challenge: ${esc(title)} ═══</div><div style="color:#4a5568;font-style:italic">VFS has been reset. Good luck!</div>`;
    }
    return '<div>' + h + '</div>';
  }).join('');
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>Terminal History — ${esc(username)}</title>
<style>
  :root{${PRINT_VARS}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg-deepest);color:var(--text-primary);font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.75;padding:24px}
  .t-prompt{color:var(--green)} .t-path{color:var(--teal)} .t-dollar{color:var(--text-muted)}
  .t-cmd{color:var(--text-primary)} .t-out{color:var(--text-secondary)} .t-err{color:var(--red)}
  .t-info{color:var(--blue)} .t-success{color:var(--green)} .t-dir{color:var(--cyan);font-weight:500}
  .t-file{color:var(--text-primary)} .t-muted{color:var(--text-muted);font-style:italic}
  .t-key{color:var(--purple)} .t-amber{color:var(--amber)}
  .t-section{color:var(--amber);font-weight:700;letter-spacing:.03em}
  .t-flag{color:var(--purple)} .t-synopsis{color:var(--cyan)} .t-hidden{opacity:.4}
  .t-green{color:var(--green)} .t-teal{color:var(--teal)} .t-cyan{color:var(--cyan)}
  .t-step-done{color:var(--text-muted);text-decoration:line-through}
  .t-step-current{color:var(--green);font-weight:700}
  .t-step-pending{color:var(--text-hint)}
  .t-star{color:var(--amber)} .t-star-empty{color:var(--text-hint)}
  .t-perm{color:#6aadcc} .t-size{color:#9eb8d0;text-align:right}
  .t-date{color:var(--text-muted)}
  @media print{body{background:#090c12!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>${bodyLines}</body></html>`);
  win.document.close();
  setTimeout(() => { win.print(); }, 250);
}
