/* Unit tests for mv and cp — run with: node test-mv-cp.js */
/* Tests the actual production code in lib/commands.js */

const { getNode } = require('../lib/vfs');
const commands = require('../lib/commands');
const { createTestRunner, setupFS, addFile, addDir } = require('../lib/test');
var { assert, section, printSummary, wasSuccess } = createTestRunner();

// ═══════════════════════════════════════════════════════════════════
//  MV TESTS
// ═══════════════════════════════════════════════════════════════════

section('mv: move file into directory', [
  ['moves file into existing dir', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addDir('/home/user/my_notes');
    commands.mv(cwd, 'notes.txt', 'my_notes');
    return getNode('/home/user/my_notes/notes.txt') !== null &&
      getNode('/home/user/notes.txt') === null &&
      getNode('/home/user/my_notes').type === 'dir';
  }, true],
  ['source file removed', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addDir('/home/user/my_notes');
    commands.mv(cwd, 'notes.txt', 'my_notes');
    return getNode('/home/user/notes.txt');
  }, null],
  ['content preserved', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'important content');
    addDir('/home/user/my_notes');
    commands.mv(cwd, 'notes.txt', 'my_notes');
    const n = getNode('/home/user/my_notes/notes.txt');
    return n && n.content;
  }, 'important content'],
]);

section('mv: destination semantics', [
  ['moves into dir with trailing slash', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addDir('/home/user/my_notes');
    commands.mv(cwd, 'notes.txt', 'my_notes/');
    return getNode('/home/user/my_notes/notes.txt') !== null &&
      getNode('/home/user/notes.txt') === null;
  }, true],
  ['trailing slash on nonexistent dir errors', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    const r = commands.mv(cwd, 'notes.txt', 'folder1/');
    return r.error;
  }, "mv: cannot move 'notes.txt' to 'folder1/': No such file or directory"],
  ['does not rename file when trailing-slash dir missing', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    commands.mv(cwd, 'notes.txt', 'folder1/');
    return getNode('/home/user/notes.txt') !== null &&
      getNode('/home/user/folder1') === null;
  }, true],
  ['trailing slash on existing file errors', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addFile('/home/user/existing.txt', 'old');
    const r = commands.mv(cwd, 'notes.txt', 'existing.txt/');
    return r.error;
  }, "mv: cannot move 'notes.txt' to 'existing.txt/': Not a directory"],
  ['does not overwrite file on trailing-slash error', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addFile('/home/user/existing.txt', 'old');
    commands.mv(cwd, 'notes.txt', 'existing.txt/');
    const n = getNode('/home/user/existing.txt');
    return n && n.content;
  }, 'old'],
]);

section('mv: rename file', [
  ['new dest creates renamed file', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    commands.mv(cwd, 'notes.txt', 'renamed.txt');
    return getNode('/home/user/renamed.txt') !== null &&
      getNode('/home/user/notes.txt') === null;
  }, true],
  ['content preserved after rename', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'secret');
    commands.mv(cwd, 'notes.txt', 'renamed.txt');
    const n = getNode('/home/user/renamed.txt');
    return n && n.content;
  }, 'secret'],
]);

section('mv: overwrite existing file', [
  ['overwrites and updates content', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'new content');
    addFile('/home/user/existing.txt', 'old content');
    commands.mv(cwd, 'notes.txt', 'existing.txt');
    return getNode('/home/user/existing.txt').content;
  }, 'new content'],
  ['source is removed after overwrite', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'new content');
    addFile('/home/user/existing.txt', 'old content');
    commands.mv(cwd, 'notes.txt', 'existing.txt');
    return getNode('/home/user/notes.txt');
  }, null],
]);

section('mv: error paths', [
  ['source does not exist', function() {
    const cwd = setupFS();
    addDir('/home/user/my_notes');
    const r = commands.mv(cwd, 'ghost.txt', 'my_notes');
    return r.error;
  }, "mv: cannot stat 'ghost.txt': No such file or directory"],
  ['destination parent not found', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    const r = commands.mv(cwd, 'notes.txt', 'nonexistent/dest.txt');
    return r.error;
  }, "mv: destination not found"],
]);

section('mv: move directory', [
  ['dir moves into dir', function() {
    const cwd = setupFS();
    addDir('/home/user/project');
    addDir('/home/user/archive');
    commands.mv(cwd, 'project', 'archive');
    return getNode('/home/user/archive/project') !== null &&
      getNode('/home/user/project') === null &&
      getNode('/home/user/archive/project').type === 'dir';
  }, true],
  ['nested contents preserved after move', function() {
    const cwd = setupFS();
    addDir('/home/user/project');
    addFile('/home/user/project/readme.txt', 'README');
    addDir('/home/user/archive');
    commands.mv(cwd, 'project', 'archive');
    return getNode('/home/user/archive/project/readme.txt').content;
  }, 'README'],
]);

