/* ═══════════════════════════
   USER
═══════════════════════════ */
let USERNAME = '';
const IS_MAC=/Mac|iPod|iPhone|iPad/.test(navigator.platform);
const MOD_KEY=IS_MAC?'⌘':'^';
const nanoModKey=e=>IS_MAC?e.metaKey:e.ctrlKey;

/* ═══════════════════════════
   VFS (created after username is set)
═══════════════════════════ */
function createVFS() {
  VFS['/'] = {
    type:'dir', mtime: new Date('2025-01-15T10:30:00'), size:4096,
    children:{
      'bin':    {type:'dir', mtime:new Date('2025-01-01T00:00:00'),size:4096,children:{
        'ls':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:134216,content:''},
        'cat':   {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:35280,content:''},
        'grep':  {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:51768,content:''},
        'echo':  {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:31176,content:''},
        'mkdir': {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:37160,content:''},
        'rm':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:72920,content:''},
        'cp':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:150984,content:''},
        'mv':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:141944,content:''},
        'nano':  {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:282072,content:''},
        'pwd':   {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:31176,content:''},
      }},
      'etc':    {type:'dir', mtime:new Date('2025-01-10T08:00:00'),size:4096,children:{
        'passwd':   {type:'file',mtime:new Date('2025-01-10T08:00:00'),size:2847,content:'root:nicetry:0:0:root:/root:/bin/bash\ndaemon:nicetry:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:nicetry:2:2:bin:/bin:/usr/sbin/nologin\nsys:nicetry:3:3:sys:/dev:/usr/sbin/nologin\nsync:nicetry:4:65534:sync:/bin:/bin/sync\nnobody:nicetry:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\nsystemd-network:nicetry:100:102:systemd-network,,,:/run/systemd/netif:/usr/sbin/nologin\nsystemd-resolve:nicetry:101:103:systemd-resolve,,,:/run/systemd/resolve:/usr/sbin/nologin\nsyslog:nicetry:104:108::/home/syslog:/usr/sbin/nologin\nmessagebus:nicetry:105:109::/nonexistent:/usr/sbin/nologin\n_apt:nicetry:106:65534::/nonexistent:/usr/sbin/nologin\n'+USERNAME+':nicetry:1000:1000:'+USERNAME+',,,:/home/'+USERNAME+':/bin/bash\n'},
        'hostname': {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:9,content:'linux-learn\n'},
        'hosts':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:243,content:'127.0.0.1\tlocalhost\n127.0.1.1\tlinux-learn\n\n# The following lines are desirable for IPv6 capable hosts\n::1     ip6-localhost ip6-loopback\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters\n'},
        'os-release':{type:'file',mtime:new Date('2025-01-01T00:00:00'),size:214,content:'NAME="Penguinix"\nVERSION="24.04 LTS (Curious Coral)"\nID=penguinix\nID_LIKE=debian\nPRETTY_NAME="Penguinix 24.04 LTS"\nVERSION_ID="24.04"\nHOME_URL="https://www.penguinix.org/"\n'},
        'fstab':    {type:'file',mtime:new Date('2025-01-01T00:00:00'),size:615,content:'# /etc/fstab: static file system information.\n# <file system> <mount point>   <type>  <options>       <dump>  <pass>\nUUID=abcd-1234  /               ext4    errors=remount-ro 0       1\nUUID=efgh-5678  /boot           ext4    defaults        0       2\n/dev/sda0  none            swap    sw              0       0\n'},
        'resolv.conf':{type:'file',mtime:new Date('2025-01-01T00:00:00'),size:114,content:'# Dynamic resolv.conf(5) file for glibc resolver\nnameserver 127.0.0.53\noptions edns0\nsearch localdomain\n'},
      }},
      'home':   {type:'dir', mtime:new Date('2025-01-15T10:30:00'),size:4096,children:{}},
      'tmp':    {type:'dir', mtime:new Date('2025-01-15T00:00:00'),size:4096,children:{
        '.X11-unix': {type:'dir',mtime:new Date('2025-01-15T00:00:00'),size:4096,children:{}},
      }},
      'usr':    {type:'dir', mtime:new Date('2025-01-01T00:00:00'),size:4096,children:{
        'bin': {type:'dir',mtime:new Date('2025-01-01T00:00:00'),size:4096,children:{}},
        'lib': {type:'dir',mtime:new Date('2025-01-01T00:00:00'),size:4096,children:{}},
        'share':{type:'dir',mtime:new Date('2025-01-01T00:00:00'),size:4096,children:{}},
      }},
      'var':    {type:'dir', mtime:new Date('2025-01-10T08:00:00'),size:4096,children:{
        'log': {type:'dir',mtime:new Date('2025-01-15T08:00:00'),size:4096,children:{
          'syslog':  {type:'file',mtime:new Date('2025-01-15T08:00:00'),size:4382,content:'Jan 15 08:00:01 linux-learn systemd[1]: Starting Daily apt activities...\nJan 15 08:00:02 linux-learn systemd[1]: Finished Daily apt activities.\nJan 15 07:30:00 linux-learn systemd[1]: Starting Clean Temporary Directories...\nJan 15 07:30:01 linux-learn systemd[1]: Finished Clean Temporary Directories.\n'},
          'auth.log': {type:'file',mtime:new Date('2025-01-15T09:15:00'),size:1204,content:'Jan 15 09:14:22 linux-learn sshd[1234]: Accepted publickey for '+USERNAME+' from 192.168.1.100 port 52432 ssh2\nJan 15 09:14:22 linux-learn sshd[1234]: pam_unix(sshd:session): session opened for user '+USERNAME+'(uid=1000)\nJan 15 09:15:01 linux-learn CRON[5678]: pam_unix(cron:session): session opened for user root(uid=0)\n'},
          'dpkg.log': {type:'file',mtime:new Date('2025-01-14T16:30:00'),size:512,content:'2025-01-14 16:30:01 upgrade bash:amd64 5.1-6penguinix1.1 5.1-6penguinix1.2\n2025-01-14 16:30:02 status unpacked bash:amd64 5.1-6penguinix1.2\n2025-01-14 16:30:02 status half-configured bash:amd64 5.1-6penguinix1.2\n'},
        }},
      }},
    }
  };
  VFS[HOME] = {
    type:'dir', mtime: new Date('2025-01-15T10:30:00'), size:4096,
    children:{
      '.hidden':    {type:'file',mtime:new Date('2025-01-15T09:00:00'),size:0,content:''},
      'Desktop':    {type:'dir', mtime:new Date('2025-01-10T08:00:00'),size:4096,children:{}},
      'Downloads':  {type:'dir', mtime:new Date('2025-01-12T14:22:00'),size:4096,children:{}},
      'Documents':  {type:'dir', mtime:new Date('2025-01-14T11:00:00'),size:4096,children:{}},
      'readme.txt': {type:'file',mtime:new Date('2025-01-15T10:30:00'),size:128,content:'Welcome to Linux!\nThis is your home directory.\n\nTry these commands:\n  ls        list files\n  ls -a     show hidden files\n  ls -l     show detailed list\n  ls -la    both combined\n  mkdir     create a folder\n  touch     create a file\n  nano      edit a file\n'}
    }
  };
  // link home dir under /home
  const userDir=HOME.split('/').pop();
  VFS['/'].children['home'].children[userDir]=VFS[HOME];
}

/* ═══════════════════════════
   VFS PERSISTENCE (localStorage)
═══════════════════════════ */
function saveVFS(){
  try{localStorage.setItem('linux-vfs',JSON.stringify(serializeNode(VFS['/'])));}catch(e){}
}
function loadVFS(){
  try{
    const raw=localStorage.getItem('linux-vfs');
    if(raw){VFS['/']=deserializeNode(JSON.parse(raw));return true;}
  }catch(e){}
  return false;
}
function saveHistory(){
  try{
    localStorage.setItem('linux-cmdHistory-'+USERNAME,JSON.stringify(S.cmdHistory));
    localStorage.setItem('linux-termHistory-'+USERNAME,JSON.stringify(S.termHistory));
  }catch(e){}
}
function loadHistory(){
  try{
    const cmd=localStorage.getItem('linux-cmdHistory-'+USERNAME);
    const term=localStorage.getItem('linux-termHistory-'+USERNAME);
    S.cmdHistory=cmd?JSON.parse(cmd):[];
    S.termHistory=term?JSON.parse(term):[];
  }catch(e){}
}

function dispPath(p){return p.replace(HOME,'~')}
function isHidden(n){return n.startsWith('.')}

/* ═══════════════════════════
   STATE
═══════════════════════════ */
const S={
  cwd:'',
  cmdHistory:[], histIdx:-1,
  editorFile:null, editorContent:null,
  nanoMode:false, nanoFilePath:null, nanoOriginal:'',
  acItems:[], acIdx:-1,
  termHistory:[],
  pendingConfirm:null,
};

/* ═══════════════════════════
   DOM
═══════════════════════════ */
const $out       =document.getElementById('term-output');
const $input     =document.getElementById('term-input');
const $prompt    =document.getElementById('input-prompt');
const $ac        =document.getElementById('autocomplete');
const $shellView =document.getElementById('shell-view');
const $nanoView  =document.getElementById('nano-view');
const $nanoTA    =document.getElementById('nano-textarea');
const $nanoGut   =document.getElementById('nano-gutters');
const $nanoFname =document.getElementById('nano-filename');
const $nanoMod   =document.getElementById('nano-modified');
const $nanoMsg   =document.getElementById('nano-status-msg');
const $nanoPos   =document.getElementById('nano-pos');
const $nanoSP    =document.getElementById('nano-save-prompt');
const $termLabel =document.getElementById('term-title-label');
const $guiPath   =document.getElementById('gui-path-bar');
const $guiContent=document.getElementById('gui-content');
const $guiIcon   =document.getElementById('gui-pane-icon');
const $guiLabel  =document.getElementById('gui-pane-label');
const $sCnt      =document.getElementById('status-count');
const $sInfo     =document.getElementById('status-info');

const $tPane     =document.getElementById('terminal-pane');
const $tWindow   =document.getElementById('terminal-window');
const $main      =document.getElementById('main');

// Update save prompt key label for macOS
document.getElementById('nsp-cancel').textContent=MOD_KEY+'C Cancel';

/* ═══════════════════════════
   COMMAND HELP DATA
═══════════════════════════ */
const CMD_HELP={
  ls:{
    synopsis:'ls [OPTION]... [FILE]...',
    short:'List directory contents.',
    desc:'List information about FILEs (the current directory by default). Entries starting with . are hidden unless -a is used.',
    opts:[
      {f:'-a, --all',       d:'do not ignore entries starting with .'},
      {f:'-l',              d:'use a long listing format (permissions, size, date)'},
      {f:'-h, --human-readable',d:'with -l, print sizes like 1K, 234M, 2G'},
      {f:'-r, --reverse',   d:'reverse order while sorting'},
      {f:'-t',              d:'sort by modification time, newest first'},
      {f:'--help',          d:'display this help and exit'},
    ],
    example:'ls -la\nls -lh Documents/'
  },
  cd:{
    synopsis:'cd [DIR]',
    short:'Change the shell working directory.',
    desc:'Change the current working directory to DIR. The default DIR is the home directory (~).',
    opts:[
      {f:'DIR',   d:'directory to change into'},
      {f:'..',    d:'go up one level to the parent directory'},
      {f:'~',     d:'go to your home directory ($HOME)'},
      {f:'-',     d:'go to the previous directory'},
      {f:'--help',d:'display this help and exit'},
    ],
    example:'cd Documents\ncd ..\ncd ~'
  },
  pwd:{
    synopsis:'pwd [OPTION]...',
    short:'Print the current working directory.',
    desc:'Print the full filename of the current working directory.',
    opts:[
      {f:'-L',     d:'use PWD from environment, even if it contains symlinks'},
      {f:'-P',     d:'avoid all symlinks (print physical directory)'},
      {f:'--help', d:'display this help and exit'},
    ]
  },
  mkdir:{
    synopsis:'mkdir [OPTION]... DIRECTORY...',
    short:'Create directories.',
    desc:'Create the DIRECTORY(ies), if they do not already exist.',
    opts:[
      {f:'-p, --parents', d:'no error if existing, make parent dirs as needed'},
      {f:'-v, --verbose', d:'print a message for each created directory'},
      {f:'--help',        d:'display this help and exit'},
    ],
    example:'mkdir projects\nmkdir -p a/b/c'
  },
  touch:{
    synopsis:'touch [OPTION]... FILE...',
    short:'Create files or update timestamps.',
    desc:'Update the access and modification times of each FILE to the current time. A FILE argument that does not exist is created empty.',
    opts:[
      {f:'-a',        d:'change only the access time'},
      {f:'-m',        d:'change only the modification time'},
      {f:'-t STAMP',  d:'use [[CC]YY]MMDDhhmm[.ss] instead of current time'},
      {f:'--help',    d:'display this help and exit'},
    ],
    example:'touch notes.txt\ntouch file1.txt file2.txt'
  },
  nano:{
    synopsis:'nano [OPTION]... [FILE]...',
    short:'A small and friendly text editor.',
    desc:'nano is a small and friendly text editor. Edit files directly in the terminal. Changes are reflected live in the preview pane.',
    opts:[
      {f:'-l, --linenumbers', d:'show line numbers in front of the text'},
      {f:'-v, --view',        d:'view file (read-only mode)'},
      {f:'--help',            d:'display this help and exit'},
    ],
    example:'nano notes.txt\nnano .bashrc',
    keys:[MOD_KEY+'O  Write Out (save)',MOD_KEY+'X  Exit',MOD_KEY+'K  Cut current line',MOD_KEY+'U  Paste',MOD_KEY+'W  Search',MOD_KEY+'G  Display help',MOD_KEY+'C  Show cursor position']
  },
  cat:{
    synopsis:'cat [OPTION]... [FILE]...',
    short:'Concatenate files and print to standard output.',
    desc:'Concatenate FILE(s) to standard output. With no FILE, or when FILE is -, read standard input.',
    opts:[
      {f:'-n, --number',          d:'number all output lines'},
      {f:'-b, --number-nonblank', d:'number nonempty output lines, overrides -n'},
      {f:'-s, --squeeze-blank',   d:'suppress repeated empty output lines'},
      {f:'--help',                d:'display this help and exit'},
    ],
    example:'cat readme.txt\ncat file1.txt file2.txt'
  },
  cp:{
    synopsis:'cp [OPTION]... SOURCE DEST',
    short:'Copy files and directories.',
    desc:'Copy SOURCE to DEST, or multiple SOURCE(s) to DIRECTORY.',
    opts:[
      {f:'-r, -R, --recursive', d:'copy directories recursively'},
      {f:'-v, --verbose',       d:'explain what is being done'},
      {f:'-i, --interactive',   d:'prompt before overwrite'},
      {f:'-p, --preserve',      d:'preserve file attributes (mode, ownership, timestamps)'},
      {f:'--help',              d:'display this help and exit'},
    ],
    example:'cp notes.txt backup.txt\ncp -r Documents/ Backup/'
  },
  mv:{
    synopsis:'mv [OPTION]... SOURCE DEST',
    short:'Move (rename) files.',
    desc:'Rename SOURCE to DEST, or move SOURCE(s) to DIRECTORY.',
    opts:[
      {f:'-v, --verbose',      d:'explain what is being done'},
      {f:'-i, --interactive',  d:'prompt before overwrite'},
      {f:'-n, --no-clobber',   d:'do not overwrite an existing file'},
      {f:'--help',             d:'display this help and exit'},
    ],
    example:'mv old.txt new.txt\nmv file.txt Documents/'
  },
  rm:{
    synopsis:'rm [OPTION]... [FILE]...',
    short:'Remove files or directories.',
    desc:'Remove (unlink) the FILE(s). There is NO recycle bin — deletion is permanent and immediate.',
    opts:[
      {f:'-r, -R, --recursive', d:'remove directories and their contents recursively'},
      {f:'-f, --force',         d:'ignore nonexistent files and arguments, never prompt'},
      {f:'-i',                  d:'prompt before every removal'},
      {f:'-v, --verbose',       d:'explain what is being done'},
      {f:'--help',              d:'display this help and exit'},
    ],
    example:'rm notes.txt\nrm -rf old-project/'
  },
  rmdir:{
    synopsis:'rmdir [OPTION]... DIRECTORY...',
    short:'Remove empty directories.',
    desc:'Remove the DIRECTORY(ies), if they are empty. Use rm -r for non-empty directories.',
    opts:[
      {f:'-p, --parents', d:'remove DIRECTORY and its ancestors if they become empty'},
      {f:'-v, --verbose', d:'output a diagnostic for every directory processed'},
      {f:'--help',        d:'display this help and exit'},
    ],
    example:'rmdir empty-folder'
  },
  echo:{
    synopsis:'echo [OPTION]... [STRING]...',
    short:'Display a line of text.',
    desc:'Echo the STRING(s) to standard output. Use > to write to a file (overwrites) or >> to append to a file.',
    opts:[
      {f:'-n', d:'do not output the trailing newline'},
      {f:'-e', d:'enable interpretation of backslash escapes (\\n, \\t, etc.)'},
      {f:'-E', d:'disable interpretation of backslash escapes (default)'},
      {f:'--help', d:'display this help and exit'},
    ],
    example:'echo "Hello, World!"\necho "line" > file.txt\necho "more" >> file.txt'
  },
  clear:{
    synopsis:'clear',
    short:'Clear the terminal screen.',
    desc:'Clear the terminal screen. The terminal history is not deleted, only the visual display is cleared.',
    opts:[{f:'--help',d:'display this help and exit'}]
  },
  whoami:{
    synopsis:'whoami [OPTION]...',
    short:'Print the effective username.',
    desc:'Print the user name associated with the current effective user ID.',
    opts:[{f:'--help',d:'display this help and exit'}]
  },
  date:{
    synopsis:'date [OPTION]... [+FORMAT]',
    short:'Print or set the system date and time.',
    desc:'Display the current time in the given FORMAT, or set the system date. FORMAT is a string preceded by +.',
    opts:[
      {f:'+FORMAT',    d:'output date in FORMAT (e.g. +"%Y-%m-%d %H:%M:%S")'},
      {f:'-u, --utc',  d:'print or set Coordinated Universal Time (UTC)'},
      {f:'--help',     d:'display this help and exit'},
    ],
    example:'date\ndate +"%Y-%m-%d"\ndate +"%H:%M:%S"'
  },
  man:{
    synopsis:'man COMMAND',
    short:'An interface to the system reference manuals.',
    desc:'Display the manual page for COMMAND. Manual pages provide full documentation including all options and examples.',
    opts:[
      {f:'COMMAND', d:'the command to display the manual for'},
      {f:'--help',  d:'display this help and exit'},
    ],
    example:'man ls\nman echo'
  },
  help:{
    synopsis:'help [COMMAND]',
    short:'Display information about built-in commands.',
    desc:'Show a summary of all available commands. If COMMAND is given, show its full help page. You can also use "command --help".',
    opts:[{f:'COMMAND',d:'show help for this specific command'},{f:'--help',d:'display this help and exit'}],
    example:'help\nhelp ls\nls --help'
  },
  grep:{
    synopsis:'grep [OPTION]... PATTERN [FILE]',
    short:'Search for patterns in text.',
    desc:'Search input lines for matches to PATTERN. Can read from a file or from piped input (command | grep PATTERN).',
    opts:[
      {f:'-i, --ignore-case', d:'ignore case distinctions'},
      {f:'-v, --invert-match',d:'select non-matching lines'},
      {f:'-c, --count',       d:'print only a count of matching lines'},
      {f:'-n, --line-number', d:'prefix each line with its line number'},
      {f:'--help',            d:'display this help and exit'},
    ],
    example:'cat file.txt | grep hello\ngrep -i world notes.txt\necho -e "a\\nb\\nc" | grep b'
  },
  challenge:{
    synopsis:'challenge <subcommand> [args]',
    short:'Interact with challenges from the terminal.',
    desc:'Start, list, check, and manage challenges directly from the command line.',
    opts:[
      {f:'list',              d:'list all challenges'},
      {f:'start <id>',        d:'start a challenge by ID'},
      {f:'status',            d:'show active challenge progress'},
      {f:'tip',               d:'show tip for current step'},
      {f:'abandon',           d:'abandon the active challenge'},
      {f:'reset',             d:'reset all challenge progress'},
    ],
    example:'challenge list\nchallenge start getting-started\nchallenge status\nchallenge tip\nchallenge abandon'
  },
  export:{
    synopsis:'export <format>',
    short:'Export terminal history to a file.',
    desc:'Export the terminal session history. Supported formats: txt (downloads a .txt file) and pdf (opens a print preview in a new tab).',
    opts:[
      {f:'txt', d:'download history as a plain text file'},
      {f:'pdf', d:'open a styled print preview (save as PDF from the print dialog)'},
    ],
    example:'export txt\nexport pdf'
  },
};

