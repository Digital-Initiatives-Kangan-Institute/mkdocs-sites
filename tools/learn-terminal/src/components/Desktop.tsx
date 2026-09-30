import { useEffect, useState, type ReactNode } from 'react'
import { useTerminal } from '../hooks.ts'
import TerminalWindow from './TerminalWindow.tsx'
import FilesWindow from './FilesWindow.tsx'
import ChallengesWindow from './ChallengesWindow.tsx'
import Taskbar from './Taskbar.tsx'

export type WindowId = 'terminal-window' | 'gui-window' | 'challenges-window'

const WINDOWS: { id: WindowId; label: string; icon: ReactNode }[] = [
  { id: 'terminal-window', label: 'Terminal', icon: <span style={{ color: 'var(--green)' }}>▸</span> },
  { id: 'gui-window', label: 'Files', icon: '📁' },
  { id: 'challenges-window', label: 'Challenges', icon: '⚡' },
]

export default function Desktop({ loggedIn }: { loggedIn: boolean }) {
  const snap = useTerminal()
  const [minimized, setMinimized] = useState<Record<WindowId, boolean>>({
    'terminal-window': false,
    'gui-window': false,
    'challenges-window': true,
  })

  const toggle = (id: WindowId) => setMinimized(m => ({ ...m, [id]: !m[id] }))
  const minimize = (id: WindowId) => setMinimized(m => ({ ...m, [id]: true }))

  // Typing anywhere on the desktop goes to the terminal prompt.
  useEffect(() => {
    if (!loggedIn) return
    const onKey = (e: KeyboardEvent) => {
      const input = document.getElementById('term-input')
      if (snap.nano || !input || document.activeElement === input) return
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) input.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [loggedIn, snap.nano])

  const frame = (id: WindowId) => ({
    id,
    className: 'window' + (minimized[id] ? ' minimized' : '') + (loggedIn ? ' scale-in' : ''),
    style: minimized[id] ? { display: 'none' } : undefined,
  })

  return (
    <div id="app">
      <div id="content-wrap">
        <div id="main">
          <div {...frame('terminal-window')}>
            <TerminalWindow snap={snap} onMinimize={() => minimize('terminal-window')} />
          </div>
          <div {...frame('gui-window')}>
            <FilesWindow snap={snap} onMinimize={() => minimize('gui-window')} />
          </div>
          <div {...frame('challenges-window')}>
            {/* Mounted only while open so it always reopens on the challenge list. */}
            {!minimized['challenges-window'] && (
              <ChallengesWindow challenge={snap.challenge} onMinimize={() => minimize('challenges-window')} />
            )}
          </div>
        </div>
      </div>
      <Taskbar username={snap.username} windows={WINDOWS} minimized={minimized} onToggle={toggle} />
    </div>
  )
}
