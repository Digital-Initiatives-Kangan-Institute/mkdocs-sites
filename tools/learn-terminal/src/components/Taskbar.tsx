import { useCallback, useState, type ReactNode } from 'react'
import { useClock, useDocumentClick } from '../hooks.ts'
import type { WindowId } from './Desktop.tsx'

interface Props {
  username: string
  windows: { id: WindowId; label: string; icon: ReactNode }[]
  minimized: Record<WindowId, boolean>
  onToggle: (id: WindowId) => void
}

function formatClock(now: Date) {
  const h = now.getHours(), m = now.getMinutes()
  return `${h % 12 || 12}:${m < 10 ? '0' : ''}${m} ${h >= 12 ? 'PM' : 'AM'}`
}

export default function Taskbar({ username, windows, minimized, onToggle }: Props) {
  const now = useClock()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDocumentClick(menuOpen, closeMenu)

  return (
    <div id="taskbar">
      <div
        id="start-btn"
        tabIndex={0}
        className={menuOpen ? 'open' : ''}
        onClick={e => { e.stopPropagation(); setMenuOpen(o => !o) }}
      >
        <svg id="start-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L17.5 10L10 18L2.5 10Z" stroke="var(--green)" strokeWidth="1.5" fill="none" />
          <path d="M6.5 10L9 12.5L13.5 7.5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div id="start-menu" className={menuOpen ? 'visible' : ''}>
          <div id="start-menu-user">{username}</div>
          <div className="start-menu-sep" />
          <div id="start-logout" onClick={() => location.reload()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor" />
            </svg>
            Log Out
          </div>
        </div>
      </div>
      <div className="taskbar-sep" />
      <div id="taskbar-windows">
        {windows.map(w => (
          <div key={w.id} className={'tb-win-btn' + (minimized[w.id] ? ' minimized' : '')} onClick={() => onToggle(w.id)}>
            <span className="tb-win-icon">{w.icon}</span><span>{w.label}</span>
          </div>
        ))}
      </div>
      <div id="taskbar-spacer" />
      <div id="taskbar-clock">{formatClock(now)}</div>
    </div>
  )
}
