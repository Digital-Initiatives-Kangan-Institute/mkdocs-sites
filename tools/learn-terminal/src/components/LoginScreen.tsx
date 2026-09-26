import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react'
import { terminal } from '../engine/terminal.ts'
import { showDialog } from '../engine/dialog.ts'
import * as storage from '../engine/storage.ts'
import { getNode } from '../lib/vfs.ts'
import { useClock, useDocumentClick } from '../hooks.ts'

const BOOT_LINES: [label: string, status: string, cls: 'bl-ok' | 'bl-fail' | 'bl-wait'][] = [
  ['Loading kernel modules...        ', '[  OK  ]', 'bl-ok'],
  ['Starting system services...      ', '[  OK  ]', 'bl-ok'],
  ['Mounting filesystems...          ', '[  OK  ]', 'bl-ok'],
  ['Calibrating penguin emoji...     ', '[  OK  ]', 'bl-ok'],
  ['Starting network manager...      ', '[  OK  ]', 'bl-ok'],
  ['Searching for /dev/fun...       ', '[SKIP]', 'bl-fail'],
  ['Initializing virtual filesystem... ', '[  OK  ]', 'bl-ok'],
  ['Downloading more RAM...           ', '[  OK  ]', 'bl-ok'],
  ['Compiling vim from source...     ', '[  OK  ]', 'bl-ok'],
  ['Removing snap packages...        ', '[  OK  ]', 'bl-ok'],
  ['Asking Stack Overflow for help... ', '[WAIT]', 'bl-wait'],
  ['Converting tabs to spaces...     ', '[  OK  ]', 'bl-ok'],
  ['Checking if penguins can fly...  ', '[FAIL]', 'bl-fail'],
  ['Redirecting stdout to /dev/null... ', '[  OK  ]', 'bl-ok'],
  ['Making rm -rf safe...            ', '[FAIL]', 'bl-fail'],
  ['Starting terminal emulator...    ', '[  OK  ]', 'bl-ok'],
]
// Header plus a blank line precede the service lines.
const BOOT_TOTAL = BOOT_LINES.length + 2

const EXPORT_MSG = 'This will export all workspace data including:\n\n'
  + '  • All users and their home directories\n'
  + '  • All files and folders\n'
  + '  • Challenge progress\n'
  + '  • Command history for each user\n\n'
  + 'The file can be imported on another device to restore the exact workspace.'

const IMPORT_MSG = '⚠️  This will REPLACE all current users and their data with the contents of the import file.\n\n'
  + 'All existing users, files, challenge progress, and history will be lost.\n\n'
  + 'This action cannot be undone.'

const RESET_MSG = 'This will permanently delete ALL users and their data, including:\n\n'
  + '  • All users and home directories\n'
  + '  • All files and folders\n'
  + '  • Challenge progress\n'
  + '  • Command history\n\n'
  + 'The page will reload with a clean workspace.'

type Stage = 'boot' | 'bootFade' | 'card' | 'leaving' | 'overlayFade'

function BootLine({ index }: { index: number }) {
  if (index === 0) return <div className="bl-line"><span className="bl-dim">Penguinix 24.04 LTS</span></div>
  if (index === 1) return <div className="bl-line" />
  const [label, status, cls] = BOOT_LINES[index - 2]
  return <div className="bl-line"><span className="bl-dim">{label}</span> <span className={cls}>{status}</span></div>
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}