const ALL_CMDS=Object.keys(CMD_HELP);

/* ═══════════════════════════
   HELP PAGE RENDERER
═══════════════════════════ */
function printHelpPage(cmdName){
  const h=CMD_HELP[cmdName];
  if(!h){addLine(`<span class="t-err">No help entry for '${esc(cmdName)}'.</span>`);return;}
  const HR='<span class="t-muted" style="opacity:.4">──────────────────────────────────────────</span>';
  addLine(HR);
  // Header: command name + short description
  addLine(`<span class="t-synopsis" style="font-weight:700;font-size:14px">${esc(cmdName)}</span>  <span class="t-out">${esc(h.short)}</span>`);
  addLine('');
  // Synopsis
  addLine(`<span class="t-section">USAGE</span>`);
  addLine(`<span class="t-out">  <span class="t-synopsis">${esc(h.synopsis)}</span></span>`);
  addLine('');
  // Description
  addLine(`<span class="t-section">DESCRIPTION</span>`);
  addLine(`<span class="t-out">  ${esc(h.desc)}</span>`);
  addLine('');
  // Options
  if(h.opts&&h.opts.length){
    addLine(`<span class="t-section">OPTIONS</span>`);
    h.opts.forEach(({f,d})=>{
      const pad=' '.repeat(Math.max(1,26-f.length));
      addLine(`<span class="t-out">  <span class="t-flag">${esc(f)}</span><span style="opacity:.3">${pad.replace(/ /g,'·')}</span> ${esc(d)}</span>`);
    });
    addLine('');
  }
  // Examples
  if(h.example){
    addLine(`<span class="t-section">EXAMPLES</span>`);
    h.example.split('\n').forEach(ex=>addLine(`<span class="t-out">  <span class="t-synopsis">$ ${esc(ex)}</span></span>`));
    addLine('');
  }
  // Key bindings for nano
  if(h.keys){
    addLine(`<span class="t-section">KEY BINDINGS</span>`);
    h.keys.forEach(k=>addLine(`<span class="t-out">  <span class="t-key">${esc(k)}</span></span>`));
    addLine('');
  }
  addLine(HR);
}

/* ═══════════════════════════
   CHALLENGES
═══════════════════════════ */
function _mkfile(p,c){const rp=normPath(p);const dir=getNode(normPath(rp+'/..'));if(dir&&dir.type==='dir'){dir.children[rp.split('/').pop()]=makeNode('file',c||'');}}
function _mkdir(p){const rp=normPath(p);const dir=getNode(normPath(rp+'/..'));if(dir&&dir.type==='dir'){dir.children[rp.split('/').pop()]=makeNode('dir','');}}

