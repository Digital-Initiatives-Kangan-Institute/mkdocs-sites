/* lib/utils.ts — pure parsing helpers used by the shell */

export function tokenize(s: string): string[] {
  const m = s.match(/"[^"]*"|'[^']*'|\|\||&&|>>|<<|[|<>]|[^\s|<>"]+/g);
  return m ? m.map(x => x.replace(/^['"]|['"]$/g, '')) : [];
}

export function parseFlags(args: string[]): Set<string> {
  const flags = new Set<string>();
  for (const a of args) {
    if (a === '--') break;
    if (a.startsWith('--')) { flags.add(a); continue; }
    if (a.startsWith('-') && a.length > 1) {
      for (const c of a.slice(1)) flags.add('-' + c);
    }
  }
  return flags;
}

export function nonFlags(args: string[]): string[] {
  return args.filter(a => !a.startsWith('-'));
}
