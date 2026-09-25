/* lib/test.js — shared test-runner library for Node.js test suites */

const { VFS, normPath, getNode, resolvePath, makeNode, HOME } = require('./vfs');

// ── Test-runner factory ──────────────────────────────────────────

function createTestRunner() {
  let pass = 0, fail = 0;
  const sections = [];

  function assert(label, got, want) {
    const g = JSON.stringify(got), w = JSON.stringify(want);
    if (g === w) {
      pass++;
      if (sections.length) sections[sections.length - 1].pass++;
      console.log('  \x1b[32m✓\x1b[0m \x1b[2m' + label + '\x1b[0m');
    } else {
      fail++;
      if (sections.length) sections[sections.length - 1].fail++;
      console.error('  \x1b[31m✗\x1b[0m \x1b[1m' + label + '\x1b[0m\n    \x1b[90mgot:\x1b[0m      \x1b[31m' + g + '\x1b[0m\n    \x1b[90mexpected:\x1b[0m \x1b[32m' + w + '\x1b[0m');
    }
  }

  function section(name, tests) {
    sections.push({ name: name, pass: 0, fail: 0 });
    console.log('\n  \x1b[36m\x1b[1m' + name + '\x1b[0m');
    tests.forEach(function (t) {
      const got = typeof t[1] === 'function' ? t[1]() : t[1];
      assert(name + ': ' + t[0], got, t[2]);
    });
  }

  function printSummary() {
    var tp = 0, tf = 0;
    console.log('');
    console.log('  \x1b[1mTest Summary\x1b[0m');
    console.log('  \x1b[2m───────────────────────────────────────────────\x1b[0m');
    sections.forEach(function (s) {
      var mark = s.fail === 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
      var counts = '  \x1b[32m' + s.pass + ' passed\x1b[0m' + (s.fail > 0 ? '  \x1b[31m' + s.fail + ' failed\x1b[0m' : '');
      console.log('  ' + mark + ' \x1b[1m' + s.name + '\x1b[0m' + counts);
      tp += s.pass; tf += s.fail;
    });
    console.log('  \x1b[2m───────────────────────────────────────────────\x1b[0m');
    if (tf === 0) console.log('  \x1b[32m\x1b[1m' + tp + ' passed\x1b[0m');
    else console.log('  \x1b[32m' + tp + ' passed\x1b[0m  \x1b[31m\x1b[1m' + tf + ' failed\x1b[0m');
    console.log('');
  }

  function wasSuccess() { return fail === 0; }

  return { assert, section, printSummary, wasSuccess };
}

// ── VFS test helpers ─────────────────────────────────────────────

function setupFS() {
  for (const k of Object.keys(VFS)) delete VFS[k];
  VFS['/'] = makeNode('dir');
  VFS['/'].children['home'] = makeNode('dir');
  VFS['/'].children['home'].children['user'] = makeNode('dir');
  return HOME;
}

function addFile(path, content) {
  content = content || '';
  const parentPath = normPath(path + '/..');
  const name = path.split('/').pop();
  const parent = getNode(parentPath);
  if (!parent || parent.type !== 'dir') throw new Error('Parent not found: ' + parentPath);
  parent.children[name] = makeNode('file', content);
}

function addDir(path) {
  const parentPath = normPath(path + '/..');
  const name = path.split('/').pop();
  const parent = getNode(parentPath);
  if (!parent || parent.type !== 'dir') throw new Error('Parent not found: ' + parentPath);
  parent.children[name] = makeNode('dir');
}

module.exports = { createTestRunner, setupFS, addFile, addDir };
