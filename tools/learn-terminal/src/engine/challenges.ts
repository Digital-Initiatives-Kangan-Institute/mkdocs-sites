/* engine/challenges.ts — guided challenge definitions
 *
 * Each step's validate() runs after every command with the parsed command line
 * and a context object. Validators may throw on unexpected VFS shapes; the
 * caller treats a throw as "not yet complete".
 */

import { HOME, normPath, getNode, makeNode, resolvePath } from '../lib/vfs.ts';

export interface ChallengeCtx {
  cwd: string;
  // Loosely typed on purpose: validators probe arbitrary paths and rely on the
  // caller's try/catch when a node is missing or has the wrong type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNode: (path: string) => any;
  resolvePath: typeof resolvePath;
  raw?: string;
  usedPipe?: boolean;
  lastRedirect?: { mode: 'append' | 'overwrite'; file: string };
}

export interface ChallengeStep {
  desc: string; // HTML
  tip: string;
  validate(cmd: string, args: string[], flags: Set<string>, operands: string[], ctx: ChallengeCtx): unknown;
}

export interface Challenge {
  id: string;
  title: string;
  desc: string;
  stars: number;
  clearVFS?: boolean;
  setup(): void;
  steps: ChallengeStep[];
}

/** Difficulty shown in the UI is derived from step count, not the `stars` field. */
export function starCount(ch: Challenge): number {
  const n = ch.steps.length;
  return n <= 6 ? 1 : n <= 8 ? 2 : n <= 10 ? 3 : n <= 12 ? 4 : 5;
}

function _mkfile(p: string, c?: string) { const rp = normPath(p); const dir = getNode(normPath(rp + '/..')); if (dir && dir.type === 'dir') { dir.children[rp.split('/').pop()!] = makeNode('file', c || ''); } }
function _mkdir(p: string) { const rp = normPath(p); const dir = getNode(normPath(rp + '/..')); if (dir && dir.type === 'dir') { dir.children[rp.split('/').pop()!] = makeNode('dir', ''); } }

export const CHALLENGES: Challenge[] = [
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
    _mkdir(`${HOME}/workspace`);
  },steps:[
    {desc:'Enter the workspace folder: <span class="t-key">cd workspace</span>',tip:'cd (change directory) moves you into a folder. Think of it as walking through a door into another room.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Confirm your location with <span class="t-key">pwd</span>',tip:'pwd confirms where you are. After using cd, it\'s good practice to verify you ended up in the right place.',validate(cmd,_,__,___,ctx){return cmd==='pwd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'View the contents with <span class="t-key">ls</span>',tip:'Now that you\'re inside the workspace folder, ls will show you what\'s inside it.',validate(cmd){return cmd==='ls';}},
    {desc:'Return to your home directory with <span class="t-key">cd</span>',tip:'Running cd with no arguments takes you straight back to your home directory — a handy shortcut.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── ACTIVITY 3: Folder Structure ──
  {id:'folder-structure',title:'Folder Structure',desc:'Learn how folders can be organised.',stars:1,clearVFS:true,setup(){
    _mkdir(`${HOME}/workspace`);
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;
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
    const w=`${HOME}/workspace`;_mkdir(w);
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
    const w=`${HOME}/workspace`;_mkdir(w);
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
    const w=`${HOME}/workspace`;_mkdir(w);
  },steps:[
    {desc:'Navigate: <span class="t-key">cd workspace</span>',tip:'Start in the workspace — you\'ll build a complete server structure from scratch.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd.endsWith('/workspace');}},
    {desc:'Create structure: <span class="t-key">mkdir -p server/data server/backups server/logs server/archive</span>',tip:'mkdir -p builds an entire directory tree in one command — efficient for setting up project structure.',validate(cmd,_,__,___,ctx){if(cmd!=='mkdir')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server'));return d&&d.children['data']&&d.children['backups']&&d.children['logs']&&d.children['archive'];}},
    {desc:'Create files: <span class="t-key">echo "Server config" > server/data/config.txt && echo "Access log" > server/logs/access.txt && echo "Error log" > server/logs/errors.txt</span>',tip:'The && operator chains commands — each one runs only if the previous one succeeded.',validate(cmd,_,__,___,ctx){if(cmd!=='echo')return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server/data/config.txt'));return n&&n.content.includes('config');}},
    {desc:'Create more files: <span class="t-key">touch server/data/users.txt server/data/db.txt</span>',tip:'touch creates empty files — useful for setting up placeholders you\'ll fill in later.',validate(cmd,_,__,___,ctx){if(cmd!=='touch')return false;const d=ctx.getNode(ctx.resolvePath(ctx.cwd,HOME+'/workspace/server/data'));return d&&d.children['users.txt']&&d.children['db.txt'];}},
    {desc:'Edit a file: <span class="t-key">echo "admin:x:1000" >> server/data/users.txt</span>',tip:'>> appends to a file instead of overwriting — use > to replace, >> to add to the end.',validate(cmd){return cmd==='echo';}},
    {desc:'View a file: <span class="t-key">cat server/data/config.txt</span>',tip:'cat displays file contents — always check that your data was written correctly.',validate(cmd){return cmd==='cat';}},
    {desc:'Copy a file: <span class="t-key">cp server/data/config.txt server/backups/config_backup.txt</span>',tip:'Back up critical config files before making changes — you can always restore from the backup.',validate(cmd,_,__,op,ctx){if(cmd!=='cp'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Rename a file: <span class="t-key">mv server/logs/errors.txt server/logs/error_log.txt</span>',tip:'Consistent naming conventions make log files easier to search and parse.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]));return n&&n.type==='file';}},
    {desc:'Move a file: <span class="t-key">mv server/data/users.txt server/archive/</span>',tip:'Archiving completed data keeps the active data folder clean and focused.',validate(cmd,_,__,op,ctx){if(cmd!=='mv'||op.length<2)return false;const n=ctx.getNode(ctx.resolvePath(ctx.cwd,op[1]+'/users.txt'));return n&&n.type==='file';}},
    {desc:'Delete unnecessary files: <span class="t-key">rm server/data/db.txt</span>',tip:'Remove files that are no longer needed — keep the server data directory lean.',validate(cmd,_,__,op,ctx){if(cmd!=='rm'||!op.length)return false;const rp=ctx.resolvePath(ctx.cwd,op[0]);return!ctx.getNode(rp);}},
    {desc:'Return to home: <span class="t-key">cd</span>',tip:'You\'ve built a complete server file structure. Back to home.',validate(cmd,_,__,___,ctx){return cmd==='cd'&&ctx.cwd===HOME;}},
  ]},

  // ── CHALLENGE 4: Final Boss ──
  {id:'final-boss',title:'The Final Challenge',desc:'Build an entire company server from scratch.',stars:5,clearVFS:true,setup(){
    const w=`${HOME}/workspace`;_mkdir(w);
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
