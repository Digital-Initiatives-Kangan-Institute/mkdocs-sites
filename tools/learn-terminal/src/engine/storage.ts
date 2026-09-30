/* engine/storage.ts — localStorage persistence and workspace import/export
 *
 * Key names and the export file format (version 1) are unchanged from the
 * original vanilla build so existing student workspaces keep working.
 */

import { VFS, serializeNode, deserializeNode, type DirNode, type SerializedNode } from '../lib/vfs.ts';

const VFS_KEY = 'linux-vfs';
const CHALLENGES_KEY = 'linux-challenges';
const CMD_HISTORY_PREFIX = 'linux-cmdHistory-';
const TERM_HISTORY_PREFIX = 'linux-termHistory-';

export interface ChallengeState {
  completed: string[];
  active: string | null;
  activeSteps: number[];
}

/* ── VFS ─────────────────────────────────────────────── */

export function saveVFS() {
  try { localStorage.setItem(VFS_KEY, JSON.stringify(serializeNode(VFS['/']))); } catch { /* storage full or blocked */ }
}

/** Load the saved filesystem into VFS. Returns false when there is none. */
export function loadVFS(): boolean {
  try {
    const raw = localStorage.getItem(VFS_KEY);
    if (raw) { VFS['/'] = deserializeNode(JSON.parse(raw)) as DirNode; return true; }
  } catch { /* corrupt data: fall through to a fresh VFS */ }
  return false;
}

/** Usernames with a home directory in the saved workspace. */
export function listSavedUsers(): string[] {
  try {
    const raw = localStorage.getItem(VFS_KEY);
    if (!raw) return [];
    const home = (JSON.parse(raw) as SerializedNode).children?.['home'];
    if (!home?.children) return [];
    return Object.keys(home.children).filter(n => home.children![n].type === 'dir');
  } catch { return []; }
}

/* ── Per-user history ────────────────────────────────── */

export function saveHistory(username: string, cmdHistory: string[], termHistory: string[]) {
  try {
    localStorage.setItem(CMD_HISTORY_PREFIX + username, JSON.stringify(cmdHistory));
    localStorage.setItem(TERM_HISTORY_PREFIX + username, JSON.stringify(termHistory));
  } catch { /* ignore */ }
}

export function loadHistory(username: string): { cmdHistory: string[]; termHistory: string[] } {
  try {
    const cmd = localStorage.getItem(CMD_HISTORY_PREFIX + username);
    const term = localStorage.getItem(TERM_HISTORY_PREFIX + username);
    return { cmdHistory: cmd ? JSON.parse(cmd) : [], termHistory: term ? JSON.parse(term) : [] };
  } catch { return { cmdHistory: [], termHistory: [] }; }
}

/* ── Challenge progress (shared across users) ────────── */

export function loadChallengeState(): ChallengeState {
  const state: ChallengeState = { completed: [], active: null, activeSteps: [] };
  try {
    const d = JSON.parse(localStorage.getItem(CHALLENGES_KEY) || 'null');
    if (d && Array.isArray(d.completed)) Object.assign(state, d, { activeSteps: d.activeSteps || [] });
  } catch { /* ignore */ }
  return state;
}

export function saveChallengeState(state: ChallengeState) {
  try { localStorage.setItem(CHALLENGES_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

/* ── Whole-workspace operations (login screen menu) ──── */

function isHistoryKey(k: string) {
  return k.startsWith(CMD_HISTORY_PREFIX) || k.startsWith(TERM_HISTORY_PREFIX);
}

export function resetWorkspace() {
  localStorage.removeItem(VFS_KEY);
  localStorage.removeItem(CHALLENGES_KEY);
  Object.keys(localStorage).filter(isHistoryKey).forEach(k => localStorage.removeItem(k));
}

interface WorkspaceExport {
  version: 1;
  vfs: SerializedNode | null;
  challenges: ChallengeState | null;
  histories: Record<string, { cmdHistory?: string[]; termHistory?: string[] }>;
}

function parseItem<T>(key: string): T | null {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function exportWorkspace(): WorkspaceExport {
  const data: WorkspaceExport = {
    version: 1,
    vfs: parseItem(VFS_KEY),
    challenges: parseItem(CHALLENGES_KEY),
    histories: {},
  };
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    for (const [prefix, field] of [[CMD_HISTORY_PREFIX, 'cmdHistory'], [TERM_HISTORY_PREFIX, 'termHistory']] as const) {
      if (!key.startsWith(prefix)) continue;
      const user = key.slice(prefix.length);
      const entry = (data.histories[user] ??= {});
      const value = parseItem<string[]>(key);
      if (value) entry[field] = value;
    }
  }
  return data;
}

/** Replace the stored workspace with an export file's contents. Throws on invalid files. */
export function importWorkspace(json: string) {
  const data = JSON.parse(json) as Partial<WorkspaceExport>;
  if (!data || data.version !== 1 || !data.vfs) throw new InvalidWorkspaceError();
  localStorage.setItem(VFS_KEY, JSON.stringify(data.vfs));
  if (data.challenges) localStorage.setItem(CHALLENGES_KEY, JSON.stringify(data.challenges));
  else localStorage.removeItem(CHALLENGES_KEY);
  Object.entries(data.histories || {}).forEach(([user, h]) => {
    if (h.cmdHistory) localStorage.setItem(CMD_HISTORY_PREFIX + user, JSON.stringify(h.cmdHistory));
    if (h.termHistory) localStorage.setItem(TERM_HISTORY_PREFIX + user, JSON.stringify(h.termHistory));
  });
}

export class InvalidWorkspaceError extends Error {
  constructor() { super('The file format is invalid or incompatible.'); }
}
