/* Full unit tests — run with: node test-all.js */
/* Tests the actual production code in lib/commands.js, lib/vfs.js, and lib/utils.js */

const { VFS, normPath, getNode, resolvePath, makeNode, serializeNode, deserializeNode, HOME } = require('../lib/vfs');
const { tokenize, parseFlags, nonFlags } = require('../lib/utils');
const commands = require('../lib/commands');
const { createTestRunner, setupFS, addFile, addDir } = require('../lib/test');
var { assert, section, printSummary, wasSuccess } = createTestRunner();

// Helper — extract text lines from cat's structured output
function catLines(result) { return result.lines.map(function(l) { return l.text; }); }

// ═══════════════════════════════════════════════════════════════════
//  TESTS: parseFlags
// ═══════════════════════════════════════════════════════════════════

section('parseFlags: basic', [
  ['no flags',                  function() { return [...parseFlags(['file.txt'])].sort(); }, []],
  ['single short flag',         function() { return [...parseFlags(['-a', 'file.txt'])].sort(); }, ['-a']],
  ['combined short flags',      function() { return [...parseFlags(['-la'])].sort(); }, ['-a', '-l']],
  ['long flag',                 function() { return [...parseFlags(['--all', 'file.txt'])].sort(); }, ['--all']],
  ['multiple flags mixed',      function() { return [...parseFlags(['-a', '-l', '--recursive', 'file.txt'])].sort(); }, ['--recursive', '-a', '-l']],
  ['-- terminator',             function() { return [...parseFlags(['-a', '--', '-l'])].sort(); }, ['-a']],
  ['-- terminator only',        function() { return [...parseFlags(['--', '-a', '-l'])].sort(); }, []],
  ['empty args',                function() { return [...parseFlags([])].sort(); }, []],
]);

