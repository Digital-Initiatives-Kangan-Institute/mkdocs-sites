import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: ReactNode
  iconId?: string
  titleId?: string
  onMinimize: () => void
}

/** Window title bar with the macOS-style traffic lights (only minimize is wired up). */
export default function TitleBar({ icon, title, iconId, titleId, onMinimize }: Props) {
  return (
    <div className="pane-titlebar">
      <div className="pane-icon" id={iconId}>{icon}</div>
      <span className="pane-title" id={titleId}>{title}</span>
      <div className="window-controls">
        <div className="win-dot win-dot-y" title="Minimize" style={{ cursor: 'pointer' }} onClick={onMinimize}>
          <svg viewBox="0 0 8 8"><line x1="1" y1="4" x2="7" y2="4" stroke="#333" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
        <div className="win-dot win-dot-g" title="Maximize">
          <svg viewBox="0 0 8 8"><rect x="1.5" y="1.5" width="5" height="5" rx="0.8" stroke="#333" strokeWidth="1" fill="none" /></svg>
        </div>
        <div className="win-dot win-dot-r" title="Close">
          <svg viewBox="0 0 8 8"><line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round" /><line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
      </div>
    </div>
  )
}
