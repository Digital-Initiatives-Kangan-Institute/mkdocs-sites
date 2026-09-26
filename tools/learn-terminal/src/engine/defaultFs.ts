/* engine/defaultFs.ts — the starting filesystem for a new workspace */

import { VFS, HOME, getNode, makeNode, type DirNode } from '../lib/vfs.ts';

const README = 'Welcome to Linux!\nThis is your home directory.\n\nTry these commands:\n  ls        list files\n  ls -a     show hidden files\n  ls -l     show detailed list\n  ls -la    both combined\n  mkdir     create a folder\n  touch     create a file\n  nano      edit a file\n';

/** Build a fresh root filesystem (with the user's home directory) into VFS. */
export function createVFS(USERNAME: string) {
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
      'readme.txt': {type:'file',mtime:new Date('2025-01-15T10:30:00'),size:128,content:README}
    }
  };
  // link home dir under /home
  const userDir=HOME.split('/').pop()!;
  (VFS['/'].children['home'] as DirNode).children[userDir]=VFS[HOME];
}

/** Create the user's home directory if a loaded workspace doesn't have one yet. */
export function ensureHome(username: string) {
  const homeNode = getNode(HOME);
  if (homeNode && homeNode.type === 'dir') return;
  const homeParent = getNode('/home');
  if (!homeParent || homeParent.type !== 'dir') return;
  const home = makeNode('dir');
  home.children = {
    '.hidden':    makeNode('file', ''),
    'Desktop':    makeNode('dir'),
    'Downloads':  makeNode('dir'),
    'Documents':  makeNode('dir'),
    'readme.txt': makeNode('file', README),
  };
  homeParent.children[username] = home;
  VFS[HOME] = home;
}