// ═══════════════════════════════════════════════════════════════════
//  CP TESTS
// ═══════════════════════════════════════════════════════════════════

section('cp: copy file into directory', [
  ['copies file into existing dir', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addDir('/home/user/my_notes');
    commands.cp(cwd, 'notes.txt', 'my_notes', new Set());
    return getNode('/home/user/my_notes/notes.txt') !== null;
  }, true],
  ['source still exists after copy', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addDir('/home/user/my_notes');
    commands.cp(cwd, 'notes.txt', 'my_notes', new Set());
    return getNode('/home/user/notes.txt') !== null;
  }, true],
  ['content preserved in copy', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'copy me');
    addDir('/home/user/my_notes');
    commands.cp(cwd, 'notes.txt', 'my_notes', new Set());
    return getNode('/home/user/my_notes/notes.txt').content;
  }, 'copy me'],
]);

section('cp: copy to new name', [
  ['creates file at dest when dest is new name', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    commands.cp(cwd, 'notes.txt', 'copy.txt', new Set());
    return getNode('/home/user/copy.txt') !== null;
  }, true],
  ['source unchanged when dest is new name', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    commands.cp(cwd, 'notes.txt', 'copy.txt', new Set());
    return getNode('/home/user/notes.txt') !== null;
  }, true],
  ['content matches when dest is new name', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'secret');
    commands.cp(cwd, 'notes.txt', 'copy.txt', new Set());
    return getNode('/home/user/copy.txt').content;
  }, 'secret'],
]);

section('cp: overwrite', [
  ['overwrites existing file with new content', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'new');
    addFile('/home/user/existing.txt', 'old');
    commands.cp(cwd, 'notes.txt', 'existing.txt', new Set());
    return getNode('/home/user/existing.txt').content;
  }, 'new'],
]);

section('cp: trailing slash semantics', [
  ['trailing slash on nonexistent dir errors', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    const r = commands.cp(cwd, 'notes.txt', 'folder1/', new Set());
    return r.error;
  }, "cp: cannot create regular file 'folder1/': No such file or directory"],
  ['does not create file named folder1 on error', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    commands.cp(cwd, 'notes.txt', 'folder1/', new Set());
    return getNode('/home/user/folder1') === null;
  }, true],
  ['trailing slash on existing file errors', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addFile('/home/user/existing.txt', 'old');
    const r = commands.cp(cwd, 'notes.txt', 'existing.txt/', new Set());
    return r.error;
  }, "cp: cannot create regular file 'existing.txt/': Not a directory"],
  ['preserves original file on trailing-slash error', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    addFile('/home/user/existing.txt', 'old');
    commands.cp(cwd, 'notes.txt', 'existing.txt/', new Set());
    return getNode('/home/user/existing.txt').content;
  }, 'old'],
]);

section('cp: error paths', [
  ['source does not exist', function() {
    const cwd = setupFS();
    addDir('/home/user/my_notes');
    const r = commands.cp(cwd, 'ghost.txt', 'my_notes', new Set());
    return r.error;
  }, "cp: cannot stat 'ghost.txt': No such file or directory"],
  ['destination parent not found', function() {
    const cwd = setupFS();
    addFile('/home/user/notes.txt', 'hello');
    const r = commands.cp(cwd, 'notes.txt', 'nowhere/dest.txt', new Set());
    return r.error;
  }, "cp: destination directory not found"],
]);

section('cp: recursive', [
  ['copies directory with -r flag', function() {
    const cwd = setupFS();
    addDir('/home/user/project');
    addFile('/home/user/project/readme.txt', 'README');
    const r = commands.cp(cwd, 'project', 'proj_backup', new Set(['-r']));
    return !r.error &&
      getNode('/home/user/project') !== null &&
      getNode('/home/user/proj_backup') !== null &&
      getNode('/home/user/proj_backup').type === 'dir' &&
      getNode('/home/user/proj_backup/readme.txt') !== null;
  }, true],
  ['refuses directory copy without -r', function() {
    const cwd = setupFS();
    addDir('/home/user/project');
    const r = commands.cp(cwd, 'project', 'proj_backup', new Set());
    return r.error;
  }, "cp: -r not specified; omitting directory 'project'"],
]);

printSummary();
process.exit(wasSuccess() ? 0 : 1);