const CHALLENGES=[
  // ── ACTIVITY 1: Getting Started ──
  {id:'getting-started',title:'Getting Started',desc:'Learn the basic commands to find information about your system.',stars:1,setup(){},steps:[
    {desc:'Clear the terminal with <span class="t-key">clear</span>',tip:'The clear command wipes the screen clean. It doesn\'t delete anything — it just removes visual clutter so you can focus.',validate(cmd){return cmd==='clear';}},
    {desc:'Display your username with <span class="t-key">whoami</span>',tip:'whoami tells the system to identify the current user. Every Linux user has a unique username.',validate(cmd){return cmd==='whoami';}},
    {desc:'Display the current date with <span class="t-key">date</span>',tip:'The date command reads the system clock and prints the current date and time — useful for logging when things happened.',validate(cmd){return cmd==='date';}},
    {desc:'Show your location with <span class="t-key">pwd</span>',tip:'pwd stands for "print working directory". It shows exactly where you are in the file system right now.',validate(cmd){return cmd==='pwd';}},
    {desc:'List directory contents with <span class="t-key">ls</span>',tip:'ls lists what\'s inside the current directory — files, folders, and hidden items. It\'s one of the most used commands.',validate(cmd){return cmd==='ls';}},
    {desc:'View available commands with <span class="t-key">help</span>',tip:'help shows you what commands are available and how to use them. Always a good starting point.',validate(cmd){return cmd==='help';}},
  ]},

  // ── ACTIVITY 2: Create Your Workspace ──
  {id:'create-workspace',title:'Create Your Workspace',desc:'Create your first folder and navigate through it.',stars:1,clearVFS:true,setup(){
    _mkdir(`/home/${USERNAME}/workspace`);
  },steps:[
    {desc:'Enter the workspace folder: <span class="t-key">cd workspace</span>',tip:'cd (change directory) moves you into a folder. Think of it as walking through a door into another room.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Confirm your location with <span class="t-key">pwd</span>',tip:'pwd confirms where you are. After using cd, it\'s good practice to verify you ended up in the right place.',validate(cmd,_,__,___,ctx){return cmd==='pwd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'View the contents with <span class="t-key">ls</span>',tip:'Now that you\'re inside the workspace folder, ls will show you what\'s inside it.',validate(cmd){return cmd==='ls';}},
    {desc:'Return to your home directory with <span class="t-key">cd</span>',tip:'Running cd with no arguments takes you straight back to your home directory — a handy shortcut.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── ACTIVITY 3: Folder Structure ──
  {id:'folder-structure',title:'Folder Structure',desc:'Learn how folders can be organised.',stars:1,clearVFS:true,setup(){
    _mkdir(`/home/${USERNAME}/workspace`);
  },steps:[
    {desc:'Navigate into workspace: <span class="t-key">cd workspace</span>',tip:'First, move into the workspace where you\'ll be building your folder structure.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create a <span class="t-key">documents</span> folder',tip:'mkdir (make directory) creates a new empty folder. This one will hold your documents.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'Create a <span class="t-key">projects</span> folder',tip:'Each folder you create helps organize files by purpose — projects will hold your work files.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'Create a <span class="t-key">downloads</span> folder',tip:'A downloads folder is where you\'d typically store files you\'ve retrieved from elsewhere.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'Create an <span class="t-key">archive</span> folder',tip:'An archive folder is for completed or old files you want to keep but not actively use.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'List contents with <span class="t-key">ls</span> to confirm all four folders exist',tip:'After creating several folders, ls lets you verify they all exist and are named correctly.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace'));return d&&d.children['documents']&&d.children['projects']&&d.children['downloads']&&d.children['archive'];}},
  ]},

  // ── ACTIVITY 4: First Documents ──
  {id:'first-documents',title:'First Documents',desc:'Create files inside your workspace.',stars:1,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
  },steps:[
    {desc:'Navigate to workspace: <span class="t-key">cd workspace</span>',tip:'Move into your workspace to start creating files.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Enter documents: <span class="t-key">cd documents</span>',tip:'Navigate into the documents folder where you\'ll create your first files.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/documents');}},
    {desc:'Create <span class="t-key">notes.txt</span>',tip:'touch creates a new empty file. Unlike mkdir which makes folders, touch makes files.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'Create <span class="t-key">tasks.txt</span>',tip:'You can create as many files as you need — each one is an empty container ready for content.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'Create <span class="t-key">ideas.txt</span>',tip:'File names usually have extensions like .txt to indicate what kind of content they hold.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'List contents with <span class="t-key">ls</span> to confirm all three files',tip:'Use ls to check that all three files were created successfully.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/documents'));return d&&d.children['notes.txt']&&d.children['tasks.txt']&&d.children['ideas.txt'];}},
  ]},

  // ── ACTIVITY 5: Edit Files ──
  {id:'edit-files',title:'Add Information To Files',desc:'Learn how to edit and view files.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`);_mkfile(`${w}/documents/tasks.txt`);_mkfile(`${w}/documents/ideas.txt`);
  },steps:[
    {desc:'Navigate to documents: <span class="t-key">cd workspace/documents</span>',tip:'Head into the documents folder where your empty files are waiting.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/documents');}},
    {desc:'Write to notes.txt: <span class="t-key">echo "Linux CLI training notes." > notes.txt</span>',tip:'echo prints text, and > redirects that text into a file. The > symbol means "put this output into that file", overwriting anything already there.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'notes.txt'));return n&&n.content.includes('Linux CLI training');}},
    {desc:'Write to tasks.txt: <span class="t-key">echo "Complete Linux practice activities." > tasks.txt</span>',tip:'The > redirect creates the file if it doesn\'t exist, or completely replaces its contents if it does.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'tasks.txt'));return n&&n.content.includes('Complete Linux');}},
    {desc:'Write to ideas.txt: <span class="t-key">echo "Future project ideas." > ideas.txt</span>',tip:'Each file can hold different content — you\'re building a set of documents with distinct purposes.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'ideas.txt'));return n&&n.content.includes('Future project');}},
    {desc:'View notes.txt with <span class="t-key">cat notes.txt</span>',tip:'cat (concatenate) reads a file and prints its contents to the screen — the quickest way to see what\'s inside.',validate(cmd){return cmd==='cat';}},
    {desc:'Return to workspace with <span class="t-key">cd ..</span>',tip:'cd .. moves you up one level. The .. refers to the parent directory — think of it as "go back one room".',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
  ]},

  // ── ACTIVITY 6: Company Project ──
  {id:'company-project',title:'Create A Company Project',desc:'Create a realistic project folder structure.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/tasks.txt`,'Complete Linux practice activities.');_mkfile(`${w}/documents/ideas.txt`,'Future project ideas.');
  },steps:[
    {desc:'Navigate to workspace: <span class="t-key">cd workspace</span>',tip:'Start from the workspace to build your project structure.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create the project folder: <span class="t-key">mkdir projects/hardware_upgrade</span>',tip:'You can create nested folders in one command — mkdir will build the full path for you.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade'));return n&&n.type==='dir';}},
    {desc:'Create <span class="t-key">documents</span> inside it',tip:'Real projects have sub-folders to keep related files together — documents will hold text files.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade/documents'));return n&&n.type==='dir';}},
    {desc:'Create <span class="t-key">reports</span> inside it',tip:'A reports folder keeps deliverables separate from working documents.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade/reports'));return n&&n.type==='dir';}},
    {desc:'Create <span class="t-key">images</span> inside it',tip:'Images, diagrams, and screenshots often live in their own folder to keep things tidy.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade/images'));return n&&n.type==='dir';}},
    {desc:'List the project folder: <span class="t-key">ls projects/hardware_upgrade</span>',tip:'ls works on any path — you don\'t have to be inside a folder to see what\'s in it.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade'));return d&&d.children['documents']&&d.children['reports']&&d.children['images'];}},
  ]},

  // ── ACTIVITY 7: Project Files ──
  {id:'project-files',title:'Create Project Files',desc:'Create and edit project documents.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/tasks.txt`,'Complete Linux practice activities.');_mkfile(`${w}/documents/ideas.txt`,'Future project ideas.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
  },steps:[
    {desc:'Navigate to the project: <span class="t-key">cd workspace/projects/hardware_upgrade</span>',tip:'Navigate deep into your project structure — this is where the real work happens.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/hardware_upgrade');}},
    {desc:'Create <span class="t-key">equipment_list.txt</span>',tip:'Create a file to track what hardware is needed for this upgrade project.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'Create <span class="t-key">budget.txt</span>',tip:'Every project needs a budget file — this is where you\'ll track costs.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'Create <span class="t-key">meeting_notes.txt</span>',tip:'Meeting notes help you remember decisions and action items from team discussions.',validate(cmd,_,__,op,ctx){if(cmd!=='touch')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='file';}},
    {desc:'Add info: <span class="t-key">echo "Equipment required: Computers, Monitors, Keyboards" > equipment_list.txt</span>',tip:'Use > to write content into the file. The text after echo becomes the file\'s content.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'equipment_list.txt'));return n&&n.content.includes('Computers');}},
    {desc:'Add info: <span class="t-key">echo "Project budget: $5000" > budget.txt</span>',tip:'The > redirect replaces the entire file contents each time — be careful not to overwrite important data.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'budget.txt'));return n&&n.content.includes('5000');}},
    {desc:'Add info: <span class="t-key">echo "Meeting notes: Project planning completed." > meeting_notes.txt</span>',tip:'Now all three files have meaningful content — your project is taking shape.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,'meeting_notes.txt'));return n&&n.content.includes('planning');}},
  ]},

  // ── ACTIVITY 8: Organise Files ──
  {id:'organise-files',title:'Organise Project Files',desc:'Practice moving and renaming files.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/tasks.txt`,'Complete Linux practice activities.');_mkfile(`${w}/documents/ideas.txt`,'Future project ideas.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/equipment_list.txt`,'Equipment required: Computers, Monitors, Keyboards');
    _mkfile(`${p}/budget.txt`,'Project budget: $5000');
    _mkfile(`${p}/meeting_notes.txt`,'Meeting notes: Project planning completed.');
  },steps:[
    {desc:'Navigate to the project: <span class="t-key">cd workspace/projects/hardware_upgrade</span>',tip:'Move into the project folder to start reorganizing files.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/hardware_upgrade');}},
    {desc:'Rename <span class="t-key">budget.txt</span> to <span class="t-key">project_budget.txt</span>',tip:'mv serves double duty — it moves files between folders AND renames them. If the source and destination are in the same folder, it\'s a rename.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move <span class="t-key">meeting_notes.txt</span> into <span class="t-key">reports/</span>',tip:'Moving a file into a folder means the folder becomes the new parent. The file keeps its name but lives in a new location.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/meeting_notes.txt'));return n&&n.type==='file';}},
    {desc:'Move <span class="t-key">equipment_list.txt</span> into <span class="t-key">documents/</span>',tip:'Organizing files into the right folders makes them much easier to find later.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/equipment_list.txt'));return n&&n.type==='file';}},
    {desc:'List contents with <span class="t-key">ls</span> to confirm everything moved',tip:'Always verify after moving files — ls shows you the current state of the folder.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/hardware_upgrade'));return d&&d.children['project_budget.txt']&&!d.children['budget.txt'];}},
  ]},

  // ── ACTIVITY 9: Backup Files ──
  {id:'backup-files',title:'Create Project Backups',desc:'Practice copying files.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/tasks.txt`,'Complete Linux practice activities.');_mkfile(`${w}/documents/ideas.txt`,'Future project ideas.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/project_budget.txt`,'Project budget: $5000');
    _mkfile(`${p}/documents/equipment_list.txt`,'Equipment required: Computers, Monitors, Keyboards');
    _mkfile(`${p}/reports/meeting_notes.txt`,'Meeting notes: Project planning completed.');
  },steps:[
    {desc:'Navigate to the project: <span class="t-key">cd workspace/projects/hardware_upgrade</span>',tip:'Head to the project folder to create backup copies of important files.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/hardware_upgrade');}},
    {desc:'Copy <span class="t-key">project_budget.txt</span> to <span class="t-key">project_budget_backup.txt</span>',tip:'cp (copy) creates an exact duplicate of a file. The original stays untouched while you get a new copy.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Copy <span class="t-key">documents/equipment_list.txt</span> to <span class="t-key">equipment_list_backup.txt</span>',tip:'cp can copy from a sub-folder — the source path doesn\'t have to be in the current directory.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move <span class="t-key">project_budget_backup.txt</span> into <span class="t-key">archive/</span>',tip:'After creating a backup, moving it to an archive folder keeps it safe but out of the way.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/project_budget_backup.txt'));return n&&n.type==='file';}},
    {desc:'Move <span class="t-key">equipment_list_backup.txt</span> into <span class="t-key">archive/</span>',tip:'Backups and archives are different — backups are recent copies, archives are long-term storage.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/equipment_list_backup.txt'));return n&&n.type==='file';}},
    {desc:'List <span class="t-key">ls archive/</span> to confirm backups',tip:'Check that both backups ended up in the archive folder — always verify your work.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/archive'));return d&&d.children['project_budget_backup.txt']&&d.children['equipment_list_backup.txt'];}},
  ]},

  // ── ACTIVITY 10: Review ──
  {id:'review-project',title:'Review Your Project',desc:'Practice navigation across your workspace.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/tasks.txt`,'Complete Linux practice activities.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/project_budget.txt`,'Project budget: $5000');_mkfile(`${p}/documents/equipment_list.txt`,'Equipment required: Computers');
    _mkfile(`${p}/reports/meeting_notes.txt`,'Meeting notes: Project planning completed.');
    _mkfile(`${w}/archive/project_budget_backup.txt`,'Project budget: $5000');
  },steps:[
    {desc:'Go to <span class="t-key">cd workspace/documents</span> and list with <span class="t-key">ls</span>',tip:'Navigate and explore — ls after cd shows you what\'s in each folder.',validate(cmd,_,__,___,ctx){return(cmd==='cd'&&ctx.cwd.endsWith('/documents'))||(cmd==='ls'&&ctx.cwd.endsWith('/documents'));}},
    {desc:'Go to <span class="t-key">cd ../projects</span> and list with <span class="t-key">ls</span>',tip:'.. takes you up one level, then /projects goes into the sibling folder. You\'re weaving through the directory tree.',validate(cmd,_,__,___,ctx){return(cmd==='cd'&&ctx.cwd.endsWith('/projects'))||(cmd==='ls'&&ctx.cwd.endsWith('/projects'));}},
    {desc:'Go to <span class="t-key">cd ../downloads</span> and list with <span class="t-key">ls</span>',tip:'From projects, going up one level and into downloads shows you can navigate sideways through folders.',validate(cmd,_,__,___,ctx){return(cmd==='cd'&&ctx.cwd.endsWith('/downloads'))||(cmd==='ls'&&ctx.cwd.endsWith('/downloads'));}},
    {desc:'Go to <span class="t-key">cd ../archive</span> and list with <span class="t-key">ls</span>',tip:'The archive folder contains your backed-up files from earlier activities.',validate(cmd,_,__,___,ctx){return(cmd==='cd'&&ctx.cwd.endsWith('/archive'))||(cmd==='ls'&&ctx.cwd.endsWith('/archive'));}},
    {desc:'View a file with <span class="t-key">cat</span>',tip:'cat works anywhere — use it to peek at file contents without opening an editor.',validate(cmd){return cmd==='cat';}},
    {desc:'Return home with <span class="t-key">cd</span>',tip:'Running cd alone always takes you home — no matter how deep you are in the file system.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── ACTIVITY 11: Clean Up ──
  {id:'clean-up',title:'Clean Up Old Files',desc:'Practice removing files you no longer need.',stars:2,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/ideas.txt`,'Future project ideas.');
    _mkfile(`${w}/archive/project_budget_backup.txt`,'Project budget: $5000');
  },steps:[
    {desc:'Navigate to documents: <span class="t-key">cd workspace/documents</span>',tip:'Go to the folder containing files you want to remove.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/documents');}},
    {desc:'Remove <span class="t-key">ideas.txt</span>',tip:'rm (remove) deletes a file permanently. There\'s no recycle bin — once it\'s gone, it\'s gone.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'List with <span class="t-key">ls</span> to confirm it is gone',tip:'Always verify after deleting — ls confirms the file is truly removed.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/documents'));return d&&!d.children['ideas.txt'];}},
    {desc:'Go to archive: <span class="t-key">cd ~/workspace/archive</span>',tip:'~ is a shortcut for your home directory. cd ~/workspace/archive jumps there from anywhere.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/archive');}},
    {desc:'Remove <span class="t-key">project_budget_backup.txt</span>',tip:'Old backups you no longer need can be safely deleted to free up space.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'List with <span class="t-key">ls</span> to confirm it is gone',tip:'The archive should now be empty — you\'ve cleaned up successfully.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/archive'));return d&&!d.children['project_budget_backup.txt'];}},
  ]},

  // ── ACTIVITY 12: Second Project ──
  {id:'second-project',title:'Create A Second Project',desc:'Repeat file management skills with a new project.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/project_budget.txt`,'Project budget: $5000');_mkfile(`${p}/documents/equipment_list.txt`,'Equipment required: Computers');
    _mkfile(`${p}/reports/meeting_notes.txt`,'Meeting notes: Planning completed.');
  },steps:[
    {desc:'Navigate to projects: <span class="t-key">cd workspace/projects</span>',tip:'Go to the projects folder where all your project folders live.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/projects');}},
    {desc:'Create the folder structure: <span class="t-key">mkdir -p network_upgrade/documents network_upgrade/reports network_upgrade/backup</span>',tip:'mkdir -p creates multiple folders at once — it\'s a fast way to build an entire folder tree in one command.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/network_upgrade'));return d&&d.children['documents']&&d.children['reports']&&d.children['backup'];}},
    {desc:'Create files: <span class="t-key">touch network_upgrade/network_devices.txt network_upgrade/configuration_notes.txt network_upgrade/upgrade_plan.txt</span>',tip:'touch can create multiple files in one command — just list them one after another.',validate(cmd,_,__,___,ctx){if(cmd!=='touch')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/network_upgrade'));return d&&d.children['network_devices.txt']&&d.children['configuration_notes.txt']&&d.children['upgrade_plan.txt'];}},
    {desc:'Add info: <span class="t-key">echo "Server, Router, Switch" > network_upgrade/network_devices.txt</span>',tip:'You can write to a file using its full path — no need to cd into the folder first.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/network_upgrade/network_devices.txt'));return n&&n.content.includes('Server');}},
    {desc:'Rename a file: <span class="t-key">mv network_upgrade/configuration_notes.txt network_upgrade/config.txt</span>',tip:'Shorter file names are easier to type and less error-prone — rename for convenience.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/network_upgrade/'+op[1]));return n&&n.type==='file';}},
    {desc:'Move a file: <span class="t-key">mv network_upgrade/upgrade_plan.txt network_upgrade/reports/</span>',tip:'Moving files into the right sub-folder keeps the project organized by file type.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/projects/network_upgrade/'+op[1]+'/upgrade_plan.txt'));return n&&n.type==='file';}},
  ]},

  // ── ACTIVITY 13: Supported Challenge ──
  {id:'supported-challenge',title:'Supported Challenge',desc:'Apply your knowledge with less guidance.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/project_budget.txt`,'Project budget: $5000');_mkfile(`${p}/documents/equipment_list.txt`,'Equipment required: Computers');
    const n=`${w}/projects/network_upgrade`;_mkdir(n);_mkdir(`${n}/documents`);_mkdir(`${n}/reports`);_mkdir(`${n}/backup`);
    _mkfile(`${n}/network_devices.txt`,'Server, Router, Switch');_mkfile(`${n}/config.txt`,'Network config notes');_mkfile(`${n}/reports/upgrade_plan.txt`,'Upgrade plan: Phase 1');
  },steps:[
    {desc:'Navigate to the network project: <span class="t-key">cd workspace/projects/network_upgrade</span>',tip:'Head to the network project — it already has files from a previous activity.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/network_upgrade');}},
    {desc:'Copy <span class="t-key">reports/upgrade_plan.txt</span> into <span class="t-key">backup/</span>',tip:'Before making changes, always back up important files. cp creates a safety copy.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/upgrade_plan.txt'));return n&&n.type==='file';}},
    {desc:'Rename the copied file: <span class="t-key">mv backup/upgrade_plan.txt backup/plan_backup.txt</span>',tip:'Giving backups descriptive names helps you identify them later.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move a document into reports: <span class="t-key">mv network_devices.txt reports/</span>',tip:'Moving device information into the reports folder groups it with other project deliverables.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/network_devices.txt'));return n&&n.type==='file';}},
    {desc:'Delete unnecessary file: <span class="t-key">rm config.txt</span>',tip:'If a file is no longer needed, remove it to keep the project clean and avoid confusion.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Display all files with <span class="t-key">ls</span>',tip:'A final ls confirms the project is organized the way you want it.',validate(cmd){return cmd==='ls';}},
  ]},

  // ── ACTIVITY 14: Archive Projects ──
  {id:'archive-projects',title:'Archive Project Data',desc:'Practice organising completed work.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    const p=`${w}/projects/hardware_upgrade`;_mkdir(p);_mkdir(`${p}/documents`);_mkdir(`${p}/reports`);_mkdir(`${p}/images`);
    _mkfile(`${p}/project_budget.txt`,'Project budget: $5000');_mkfile(`${p}/documents/equipment_list.txt`,'Equipment: Computers');
    _mkfile(`${p}/reports/meeting_notes.txt`,'Meeting notes: Done.');
  },steps:[
    {desc:'Navigate to workspace: <span class="t-key">cd workspace</span>',tip:'Go to the workspace root to manage your project folders.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create archive folder: <span class="t-key">mkdir completed_projects</span>',tip:'A dedicated archive folder keeps finished projects separate from active ones.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'Move the project: <span class="t-key">mv projects/hardware_upgrade completed_projects/</span>',tip:'Moving an entire folder moves everything inside it — files, sub-folders, and all.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/hardware_upgrade'));return n&&n.type==='dir';}},
    {desc:'Check the structure: <span class="t-key">ls completed_projects/</span>',tip:'Verify the project moved intact — all its sub-folders should still be there.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/completed_projects'));return d&&d.children['hardware_upgrade'];}},
    {desc:'View a file: <span class="t-key">cat completed_projects/hardware_upgrade/documents/equipment_list.txt</span>',tip:'You can access deeply nested files using their full path — no need to cd into each folder.',validate(cmd){return cmd==='cat';}},
    {desc:'Return home: <span class="t-key">cd</span>',tip:'Back to home base — you\'ve successfully archived a completed project.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── ACTIVITY 15: Workspace Maintenance ──
  {id:'workspace-maintenance',title:'Workspace Maintenance',desc:'Manage a larger file system with multiple tasks.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;
    _mkdir(w);_mkdir(`${w}/documents`);_mkdir(`${w}/projects`);_mkdir(`${w}/downloads`);_mkdir(`${w}/archive`);
    _mkfile(`${w}/documents/notes.txt`,'Linux CLI training notes.');_mkfile(`${w}/documents/old_file.txt`,'Delete me');
    _mkfile(`${w}/archive/temp_backup.txt`,'Old backup');
  },steps:[
    {desc:'Navigate to workspace: <span class="t-key">cd workspace</span>',tip:'Start at the workspace root to see what needs maintenance.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create missing folder: <span class="t-key">mkdir completed_projects</span>',tip:'Adding structure as you go — a place for finished projects keeps things tidy.',validate(cmd,_,__,op,ctx){if(cmd!=='mkdir')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[0]||''));return n&&n.type==='dir';}},
    {desc:'Remove old file: <span class="t-key">rm documents/old_file.txt</span>',tip:'Cleaning up obsolete files keeps your workspace focused on what matters.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Remove temp backup: <span class="t-key">rm archive/temp_backup.txt</span>',tip:'Temporary backups that are no longer needed should be removed to avoid clutter.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Rename a file: <span class="t-key">mv documents/notes.txt documents/training_notes.txt</span>',tip:'Renaming with a more descriptive name makes files easier to find and understand later.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'List workspace: <span class="t-key">ls</span> to verify',tip:'Final check — your workspace should now be clean and well-organized.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace'));return d&&d.children['completed_projects'];}},
  ]},

  // ── CHALLENGE 1: Employee Records ──
  {id:'employee-records',title:'Employee Records',desc:'Create and manage a company employee system.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;_mkdir(w);
    const c=`${w}/company`;_mkdir(c);_mkdir(`${c}/employees`);_mkdir(`${c}/reports`);_mkdir(`${c}/backups`);
  },steps:[
    {desc:'Navigate to workspace: <span class="t-key">cd workspace/company</span>',tip:'Move into the company folder — this is where you\'ll build the employee system.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/company');}},
    {desc:'Create employee file: <span class="t-key">echo "Alice - Developer" > employees/alice.txt</span>',tip:'Each employee gets their own file with their name and role — a simple but effective record system.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company/employees/alice.txt'));return n&&n.content.includes('Alice');}},
    {desc:'Create second employee: <span class="t-key">echo "Bob - Designer" > employees/bob.txt</span>',tip:'Adding more records builds out the employee database — each file is a separate record.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company/employees/bob.txt'));return n&&n.content.includes('Bob');}},
    {desc:'Create a report: <span class="t-key">echo "Q1 Summary" > reports/q1.txt</span>',tip:'Reports track company performance — this quarterly summary goes in the reports folder.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company/reports/q1.txt'));return n&&n.content.includes('Q1');}},
    {desc:'Backup a file: <span class="t-key">cp employees/alice.txt backups/alice_backup.txt</span>',tip:'Before modifying employee records, always create a backup — cp gives you a safety net.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Rename a file: <span class="t-key">mv reports/q1.txt reports/quarterly_report.txt</span>',tip:'Renaming to a more descriptive name helps anyone who opens the folder understand what\'s inside.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Delete an old file: <span class="t-key">rm backups/alice_backup.txt</span>',tip:'Once you\'re confident the data is safe, remove temporary backups to avoid confusion.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'List the company folder: <span class="t-key">ls</span>',tip:'A final ls shows the organized company structure with employees, reports, and backups.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company'));return d&&d.children['employees']&&d.children['reports']&&d.children['backups'];}},
  ]},

  // ── CHALLENGE 2: IT Helpdesk ──
  {id:'it-helpdesk',title:'IT Helpdesk',desc:'Manage a helpdesk ticketing system.',stars:3,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;_mkdir(w);
    const h=`${w}/helpdesk`;_mkdir(h);_mkdir(`${h}/tickets`);_mkdir(`${h}/solutions`);_mkdir(`${h}/archive`);
  },steps:[
    {desc:'Navigate: <span class="t-key">cd workspace/helpdesk</span>',tip:'Enter the helpdesk folder — tickets, solutions, and an archive are already set up.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/helpdesk');}},
    {desc:'Create a ticket: <span class="t-key">echo "Printer not working" > tickets/ticket1.txt</span>',tip:'Each support ticket is a file describing the issue — simple but effective for tracking problems.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/helpdesk/tickets/ticket1.txt'));return n&&n.content.includes('Printer');}},
    {desc:'Create a second ticket: <span class="t-key">echo "VPN connection issues" > tickets/ticket2.txt</span>',tip:'Multiple tickets in the same folder simulate a real helpdesk queue.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/helpdesk/tickets/ticket2.txt'));return n&&n.content.includes('VPN');}},
    {desc:'Create a solution: <span class="t-key">echo "Restart print spooler" > solutions/fix_printer.txt</span>',tip:'Solutions are separate from tickets — this keeps problem descriptions and fixes organized.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/helpdesk/solutions/fix_printer.txt'));return n&&n.content.includes('spooler');}},
    {desc:'Archive the first ticket: <span class="t-key">mv tickets/ticket1.txt archive/</span>',tip:'Once a ticket is resolved, move it to the archive — it\'s out of the active queue but still accessible.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/ticket1.txt'));return n&&n.type==='file';}},
    {desc:'Backup a solution: <span class="t-key">cp solutions/fix_printer.txt solutions/fix_printer_backup.txt</span>',tip:'Keeping a backup of proven solutions means you can reference them for similar future issues.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Remove old ticket: <span class="t-key">rm archive/ticket1.txt</span>',tip:'Old archived tickets that are no longer relevant can be deleted to keep the archive clean.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'List helpdesk: <span class="t-key">ls</span>',tip:'The helpdesk is organized — active tickets, reference solutions, and an archive for history.',validate(cmd,_,__,___,ctx){if(cmd!=='ls')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/helpdesk'));return d&&d.children['tickets']&&d.children['solutions']&&d.children['archive'];}},
  ]},

  // ── CHALLENGE 3: Final File Management ──
  {id:'final-file-mgmt',title:'Final File Management Challenge',desc:'Demonstrate all file management skills.',stars:4,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;_mkdir(w);
  },steps:[
    {desc:'Navigate: <span class="t-key">cd workspace</span>',tip:'Start in the workspace — you\'ll build a complete server structure from scratch.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create structure: <span class="t-key">mkdir -p server/data server/backups server/logs server/archive</span>',tip:'mkdir -p builds an entire directory tree in one command — efficient for setting up project structure.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server'));return d&&d.children['data']&&d.children['backups']&&d.children['logs']&&d.children['archive'];}},
    {desc:'Create files: <span class="t-key">echo "Server config" > server/data/config.txt && echo "Access log" > server/logs/access.txt && echo "Error log" > server/logs/errors.txt</span>',tip:'The && operator chains commands — each one runs only if the previous one succeeded.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server/data/config.txt'));return n&&n.content.includes('config');}},
    {desc:'Create more files: <span class="t-key">touch server/data/users.txt server/data/db.txt</span>',tip:'touch creates empty files — useful for setting up placeholders you\'ll fill in later.',validate(cmd,_,__,___,ctx){if(cmd!=='touch')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server/data'));return d&&d.children['users.txt']&&d.children['db.txt'];}},
    {desc:'Edit a file: <span class="t-key">echo "admin:x:1000" >> server/data/users.txt</span>',tip:'>> appends to a file instead of overwriting — use > to replace, >> to add to the end.',validate(cmd,_,__,___,ctx){return cmd==='echo';}},
    {desc:'View a file: <span class="t-key">cat server/data/config.txt</span>',tip:'cat displays file contents — always check that your data was written correctly.',validate(cmd){return cmd==='cat';}},
    {desc:'Copy a file: <span class="t-key">cp server/data/config.txt server/backups/config_backup.txt</span>',tip:'Back up critical config files before making changes — you can always restore from the backup.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Rename a file: <span class="t-key">mv server/logs/errors.txt server/logs/error_log.txt</span>',tip:'Consistent naming conventions make log files easier to search and parse.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move a file: <span class="t-key">mv server/data/users.txt server/archive/</span>',tip:'Archiving completed data keeps the active data folder clean and focused.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/users.txt'));return n&&n.type==='file';}},
    {desc:'Delete unnecessary files: <span class="t-key">rm server/data/db.txt</span>',tip:'Remove files that are no longer needed — keep the server data directory lean.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Return to home: <span class="t-key">cd</span>',tip:'You\'ve built a complete server file structure. Back to home.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── CHALLENGE 4: Final Boss ──
  {id:'final-boss',title:'The Final Challenge',desc:'Build an entire company server from scratch.',stars:5,clearVFS:true,setup(){
    const w=`/home/${USERNAME}/workspace`;_mkdir(w);
  },steps:[
    {desc:'Navigate: <span class="t-key">cd workspace</span>',tip:'This is it — build a complete company server structure from nothing.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create directory structure: <span class="t-key">mkdir -p company_server/documents company_server/projects company_server/backups company_server/archive company_server/logs</span>',tip:'Five folders in one command — mkdir -p is your best friend for rapid project setup.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company_server'));return d&&d.children['documents']&&d.children['projects']&&d.children['backups']&&d.children['archive']&&d.children['logs'];}},
    {desc:'Create files: <span class="t-key">echo "Company policy" > company_server/documents/policy.txt && echo "Server uptime report" > company_server/logs/uptime.txt && echo "Project alpha notes" > company_server/projects/alpha.txt && echo "Project beta plan" > company_server/projects/beta.txt && echo "Quarterly figures" > company_server/documents/quarterly.txt</span>',tip:'&& chains commands so each runs in sequence — build out your entire file system efficiently.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/company_server/documents/policy.txt'));return n&&n.content.includes('policy');}},
    {desc:'View all files with <span class="t-key">cat</span>',tip:'Review your work — cat lets you verify each file has the right content.',validate(cmd){return cmd==='cat';}},
    {desc:'Rename two files: <span class="t-key">mv company_server/projects/alpha.txt company_server/projects/project_alpha.txt && mv company_server/projects/beta.txt company_server/projects/project_beta.txt</span>',tip:'Consistent naming with "project_" prefix makes the projects folder easier to scan.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Copy two files: <span class="t-key">cp company_server/documents/policy.txt company_server/backups/policy_backup.txt && cp company_server/logs/uptime.txt company_server/backups/uptime_backup.txt</span>',tip:'Back up both important docs and logs — different types of data both need protection.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move files: <span class="t-key">mv company_server/documents/quarterly.txt company_server/archive/</span>',tip:'Archiving old reports keeps the documents folder focused on current materials.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/quarterly.txt'));return n&&n.type==='file';}},
    {desc:'Delete unnecessary files: <span class="t-key">rm company_server/logs/uptime.txt</span>',tip:'Old logs that have been backed up can be safely removed from the active logs folder.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Return home: <span class="t-key">cd</span>',tip:'You\'ve built a complete company server from scratch. Every command you learned is now part of your toolkit.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},
];