section('parseFlags: edge cases', [
  ['values starting with dash are flags', function() { return [...parseFlags(['-name'])].sort(); }, ['-a', '-e', '-m', '-n']],
  ['single dash is not a flag',           function() { return [...parseFlags(['-', 'file.txt'])].sort(); }, []],
  ['complex combined',                    function() { return [...parseFlags(['-rfa', '--human-readable', '--', 'file.txt'])].sort(); }, ['--human-readable', '-a', '-f', '-r']],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: nonFlags
// ═══════════════════════════════════════════════════════════════════

section('nonFlags', [
  ['filters out flags',         function() { return nonFlags(['-a', '-l', 'file.txt', 'file2.txt']); }, ['file.txt', 'file2.txt']],
  ['all non-flags',             function() { return nonFlags(['file.txt', 'dir/']); }, ['file.txt', 'dir/']],
  ['all flags returns empty',   function() { return nonFlags(['-a', '-l', '--all']); }, []],
  ['empty input',               function() { return nonFlags([]); }, []],
  ['-- is treated as flag',     function() { return nonFlags(['--', '-notaflag']); }, []],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: normPath
// ═══════════════════════════════════════════════════════════════════

section('normPath', [
  ['root',                      function() { return normPath('/'); }, '/'],
  ['simple',                    function() { return normPath('/home/user'); }, '/home/user'],
  ['trailing slash',            function() { return normPath('/home/user/'); }, '/home/user'],
  ['double slash',              function() { return normPath('//home//user'); }, '/home/user'],
  ['dot collapses',             function() { return normPath('/home/./user'); }, '/home/user'],
  ['.. goes up',                function() { return normPath('/home/user/../other'); }, '/home/other'],
  ['.. at root stays at root',  function() { return normPath('/..'); }, '/'],
  ['multiple .. past root',     function() { return normPath('/home/../../..'); }, '/'],
  ['.. and . mixed',            function() { return normPath('/./home/./user/.././other/.'); }, '/home/other'],
  ['no leading slash',          function() { return normPath('home/user'); }, '/home/user'],
  ['empty becomes root',        function() { return normPath(''); }, '/'],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: resolvePath
// ═══════════════════════════════════════════════════════════════════

section('resolvePath', [
  ['tilde to home',             function() { return resolvePath('/tmp', '~'); }, '/home/user'],
  ['empty falls back to cwd',   function() { return resolvePath('/home/user', ''); }, '/home/user'],
  ['absolute path ignores cwd', function() { return resolvePath('/tmp', '/etc'); }, '/etc'],
  ['relative appends to cwd',   function() { return resolvePath('/home/user', 'docs'); }, '/home/user/docs'],
  ['relative with ..',          function() { return resolvePath('/home/user', '../other'); }, '/home/other'],
  ['home from anywhere',        function() { return resolvePath('/var/log', '~'); }, '/home/user'],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: getNode
// ═══════════════════════════════════════════════════════════════════

section('getNode', [
  ['root exists',               function() { setupFS(); return getNode('/') !== null; }, true],
  ['home exists',               function() { setupFS(); return getNode('/home/user') !== null; }, true],
  ['nonexistent returns null',  function() { setupFS(); return getNode('/home/user/ghost.txt'); }, null],
  ['file type',                 function() { setupFS(); addFile('/home/user/test.txt', 'hello'); return getNode('/home/user/test.txt').type; }, 'file'],
  ['deep path',                 function() { setupFS(); addDir('/home/user/a'); addDir('/home/user/a/b'); addFile('/home/user/a/b/c.txt', 'deep'); return getNode('/home/user/a/b/c.txt').content; }, 'deep'],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: VFS serialization
// ═══════════════════════════════════════════════════════════════════

section('serializeNode / deserializeNode', [
  ['file round-trip preserves content', function() {
    const n = makeNode('file', 'hello world');
    const d = deserializeNode(serializeNode(n));
    return d.type === 'file' && d.content === 'hello world' && d.size === 11;
  }, true],
  ['dir round-trip preserves children', function() {
    const n = makeNode('dir');
    n.children['a'] = makeNode('file', 'A');
    n.children['b'] = makeNode('dir');
    const d = deserializeNode(serializeNode(n));
    return d.type === 'dir' && d.children['a'].content === 'A' && d.children['b'].type === 'dir';
  }, true],
  ['mtime deserialized as Date instance', function() {
    const n = makeNode('file', 'test');
    const d = deserializeNode(serializeNode(n));
    return d.mtime instanceof Date;
  }, true],
  ['nested directory tree round-trip', function() {
    const n = makeNode('dir');
    n.children['a'] = makeNode('dir');
    n.children['a'].children['b'] = makeNode('file', 'nested');
    const d = deserializeNode(serializeNode(n));
    return d.children['a'].children['b'].content;
  }, 'nested'],
  ['empty file round-trip', function() {
    const n = makeNode('file', '');
    const d = deserializeNode(serializeNode(n));
    return d.content === '' && d.size === 0;
  }, true],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: rm
// ═══════════════════════════════════════════════════════════════════

section('rm: remove files', [
  ['removes single file', function() {
    const cwd = setupFS();
    addFile('/home/user/test.txt', 'hello');
    commands.rm(cwd, ['test.txt'], new Set());
    return getNode('/home/user/test.txt');
  }, null],
  ['removes multiple files', function() {
    const cwd = setupFS();
    addFile('/home/user/a.txt', 'a');
    addFile('/home/user/b.txt', 'b');
    commands.rm(cwd, ['a.txt', 'b.txt'], new Set());
    return getNode('/home/user/a.txt') === null && getNode('/home/user/b.txt') === null;
  }, true],
  ['sends error on missing file', function() {
    const cwd = setupFS();
    const r = commands.rm(cwd, ['ghost.txt'], new Set());
    return r.errs[0];
  }, "rm: cannot remove 'ghost.txt': No such file or directory"],
  ['-f flag suppresses missing-file error', function() {
    const cwd = setupFS();
    const r = commands.rm(cwd, ['ghost.txt'], new Set(['-f']));
    return r.errs.length;
  }, 0],
  ['removes valid file, errors for missing in same call', function() {
    const cwd = setupFS();
    addFile('/home/user/keep.txt', 'keep');
    const r = commands.rm(cwd, ['keep.txt', 'ghost.txt'], new Set());
    return getNode('/home/user/keep.txt') === null && r.errs.length === 1 && r.removed.length === 1;
  }, true],
]);

section('rm: directories', [
  ['refuses directory without -r', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    const r = commands.rm(cwd, ['mydir'], new Set());
    return r.errs[0];
  }, "rm: cannot remove 'mydir': Is a directory"],
  ['removes empty directory with -r', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    commands.rm(cwd, ['mydir'], new Set(['-r']));
    return getNode('/home/user/mydir');
  }, null],
  ['-R flag also enables recursive removal', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    commands.rm(cwd, ['mydir'], new Set(['-R']));
    return getNode('/home/user/mydir');
  }, null],
  ['--recursive flag also enables removal', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    commands.rm(cwd, ['mydir'], new Set(['--recursive']));
    return getNode('/home/user/mydir');
  }, null],
  ['recursively removes directory and its nested contents', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    addFile('/home/user/mydir/nested.txt', 'inside');
    commands.rm(cwd, ['mydir'], new Set(['-r']));
    return getNode('/home/user/mydir');
  }, null],
  ['-rf removes non-empty directory', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    addFile('/home/user/mydir/data.txt', 'data');
    commands.rm(cwd, ['mydir'], new Set(['-r', '-f']));
    return getNode('/home/user/mydir');
  }, null],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: rmdir
// ═══════════════════════════════════════════════════════════════════

section('rmdir', [
  ['removes empty directory', function() {
    const cwd = setupFS();
    addDir('/home/user/emptydir');
    commands.rmdir(cwd, ['emptydir'], new Set());
    return getNode('/home/user/emptydir');
  }, null],
  ['refuses non-empty directory', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    addFile('/home/user/mydir/file.txt', 'x');
    const r = commands.rmdir(cwd, ['mydir'], new Set());
    return r.errs.length > 0 && getNode('/home/user/mydir') !== null;
  }, true],
  ['refuses file operand', function() {
    const cwd = setupFS();
    addFile('/home/user/file.txt', 'x');
    const r = commands.rmdir(cwd, ['file.txt'], new Set());
    return r.errs[0];
  }, "rmdir: failed to remove 'file.txt': Not a directory"],
  ['errors on nonexistent directory', function() {
    const cwd = setupFS();
    const r = commands.rmdir(cwd, ['ghost'], new Set());
    return r.errs[0];
  }, "rmdir: failed to remove 'ghost': No such file or directory"],
  ['removes multiple empty directories', function() {
    const cwd = setupFS();
    addDir('/home/user/a');
    addDir('/home/user/b');
    commands.rmdir(cwd, ['a', 'b'], new Set());
    return getNode('/home/user/a') === null && getNode('/home/user/b') === null;
  }, true],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: mkdir
// ═══════════════════════════════════════════════════════════════════

section('mkdir', [
  ['creates a single directory', function() {
    const cwd = setupFS();
    commands.mkdir(cwd, ['newdir'], new Set());
    const n = getNode('/home/user/newdir');
    return n && n.type;
  }, 'dir'],
  ['creates multiple directories', function() {
    const cwd = setupFS();
    commands.mkdir(cwd, ['a', 'b'], new Set());
    return getNode('/home/user/a') !== null && getNode('/home/user/b') !== null;
  }, true],
  ['errors on existing name without -p', function() {
    const cwd = setupFS();
    addDir('/home/user/exists');
    const r = commands.mkdir(cwd, ['exists'], new Set());
    return r.errs[0];
  }, "mkdir: cannot create directory 'exists': File exists"],
  ['-p flag suppresses existing-name error', function() {
    const cwd = setupFS();
    addDir('/home/user/exists');
    const r = commands.mkdir(cwd, ['exists'], new Set(['-p']));
    return r.errs.length;
  }, 0],
  ['errors when parent directory is missing', function() {
    const cwd = setupFS();
    const r = commands.mkdir(cwd, ['nonexistent/child'], new Set());
    return r.errs[0];
  }, "mkdir: cannot create directory 'nonexistent/child': No such file or directory"],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: touch
// ═══════════════════════════════════════════════════════════════════

section('touch', [
  ['creates a new empty file', function() {
    const cwd = setupFS();
    commands.touch(cwd, ['newfile.txt']);
    const n = getNode('/home/user/newfile.txt');
    return n && n.type === 'file' && n.content === '';
  }, true],
  ['updates mtime on existing file, preserves content', function() {
    const cwd = setupFS();
    addFile('/home/user/existing.txt', 'keep me');
    const before = getNode('/home/user/existing.txt').mtime;
    commands.touch(cwd, ['existing.txt']);
    const after = getNode('/home/user/existing.txt').mtime;
    return after >= before && getNode('/home/user/existing.txt').content === 'keep me';
  }, true],
  ['creates multiple files in one call', function() {
    const cwd = setupFS();
    commands.touch(cwd, ['a.txt', 'b.txt']);
    return getNode('/home/user/a.txt') !== null && getNode('/home/user/b.txt') !== null;
  }, true],
  ['errors when parent directory is missing', function() {
    const cwd = setupFS();
    const r = commands.touch(cwd, ['nonexistent/file.txt']);
    return r.errs[0];
  }, "touch: cannot touch 'nonexistent/file.txt': No such file or directory"],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: grep
// ═══════════════════════════════════════════════════════════════════

section('grep: basic matching', [
  ['finds lines containing the pattern', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'apple\nbanana\napply');
    const r = commands.grep(cwd, 'app', 'data.txt', new Set());
    return r.matches && r.matches.map(function(m) { return m.text; });
  }, ['apple', 'apply']],
  ['returns empty matches when no line matches', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'apple\nbanana');
    const r = commands.grep(cwd, 'zebra', 'data.txt', new Set());
    return r.matches;
  }, []],
]);

section('grep: flags', [
  ['-i enables case-insensitive matching', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'Apple\nBANANA');
    const r = commands.grep(cwd, 'apple', 'data.txt', new Set(['-i']));
    return r.matches && r.matches.map(function(m) { return m.text; });
  }, ['Apple']],
  ['-v inverts matching (non-matching lines)', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'apple\nbanana\napply');
    const r = commands.grep(cwd, 'app', 'data.txt', new Set(['-v']));
    return r.matches && r.matches.map(function(m) { return m.text; });
  }, ['banana']],
  ['-c returns count of matching lines', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'apple\nbanana\napply');
    const r = commands.grep(cwd, 'app', 'data.txt', new Set(['-c']));
    return r.count;
  }, 2],
  ['-v combined with -c returns count of non-matching lines', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'apple\nbanana\napply');
    const r = commands.grep(cwd, 'app', 'data.txt', new Set(['-v', '-c']));
    return r.count;
  }, 1],
]);

section('grep: errors', [
  ['errors when file is not found', function() {
    const cwd = setupFS();
    const r = commands.grep(cwd, 'pat', 'ghost.txt', new Set());
    return r.err ? 'err' : 'ok';
  }, 'err'],
  ['errors when operand is a directory', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    const r = commands.grep(cwd, 'pat', 'mydir', new Set());
    return r.err ? 'err' : 'ok';
  }, 'err'],
  ['errors when pattern is missing', function() {
    const cwd = setupFS();
    const r = commands.grep(cwd, '', 'file.txt', new Set());
    return r.err ? 'err' : 'ok';
  }, 'err'],
  ['errors when there is no input at all', function() {
    const cwd = setupFS();
    const r = commands.grep(cwd, 'pat', undefined, new Set());
    return r.err ? 'err' : 'ok';
  }, 'err'],
]);

