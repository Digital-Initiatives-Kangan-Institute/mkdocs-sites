/* lib/commands.js — pure command implementations used by app.js and tests
 *
 * Each function returns a structured result object. The caller (app.js)
 * is responsible for formatting output, managing editor state, etc.
 *
 * Works in both browser (globals from vfs.js) and Node.js (require).
 */

(function(global) {
  'use strict';

  // ── Resolve VFS dependencies ──────────────────────────────────────
  var normPath, getNode, resolvePath, makeNode;

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js — tests
    var vfs = require('./vfs');
    normPath  = vfs.normPath;
    getNode   = vfs.getNode;
    resolvePath = vfs.resolvePath;
    makeNode  = vfs.makeNode;
  } else {
    // Browser — globals from lib/vfs.js
    normPath  = global.normPath;
    getNode   = global.getNode;
    resolvePath = global.resolvePath;
    makeNode  = global.makeNode;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  rm       — remove files or directories
  // ═══════════════════════════════════════════════════════════════════
  function rm(cwd, ops, flags) {
    var errs = [], removed = [];
    var rec = flags.has('-r') || flags.has('-R') || flags.has('--recursive') || flags.has('-f');
    ops.forEach(function(f) {
      var rp = resolvePath(cwd, f);
      var rn = getNode(rp);
      if (!rn) {
        if (!flags.has('-f')) errs.push("rm: cannot remove '" + f + "': No such file or directory");
        return;
      }
      if (rn.type === 'dir' && !rec) {
        errs.push("rm: cannot remove '" + f + "': Is a directory");
        return;
      }
      var rpar = getNode(normPath(rp + '/..'));
      delete rpar.children[rp.split('/').pop()];
      removed.push({ name: f, path: rp });
    });
    return { errs: errs, removed: removed };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  rmdir    — remove empty directories
  // ═══════════════════════════════════════════════════════════════════
  function rmdir(cwd, ops, flags) {
    var errs = [], removed = [];
    ops.forEach(function(f) {
      var rp = resolvePath(cwd, f);
      var rn = getNode(rp);
      if (!rn) {
        errs.push("rmdir: failed to remove '" + f + "': No such file or directory");
        return;
      }
      if (rn.type !== 'dir') {
        errs.push("rmdir: failed to remove '" + f + "': Not a directory");
        return;
      }
      if (Object.keys(rn.children).length) {
        errs.push("rmdir: failed to remove '" + f + "': Directory not empty");
        return;
      }
      var rpar = getNode(normPath(rp + '/..'));
      delete rpar.children[rp.split('/').pop()];
      removed.push({ name: f, path: rp });
    });
    return { errs: errs, removed: removed };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  mkdir    — create directories
  // ═══════════════════════════════════════════════════════════════════
  function mkdir(cwd, ops, flags) {
    var errs = [], created = [];
    ops.forEach(function(name) {
      var rp = resolvePath(cwd, name);
      var parentPath = normPath(rp + '/..');
      var parent = getNode(parentPath);
      var base = rp.split('/').pop();
      if (!parent || parent.type !== 'dir') {
        errs.push("mkdir: cannot create directory '" + name + "': No such file or directory");
        return;
      }
      if (parent.children[base]) {
        if (!flags.has('-p')) errs.push("mkdir: cannot create directory '" + name + "': File exists");
        return;
      }
      parent.children[base] = makeNode('dir');
      created.push({ name: name, path: rp, base: base });
    });
    return { errs: errs, created: created };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  touch    — create files or update timestamps
  // ═══════════════════════════════════════════════════════════════════
  function touch(cwd, ops) {
    var errs = [], created = [];
    ops.forEach(function(name) {
      var rp = resolvePath(cwd, name);
      var parentPath = normPath(rp + '/..');
      var parent = getNode(parentPath);
      var base = rp.split('/').pop();
      if (!parent || parent.type !== 'dir') {
        errs.push("touch: cannot touch '" + name + "': No such file or directory");
        return;
      }
      if (!parent.children[base]) {
        parent.children[base] = makeNode('file', '');
        created.push({ name: name, path: rp, base: base });
      } else {
        parent.children[base].mtime = new Date();
      }
    });
    return { errs: errs, created: created };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  grep     — search for patterns in text
  // ═══════════════════════════════════════════════════════════════════
  function grep(cwd, pattern, fileOp, flags, pipeInput) {
    var invert    = flags.has('-v');
    var ignoreCase = flags.has('-i');
    var countOnly = flags.has('-c');

    if (!pattern) return { err: 'grep: missing pattern' };

    var lines = [];
    if (pipeInput !== undefined) {
      lines = pipeInput.split('\n');
    } else if (fileOp) {
      var cn = getNode(resolvePath(cwd, fileOp));
      if (!cn) return { err: "grep: " + fileOp + ": No such file or directory" };
      if (cn.type === 'dir') return { err: "grep: " + fileOp + ": Is a directory" };
      lines = (cn.content || '').split('\n');
    } else {
      return { err: 'grep: no input' };
    }

    var re = new RegExp(pattern, ignoreCase ? 'i' : '');
    var matches = [];
    lines.forEach(function(text, idx) {
      if (re.test(text) !== invert) {
        matches.push({ lineNum: idx + 1, text: text });
      }
    });

    if (countOnly) return { count: matches.length };
    return { matches: matches };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  cat      — concatenate files and print
  // ═══════════════════════════════════════════════════════════════════
  function cat(cwd, ops, flags, pipeInput) {
    var errs = [], lines = [];
    var showNums = flags.has('-n');

    if (pipeInput !== undefined) {
      pipeInput.split('\n').forEach(function(l) {
        lines.push({ text: l, lineNum: showNums ? lines.length + 1 : null });
      });
      return { errs: errs, lines: lines };
    }

    ops.forEach(function(fname) {
      var cn = getNode(resolvePath(cwd, fname));
      if (!cn) {
        errs.push("cat: " + fname + ": No such file or directory");
        return;
      }
      if (cn.type === 'dir') {
        errs.push("cat: " + fname + ": Is a directory");
        return;
      }
      if (!cn.content.trim()) {
        lines.push({ text: '(empty file)', lineNum: showNums ? (lines.length + 1) : null });
      } else {
        cn.content.split('\n').forEach(function(l) {
          lines.push({ text: l, lineNum: showNums ? (lines.length + 1) : null });
        });
      }
    });

    return { errs: errs, lines: lines };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  cp       — copy files and directories
  // ═══════════════════════════════════════════════════════════════════
  function cp(cwd, srcOp, destOp, flags) {
    var sp = resolvePath(cwd, srcOp);
    var sn = getNode(sp);
    if (!sn) return { error: "cp: cannot stat '" + srcOp + "': No such file or directory" };

    if (sn.type === 'dir' && !(flags.has('-r') || flags.has('-R') || flags.has('--recursive'))) {
      return { error: "cp: -r not specified; omitting directory '" + srcOp + "'" };
    }

    var dp = resolvePath(cwd, destOp);
    var dNode = getNode(dp);
    var destHasSlash = /\/+$/.test(destOp);
    var dd, destName;

    if (dNode && dNode.type === 'dir') {
      dd = dNode;
      destName = srcOp.replace(/\/+$/, '').split('/').pop();
    } else if (destHasSlash) {
      if (dNode) return { error: "cp: cannot create regular file '" + destOp + "': Not a directory" };
      else return { error: "cp: cannot create regular file '" + destOp + "': No such file or directory" };
    } else {
      dd = getNode(normPath(dp + '/..'));
      destName = dp.split('/').pop();
    }

    if (!dd || dd.type !== 'dir') return { error: 'cp: destination directory not found' };

    dd.children[destName] = JSON.parse(JSON.stringify(sn));
    dd.children[destName].mtime = new Date();
    return { ok: true, destName: destName, destPath: normPath((dNode && dNode.type === 'dir' ? dp : normPath(dp + '/..')) + '/' + destName) };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  mv       — move (rename) files and directories
  // ═══════════════════════════════════════════════════════════════════
  function mv(cwd, srcOp, destOp) {
    var msp = resolvePath(cwd, srcOp);
    var msn = getNode(msp);
    if (!msn) return { error: "mv: cannot stat '" + srcOp + "': No such file or directory" };

    var mdp = resolvePath(cwd, destOp);
    var mdNode = getNode(mdp);
    var destHasSlash = /\/+$/.test(destOp);
    var mdd, destName, newPath;

    if (mdNode && mdNode.type === 'dir') {
      mdd = mdNode;
      destName = srcOp.replace(/\/+$/, '').split('/').pop();
      newPath = normPath(mdp + '/' + destName);
    } else if (destHasSlash) {
      if (mdNode) return { error: "mv: cannot move '" + srcOp + "' to '" + destOp + "': Not a directory" };
      else return { error: "mv: cannot move '" + srcOp + "' to '" + destOp + "': No such file or directory" };
    } else {
      mdd = getNode(normPath(mdp + '/..'));
      destName = mdp.split('/').pop();
      newPath = mdp;
    }

    if (!mdd || mdd.type !== 'dir') return { error: 'mv: destination not found' };

    var mpar = getNode(normPath(msp + '/..'));
    mdd.children[destName] = JSON.parse(JSON.stringify(msn));
    mdd.children[destName].mtime = new Date();
    delete mpar.children[msp.split('/').pop()];
    return { newPath: newPath, destName: destName };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  EXPORT
  // ═══════════════════════════════════════════════════════════════════
  var commands = {
    rm: rm,
    rmdir: rmdir,
    mkdir: mkdir,
    touch: touch,
    grep: grep,
    cat: cat,
    cp: cp,
    mv: mv,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = commands;
  } else {
    global.commands = commands;
  }

})(typeof window !== 'undefined' ? window : global);