/* ═══════════════════════════
   CHALLENGE STATE (localStorage)
═══════════════════════════ */
let challengeState={completed:[],active:null,activeSteps:[]};
function loadChallengeState(){
  try{const d=JSON.parse(localStorage.getItem('linux-challenges'));if(d&&Array.isArray(d.completed)){challengeState=d;if(!challengeState.activeSteps)challengeState.activeSteps=[];}}catch(e){}
}
function saveChallengeState(){localStorage.setItem('linux-challenges',JSON.stringify(challengeState));}
function isCompleted(id){return challengeState.completed.includes(id);}
function markCompleted(id){
  if(isCompleted(id))return false;
  challengeState.completed.push(id);saveChallengeState();return true;
}
async function startChallenge(id){
  const ch=CHALLENGES.find(c=>c.id===id);
  if(!ch)return;
  if(ch.clearVFS){
    addLine(`<span class="t-out"><span class="t-amber">⚠</span> Starting "${esc(ch.title)}" will reset the terminal to a clean state. Any files you created will be lost.</span>`);
    addLine(`<span class="t-out">Are you sure? <span class="t-key">[y/N]</span></span>`);
    const answer=await new Promise(resolve=>{S.pendingConfirm=resolve;});
    if(answer!=='y'&&answer!=='yes'){addLine('<span class="t-muted">Cancelled.</span>');return;}
    createVFS();saveVFS();
    S.cwd=HOME;S.histIdx=-1;
    saveHistory();
  }
  if(ch.setup)ch.setup();
  S.termHistory.push('---CHALLENGE:'+ch.title+'---');
  const d1=document.createElement('div');
  d1.innerHTML=`<span style="color:var(--amber);font-weight:700;letter-spacing:.03em">═══ Challenge: ${esc(ch.title)} ═══</span>`;
  $out.appendChild(d1);
  const d2=document.createElement('div');
  d2.innerHTML=`<span style="color:var(--text-muted);font-style:italic">${ch.clearVFS?'VFS has been reset. Good luck!':'Good luck!'}</span>`;
  $out.appendChild(d2);
  const d3=document.createElement('div');d3.innerHTML='';$out.appendChild(d3);
  $out.scrollTop=$out.scrollHeight;
  challengeState.active=id;challengeState.activeSteps=[];
  saveChallengeState();renderGui(true);saveHistory();refreshChallengeWindow();
}
async function abandonChallenge(){
  const ch=getActiveChallenge();
  if(!ch)return;
  const stepCount=challengeState.activeSteps.length;
  const total=ch.steps.length;
  const ok=await showDialog(
    'Abandon challenge?',
    stepCount>0?`You've completed ${stepCount}/${total} steps. All progress for "${ch.title}" will be lost.`:`Are you sure you want to abandon "${ch.title}"?`,
    'Abandon'
  );
  if(!ok)return;
  challengeState.active=null;challengeState.activeSteps=[];
  saveChallengeState();refreshChallengeWindow();
}
function getActiveChallenge(){return CHALLENGES.find(c=>c.id===challengeState.active)||null;}

let _challengeCtx={};
function checkChallenges(){
  const ch=getActiveChallenge();if(!ch){_challengeCtx={};return;}
  const ctx={cwd:S.cwd,getNode,resolvePath,..._challengeCtx};
  const parts=tokenize((_challengeCtx.raw||'').trim()||'');
  const cmd=parts[0]||'',args=parts.slice(1),flags=parseFlags(args),operands=nonFlags(args);
  ch.steps.forEach((step,i)=>{
    if(challengeState.activeSteps.includes(i))return;
    if(i!==challengeState.activeSteps.length)return;
    try{
        if(step.validate(cmd,args,flags,operands,ctx)){
        challengeState.activeSteps.push(i);saveChallengeState();
        if(challengeState.activeSteps.length===ch.steps.length){
          markCompleted(ch.id);
          addLine(`<span class="t-green">[challenge] Challenge "${esc(ch.title)}" completed! Well done!</span>`);
          launchConfetti();
          challengeState.active=null;challengeState.activeSteps=[];
          saveChallengeState();
        }else{
          const nextDesc=ch.steps[challengeState.activeSteps.length]?.desc?.replace(/<[^>]+>/g,'')||'';
          addLine(`<span class="t-green">[challenge] Step ${i+1}/${ch.steps.length} completed.</span> ${nextDesc?`<span class="t-muted">Next: ${esc(nextDesc)}</span>`:''}`);
        }
        refreshChallengeWindow();
      }
    }catch(e){}
  });
  _challengeCtx={};
}
function refreshChallengeWindow(){
  const w=document.getElementById('challenges-window');
  if(w&&!w.classList.contains('minimized')){
    if(_cwViewingId){
      const ch=CHALLENGES.find(c=>c.id===_cwViewingId);
      if(ch){renderChallengeDetail(ch);return;}
    }
    renderChallengeWindow();
  }
}

/* ═══════════════════════════
   CONFETTI SYSTEM
═══════════════════════════ */
const confettiCanvas=document.getElementById('confetti-canvas');
const confettiCtx=confettiCanvas.getContext('2d');
let confettiPieces=[];
let confettiRunning=false;
const CONFETTI_COLORS=['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#01a3a4','#f368e0','#ff9f43','#10ac84','#ee5a24','#0abde3'];
function resizeConfetti(){confettiCanvas.width=window.innerWidth;confettiCanvas.height=window.innerHeight;}
window.addEventListener('resize',resizeConfetti);resizeConfetti();

function launchConfetti(){
  confettiPieces=[];
  const cx=window.innerWidth/2;
  for(let i=0;i<120;i++){
    const angle=Math.random()*Math.PI*2;
    const speed=4+Math.random()*8;
    confettiPieces.push({
      x:cx+(Math.random()-.5)*200,
      y:window.innerHeight*.35,
      vx:Math.cos(angle)*speed,
      vy:-Math.abs(Math.sin(angle)*speed)-2,
      w:4+Math.random()*6,
      h:3+Math.random()*4,
      color:CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)],
      rot:Math.random()*Math.PI*2,
      rotV:(Math.random()-.5)*.3,
      life:1,
      decay:.004+Math.random()*.006,
      gravity:.12+Math.random()*.06,
    });
  }
  if(!confettiRunning){confettiRunning=true;confettiLoop();}
}
function confettiLoop(){
  if(!confettiPieces.length){confettiRunning=false;confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);return;}
  confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiPieces.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.gravity;p.vx*=.99;
    p.rot+=p.rotV;p.life-=p.decay;
    if(p.life<=0)return;
    confettiCtx.save();
    confettiCtx.translate(p.x,p.y);confettiCtx.rotate(p.rot);
    confettiCtx.globalAlpha=p.life;
    confettiCtx.fillStyle=p.color;
    confettiCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
    confettiCtx.restore();
  });
  confettiPieces=confettiPieces.filter(p=>p.life>0);
  requestAnimationFrame(confettiLoop);
}

/* ═══════════════════════════
   CUSTOM DIALOG
═══════════════════════════ */
const $dlgBackdrop=document.getElementById('dialog-backdrop');
const $dlgBox=document.getElementById('dialog-box');
const $dlgTitle=document.getElementById('dialog-title');
const $dlgMsg=document.getElementById('dialog-msg');
const $dlgConfirm=document.getElementById('dialog-confirm');
const $dlgCancel=document.getElementById('dialog-cancel');
let _dlgResolve=null;
function showDialog(title,msg,confirmText,confirmClass){
  return new Promise(resolve=>{
    _dlgResolve=resolve;
    $dlgTitle.textContent=title;
    $dlgMsg.textContent=msg;
    $dlgConfirm.textContent=confirmText||'Confirm';
    $dlgConfirm.className='dialog-btn dialog-confirm'+(confirmClass?' '+confirmClass:'');
    $dlgBackdrop.classList.add('visible');
    requestAnimationFrame(()=>{$dlgBox.classList.add('visible');});
    $dlgConfirm.focus();
  });
}
function closeDialog(val){
  $dlgBox.classList.remove('visible');
  $dlgBackdrop.classList.remove('visible');
  if(_dlgResolve){_dlgResolve(val);_dlgResolve=null;}
}
$dlgConfirm.addEventListener('click',()=>closeDialog(true));
$dlgCancel.addEventListener('click',()=>closeDialog(false));
$dlgBackdrop.addEventListener('click',()=>closeDialog(false));
document.addEventListener('keydown',e=>{
  if(!$dlgBackdrop.classList.contains('visible'))return;
  if(e.key==='Escape')closeDialog(false);
  if(e.key==='Enter')closeDialog(true);
});


function setLesson(){} // no-op: lesson bar removed

/* ═══════════════════════════
   CHALLENGES WINDOW (view-only)
═══════════════════════════ */
const $cwContent=document.getElementById('cw-content');
let _cwViewingId=null;
function renderChallengeWindow(){
  _cwViewingId=null;
  if(!$cwContent)return;
  $cwContent.innerHTML='';
  // hint banner
  const hint=document.createElement('div');
  hint.className='cw-hint';
  hint.innerHTML='View challenges here. Use the terminal to interact: <span class="t-key">challenge list</span>, <span class="t-key">challenge start &lt;id&gt;</span>';
  $cwContent.appendChild(hint);
  // list
  const list=document.createElement('div');
  list.className='cw-list';
  CHALLENGES.forEach(ch=>{
    const done=isCompleted(ch.id);
    const active=challengeState.active===ch.id;
    const starCount=ch.steps.length<=6?1:ch.steps.length<=8?2:ch.steps.length<=10?3:ch.steps.length<=12?4:5;
    const stars='<span class="t-star">'+'★'.repeat(starCount)+'</span>'+'<span class="star-empty">'+'☆'.repeat(5-starCount)+'</span>';
    const item=document.createElement('div');
    item.className='cw-item'+(done?' done':'')+(active?' active':'');
    item.innerHTML=`
      <div class="cw-item-mark${done?' done':''}">${done?'✓':active?'▸':' '}</div>
      <div class="cw-item-info">
        <div class="cw-item-title">${esc(ch.title)}</div>
        <div class="cw-item-desc">${esc(ch.desc)}</div>
      </div>
      <div class="cw-item-stars">${stars}</div>
    `;
    item.addEventListener('click',()=>renderChallengeDetail(ch));
    list.appendChild(item);
  });
  $cwContent.appendChild(list);
}
function renderChallengeDetail(ch){
  _cwViewingId=ch.id;
  $cwContent.innerHTML='';
  const done=isCompleted(ch.id);
  const active=challengeState.active===ch.id;
  const starCount=ch.steps.length<=6?1:ch.steps.length<=8?2:ch.steps.length<=10?3:ch.steps.length<=12?4:5;
  const stars='<span class="t-star">'+'★'.repeat(starCount)+'</span>'+'<span class="star-empty">'+'☆'.repeat(5-starCount)+'</span>';
  // back button
  const back=document.createElement('button');
  back.className='cw-back';
  back.innerHTML='← Back to challenges';
  back.addEventListener('click',renderChallengeWindow);
  $cwContent.appendChild(back);
  // header
  const header=document.createElement('div');
  header.className='cw-detail-header';
  header.innerHTML=`
    <div class="cw-detail-title">${esc(ch.title)}</div>
    <div class="cw-detail-stars">${stars}</div>
    <div class="cw-detail-desc">${esc(ch.desc)}</div>
  `;
  $cwContent.appendChild(header);
  // steps
  const stepsEl=document.createElement('div');
  stepsEl.className='cw-detail-steps';
  ch.steps.forEach((step,i)=>{
    const stepDone=done||(active&&challengeState.activeSteps.includes(i));
    const descPlain=step.desc.replace(/<[^>]+>/g,'');
    const el=document.createElement('div');
    el.className='cw-detail-step'+(stepDone?' done':'');
    el.innerHTML=`
      <div class="cw-detail-step-num">${i+1}</div>
      <div class="cw-detail-step-desc">${esc(descPlain)}</div>
    `;
    stepsEl.appendChild(el);
  });
  $cwContent.appendChild(stepsEl);
  // terminal hint
  const cmd=document.createElement('div');
  cmd.className='cw-detail-cmd';
  if(done){
    cmd.innerHTML='<span class="t-teal">challenge start</span> '+esc(ch.id)+' <span class="t-muted">(re-attempt)</span>';
  }else if(active){
    cmd.innerHTML='<span class="t-teal">challenge status</span> <span class="t-muted">— view progress in the terminal</span>';
  }else{
    cmd.innerHTML='<span class="t-teal">challenge start</span> '+esc(ch.id);
  }
  $cwContent.appendChild(cmd);
}

