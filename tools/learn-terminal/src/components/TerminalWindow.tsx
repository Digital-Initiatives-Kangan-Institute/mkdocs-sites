import type { TerminalSnapshot } from '../engine/terminal.ts'
import { dispPath } from '../lib/format.ts'
import TitleBar from './TitleBar.tsx'
import TerminalOutput from './TerminalOutput.tsx'
import TerminalInput from './TerminalInput.tsx'
import Nano from './Nano.tsx'

const TerminalIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="#4a6080" strokeWidth="1.2" fill="none" />
    <polyline points="4,6.5 7,8 4,9.5" stroke="#3dffa0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="9.5" x2="12" y2="9.5" stroke="#3a5070" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export default function TerminalWindow({ snap, onMinimize }: { snap: TerminalSnapshot; onMinimize: () => void }) {
  const { username, cwd, nano } = snap
  return (
    <div id="terminal-pane" style={{ flex: 1 }}>
      <TitleBar
        icon={TerminalIcon}
        title={`bash — ${username}@linux:${dispPath(cwd)}`}
        titleId="term-title-label"
        onMinimize={onMinimize}
      />
      <div id="shell-view" style={nano ? { display: 'none' } : undefined}>
        <TerminalOutput lines={snap.lines} visible={!nano} />
        <TerminalInput username={username} cwd={cwd} focusToken={snap.focusToken} />
      </div>
      {nano && <Nano nano={nano} />}
    </div>
  )
}