section('grep: pipe input', [
  ['searches piped string input', function() {
    const cwd = setupFS();
    const r = commands.grep(cwd, 'err', undefined, new Set(), 'line1 ok\nline2 err\nline3 err');
    return r.matches && r.matches.map(function(m) { return m.text; });
  }, ['line2 err', 'line3 err']],
  ['-c works with piped input', function() {
    const cwd = setupFS();
    const r = commands.grep(cwd, 'err', undefined, new Set(['-c']), 'ok\nerr\nerr');
    return r.count;
  }, 2],
]);

// ═══════════════════════════════════════════════════════════════════
//  INTEGRATION: tokenize → parse → execute
//  These replicate the pipeline that app.js runs in the browser.
// ═══════════════════════════════════════════════════════════════════

section('integration: tokenize + parseFlags + nonFlags', [
  ['parses ls -la into flags correctly', function() {
    const parts = tokenize('ls -la');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    return [parts[0], [...flags].sort(), ops];
  }, ['ls', ['-a', '-l'], []]],
  ['parses rm -rf dir/ into flags and operands', function() {
    const parts = tokenize('rm -rf dir/');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    return [parts[0], [...flags].sort(), ops];
  }, ['rm', ['-f', '-r'], ['dir/']]],
  ['parses --help flag separately', function() {
    const parts = tokenize('ls --help');
    const flags = parseFlags(parts.slice(1));
    return [...flags];
  }, ['--help']],
  ['parses quoted arguments preserving spaces', function() {
    const parts = tokenize('cat "my file.txt"');
    const ops = nonFlags(parts.slice(1));
    return ops;
  }, ['my file.txt']],
  ['parses piped command structure', function() {
    const parts = tokenize('cat f | grep x');
    return parts;
  }, ['cat', 'f', '|', 'grep', 'x']],
]);