/* ═══════════════════════════
   CHALLENGE CLI COMMANDS
═══════════════════════════ */
function printChallengeHelp(){
  addLine('<span class="t-out"><span class="t-amber">★</span> <span class="t-key">challenge</span> <span class="t-muted">— interact with challenges from the terminal</span></span>');
  addLine('');
  addLine('<span class="t-section">── Usage ──────────────────────────────────────</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge list</span>              List all challenges</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge start</span> <span class="t-cyan">&lt;id&gt;</span>        Start a challenge by ID</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge status</span>             Show active challenge progress</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge tip</span>                Show tip for current step</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge abandon</span>            Abandon the active challenge</span>');
  addLine('<span class="t-out">  <span class="t-teal">challenge reset</span>              Reset all challenge progress</span>');
  addLine('');
  addLine('<span class="t-muted">  Run <span class="t-teal">challenge list</span> to see available challenge IDs.</span>');
}
function printChallengeList(){
  addLine('<span class="t-out"><span class="t-amber">★</span> <span class="t-key">Available challenges</span></span>');
  addLine('');
  const maxIdLen=Math.max(...CHALLENGES.map(c=>c.id.length));
  CHALLENGES.forEach(ch=>{
    const done=isCompleted(ch.id);
    const mark=done?'<span class="t-green">✓</span>':'<span class="t-muted">○</span>';
    const starCount=ch.steps.length<=6?1:ch.steps.length<=8?2:ch.steps.length<=10?3:ch.steps.length<=12?4:5;
    const stars='<span class="t-star">'+'★'.repeat(starCount)+'</span>'+'<span class="t-star-empty">'+'☆'.repeat(5-starCount)+'</span>';
    const id=ch.id.padEnd(maxIdLen+2);
    const active=challengeState.active===ch.id?' <span class="t-amber">(active)</span>':'';
    const titleColor=done?'t-muted':'t-cyan';
    addLine(`<span class="t-out">  ${mark} <span class="t-teal">${esc(id)}</span> ${stars}  <span class="${titleColor}">${esc(ch.title)}</span>${active}</span>`);
  });
  addLine('');
  addLine(`<span class="t-muted">  <span class="t-cyan">${CHALLENGES.length}</span> challenges · <span class="t-green">${challengeState.completed.length}</span> completed</span>`);
  addLine('<span class="t-muted">  Run <span class="t-teal">challenge start &lt;id&gt;</span> to begin.</span>');
}
function printChallengeStatus(){
  const ch=getActiveChallenge();
  if(!ch){addLine('<span class="t-muted">No active challenge. Run <span class="t-teal">challenge list</span> to see available challenges.</span>');return;}
  const done=challengeState.activeSteps.length;
  const total=ch.steps.length;
  const pct=Math.round((done/total)*100);
  const barLen=20;
  const filled=Math.round((done/total)*barLen);
  const bar='<span class="t-green">'+'█'.repeat(filled)+'</span>'+'<span class="t-muted">'+'░'.repeat(barLen-filled)+'</span>';
  addLine(`<span class="t-out"><span class="t-amber">▸</span> <span class="t-key">Active challenge:</span> <span class="t-cyan">${esc(ch.title)}</span></span>`);
  addLine(`<span class="t-out">  Progress: ${bar} <span class="t-green">${done}</span><span class="t-muted">/${total}</span> steps <span class="t-amber">(${pct}%)</span></span>`);
  addLine('');
  ch.steps.forEach((step,i)=>{
    const descPlain=step.desc.replace(/<[^>]+>/g,'');
    if(i<done){
      addLine(`<span class="t-out">  <span class="t-step-done">✓ ${esc(descPlain)}</span></span>`);
    }else if(i===done){
      addLine(`<span class="t-out">  <span class="t-step-current">▸ ${esc(descPlain)}</span></span>`);
    }else{
      addLine(`<span class="t-out">  <span class="t-step-pending">○ ${esc(descPlain)}</span></span>`);
    }
  });
  addLine('');
  if(done<total){
    addLine('<span class="t-muted">  Run <span class="t-teal">challenge tip</span> for a hint.</span>');
  }
}
function printChallengeTip(){
  const ch=getActiveChallenge();
  if(!ch){addLine('<span class="t-muted">No active challenge. Run <span class="t-teal">challenge list</span> to see available challenges.</span>');return;}
  const idx=challengeState.activeSteps.length;
  if(idx>=ch.steps.length){addLine('<span class="t-green">All steps completed!</span>');return;}
  const step=ch.steps[idx];
  addLine(`<span class="t-out"><span class="t-amber">?</span> <span class="t-key">Tip for step <span class="t-cyan">${idx+1}/${ch.steps.length}</span>:</span></span>`);
  addLine(`<span class="t-out">  <span class="t-muted">${esc(step.tip)}</span></span>`);
}
async function resetChallengeProgress(){
  const ok=await showDialog(
    'Reset all progress?',
    'This will erase all challenge progress and completed challenges. Are you sure?',
    'Reset'
  );
  if(!ok)return;
  challengeState.completed=[];challengeState.active=null;challengeState.activeSteps=[];
  saveChallengeState();refreshChallengeWindow();
  addLine('<span class="t-green">All challenge progress has been reset.</span>');
}

/* ═══════════════════════════
   TERMINAL HELPERS
═══════════════════════════ */
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function addLine(html){const d=document.createElement('div');d.innerHTML=html;$out.appendChild(d);$out.scrollTop=$out.scrollHeight;S.termHistory.push(html);}
function addText(t,cls='t-out'){t.split('\n').forEach(l=>addLine(`<span class="${cls}">${esc(l)}</span>`))}
function printPrompt(path,cmd){
  addLine(`<span class="t-prompt">${esc(USERNAME)}</span><span class="t-muted">@linux:</span><span class="t-path">${esc(dispPath(path))}</span><span class="t-dollar"> $ </span><span class="t-cmd">${esc(cmd)}</span>`);
}
function updatePrompt(){
  $prompt.innerHTML=`<span class="t-prompt">${esc(USERNAME)}</span><span class="t-muted">@linux:</span><span class="t-path">${esc(dispPath(S.cwd))}</span><span class="t-dollar"> $ </span>`;
  $termLabel.textContent=`bash — ${esc(USERNAME)}@linux:${dispPath(S.cwd)}`;
}

/* ═══════════════════════════
   LS -L helpers
═══════════════════════════ */
function fmtPerms(node){
  const t=node.type==='dir'?'d':'-';
  // simplified: dirs rwxr-xr-x, files rw-r--r--
  return node.type==='dir'?'drwxr-xr-x':'-rw-r--r--';
}
function fmtSize(bytes,human){
  if(!human)return String(bytes).padStart(8);
  if(bytes<1024)return (bytes+'B').padStart(5);
  if(bytes<1048576)return (Math.round(bytes/1024)+'K').padStart(5);
  return (Math.round(bytes/1048576)+'M').padStart(5);
}
function fmtDate(d){
  const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now=new Date();
  const sameYear=d.getFullYear()===now.getFullYear();
  const day=String(d.getDate()).padStart(2);
  const hr=sameYear?String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'):String(d.getFullYear());
  return `${mo[d.getMonth()]} ${day} ${hr}`;
}

/* ═══════════════════════════
   GUI RENDERER
═══════════════════════════ */
function fileEmoji(name,type){
  if(type==='dir')return'📁';
  const ext=name.split('.').pop().toLowerCase();
  if(['png','jpg','jpeg','gif','svg','webp'].includes(ext))return'🖼️';
  if(['js','ts','py','c','cpp','java'].includes(ext))return'⚙️';
  if(['zip','tar','gz'].includes(ext))return'📦';
  return'📄';
}
function fileIconCls(name,type){
  if(type==='dir')return'fi-folder';
  const ext=name.split('.').pop().toLowerCase();
  if(['png','jpg','jpeg','gif','svg','webp'].includes(ext))return'fi-image';
  return'fi-text';
}
function renderGui(animate=false){
  // Always render the file manager as the base
  renderFileManager(animate);
  // If nano is active, show the floating editor overlay on top
  if(S.nanoMode&&S.editorFile!==null){
    showEditorOverlay();
  } else {
    hideEditorOverlay();
  }
}

function showEditorOverlay(){
  const fname=S.editorFile?S.editorFile.split('/').pop():'untitled';
  const content=S.editorContent||'';
  const $overlay=document.getElementById('editor-overlay');
  const $eoTitle=document.getElementById('eo-title');
  const $eoBody =document.getElementById('eo-body');
  const $guiCont=document.getElementById('gui-content');

  $eoTitle.textContent=fname;
  $guiCont.classList.add('editor-open');
  $overlay.classList.add('visible');

  // Render content with line numbers
  $eoBody.innerHTML='';
  if(!content.trim()){
    $eoBody.innerHTML='<span class="eo-empty">(empty file — start typing in nano)</span>';
  } else {
    content.split('\n').forEach((line,i)=>{
      const row=document.createElement('div');row.className='eo-line';
      row.innerHTML=`<span class="eo-ln">${i+1}</span><span class="eo-lc">${esc(line)}</span>`;
      $eoBody.appendChild(row);
    });
    $eoBody.scrollTop=$eoBody.scrollHeight;
  }

  $sCnt.textContent=content.split('\n').length+' lines';
  $sInfo.textContent='editing';
}

function hideEditorOverlay(){
  const $overlay=document.getElementById('editor-overlay');
  const $guiCont=document.getElementById('gui-content');
  $overlay.classList.remove('visible');
  $guiCont.classList.remove('editor-open');
}

function renderFileManager(animate){
  // Reset gui-content to scrollable grid layout, but preserve the overlay element
  $guiContent.style.cssText='padding:14px;overflow:auto;position:relative';
  const node=getNode(S.cwd);
  $guiPath.textContent=dispPath(S.cwd);
  $guiIcon.textContent='📁';
  $guiLabel.textContent=S.cwd===HOME?'Home':S.cwd==='/'?'root':S.cwd.split('/').pop();
  if(!node||node.type!=='dir'){
    // preserve overlay element, clear only non-overlay children
    Array.from($guiContent.children).forEach(c=>{if(c.id!=='editor-overlay')c.remove();});
    const em=document.createElement('span');em.className='file-grid-empty';em.textContent='Cannot read directory.';
    $guiContent.appendChild(em);
    return;
  }
  const entries=Object.entries(node.children).sort((a,b)=>{
    if(a[1].type!==b[1].type)return a[1].type==='dir'?-1:1;
    if(isHidden(a[0])!==isHidden(b[0]))return isHidden(a[0])?1:-1;
    return a[0].localeCompare(b[0]);
  });
  // Remove old grid but keep overlay element
  Array.from($guiContent.children).forEach(c=>{if(c.id!=='editor-overlay')c.remove();});
  const grid=document.createElement('div');grid.className='file-grid';
  if(!entries.length){const e=document.createElement('div');e.className='file-grid-empty';e.textContent='(empty folder)';grid.appendChild(e);}
  else entries.forEach(([name,child],i)=>{
    const item=document.createElement('div');
    item.className='file-item'+(animate?' new-anim':'')+(isHidden(name)?' hidden-file':'');
    if(animate)item.style.animationDelay=(i*30)+'ms';
    item.title=isHidden(name)?name+' (hidden — use ls -a to see in terminal)':name;
    item.innerHTML=`<div class="file-icon ${fileIconCls(name,child.type)}">${fileEmoji(name,child.type)}</div><span class="file-name">${esc(name)}</span>`;
    grid.appendChild(item);
  });
  $guiContent.appendChild(grid);
  if(!S.nanoMode){
    $sCnt.textContent=entries.length+' item'+(entries.length!==1?'s':'');
    $sInfo.textContent='ready';
  }
}

// Highlight one or more named items in the current file grid with a pulse glow.
// Call after renderGui() so the items exist in the DOM.
function highlightItems(names){
  if(!Array.isArray(names)) names=[names];
  const nameSet=new Set(names);
  // Small delay so the appear animation finishes first
  setTimeout(()=>{
    $guiContent.querySelectorAll('.file-item').forEach(el=>{
      const label=el.querySelector('.file-name');
      if(label&&nameSet.has(label.textContent.trim())){
        el.classList.remove('highlight-pulse');
        // Force reflow to restart animation
        void el.offsetWidth;
        el.classList.add('highlight-pulse');
      }
    });
  }, 60);
}

/* ═══════════════════════════
   NANO EDITOR
═══════════════════════════ */

function countLines(text) {
  return (text.match(/\n/g) || []).length + 1;
}

function resetNanoUI() {
  $nanoTA.value = '';
  $nanoGut.textContent = '  1';
  $nanoFname.textContent = '';
  $nanoMod.textContent = '';
  $nanoMsg.textContent = '';
  $nanoPos.textContent = 'Col 1, Row 1';
}

function openNano(fpath) {
  var fname = fpath.split('/').pop();
  var parentDir = getNode(normPath(fpath + '/..'));

  if (!parentDir || parentDir.type !== 'dir') {
    addLine('<span class="t-err">nano: ' + esc(fpath) + ': directory not found</span>');
    return;
  }

  // Create file if it doesn't exist
  if (!parentDir.children[fname]) {
    parentDir.children[fname] = makeNode('file', '');
  }

  var fileNode = parentDir.children[fname];
  var content = String(fileNode.content);

  // Set state BEFORE touching the DOM, so event handlers see the correct state
  S.nanoMode = true;
  S.nanoFilePath = fpath;
  S.nanoOriginal = content;
  S.editorFile = fpath;
  S.editorContent = content;

  // Load content into textarea and update gutter BEFORE making the view visible
  // This prevents the browser from rendering stale/hardcoded content
  $nanoTA.value = content;
  updateNanoGutters();
  $nanoFname.textContent = fname;
  $nanoMod.textContent = '';
  $nanoMsg.textContent = content
    ? '[ Read ' + countLines(content) + ' lines ]'
    : '[ New File ]';

  // Now show the view — everything is already correct
  $shellView.style.display = 'none';
  $nanoView.classList.add('active');

  // Focus, place cursor, update position
  $nanoTA.focus();
  $nanoTA.setSelectionRange(0, 0);
  updateNanoPos();

  renderGui();
  setLesson('nano');
}

function nanoIsModified() {
  return String($nanoTA.value) !== String(S.nanoOriginal);
}

function closeNano(save) {
  hideSavePrompt();

  const fpath = S.nanoFilePath;
  const fname = fpath.split('/').pop();
  const parentDir = getNode(normPath(fpath + '/..'));

  if (save) {
    const text = $nanoTA.value;
    if (parentDir && parentDir.children[fname]) {
      parentDir.children[fname].content = text;
      parentDir.children[fname].size = text.length;
      parentDir.children[fname].mtime = new Date();
    }
    S.editorContent = text;
    addLine(`<span class="t-success">[ Wrote ${countLines(text)} lines to ${esc(fname)} ]</span>`);
    saveVFS();
  }

  S.nanoMode = false;
  S.nanoFilePath = null;
  S.nanoOriginal = '';
  S.editorFile = null;
  S.editorContent = null;

  $nanoView.classList.remove('active');
  $shellView.style.display = '';
  resetNanoUI();

  renderGui();
  updatePrompt();
  $input.focus();
  $out.scrollTop = $out.scrollHeight;
}

function nanoSaveInPlace() {
  const fpath = S.nanoFilePath;
  const fname = fpath.split('/').pop();
  const parentDir = getNode(normPath(fpath + '/..'));
  const text = $nanoTA.value;

  if (parentDir && parentDir.children[fname]) {
    parentDir.children[fname].content = text;
    parentDir.children[fname].size = text.length;
    parentDir.children[fname].mtime = new Date();
  }

  S.editorContent = text;
  S.nanoOriginal = text;
  $nanoMod.textContent = '';
  $nanoMsg.textContent = `[ Wrote ${countLines(text)} lines ]`;

  renderGui();
  saveVFS();
}

function showSavePrompt() {
  $nanoSP.classList.add('visible');
}

function hideSavePrompt() {
  if ($nanoSP.classList.contains('visible')) {
    $nanoSP.classList.remove('visible');
  }
  if (S.nanoMode) {
    $nanoTA.focus();
  }
}

// Save prompt buttons
document.getElementById('nsp-yes').addEventListener('click', () => closeNano(true));
document.getElementById('nsp-no').addEventListener('click', () => closeNano(false));
document.getElementById('nsp-cancel').addEventListener('click', () => hideSavePrompt());

