/* lib/utils.js — pure utility functions used by app.js */

function tokenize(s){
  const m=s.match(/"[^"]*"|'[^']*'|\|\||&&|>>|<<|[|<>]|[^\s|<>"]+/g);
  return m?m.map(x=>x.replace(/^['"]|['"]$/g,'')):[];
}

function parseFlags(args) {
  const flags = new Set();
  for (const a of args) {
    if (a === '--') break;
    if (a.startsWith('--')) { flags.add(a); continue; }
    if (a.startsWith('-') && a.length > 1) {
      for (const c of a.slice(1)) flags.add('-' + c);
    }
  }
  return flags;
}

function nonFlags(args) {
  return args.filter(a => !a.startsWith('-'));
}

// Node.js require support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { tokenize, parseFlags, nonFlags };
}
