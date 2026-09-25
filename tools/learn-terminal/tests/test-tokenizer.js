/* Tokenizer unit tests — run with: node test-tokenizer.js */

const { tokenize } = require('../lib/utils');
const { assert, section, printSummary, wasSuccess } = require('../lib/test').createTestRunner();

// ═══════════════════════════════════════════════════════════════════
//  BASIC
// ═══════════════════════════════════════════════════════════════════

section('basic commands',[
  ['single command',            tokenize('ls'),                ['ls']],
  ['command with arg',          tokenize('ls -la'),            ['ls','-la']],
  ['multiple args',             tokenize('cp a.txt b.txt'),    ['cp','a.txt','b.txt']],
  ['empty string',              tokenize(''),                  []],
  ['whitespace only',           tokenize('   '),               []],
  ['single character',          tokenize('x'),                 ['x']],
  ['single hyphen',             tokenize('-'),                 ['-']],
  ['flag only',                 tokenize('-la'),               ['-la']],
  ['absolute path',             tokenize('/usr/bin'),          ['/usr/bin']],
  ['number arguments',          tokenize('head -n 5'),         ['head','-n','5']],
  ['underscores in name',       tokenize('my_file.txt'),       ['my_file.txt']],
  ['hyphens in name',           tokenize('my-file.txt'),       ['my-file.txt']],
  ['dots in filename',          tokenize('file.name.txt'),     ['file.name.txt']],
  ['equals sign in flag',       tokenize('--format=pdf'),      ['--format=pdf']],
  ['equals sign in var',        tokenize('VAR=value'),         ['VAR=value']],
]);

// ═══════════════════════════════════════════════════════════════════
//  PIPES
// ═══════════════════════════════════════════════════════════════════

section('pipes',[
  ['simple pipe',               tokenize('cat f | grep x'),    ['cat','f','|','grep','x']],
  ['double pipe',               tokenize('a | b | c'),         ['a','|','b','|','c']],
  ['pipe no spaces',            tokenize('cat|grep'),          ['cat','|','grep']],
  ['pipe leading whitespace',   tokenize('  cat | grep'),      ['cat','|','grep']],
  ['pipe trailing whitespace',  tokenize('cat | grep  '),      ['cat','|','grep']],
  ['pipe only',                 tokenize('|'),                 ['|']],
  ['pipe at start',             tokenize('| grep x'),          ['|','grep','x']],
  ['pipe at end',               tokenize('cat f |'),           ['cat','f','|']],
]);

// ═══════════════════════════════════════════════════════════════════
//  REDIRECTS
// ═══════════════════════════════════════════════════════════════════

section('redirects',[
  ['overwrite redirect',        tokenize('ls > out.txt'),      ['ls','>','out.txt']],
  ['append redirect',           tokenize('ls >> out.txt'),     ['ls','>>','out.txt']],
  ['pipe then redirect',        tokenize('cat f | grep x > out.txt'), ['cat','f','|','grep','x','>','out.txt']],
  ['redirect then pipe',        tokenize('cat f > out | grep x'), ['cat','f','>','out','|','grep','x']],
  ['redirect only',             tokenize('>'),                 ['>']],
  ['append only',               tokenize('>>'),                ['>>']],
  ['redirect at start',         tokenize('> file.txt'),        ['>','file.txt']],
  ['redirect at end',           tokenize('echo hi >'),         ['echo','hi','>']],
  ['multiple redirects',        tokenize('cmd < in > out'),    ['cmd','<','in','>','out']],
  ['heredoc operator',          tokenize('cat << EOF'),        ['cat','<<','EOF']],
  ['stdin redirect',            tokenize('grep x < file.txt'), ['grep','x','<','file.txt']],
  ['less-than as arg',          tokenize('echo "<="'),         ['echo','<=']],
]);

// ═══════════════════════════════════════════════════════════════════
//  QUOTED STRINGS
// ═══════════════════════════════════════════════════════════════════

section('quoted strings',[
  ['double quoted',             tokenize('echo "hello world"'),     ['echo','hello world']],
  ['single quoted',             tokenize("echo 'hello world'"),     ['echo','hello world']],
  ['quoted with pipe',          tokenize('grep "a | b" f'),         ['grep','a | b','f']],
  ['quoted with redirect',      tokenize('grep ">=" f'),            ['grep','>=','f']],
  ['quoted after redirect',     tokenize('echo "hi" > f'),          ['echo','hi','>','f']],
  ['quoted before pipe',        tokenize('echo "a" | grep a'),      ['echo','a','|','grep','a']],
  ['single char quoted',        tokenize('echo "a"'),               ['echo','a']],
  ['multiple quoted words',     tokenize('echo "a" "b"'),           ['echo','a','b']],
  ['empty quoted',              tokenize('echo ""'),                ['echo','']],
  ['single quotes in doubles',  tokenize("echo \"it's fine\""),      ['echo',"it's fine"]],
  ['spaces preserved in quotes',tokenize('mkdir "my dir"'),         ['mkdir','my dir']],
  ['operator preserved in quotes',tokenize('grep "||" f'),          ['grep','||','f']],
  ['pipe in single quotes',     tokenize("grep 'a | b' f"),         ['grep','a | b','f']],
  ['redirect in single quotes', tokenize("grep '>' f"),             ['grep','>','f']],
]);

// ═══════════════════════════════════════════════════════════════════
//  OPERATORS
// ═══════════════════════════════════════════════════════════════════