// Save prompt keyboard handler
document.addEventListener('keydown', e => {
  if (!$nanoSP.classList.contains('visible')) return;
  const key = e.key.toLowerCase();
  if (key === 'y') { e.preventDefault(); closeNano(true); }
  else if (key === 'n') { e.preventDefault(); closeNano(false); }
  else if (e.key === 'Escape' || (nanoModKey(e) && key === 'c')) { e.preventDefault(); hideSavePrompt(); }
});

function updateNanoGutters() {
  var lines = $nanoTA.value.split('\n');
  $nanoGut.textContent = lines.map(function(_, i) { return String(i + 1).padStart(3); }).join('\n');
}

function updateNanoPos() {
  var beforeCursor = $nanoTA.value.substring(0, $nanoTA.selectionStart);
  var linesBefore = beforeCursor.split('\n');
  var row = linesBefore.length;
  var col = linesBefore[linesBefore.length - 1].length + 1;
  $nanoPos.textContent = 'Col ' + col + ', Row ' + row;
}

// Nano textarea event listeners
$nanoTA.addEventListener('input', function() {
  updateNanoGutters();
  S.editorContent = $nanoTA.value;
  $nanoMod.textContent = nanoIsModified() ? '[ Modified ]' : '';
  renderGui();
});

$nanoTA.addEventListener('keyup', updateNanoPos);
$nanoTA.addEventListener('click', updateNanoPos);
$nanoTA.addEventListener('scroll', function() { $nanoGut.scrollTop = $nanoTA.scrollTop; });

$nanoTA.addEventListener('keydown', function(e) {
  var key = e.key.toLowerCase();
  var mod = nanoModKey(e);

  if (mod && key === 'x') {
    e.preventDefault();
    e.stopPropagation();
    if (!S.nanoMode) return;
    if (nanoIsModified()) { showSavePrompt(); } else { closeNano(false); }
    return;
  }
  if (mod && key === 'o') { e.preventDefault(); nanoSaveInPlace(); return; }
  if (mod && key === 'k') {
    e.preventDefault();
    var lines = $nanoTA.value.split('\n');
    var currentLine = $nanoTA.value.substring(0, $nanoTA.selectionStart).split('\n').length - 1;
    lines.splice(currentLine, 1);
    $nanoTA.value = lines.join('\n');
    updateNanoGutters();
    S.editorContent = $nanoTA.value;
    $nanoMod.textContent = nanoIsModified() ? '[ Modified ]' : '';
    renderGui();
    return;
  }
  if (mod && key === 'g') { e.preventDefault(); $nanoMsg.textContent = MOD_KEY + 'O Save  ' + MOD_KEY + 'X Exit'; return; }
  if (mod && key === 'c') { e.preventDefault(); updateNanoPos(); $nanoMsg.textContent = '[ ' + $nanoPos.textContent + ' ]'; return; }

  setTimeout(updateNanoPos, 0);
});

/* ═══════════════════════════
   AUTOCOMPLETE
═══════════════════════════ */
function getCompletions(value){
  // pipe/redirect support: complete the segment after the last | or >
  let seg=value;
  let pipeIdx=-1;
  for(let i=value.length-1;i>=0;i--){
    if(value[i]==='|'||value[i]==='>'){pipeIdx=i;break;}
  }
  if(pipeIdx>=0){
    seg=value.slice(pipeIdx+1);
  }

  const parts=tokenize(seg);
  const isFirst=parts.length===0||(parts.length===1&&!seg.endsWith(' '));
  if(isFirst){
    const p=parts[0]||'';
    return ALL_CMDS.filter(c=>c.startsWith(p)&&c!==p).map(c=>({type:'cmd',text:c,insert:c,desc:CMD_HELP[c]?.short||''}));
  }
  const cmd=parts.find(p=>p&&!p.match(/^[|><]$/))||'';
  const last=seg.endsWith(' ')?'':(parts[parts.length-1]||'');
  if(last.startsWith('-')){
    const opts=(CMD_HELP[cmd]?.opts||[]).map(o=>o.f).flatMap(f=>f.split(',').map(x=>x.trim())).filter(f=>f.startsWith('-'));
    return [...new Set(opts)].filter(f=>f.startsWith(last)&&f!==last).map(f=>({type:'flag',text:f,insert:f,desc:''}));
  }
  // challenge: complete subcommands and challenge IDs
  if(cmd==='challenge'){
    const CHALLENGE_SUBS=['list','start','status','tip','abandon','reset'];
    // after "start", complete challenge IDs
    if(parts[1]==='start'){
      const partialId=seg.endsWith(' ')?'':(parts[parts.length-1]||'');
      return CHALLENGES.filter(c=>c.id.startsWith(partialId)&&c.id!==partialId).map(c=>({type:'flag',text:c.id,insert:c.id,desc:c.title}));
    }
    const sub=last;
    if(CHALLENGE_SUBS.some(s=>s.startsWith(sub))){
      return CHALLENGE_SUBS.filter(s=>s.startsWith(sub)&&s!==sub).map(s=>{
        const desc=s==='start'?'start a challenge':s==='list'?'list all challenges':s==='status'?'show progress':s==='tip'?'show step hint':s==='abandon'?'abandon active challenge':'reset all progress';
        return {type:'flag',text:s,insert:s,desc};
      });
    }
    return [];
  }
  // export: complete format subcommands
  if(cmd==='export'){
    const EXPORT_FMTS=['txt','pdf'];
    const sub=last;
    if(EXPORT_FMTS.some(f=>f.startsWith(sub))){
      return EXPORT_FMTS.filter(f=>f.startsWith(sub)&&f!==sub).map(f=>({type:'flag',text:f,insert:f,desc:f==='txt'?'download as text file':'open print preview'}));
    }
    return [];
  }
  const wantDir=['cd','rmdir'].includes(cmd);
  const wantFile=['cat','nano'].includes(cmd);
  const grepMode=cmd==='grep';
  let base=S.cwd,partial=last;
  if(last.includes('/')){const si=last.lastIndexOf('/');base=resolvePath(S.cwd,last.slice(0,si)||'/');partial=last.slice(si+1);}
  const bn=getNode(base);
  if(!bn||bn.type!=='dir')return[];
  // grep: first operand is a pattern, not a file — suggest example patterns
  if(grepMode&&!last.startsWith('-')&&parts.length<=2){
    const GREP_PATTERNS=[
      {text:'[0-9]',desc:'match digits'},
      {text:'[a-z]',desc:'match lowercase letters'},
      {text:'^[A-Z]',desc:'lines starting with uppercase'},
      {text:'\\.$',desc:'lines ending with a period'},
      {text:'[a-zA-Z]+@[a-z]+\\.[a-z]+',desc:'email-like patterns'},
      {text:'\\berror\\b',desc:'word "error"'},
      {text:'\\bwarn(ing)?\\b',desc:'word "warn" or "warning"'},
      {text:'^#',desc:'comment lines'},
      {text:'^$',desc:'empty lines'},
      {text:'\\.txt$',desc:'lines ending with .txt'},
    ];
    const p2=last;
    return GREP_PATTERNS.filter(p=>!p2||p.text.startsWith(p2)&&p.text!==p2).map(p=>({type:'flag',text:p.text,insert:p.text,desc:p.desc}));
  }
  const pfx=last.includes('/')?last.slice(0,last.lastIndexOf('/')+1):'';
  const items=Object.entries(bn.children).filter(([n,nd])=>{
    if(!n.startsWith(partial))return false;
    if(wantDir&&nd.type!=='dir')return false;
    if(wantFile&&nd.type!=='file')return false;
    return true;
  }).map(([n,nd])=>({type:nd.type==='dir'?'dir':'file',text:pfx+n+(nd.type==='dir'?'/':''),insert:pfx+n+(nd.type==='dir'?'/':''),desc:nd.type==='dir'?'directory':'file'}));
  if(wantDir&&S.cwd!=='/'&&(!last||'..'.startsWith(last)&&last!=='..'))items.unshift({type:'dir',text:'..',insert:'..',desc:'parent directory'});
  return items;
}
function showAC(items){
  S.acItems=items;S.acIdx=-1;$ac.innerHTML='';
  if(!items.length){$ac.classList.remove('visible');return;}
  items.slice(0,8).forEach((item,i)=>{
    const d=document.createElement('div');d.className='ac-item';d.dataset.idx=i;
    let ic='ac-icon-cmd',ch='>';
    if(item.type==='dir'){ic='ac-icon-dir';ch='📁';}
    if(item.type==='file'){ic='ac-icon-file';ch='📄';}
    if(item.type==='flag'){ic='ac-icon-flag';ch='-';}
    d.innerHTML=`<div class="ac-icon ${ic}">${ch}</div><span class="ac-name">${esc(item.text)}</span>${item.desc?`<span class="ac-desc">${esc(item.desc)}</span>`:''}`;
    d.addEventListener('mousedown',e=>{e.preventDefault();applyAC(item);});
    $ac.appendChild(d);
  });
  $ac.classList.add('visible');
}
function hideAC(){$ac.classList.remove('visible');S.acItems=[];S.acIdx=-1;}
function applyAC(item){
  const v=$input.value;
  const lastSep=Math.max(v.lastIndexOf(' '),v.lastIndexOf('|'),v.lastIndexOf('>'));
  $input.value=v.slice(0,lastSep+1)+item.insert;
  hideAC();$input.focus();if($input.value.endsWith('/'))triggerAC();
}
function triggerAC(){if(!$input.value){hideAC();return;}showAC(getCompletions($input.value));}
function acMove(dir){
  if(!S.acItems.length)return;
  const items=$ac.querySelectorAll('.ac-item');
  if(S.acIdx>=0)items[S.acIdx]?.classList.remove('selected');
  S.acIdx=(S.acIdx+dir+S.acItems.length)%S.acItems.length;
  items[S.acIdx]?.classList.add('selected');
  items[S.acIdx]?.scrollIntoView({block:'nearest'});
}

/* ═══════════════════════════
   COMMAND PROCESSOR
═══════════════════════════ */
function runCmd(raw){
  const input=raw.trim();if(!input)return;
  S.cmdHistory.unshift(input);S.histIdx=-1;
  printPrompt(S.cwd,input);

  // redirect support: command > file or command >> file
  // find last unquoted >> or > to avoid matching > inside quotes
  function lastUnquoted(str,pat){
    let inQ='',last=-1;
    for(let i=0;i<str.length;i++){
      const c=str[i];
      if(inQ){if(c===inQ)inQ='';continue;}
      if(c==='"'||c==="'")inQ=c;
      else{
        const m=str.slice(i).match(new RegExp('^'+pat));
        if(m&&i>last)last=i;
      }
    }
    return last;
  }
  const appendIdx=lastUnquoted(input,'>>');
  const overwriteIdx=appendIdx<0?lastUnquoted(input,'>'):appendIdx;
  if(overwriteIdx>=0){
    const isAppend=appendIdx>=0;
    const opLen=isAppend?2:1;
    const cmdPart=input.slice(0,overwriteIdx).trim();
    const filePath=input.slice(overwriteIdx+opLen).trim();
    const output=captureCmdOutput(cmdPart);
    const rp=resolvePath(S.cwd,filePath);
    const parent=getNode(normPath(rp+'/..'));
    const base=rp.split('/').pop();
    if(!parent||parent.type!=='dir'){addLine(`<span class="t-err">bash: ${esc(filePath)}: No such file or directory</span>`);return;}
    if(!parent.children[base])parent.children[base]=makeNode('file','');
    const existing=parent.children[base].content||'';
    parent.children[base].content=isAppend?existing+output:output+'\n';
    parent.children[base].size=parent.children[base].content.length;
    parent.children[base].mtime=new Date();
    if(S.editorFile===rp)S.editorContent=parent.children[base].content;
    renderGui(true);
    _challengeCtx={raw:cmdPart,lastRedirect:{mode:isAppend?'append':'overwrite',file:filePath}};
    checkChallenges();saveVFS();saveHistory();return;
  }

  // pipe support: split on | and chain commands
  if(input.includes('|')){
    const segments=input.split('|').map(s=>s.trim()).filter(Boolean);
    let pipeInput='';
    for(let i=0;i<segments.length;i++){
      const isLast=i===segments.length-1;
      if(isLast){runCmdSegment(segments[i],pipeInput);}
      else{pipeInput=captureCmdOutput(segments[i],pipeInput);}
    }
    _challengeCtx={raw:input,usedPipe:true};
    checkChallenges();saveVFS();saveHistory();return;
  }

  _challengeCtx={raw:input};
  runCmdSegment(input);
  checkChallenges();saveVFS();saveHistory();
}

function captureCmdOutput(raw,pipeInput){
  const saved={addLine,addText};
  let out=[];
  window.addLine=function(html){out.push(html.replace(/<[^>]+>/g,''));};
  window.addText=function(t,cls){t.split('\n').forEach(l=>out.push(l));};
  const input=raw.trim();
  if(input.includes('|')){
    const segments=input.split('|').map(s=>s.trim()).filter(Boolean);
    let pi=pipeInput||'';
    for(let i=0;i<segments.length;i++){
      const isLast=i===segments.length-1;
      if(isLast){runCmdSegment(segments[i],pi);}
      else{pi=captureCmdOutput(segments[i],pi);}
    }
  }else{
    runCmdSegment(raw,pipeInput);
  }
  window.addLine=saved.addLine;
  window.addText=saved.addText;
  return out.join('\n');
}