section('integration: tokenize → execute command', [
  ['mkdir via tokenized input', function() {
    const cwd = setupFS();
    const parts = tokenize('mkdir mydir');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    commands.mkdir(cwd, ops, flags);
    return getNode('/home/user/mydir') !== null;
  }, true],
  ['rm -f via tokenized input', function() {
    const cwd = setupFS();
    addFile('/home/user/test.txt', 'hello');
    const parts = tokenize('rm -f test.txt');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    commands.rm(cwd, ops, flags);
    return getNode('/home/user/test.txt');
  }, null],
  ['cat via tokenized input', function() {
    const cwd = setupFS();
    addFile('/home/user/readme.txt', 'hello');
    const parts = tokenize('cat readme.txt');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    const r = commands.cat(cwd, ops, flags);
    return catLines(r);
  }, ['hello']],
  ['echo redirect via tokenized input', function() {
    const cwd = setupFS();
    // Simulates: echo "hello world" > greeting.txt
    const parts = tokenize('echo "hello world" > greeting.txt');
    const cmd = parts[0];
    const redirectIdx = parts.indexOf('>');
    const cmdArgs = parts.slice(1, redirectIdx);
    const fileOp = parts[redirectIdx + 1];
    const flags = parseFlags(cmdArgs);
    const ops = nonFlags(cmdArgs);
    // The actual redirect logic appends to files, but we skip that here.
    // Instead just confirm tokenize properly split the parts.
    return [cmd, ops, fileOp];
  }, ['echo', ['hello world'], 'greeting.txt']],
  ['tokenized touch creates file', function() {
    const cwd = setupFS();
    const parts = tokenize('touch new.txt');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    commands.touch(cwd, ops);
    return getNode('/home/user/new.txt') !== null;
  }, true],
  ['tokenized cp copies file', function() {
    const cwd = setupFS();
    addFile('/home/user/src.txt', 'data');
    const parts = tokenize('cp src.txt dest.txt');
    const flags = parseFlags(parts.slice(1));
    const ops = nonFlags(parts.slice(1));
    commands.cp(cwd, ops[0], ops[1], flags);
    return getNode('/home/user/dest.txt') !== null;
  }, true],
]);