section('operators',[
  ['&& token',                  tokenize('a && b'),             ['a','&&','b']],
  ['|| token',                  tokenize('a || b'),             ['a','||','b']],
  ['<< token',                  tokenize('a << b'),             ['a','<<','b']],
  ['chained &&',                tokenize('a && b && c'),        ['a','&&','b','&&','c']],
  ['chained ||',                tokenize('a || b || c'),        ['a','||','b','||','c']],
  ['&& only',                   tokenize('&&'),                ['&&']],
  ['|| only',                   tokenize('||'),                ['||']],
]);

// ═══════════════════════════════════════════════════════════════════
//  MIXED OPERATORS & PIPES
// ═══════════════════════════════════════════════════════════════════

section('mixed operators',[
  ['pipe then &&',              tokenize('a | b && c'),         ['a','|','b','&&','c']],
  ['&& then pipe',              tokenize('a && b | c'),         ['a','&&','b','|','c']],
  ['pipe then ||',              tokenize('a | b || c'),         ['a','|','b','||','c']],
  ['redirect then &&',          tokenize('a > f && b'),         ['a','>','f','&&','b']],
  ['&& then redirect',          tokenize('a && b > f'),         ['a','&&','b','>','f']],
  ['pipe redirect &&',          tokenize('a | b > f && c'),     ['a','|','b','>','f','&&','c']],
]);

// ═══════════════════════════════════════════════════════════════════
//  PATHS & NAVIGATION
// ═══════════════════════════════════════════════════════════════════

section('paths and navigation',[
  ['tilde path',                tokenize('cd ~/Documents'),     ['cd','~/Documents']],
  ['dot-dot path',              tokenize('cd ../..'),           ['cd','../..']],
  ['dot-slash path',            tokenize('./script.sh'),        ['./script.sh']],
  ['path with subdirectories',  tokenize('cat /etc/hostname'),  ['cat','/etc/hostname']],
  ['relative dot path',         tokenize('cat ./dir/file.txt'), ['cat','./dir/file.txt']],
  ['nested relative',           tokenize('cd ../../dir'),       ['cd','../../dir']],
  ['home relative',             tokenize('ls ~/Downloads'),     ['ls','~/Downloads']],
  ['parent dir arg',            tokenize('ls ..'),              ['ls','..']],
  ['current dir arg',           tokenize('ls .'),               ['ls','.']],
]);

// ═══════════════════════════════════════════════════════════════════
//  COMPLEX / REALISTIC COMMANDS
// ═══════════════════════════════════════════════════════════════════

section('complex commands',[
  ['append to file',            tokenize('echo "line 1" >> file.txt'), ['echo','line 1','>>','file.txt']],
  ['ls piped to less',          tokenize('ls -la | less'),             ['ls','-la','|','less']],
  ['challenge subcommand',      tokenize('challenge start getting-started'), ['challenge','start','getting-started']],
  ['export subcommand',         tokenize('export txt'),                ['export','txt']],
  ['mkdir -p nested',           tokenize('mkdir -p a/b/c'),            ['mkdir','-p','a/b/c']],
  ['echo with redirect',        tokenize('echo "hello" > greeting.txt'), ['echo','hello','>','greeting.txt']],
  ['grep with quoted pattern',  tokenize('grep "error message" log.txt'), ['grep','error message','log.txt']],
  ['compound with &&',          tokenize('make && make install'),      ['make','&&','make','install']],
  ['or chain',                  tokenize('cd dir || mkdir dir'),       ['cd','dir','||','mkdir','dir']],
  ['pipe to wc',                tokenize('cat f | wc -l'),             ['cat','f','|','wc','-l']],
  ['pipeline to file',          tokenize('cat f | grep x | sort > out'), ['cat','f','|','grep','x','|','sort','>','out']],
  ['multiple flags',            tokenize('ls -la --color=auto'),       ['ls','-la','--color=auto']],
  ['mixed flags and args',      tokenize('rm -rf dir/'),               ['rm','-rf','dir/']],
  ['touch multi files',         tokenize('touch a.txt b.txt c.txt'),   ['touch','a.txt','b.txt','c.txt']],
]);

// ═══════════════════════════════════════════════════════════════════
//  UNMATCHED / MALFORMED QUOTES
// ═══════════════════════════════════════════════════════════════════

section('unmatched quotes',[
  // The tokenizer strips leading/trailing quotes from every token.
  // Unmatched open-quotes are treated as literal quote chars and
  // removed by the same post-processing step (replace /^['"]|['"]$/g).
  ['unclosed double quote',     tokenize('echo "hello'),            ['echo','hello']],
  ['unclosed single quote',     tokenize("echo 'hello"),            ['echo','hello']],
  ['stray double quote',        tokenize('echo "'),                 ['echo']],
  ['stray single quote',        tokenize("echo '"),                 ['echo','']],
  ['double-single mismatch',    tokenize('echo "hello\''),          ['echo','hello']],
  ['single-double mismatch',    tokenize("echo 'hello\""),          ['echo','hello']],
]);

// ═══════════════════════════════════════════════════════════════════
//  WHITESPACE
// ═══════════════════════════════════════════════════════════════════

section('whitespace handling',[
  ['leading spaces',            tokenize('  ls'),                 ['ls']],
  ['trailing spaces',           tokenize('ls  '),                 ['ls']],
  ['tabs between tokens',       tokenize('ls\t-la'),              ['ls','-la']],
  ['mixed whitespace',          tokenize('  ls   -la  '),         ['ls','-la']],
  ['newline in input',          tokenize('ls\n-la'),              ['ls','-la']],
]);

// ═══════════════════════════════════════════════════════════════════
//  SUMMARY
// ═══════════════════════════════════════════════════════════════════

printSummary();
process.exit(wasSuccess() ? 0 : 1);