function runCmdSegment(raw,pipeInput){
  const input=raw.trim();if(!input)return;
  const parts=tokenize(input);
  const cmd=parts[0],args=parts.slice(1);
  const flags=parseFlags(args);
  const operands=nonFlags(args);
  const node=getNode(S.cwd);

  // --help intercept
  if(flags.has('--help')){printHelpPage(cmd);return;}

  switch(cmd){

    case 'ls':{
      if(!node||node.type!=='dir'){addLine('<span class="t-err">ls: cannot access directory</span>');break;}
      const showAll=flags.has('-a')||flags.has('--all');
      const longFmt=flags.has('-l');
      const human  =flags.has('-h')||flags.has('--human-readable');
      const rev    =flags.has('-r')||flags.has('--reverse');
      const byTime =flags.has('-t');

      // determine target dir (if operand given)
      let targetDir=node,targetPath=S.cwd;
      if(operands.length){
        targetPath=resolvePath(S.cwd,operands[0]);
        targetDir=getNode(targetPath);
        if(!targetDir){addLine(`<span class="t-err">ls: cannot access '${esc(operands[0])}': No such file or directory</span>`);break;}
        if(targetDir.type==='file'){
          // ls on a single file
          if(longFmt){
            const n=targetDir,d=fmtDate(n.mtime||new Date());
            addLine(`<span class="t-perm">${fmtPerms(n)}</span> <span class="t-out">1 ${esc(USERNAME)} ${esc(USERNAME)}</span> <span class="t-size">${fmtSize(n.size||0,human)}</span> <span class="t-date">${d}</span> <span class="t-file">${esc(operands[0])}</span>`);
          } else {addLine(`<span class="t-file">${esc(operands[0])}</span>`);}
          break;
        }
      }

      let entries=Object.entries(targetDir.children)
        .filter(([name])=>showAll||!isHidden(name));

      if(byTime) entries.sort((a,b)=>(b[1].mtime||0)-(a[1].mtime||0));
      else entries.sort((a,b)=>{
        if(a[1].type!==b[1].type)return a[1].type==='dir'?-1:1;
        return a[0].localeCompare(b[0]);
      });
      if(rev)entries.reverse();

      if(longFmt){
        if(showAll){
          addLine(`<span class="t-perm">drwxr-xr-x</span> <span class="t-out">2 ${esc(USERNAME)} ${esc(USERNAME)}</span> <span class="t-size">${fmtSize(4096,human)}</span> <span class="t-date">${fmtDate(new Date())}</span> <span class="t-hidden t-dir">.</span>`);
          addLine(`<span class="t-perm">drwxr-xr-x</span> <span class="t-out">3 ${esc(USERNAME)} ${esc(USERNAME)}</span> <span class="t-size">${fmtSize(4096,human)}</span> <span class="t-date">${fmtDate(new Date())}</span> <span class="t-hidden t-dir">..</span>`);
        }
        addLine(`<span class="t-muted">total ${entries.length}</span>`);
        entries.forEach(([name,nd])=>{
          const h=isHidden(name),perm=fmtPerms(nd),sz=fmtSize(nd.size||0,human),dt=fmtDate(nd.mtime||new Date());
          const ncls=nd.type==='dir'?(h?'t-hidden t-dir':'t-dir'):(h?'t-hidden t-file':'t-file');
          addLine(`<span class="t-perm">${perm}</span> <span class="t-out">1 ${esc(USERNAME)} ${esc(USERNAME)}</span> <span class="t-size">${sz}</span> <span class="t-date"> ${dt}</span> <span class="${ncls}">${esc(name)}${nd.type==='dir'?'/':''}</span>`);
        });
      } else {
        if(!entries.length&&!showAll){addLine('<span class="t-muted">(empty directory)</span>');}
        else {
          const parts2=[];
          if(showAll){parts2.push(`<span class="t-hidden t-dir">./</span>`);parts2.push(`<span class="t-hidden t-dir">../</span>`);}
          entries.forEach(([n,v])=>{
            const h=isHidden(n);
            parts2.push(v.type==='dir'
              ?`<span class="${h?'t-hidden ':''} t-dir">${esc(n)}/</span>`
              :`<span class="${h?'t-hidden ':''} t-file">${esc(n)}</span>`);
          });
          addLine(`<span>${parts2.join('  ')}</span>`);
        }
      }
      setLesson('ls');renderGui();break;
    }

    case 'pwd':{ addText(S.cwd);setLesson('pwd');break;}

    case 'cd':{
      const target=operands[0]||'~';
      const np=resolvePath(S.cwd,target);
      const tn=getNode(np);
      if(!tn){addLine(`<span class="t-err">bash: cd: ${esc(target)}: No such file or directory</span>`);break;}
      if(tn.type!=='dir'){addLine(`<span class="t-err">bash: cd: ${esc(target)}: Not a directory</span>`);break;}
      S.cwd=np;S.editorFile=null;S.editorContent=null;
      updatePrompt();renderGui(true);setLesson('cd');break;
    }

    case 'mkdir':{
      if(!operands.length){addLine('<span class="t-err">mkdir: missing operand</span><br><span class="t-muted">Try \'mkdir --help\' for more information.</span>');break;}
      const result=commands.mkdir(S.cwd,operands,flags);
      result.errs.forEach(e=>addLine(`<span class="t-err">${esc(e)}</span>`));
      const baseNames=result.created.map(c=>c.base);
      if(result.created.length){
        if(flags.has('-v'))result.created.forEach(c=>addLine(`<span class="t-success">mkdir: created directory '${esc(c.name)}'</span>`));
        renderGui(true);highlightItems(baseNames);setLesson('mkdir');
      }
      break;
    }

    case 'touch':{
      if(!operands.length){addLine('<span class="t-err">touch: missing file operand</span><br><span class="t-muted">Try \'touch --help\' for more information.</span>');break;}
      const result=commands.touch(S.cwd,operands);
      result.errs.forEach(e=>addLine(`<span class="t-err">${esc(e)}</span>`));
      const baseNames=result.created.map(c=>c.base);
      renderGui(true);if(baseNames.length)highlightItems(baseNames);setLesson('touch');break;
    }

    case 'nano':{
      if(!operands.length){addLine('<span class="t-err">nano: missing filename</span>');break;}
      openNano(resolvePath(S.cwd,operands[0]));break;
    }

    case 'cat':{
      if(pipeInput){
        const showNums=flags.has('-n');
        pipeInput.split('\n').forEach((l,i)=>{
          if(showNums)addLine(`<span class="t-muted" style="min-width:40px;display:inline-block;text-align:right;margin-right:8px">${i+1}</span><span class="t-out">${esc(l)}</span>`);
          else addText(l);
        });
        setLesson('cat');break;
      }
      if(!operands.length){addLine('<span class="t-err">cat: missing operand</span><br><span class="t-muted">Try \'cat --help\' for more information.</span>');break;}
      const result=commands.cat(S.cwd,operands,flags);
      result.errs.forEach(e=>addLine(`<span class="t-err">${esc(e)}</span>`));
      result.lines.forEach(l=>{
        if(l.text==='(empty file)'){addLine('<span class="t-muted">(empty file)</span>');}
        else if(l.lineNum)addLine(`<span class="t-muted" style="min-width:40px;display:inline-block;text-align:right;margin-right:8px">${l.lineNum}</span><span class="t-out">${esc(l.text)}</span>`);
        else addText(l.text);
      });
      setLesson('cat');break;
    }

    case 'cp':{
      if(operands.length<2){addLine(`<span class="t-err">cp: missing destination file operand after '${esc(operands[0]||'')}'</span>`);break;}
      const result=commands.cp(S.cwd,operands[0],operands[1],flags);
      if(result.error){addLine(`<span class="t-err">${esc(result.error)}</span>`);break;}
      if(flags.has('-v'))addLine(`<span class="t-success">'${esc(operands[0])}' -> '${esc(operands[1])}'</span>`);
      renderGui(true);highlightItems(result.destName);setLesson('cp');break;
    }

    case 'mv':{
      if(operands.length<2){addLine('<span class="t-err">mv: missing destination file operand</span>');break;}
      const result=commands.mv(S.cwd,operands[0],operands[1]);
      if(result.error){addLine(`<span class="t-err">${esc(result.error)}</span>`);break;}
      if(S.editorFile){
        const oldPath=resolvePath(S.cwd,operands[0]);
        if(S.editorFile===oldPath)S.editorFile=result.newPath;
      }
      if(flags.has('-v'))addLine(`<span class="t-success">'${esc(operands[0])}' -> '${esc(operands[1])}'</span>`);
      renderGui(true);highlightItems(result.destName);setLesson('mv');break;
    }

    case 'rm':{
      if(!operands.length){addLine('<span class="t-err">rm: missing operand</span><br><span class="t-muted">Try \'rm --help\' for more information.</span>');break;}
      const result=commands.rm(S.cwd,operands,flags);
      result.errs.forEach(e=>{
        addLine(`<span class="t-err">${esc(e)}</span>`);
        if(e.includes('Is a directory'))addLine('<span class="t-muted">  Add -r to remove directories</span>');
      });
      result.removed.forEach(r=>{
        if(flags.has('-v'))addLine(`<span class="t-success">removed '${esc(r.name)}'</span>`);
        if(S.editorFile===r.path){S.editorFile=null;S.editorContent=null;}
      });
      renderGui();setLesson('rm');break;
    }

    case 'rmdir':{
      if(!operands.length){addLine('<span class="t-err">rmdir: missing operand</span>');break;}
      const result=commands.rmdir(S.cwd,operands,flags);
      result.errs.forEach(e=>addLine(`<span class="t-err">${esc(e)}</span>`));
      result.removed.forEach(r=>{
        if(flags.has('-v'))addLine(`<span class="t-success">rmdir: removing directory '${esc(r.name)}'</span>`);
      });
      renderGui();setLesson('rmdir');break;
    }

    case 'echo':{
      const raw2=input.replace(/^echo\s*/,'');
      const txt=raw2.replace(/^['"]|['"]$/g,'');
      if(flags.has('-n'))addLine(`<span class="t-out">${esc(txt)}</span>`);
      else addLine(`<span class="t-out">${esc(txt)}</span>`);
      setLesson('echo');break;
    }

    case 'grep':{
      const pattern=operands[0];
      const ignoreCase=flags.has('-i');
      const lineNums=flags.has('-n');
      if(!pattern){addLine('<span class="t-err">grep: missing pattern</span><br><span class="t-muted">Usage: grep [OPTIONS] PATTERN [FILE]</span>');break;}
      const result=commands.grep(S.cwd,pattern,operands[1],flags,pipeInput);
      if(result.err){addLine(`<span class="t-err">${esc(result.err)}</span>`);if(result.err.includes('no input'))addLine('<span class="t-muted">Usage: command | grep PATTERN  or  grep PATTERN FILE</span>');break;}
      if(result.count!==undefined){addText(String(result.count));}
      else{
        const hlRe=new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),ignoreCase?'gi':'g');
        result.matches.forEach(m=>{
          const hl=esc(m.text).replace(hlRe,mh=>`<span class="t-err">${mh}</span>`);
          if(lineNums)addLine(`<span class="t-muted" style="min-width:40px;display:inline-block;text-align:right;margin-right:8px">${m.lineNum}</span><span class="t-out">${hl}</span>`);
          else addLine(`<span class="t-out">${hl}</span>`);
        });
      }
      setLesson('grep');break;
    }

    case 'clear': {$out.innerHTML='';S.termHistory.push('---CLEAR---');setLesson('clear');break;}
    case 'whoami':{addText(USERNAME);setLesson('whoami');break;}
    case 'date':  {addText(new Date().toString());setLesson('date');break;}

    case 'man':{
      if(!operands.length){addLine(`<span class="t-err">What manual page do you want?</span><br><span class="t-out">For example: <span class="t-key">man ls</span></span>`);break;}
      if(CMD_HELP[operands[0]])printHelpPage(operands[0]);
      else addLine(`<span class="t-err">No manual entry for ${esc(operands[0])}</span><br><span class="t-muted">Available: ${ALL_CMDS.join(', ')}</span>`);
      setLesson('man');break;
    }

    case 'help':{
      if(operands.length&&CMD_HELP[operands[0]]){printHelpPage(operands[0]);setLesson(operands[0]);break;}
      // General help listing — card-style
      addLine(`<span class="t-out">GNU bash built-in commands. Type <span class="t-key">help NAME</span> or <span class="t-key">NAME --help</span> for details.</span>`);
      addLine('');
      // Group commands into categories
      const cats=[
        {label:'Navigation',    cmds:['ls','cd','pwd']},
        {label:'Files',         cmds:['touch','cp','mv','rm','rmdir','mkdir']},
        {label:'Viewing',       cmds:['cat','nano','echo','grep']},
        {label:'System',        cmds:['whoami','date','clear','export']},
        {label:'Documentation', cmds:['man','help']},
        {label:'Learning',      cmds:['challenge']},
      ];
      cats.forEach(cat=>{
        addLine(`<span class="t-section">── ${esc(cat.label)} ${'─'.repeat(Math.max(0,30-cat.label.length))}</span>`);
        cat.cmds.forEach(c=>{
          const h=CMD_HELP[c];if(!h)return;
          const syn=h.synopsis.replace(c+' ','').split(' ')[0]||'';
          const usage=(c+(syn?' '+syn:'')).padEnd(20);
          addLine(`<span class="t-out">  <span class="t-key">${esc(usage)}</span> ${esc(h.short)}</span>`);
        });
        addLine('');
      });
      addLine(`<span class="t-muted">  <span class="t-key">Tab</span> autocomplete  ·  <span class="t-key">↑↓</span> history  ·  <span class="t-key">ls -a</span> show hidden files  ·  <span class="t-key">>></span> append to file</span>`);
      setLesson('help');break;
    }

    case 'challenge':{
      const sub=(operands[0]||'').toLowerCase();
      const subArgs=operands.slice(1);
      switch(sub){
        case '':     printChallengeHelp();break;
        case 'list': printChallengeList();break;
        case 'start':{
          if(!subArgs[0]){addLine('<span class="t-err">challenge: missing challenge ID</span>');addLine('<span class="t-muted">Usage: <span class="t-teal">challenge start &lt;id&gt;</span>  — run <span class="t-teal">challenge list</span> to see IDs.</span>');break;}
          const ch=CHALLENGES.find(c=>c.id===subArgs[0]);
          if(!ch){addLine(`<span class="t-err">challenge: unknown challenge '<span class="t-amber">${esc(subArgs[0])}</span>'</span>`);addLine('<span class="t-muted">Run <span class="t-teal">challenge list</span> to see available IDs.</span>');break;}
          startChallenge(subArgs[0]);break;
        }
        case 'status':  printChallengeStatus();break;
        case 'tip':     printChallengeTip();break;
        case 'abandon': abandonChallenge();break;
        case 'reset':   resetChallengeProgress();break;
        default:
          addLine(`<span class="t-err">challenge: unknown subcommand '<span class="t-amber">${esc(sub)}</span>'</span>`);
          addLine('<span class="t-muted">Available: <span class="t-teal">list</span> <span class="t-teal">start</span> <span class="t-teal">status</span> <span class="t-teal">tip</span> <span class="t-teal">abandon</span> <span class="t-teal">reset</span></span>');
      }
      break;
    }

    case 'export':{
      const fmt=(operands[0]||'').toLowerCase();
      if(fmt==='txt'){exportTXT();}
      else if(fmt==='pdf'){exportPDF();}
      else{
        addLine('<span class="t-err">export: missing or unknown format</span>');
        addLine('<span class="t-muted">Usage: <span class="t-teal">export txt</span>  <span class="t-teal">export pdf</span></span>');
      }
      break;
    }

    default:{
      addLine(`<span class="t-err">bash: ${esc(cmd)}: command not found</span>`);
      addLine(`<span class="t-muted">Try '<span class="t-key">help</span>' for a list of commands.</span>`);
    }
  }
}

/* ═══════════════════════════
   INPUT EVENTS
   Key priority: Tab > AC navigation > history > enter
═══════════════════════════ */
$input.addEventListener('keydown',e=>{
  // TAB — always autocomplete, never history
  if(e.key==='Tab'){
    e.preventDefault();
    const c=getCompletions($input.value);
    if(c.length===1){applyAC(c[0]);}
    else if(c.length>1){
      const sh=c.reduce((a,b)=>a.insert.length<=b.insert.length?a:b);
      if(c.every(x=>x.insert.startsWith(sh.insert)))applyAC(sh);
      else showAC(c);
    }
    return;
  }

  // ARROW UP — if AC open, navigate AC; otherwise history
  if(e.key==='ArrowUp'){
    e.preventDefault();
    if(S.acItems.length){acMove(-1);return;}
    // History navigation — close AC first to avoid confusion
    hideAC();
    if(S.histIdx<S.cmdHistory.length-1){
      S.histIdx++;
      $input.value=S.cmdHistory[S.histIdx];
      // Don't trigger AC on history navigation — it's distracting
    }
    return;
  }

  // ARROW DOWN — if AC open, navigate AC; otherwise history
  if(e.key==='ArrowDown'){
    e.preventDefault();
    if(S.acItems.length){acMove(1);return;}
    hideAC();
    if(S.histIdx>0){S.histIdx--;$input.value=S.cmdHistory[S.histIdx];}
    else if(S.histIdx===0){S.histIdx=-1;$input.value='';}
    return;
  }

  // ENTER — if AC item selected, complete it; otherwise run command
  if(e.key==='Enter'){
    if(S.acItems.length&&S.acIdx>=0){applyAC(S.acItems[S.acIdx]);return;}
    const val=$input.value;$input.value='';hideAC();
    if(S.pendingConfirm){
      const cb=S.pendingConfirm;S.pendingConfirm=null;
      printPrompt(S.cwd,val);
      cb(val.trim().toLowerCase());
      return;
    }
    runCmd(val);return;
  }

  // ESCAPE — close AC or clear input
  if(e.key==='Escape'){
    if(S.acItems.length){hideAC();}
    else{$input.value='';S.histIdx=-1;}
    return;
  }
});

// Trigger AC on typing (but NOT after history navigation — only when user actually types)
$input.addEventListener('input',()=>{
  S.histIdx=-1; // reset history position when user types
  triggerAC();
  previewLesson();
});
$input.addEventListener('blur',()=>setTimeout(hideAC,150));

function previewLesson(){
  const val=$input.value.trim();
  if(!val){setLesson('help');return;}
  const cmd=val.split(/\s+/)[0];
  const exact=ALL_CMDS.find(c=>c===cmd);
  if(exact){setLesson(exact);return;}
  const prefix=ALL_CMDS.filter(c=>c.startsWith(cmd));
  if(prefix.length===1)setLesson(prefix[0]);
}

/* ═══════════════════════════
   EXPORT
═══════════════════════════ */
function htmlToText(html){
  const tmp=document.createElement('div');
  tmp.innerHTML=html;
  return tmp.textContent||tmp.innerText||'';
}