// ═══════════════════════════════════════════════════════════════════
//  TESTS: cat
// ═══════════════════════════════════════════════════════════════════

section('cat: basic', [
  ['outputs file content line by line', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'line1\nline2');
    const r = commands.cat(cwd, ['data.txt'], new Set());
    return catLines(r);
  }, ['line1', 'line2']],
  ['concatenates multiple files', function() {
    const cwd = setupFS();
    addFile('/home/user/a.txt', 'A');
    addFile('/home/user/b.txt', 'B');
    const r = commands.cat(cwd, ['a.txt', 'b.txt'], new Set());
    return catLines(r);
  }, ['A', 'B']],
  ['reports empty file', function() {
    const cwd = setupFS();
    addFile('/home/user/empty.txt', '');
    const r = commands.cat(cwd, ['empty.txt'], new Set());
    return catLines(r);
  }, ['(empty file)']],
]);

section('cat: flags', [
  ['-n prepends line numbers', function() {
    const cwd = setupFS();
    addFile('/home/user/data.txt', 'first\nsecond');
    const r = commands.cat(cwd, ['data.txt'], new Set(['-n']));
    return r.lines.map(function(l) { return l.lineNum + ':' + l.text; });
  }, ['1:first', '2:second']],
]);

section('cat: errors', [
  ['errors when file is not found', function() {
    const cwd = setupFS();
    const r = commands.cat(cwd, ['ghost.txt'], new Set());
    return r.errs[0];
  }, "cat: ghost.txt: No such file or directory"],
  ['errors when operand is a directory', function() {
    const cwd = setupFS();
    addDir('/home/user/mydir');
    const r = commands.cat(cwd, ['mydir'], new Set());
    return r.errs[0];
  }, "cat: mydir: Is a directory"],
]);

section('cat: pipe input', [
  ['handles piped string input', function() {
    const cwd = setupFS();
    const r = commands.cat(cwd, [], new Set(), 'piped\ncontent');
    return catLines(r);
  }, ['piped', 'content']],
  ['-n works with piped input', function() {
    const cwd = setupFS();
    const r = commands.cat(cwd, [], new Set(['-n']), 'a\nb');
    return r.lines.map(function(l) { return l.lineNum + ':' + l.text; });
  }, ['1:a', '2:b']],
]);

// ═══════════════════════════════════════════════════════════════════
//  SUMMARY
// ═══════════════════════════════════════════════════════════════════

printSummary();
process.exit(wasSuccess() ? 0 : 1);