function formatClock(now: Date) {
  const h = now.getHours(), m = now.getMinutes()
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`
}

/** Boot animation, then the user picker / new user form. Calls onLoggedIn once faded out. */
export default function LoginScreen({ onLoggedIn }: { onLoggedIn: () => void }) {
  const now = useClock()
  const [stage, setStage] = useState<Stage>('boot')
  const [bootCount, setBootCount] = useState(0)
  const [users, setUsers] = useState<string[]>([])
  const [mode, setMode] = useState<'list' | 'new'>('list')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDocumentClick(menuOpen, closeMenu)

  // Boot sequence: print lines one by one, fade out, then show the login card.
  useEffect(() => {
    if (stage !== 'boot') return
    const timer = bootCount < BOOT_TOTAL
      ? setTimeout(() => setBootCount(c => c + 1), bootCount === 0 ? 0 : 100 + Math.random() * 60)
      : setTimeout(() => setStage('bootFade'), 300)
    return () => clearTimeout(timer)
  }, [stage, bootCount])

  useEffect(() => {
    if (stage !== 'bootFade') return
    const timer = setTimeout(() => {
      const saved = storage.listSavedUsers()
      setUsers(saved)
      setMode(saved.length ? 'list' : 'new')
      setStage('card')
    }, 400)
    return () => clearTimeout(timer)
  }, [stage])

  // Logging in: fade the card, then the whole overlay.
  useEffect(() => {
    if (stage === 'leaving') {
      const timer = setTimeout(() => setStage('overlayFade'), 400)
      return () => clearTimeout(timer)
    }
    if (stage === 'overlayFade') {
      const timer = setTimeout(onLoggedIn, 400)
      return () => clearTimeout(timer)
    }
  }, [stage, onLoggedIn])

  useEffect(() => {
    if (stage === 'card' && mode === 'new') inputRef.current?.focus()
  }, [stage, mode])

  const showUserList = () => { setMode('list'); setError(null); setName('') }
  const showNewUserInput = () => { setMode('new'); setError(null); setName(''); inputRef.current?.focus() }

  const loginAs = (user: string) => {
    terminal.login(user)
    setStage('leaving')
  }

  const submit = () => {
    const val = name.trim()
    if (!val) { setError('Please enter a username.'); inputRef.current?.focus(); return }
    if (/[^a-zA-Z0-9]/.test(val)) { setError('Only letters and numbers allowed.'); inputRef.current?.focus(); return }
    loginAs(val)
  }

  const deleteUser = async (user: string) => {
    const ok = await showDialog('Delete user?', `This will permanently delete the user "${user}" and all their files.`, 'Delete')
    if (!ok) return
    storage.loadVFS() // make sure we edit the saved workspace, not a stale in-memory one
    const homeParent = getNode('/home')
    const remaining: string[] = []
    if (homeParent && homeParent.type === 'dir') {
      delete homeParent.children[user]
      remaining.push(...Object.keys(homeParent.children).filter(n => homeParent.children[n].type === 'dir'))
    }
    storage.saveVFS()
    if (remaining.length === 0) showNewUserInput()
    else setUsers(remaining)
  }

  const onMenuAction = async (action: 'import' | 'export' | 'reset') => {
    setMenuOpen(false)
    if (action === 'export') {
      if (await showDialog('Export Workspace', EXPORT_MSG, 'Export')) downloadJSON(storage.exportWorkspace(), 'workspace-export.json')
    } else if (action === 'import') {
      if (await showDialog('Import Workspace', IMPORT_MSG, 'Continue')) fileRef.current?.click()
    } else if (await showDialog('Reset Workspace', RESET_MSG, 'Delete All', 'danger')) {
      storage.resetWorkspace()
      location.reload()
    }
  }

  const onImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-import of the same file
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        storage.importWorkspace(String(reader.result))
        location.reload()
      } catch (err) {
        const msg = err instanceof storage.InvalidWorkspaceError ? err.message : 'Failed to read the file: ' + (err as Error).message
        void showDialog('Import Error', msg, 'OK')
      }
    }
    reader.readAsText(file)
  }

  const bootFading = stage === 'bootFade'
  const bootDone = stage !== 'boot' && !bootFading
  const cardShown = stage === 'card'
  const cardStyle = stage === 'boot' || bootFading
    ? { opacity: 0 }
    : { opacity: cardShown ? 1 : 0, transition: `opacity ${cardShown ? '.5s' : '.4s'} ease-out` }

  return (
    <>
      <div
        id="username-overlay"
        className="visible"
        style={stage === 'overlayFade' ? { transition: 'opacity .4s ease-out', opacity: 0 } : undefined}
      >
        <div
          id="login-boot"
          className={bootDone ? 'lb-hidden' : ''}
          style={bootFading ? { transition: 'opacity .4s ease-out', opacity: 0 } : undefined}
        >
          <div id="boot-lines">
            {Array.from({ length: bootCount }, (_, i) => <BootLine key={i} index={i} />)}
          </div>
          <div className="boot-cursor" />
        </div>
        <div id="username-dialog" style={cardStyle}>
          <div className="ud-hostname">penguinix</div>
          <div className="ud-clock">{formatClock(now)}</div>
          <div className="ud-card">
            <div className="ud-more-wrap">
              <button
                className={'ud-more-btn' + (menuOpen ? ' open' : '')}
                title="More"
                onClick={e => { e.stopPropagation(); setMenuOpen(o => !o) }}
              >⋮</button>
              <div className={'ud-more-dropdown' + (menuOpen ? ' visible' : '')} onClick={e => e.stopPropagation()}>
                <div className="ud-more-item" onClick={() => onMenuAction('import')}>Import Users</div>
                <div className="ud-more-item" onClick={() => onMenuAction('export')}>Export Users</div>
                <div className="ud-more-sep" />
                <div className="ud-more-item ud-more-item-danger" onClick={() => onMenuAction('reset')}>Reset Workspace</div>
              </div>
            </div>
            <div className="ud-card-title">{mode === 'list' ? 'Sign in' : 'New User'}</div>
            {mode === 'list' && (
              <>
                <div className="ud-users">
                  {users.map(u => (
                    <button key={u} className="ud-user-btn" onClick={() => loginAs(u)}>
                      <div className="ud-user-avatar">{u[0]}</div>
                      <div className="ud-user-name">{u}</div>
                      <div className="ud-user-delete" title="Delete user" onClick={e => { e.stopPropagation(); void deleteUser(u) }}>&times;</div>
                    </button>
                  ))}
                </div>
                <div className="ud-new-user" onClick={showNewUserInput}>
                  <div className="ud-new-icon">+</div>
                  <div className="ud-new-label">New User</div>
                </div>
              </>
            )}
            <div className="ud-input-wrap" style={{ display: mode === 'new' ? 'block' : 'none' }}>
              <input
                ref={inputRef}
                className="ud-input"
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="username"
                maxLength={32}
                pattern="[a-zA-Z0-9]*"
                value={name}
                onChange={e => { setName(e.target.value); setError(null) }}
                onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') showUserList() }}
              />
              <div className={'ud-error' + (error ? ' visible' : '')}>{error}</div>
              <div className="ud-input-actions">
                <button className="ud-btn ud-btn-cancel" onClick={showUserList}>Back</button>
                <button className="ud-btn" onClick={submit}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="file" ref={fileRef} accept=".json" style={{ display: 'none' }} onChange={onImportFile} />
    </>
  )
}