function exportTXT(){
  const lines=S.termHistory.map(h=>{
    if(h==='---CLEAR---')return '\n--- terminal cleared ---\n';
    if(h.startsWith('---CHALLENGE:')){
      const title=h.replace('---CHALLENGE:','').replace('---','');
      return `\n═══ Challenge: ${title} ═══\nVFS has been reset. Good luck!\n`;
    }
    return htmlToText(h);
  });
  const blob=new Blob([lines.join('\n')],{type:'text/plain'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='terminal-history.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportPDF(){
  const cssVars=[
    '--bg-deepest:#090c12','--bg-deep:#0d1117','--bg-mid:#161b24',
    '--bg-surface:#1c2230','--text-primary:#e2e8f4','--text-secondary:#8896b0',
    '--text-muted:#4a5568','--green:#3dffa0','--blue:#58a6ff',
    '--purple:#c792ea','--amber:#ffd080','--red:#ff7b7b',
    '--teal:#4dd9d9','--cyan:#79c0ff'
  ].join(';');
  const bodyLines=S.termHistory.map(h=>{
    if(h==='---CLEAR---')return '<div style="color:#4a5568;font-style:italic;padding:4px 0">--- terminal cleared ---</div>';
    if(h.startsWith('---CHALLENGE:')){
      const title=h.replace('---CHALLENGE:','').replace('---','');
      return `<div style="color:#ffd080;font-weight:700;letter-spacing:.03em;padding:8px 0;border-top:1px solid #333;margin-top:8px">═══ Challenge: ${esc(title)} ═══</div><div style="color:#4a5568;font-style:italic">VFS has been reset. Good luck!</div>`;
    }
    return '<div>'+h+'</div>';
  }).join('');
  const win=window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>Terminal History — ${esc(USERNAME)}</title>
<style>
  :root{${cssVars}}
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
  setTimeout(()=>{win.print();},250);
}

/* ═══════════════════════════
   INIT
═══════════════════════════ */
function init(){
  loadChallengeState();loadHistory();
  updatePrompt();renderGui(true);

  if(S.termHistory.length>0){
    let startIdx=0;
    for(let i=0;i<S.termHistory.length;i++){if(S.termHistory[i]==='---CLEAR---')startIdx=i+1;}
    const replay=S.termHistory.slice(startIdx);
    if(replay.length>0){
      replay.forEach(h=>{
      if(h==='---CLEAR---')return;
      if(h.startsWith('---CHALLENGE:')){
        const title=h.replace('---CHALLENGE:','').replace('---','');
        const d=document.createElement('div');
        d.innerHTML=`<span style="color:var(--amber);font-weight:700;letter-spacing:.03em">═══ Challenge: ${esc(title)} ═══</span>`;
        $out.appendChild(d);
        const d2=document.createElement('div');
        d2.innerHTML=`<span style="color:var(--text-muted);font-style:italic">VFS has been reset. Good luck!</span>`;
        $out.appendChild(d2);
        const d3=document.createElement('div');d3.innerHTML='';$out.appendChild(d3);
        return;
      }
      const d=document.createElement('div');
      d.innerHTML=h;$out.appendChild(d);
    });
    $out.scrollTop=$out.scrollHeight;
    }
  }else{
    addLine(`<span class="t-amber" style="font-weight:700;letter-spacing:.05em">Learn Linux - Terminal</span>`);
    addLine(`<span class="t-muted">─────────────────────────────────────────</span>`);
    addLine(`<span class="t-out">Welcome, <span style="color:var(--green)">${esc(USERNAME)}</span>! You are in <span class="t-path">~/</span></span>`);
    addLine(`<span class="t-out">The <span style="color:var(--cyan)">preview pane</span> on the right mirrors every command you run.</span>`);
    addLine(`<span class="t-muted"> • <span class="t-key">help</span> — browse all commands by category</span>`);
    addLine(`<span class="t-muted"> • <span class="t-key">ls -la</span> — long list + hidden files &nbsp; <span class="t-key">Tab</span> — autocomplete &nbsp; <span class="t-key">↑↓</span> — history</span>`);
    addLine(`<span class="t-muted"> • <span class="t-key">echo "text" >> file</span> — append to a file &nbsp; <span class="t-key">command --help</span> — usage info</span>`);
    addLine(`<span class="t-muted">─────────────────────────────────────────</span>`);
    addLine('');
  }

  $input.focus();
  document.addEventListener('keydown',function focusInput(e){
    if(S.nanoMode||document.activeElement===$input)return;
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey)$input.focus();
  });
}

function showUsernameDialog(){
  const overlay=document.getElementById('username-overlay');
  const dialog=document.getElementById('username-dialog');
  const input=document.getElementById('username-input');
  const btn=document.getElementById('username-btn');
  const err=document.getElementById('username-error');
  const usersEl=document.getElementById('ud-users');
  const newUserEl=document.getElementById('ud-new-user');
  const inputWrap=document.getElementById('ud-input-wrap');
  const cardTitle=document.getElementById('ud-card-title');
  const backBtn=document.getElementById('ud-back-btn');
  const clockEl=document.getElementById('ud-clock');
  const bootEl=document.getElementById('login-boot');
  const linesEl=document.getElementById('boot-lines');

  overlay.classList.add('visible');
  dialog.style.opacity='0';
  bootEl.classList.remove('lb-hidden');

  const bootLines=[
    `<span class="bl-dim">Penguinix 24.04 LTS</span>`,
    ``,
    `<span class="bl-dim">Loading kernel modules...</span>        <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Starting system services...</span>      <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Mounting filesystems...</span>          <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Calibrating penguin emoji...</span>     <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Starting network manager...</span>      <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Searching for /dev/fun...</span>       <span class="bl-fail">[SKIP]</span>`,
    `<span class="bl-dim">Initializing virtual filesystem...</span> <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Downloading more RAM...</span>           <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Compiling vim from source...</span>     <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Removing snap packages...</span>        <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Asking Stack Overflow for help...</span> <span class="bl-wait">[WAIT]</span>`,
    `<span class="bl-dim">Converting tabs to spaces...</span>     <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Checking if penguins can fly...</span>  <span class="bl-fail">[FAIL]</span>`,
    `<span class="bl-dim">Redirecting stdout to /dev/null...</span> <span class="bl-ok">[  OK  ]</span>`,
    `<span class="bl-dim">Making rm -rf safe...</span>            <span class="bl-fail">[FAIL]</span>`,
    `<span class="bl-dim">Starting terminal emulator...</span>    <span class="bl-ok">[  OK  ]</span>`,
  ];

  linesEl.innerHTML='';
  let bi=0;
  function addBootLine(){
    if(bi>=bootLines.length){
      setTimeout(()=>{
        bootEl.style.transition='opacity .4s ease-out';
        bootEl.style.opacity='0';
        setTimeout(()=>{
          bootEl.classList.add('lb-hidden');
          bootEl.style.transition='';
          bootEl.style.opacity='';
          showLoginCard();
        },400);
      },300);
      return;
    }
    const div=document.createElement('div');
    div.className='bl-line';
    div.innerHTML=bootLines[bi];
    linesEl.appendChild(div);
    bi++;
    setTimeout(addBootLine,100+Math.random()*60);
  }
  addBootLine();

  function updateClock(){
    const now=new Date();
    const h=now.getHours(),m=now.getMinutes();
    clockEl.textContent=`${h<10?'0':''}${h}:${m<10?'0':''}${m}`;
  }
  updateClock();
  const clockTimer=setInterval(updateClock,10000);

  function showLoginCard(){
    let existingUsers=[];
    const savedVFS=localStorage.getItem('linux-vfs');
    if(savedVFS){
      try{
        const root=JSON.parse(savedVFS);
        const home=root.children&&root.children['home'];
        if(home&&home.children){
          existingUsers=Object.keys(home.children).filter(n=>home.children[n].type==='dir');
        }
      }catch(e){}
    }

    dialog.style.transition='opacity .5s ease-out';
    dialog.style.opacity='1';

    if(existingUsers.length===0){
      showNewUserInput();
    }else{
      renderUserList(existingUsers);
    }
  }

  function showUserList(){
    inputWrap.style.display='none';
    usersEl.style.display='flex';
    newUserEl.style.display='flex';
    cardTitle.textContent='Sign in';
    err.classList.remove('visible');
    input.value='';
  }

  function renderUserList(existingUsers){
    usersEl.innerHTML='';
    existingUsers.forEach(name=>{
      const b=document.createElement('button');
      b.className='ud-user-btn';
      b.innerHTML=`<div class="ud-user-avatar">${esc(name[0])}</div><div class="ud-user-name">${esc(name)}</div><div class="ud-user-delete" title="Delete user">&times;</div>`;
      b.addEventListener('click',()=>loginAs(name));
      b.querySelector('.ud-user-delete').addEventListener('click',async(e)=>{
        e.stopPropagation();
        const ok=await showDialog('Delete user?',`This will permanently delete the user "${name}" and all their files.`,'Delete');
        if(!ok)return;
        loadVFS(); // ensure VFS is loaded from localStorage before modifying
        const homeParent=getNode('/home');
        if(homeParent&&homeParent.children){delete homeParent.children[name];}
        saveVFS();
        const remaining=Object.keys(homeParent?.children||{}).filter(n=>homeParent.children[n].type==='dir');
        if(remaining.length===0){showNewUserInput();}
        else{renderUserList(remaining);}
      });
      usersEl.appendChild(b);
    });
  }

  function showNewUserInput(){
    usersEl.style.display='none';
    inputWrap.style.display='block';
    newUserEl.style.display='none';
    cardTitle.textContent='New User';
    err.classList.remove('visible');
    input.value='';
    input.focus();
  }

  /* ═══ Three-dots more menu: import/export ═══ */
  const $moreBtn=document.getElementById('ud-more-btn');
  const $moreDropdown=document.getElementById('ud-more-dropdown');
  const $importFile=document.getElementById('import-file-input');

  $moreBtn.addEventListener('click',e=>{
    e.stopPropagation();
    $moreDropdown.classList.toggle('visible');
    $moreBtn.classList.toggle('open');
  });
  document.addEventListener('click',()=>{
    $moreDropdown.classList.remove('visible');
    $moreBtn.classList.remove('open');
  });

  $moreDropdown.addEventListener('click',e=>{
    const item=e.target.closest('.ud-more-item');
    if(!item)return;
    $moreDropdown.classList.remove('visible');
    $moreBtn.classList.remove('open');
    const action=item.dataset.action;
    if(action==='export')handleExport();
    else if(action==='import')handleImport();
    else if(action==='reset')handleReset();
  });

  function handleReset(){
    showDialog('Reset Workspace',
      'This will permanently delete ALL users and their data, including:\n\n'+
      '  • All users and home directories\n'+
      '  • All files and folders\n'+
      '  • Challenge progress\n'+
      '  • Command history\n\n'+
      'The page will reload with a clean workspace.',
      'Delete All','danger').then(ok=>{
      if(!ok)return;
      localStorage.removeItem('linux-vfs');
      localStorage.removeItem('linux-challenges');
      Object.keys(localStorage).filter(k=>k.startsWith('linux-cmdHistory-')||k.startsWith('linux-termHistory-')).forEach(k=>localStorage.removeItem(k));
      location.reload();
    });
  }

  function handleExport(){
    const msg='This will export all workspace data including:\n\n'+
      '  • All users and their home directories\n'+
      '  • All files and folders\n'+
      '  • Challenge progress\n'+
      '  • Command history for each user\n\n'+
      'The file can be imported on another device to restore the exact workspace.';
    showDialog('Export Workspace',msg,'Export').then(ok=>{
      if(!ok)return;
      const data={
        version:1,
        vfs:null,
        challenges:null,
        histories:{}
      };
      try{
        const raw=localStorage.getItem('linux-vfs');
        if(raw)data.vfs=JSON.parse(raw);
      }catch(e){}
      try{
        const raw=localStorage.getItem('linux-challenges');
        if(raw)data.challenges=JSON.parse(raw);
      }catch(e){}
      // gather per-user histories
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key.startsWith('linux-cmdHistory-')){
          const user=key.slice('linux-cmdHistory-'.length);
          if(!data.histories[user])data.histories[user]={};
          try{data.histories[user].cmdHistory=JSON.parse(localStorage.getItem(key));}catch(e){}
        }
        if(key.startsWith('linux-termHistory-')){
          const user=key.slice('linux-termHistory-'.length);
          if(!data.histories[user])data.histories[user]={};
          try{data.histories[user].termHistory=JSON.parse(localStorage.getItem(key));}catch(e){}
        }
      }
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;
      a.download='workspace-export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url),5000);
    });
  }

  function handleImport(){
    showDialog('Import Workspace',
      '⚠️  This will REPLACE all current users and their data with the contents of the import file.\n\n'+
      'All existing users, files, challenge progress, and history will be lost.\n\n'+
      'This action cannot be undone.',
      'Continue').then(ok=>{
      if(!ok)return;
      $importFile.click();
    });
  }

  $importFile.addEventListener('change',function(){
    const file=this.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=function(e){
      try{
        const data=JSON.parse(e.target.result);
        if(!data||data.version!==1||!data.vfs){
          showDialog('Import Error','The file format is invalid or incompatible.','OK');
          return;
        }
        // Save VFS
        localStorage.setItem('linux-vfs',JSON.stringify(data.vfs));
        // Save challenges
        if(data.challenges){
          localStorage.setItem('linux-challenges',JSON.stringify(data.challenges));
        }else{
          localStorage.removeItem('linux-challenges');
        }
        // Save per-user histories
        if(data.histories){
          Object.entries(data.histories).forEach(([user,h])=>{
            if(h.cmdHistory)localStorage.setItem('linux-cmdHistory-'+user,JSON.stringify(h.cmdHistory));
            if(h.termHistory)localStorage.setItem('linux-termHistory-'+user,JSON.stringify(h.termHistory));
          });
        }
        // Reload to apply
        location.reload();
      }catch(err){
        showDialog('Import Error','Failed to read the file: '+err.message,'OK');
      }
    };
    reader.readAsText(file);
    this.value=''; // allow re-import of same file
  });

  newUserEl.addEventListener('click',showNewUserInput);
  backBtn.addEventListener('click',showUserList);

  function loginAs(name){
    USERNAME=name;
    HOME='/home/'+USERNAME;
    S.cwd=HOME;
    if(!loadVFS())createVFS();
    ensureHome();
    saveVFS();
    S.cmdHistory=[];S.termHistory=[];
    clearInterval(clockTimer);

    dialog.style.transition='opacity .4s ease-out';
    dialog.style.opacity='0';
    setTimeout(()=>{
      overlay.style.transition='opacity .4s ease-out';
      overlay.style.opacity='0';
      setTimeout(()=>{
        overlay.classList.remove('visible');
        overlay.style.transition='';
        overlay.style.opacity='';
        $main.querySelectorAll('.window').forEach(w=>w.classList.add('scale-in'));
        initTaskbar();
        init();
      },400);
    },400);
  }

  function ensureHome(){
    const homeNode=getNode(HOME);
    if(!homeNode||homeNode.type!=='dir'){
      const homeParent=getNode('/home');
      if(homeParent&&homeParent.type==='dir'){
        const home=makeNode('dir');
        home.children={
          '.hidden':   makeNode('file',''),
          'Desktop':   makeNode('dir'),
          'Downloads': makeNode('dir'),
          'Documents': makeNode('dir'),
          'readme.txt':makeNode('file','Welcome to Linux!\nThis is your home directory.\n\nTry these commands:\n  ls        list files\n  ls -a     show hidden files\n  ls -l     show detailed list\n  ls -la    both combined\n  mkdir     create a folder\n  touch     create a file\n  nano      edit a file\n'),
        };
        homeParent.children[USERNAME]=home;
        VFS[HOME]=home;
      }
    }
  }

  function submit(){
    const val=input.value.trim();
    if(!val){err.classList.add('visible');input.focus();return;}
    if(/[^a-zA-Z0-9]/.test(val)){err.textContent='Only letters and numbers allowed.';err.classList.add('visible');input.focus();return;}
    loginAs(val);
  }

  btn.addEventListener('click',submit);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')submit();if(e.key==='Escape')showUserList();});
  input.addEventListener('input',()=>err.classList.remove('visible'));
}

/* ═══════════════════════════
   TASKBAR — clock, start menu, window buttons, logout
═══════════════════════════ */
const $taskbarClock=document.getElementById('taskbar-clock');
const $taskbarWindows=document.getElementById('taskbar-windows');
const $startBtn=document.getElementById('start-btn');
const $startMenu=document.getElementById('start-menu');
const $startMenuUser=document.getElementById('start-menu-user');
const $startLogout=document.getElementById('start-logout');

(function updateTaskbarClock(){
  const now=new Date();
  const h=now.getHours(),m=now.getMinutes();
  const ampm=h>=12?'PM':'AM';
  const h12=h%12||12;
  $taskbarClock.textContent=`${h12}:${m<10?'0':''}${m} ${ampm}`;
  setTimeout(updateTaskbarClock,10000);
})();

$startBtn.addEventListener('click',e=>{
  e.stopPropagation();
  const open=$startMenu.classList.toggle('visible');
  $startBtn.classList.toggle('open',open);
});

$startLogout.addEventListener('click',()=>{
  $startMenu.classList.remove('visible');
  $startBtn.classList.remove('open');
  location.reload();
});

document.addEventListener('click',()=>{
  $startMenu.classList.remove('visible');
  $startBtn.classList.remove('open');
});

const WINDOW_DEFS=[
  {id:'terminal-window',label:'Terminal',icon:'<span style="color:var(--green)">▸</span>'},
  {id:'gui-window',label:'Files',icon:'📁'},
  {id:'challenges-window',label:'Challenges',icon:'⚡'},
];

function initTaskbar(){
  $startMenuUser.textContent=USERNAME;
  $taskbarWindows.innerHTML='';
  WINDOW_DEFS.forEach(w=>{
    const btn=document.createElement('div');
    btn.className='tb-win-btn';
    btn.dataset.win=w.id;
    btn.innerHTML=`<span class="tb-win-icon">${w.icon}</span><span>${w.label}</span>`;
    btn.addEventListener('click',()=>toggleWindow(w.id));
    $taskbarWindows.appendChild(btn);
  });
  updateTaskbarBtns();
}

function toggleWindow(winId){
  const el=document.getElementById(winId);
  if(!el)return;
  if(el.classList.contains('minimized')){
    el.classList.remove('minimized');
    el.style.display='';
    if(winId==='challenges-window')renderChallengeWindow();
    updateTaskbarBtns();
  }else{
    el.classList.add('minimized');
    el.style.display='none';
    updateTaskbarBtns();
  }
}

function updateTaskbarBtns(){
  WINDOW_DEFS.forEach(w=>{
    const el=document.getElementById(w.id);
    const btn=$taskbarWindows.querySelector(`[data-win="${w.id}"]`);
    if(!el||!btn)return;
    btn.classList.toggle('minimized',el.classList.contains('minimized'));
  });
}

document.querySelectorAll('.win-dot-y').forEach(dot=>{
  dot.style.cursor='pointer';
  dot.addEventListener('click',()=>{
    const win=dot.closest('.window');
    if(!win||!win.id)return;
    win.classList.add('minimized');
    win.style.display='none';
    updateTaskbarBtns();
  });
});

showUsernameDialog();
