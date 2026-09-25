import { useLayoutEffect, useRef } from 'react'
import type { NanoState, TerminalSnapshot } from '../engine/terminal.ts'
import { HOME, getNode } from '../lib/vfs.ts'
import { dispPath, isHidden, fileEmoji, fileIconCls } from '../lib/format.ts'
import TitleBar from './TitleBar.tsx'

/** Floating read-only mirror of the nano buffer, stacked over the file grid. */
function EditorOverlay({ nano }: { nano: NanoState | null }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const content = nano?.content ?? ''

  useLayoutEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [content])

  return (
    <div id="editor-overlay" className={nano ? 'visible' : ''}>
      <div className="eo-chrome">
        <div className="eo-dot eo-dot-r" />
        <div className="eo-dot eo-dot-y" />
        <div className="eo-dot eo-dot-g" />
        <span className="eo-title" id="eo-title">{nano ? nano.filePath.split('/').pop() : ''}</span>
        <span className="eo-badge eo-live" id="eo-badge">● editing</span>
      </div>
      <div className="eo-body" id="eo-body" ref={bodyRef}>
        {nano && (!content.trim()
          ? <span className="eo-empty">(empty file — start typing in nano)</span>
          : content.split('\n').map((line, i) => (
            <div className="eo-line" key={i}><span className="eo-ln">{i + 1}</span><span className="eo-lc">{line}</span></div>
          )))}
      </div>
    </div>
  )
}

export default function FilesWindow({ snap, onMinimize }: { snap: TerminalSnapshot; onMinimize: () => void }) {
  const { cwd, nano, grid } = snap
  const node = getNode(cwd)
  const entries = node && node.type === 'dir'
    ? Object.entries(node.children).sort((a, b) => {
      if (a[1].type !== b[1].type) return a[1].type === 'dir' ? -1 : 1
      if (isHidden(a[0]) !== isHidden(b[0])) return isHidden(a[0]) ? 1 : -1
      return a[0].localeCompare(b[0])
    })
    : null
  const label = cwd === HOME ? 'Home' : cwd === '/' ? 'root' : cwd.split('/').pop()

  let status: [string, string]
  if (nano) status = [nano.content.split('\n').length + ' lines', 'editing']
  else {
    const n = entries?.length ?? 0
    status = [n + ' item' + (n !== 1 ? 's' : ''), 'ready']
  }

  return (
    <div id="gui-pane" style={{ flex: 1 }}>
      <TitleBar icon="📁" title={label} iconId="gui-pane-icon" titleId="gui-pane-label" onMinimize={onMinimize} />
      <div id="gui-path-bar">{dispPath(cwd)}</div>
      <div id="gui-content" className={nano ? 'editor-open' : ''} style={{ padding: 14, overflow: 'auto', position: 'relative' }}>
        <EditorOverlay nano={nano} />
        {!entries
          ? <span className="file-grid-empty">Cannot read directory.</span>
          : (
            // Re-keyed on animKey so every item replays its appear animation.
            <div className="file-grid" key={grid.animKey}>
              {!entries.length && <div className="file-grid-empty">(empty folder)</div>}
              {entries.map(([name, child], i) => {
                const hidden = isHidden(name)
                const cls = 'file-item'
                  + (grid.animate ? ' new-anim' : '')
                  + (hidden ? ' hidden-file' : '')
                  + (grid.highlight.includes(name) ? ' highlight-pulse' : '')
                return (
                  <div
                    key={name}
                    className={cls}
                    style={grid.animate ? { animationDelay: i * 30 + 'ms' } : undefined}
                    title={hidden ? name + ' (hidden — use ls -a to see in terminal)' : name}
                  >
                    <div className={'file-icon ' + fileIconCls(name, child.type)}>{fileEmoji(name, child.type)}</div>
                    <span className="file-name">{name}</span>
                  </div>
                )
              })}
            </div>
          )}
      </div>
      <div id="gui-statusbar">
        <span className="statusbar-item" id="status-count">{status[0]}</span>
        <span className="statusbar-item" id="status-info">{status[1]}</span>
      </div>
    </div>
  )
}
