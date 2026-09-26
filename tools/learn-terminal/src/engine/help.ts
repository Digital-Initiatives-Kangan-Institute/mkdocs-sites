/* engine/help.ts — man / --help pages and autocomplete descriptions */

import { MOD_KEY } from './platform.ts';

export interface CmdHelp {
  synopsis: string;
  short: string;
  desc: string;
  opts?: { f: string; d: string }[];
  example?: string;
  keys?: string[];
}

export const CMD_HELP: Record<string, CmdHelp> = {
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

export const ALL_CMDS = Object.keys(CMD_HELP);
