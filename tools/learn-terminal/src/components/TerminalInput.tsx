import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { terminal } from '../engine/terminal.ts'
import { getCompletions, type Completion } from '../engine/completion.ts'
import { dispPath } from '../lib/format.ts'

interface Props {
  username: string
  cwd: string
  focusToken: number
}

const AC_ICONS: Record<Completion['type'], [cls: string, glyph: string]> = {
  cmd: ['ac-icon-cmd', '>'],
  dir: ['ac-icon-dir', '📁'],
  file: ['ac-icon-file', '📄'],
  flag: ['ac-icon-flag', '-'],
}

/** Prompt line: input, Tab/as-you-type autocomplete, and ↑/↓ history. Key priority: Tab > AC navigation > history > Enter. */
export default function TerminalInput({ username, cwd, focusToken }: Props) {
  const [value, setValue] = useState('')
  const [acItems, setAcItems] = useState<Completion[]>([])
  const [acIdx, setAcIdx] = useState(-1)
  const histIdx = useRef(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const acRef = useRef<HTMLDivElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [focusToken])

  useEffect(() => {
    if (acIdx >= 0) acRef.current?.children[acIdx]?.scrollIntoView({ block: 'nearest' })
  }, [acIdx])

  const showAC = (items: Completion[]) => { setAcItems(items); setAcIdx(-1) }
  const hideAC = () => showAC([])
  const triggerAC = (v: string) => showAC(v ? getCompletions(v, cwd) : [])

  const applyAC = (item: Completion) => {
    const lastSep = Math.max(value.lastIndexOf(' '), value.lastIndexOf('|'), value.lastIndexOf('>'))
    const next = value.slice(0, lastSep + 1) + item.insert
    setValue(next)
    inputRef.current?.focus()
    if (next.endsWith('/')) triggerAC(next)
    else hideAC()
  }

  const acMove = (dir: number) => setAcIdx(i => (i + dir + acItems.length) % acItems.length)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const history = terminal.history
    switch (e.key) {
      case 'Tab': {
        e.preventDefault()
        const c = getCompletions(value, cwd)
        if (c.length === 1) applyAC(c[0])
        else if (c.length > 1) {
          const shortest = c.reduce((a, b) => a.insert.length <= b.insert.length ? a : b)
          if (c.every(x => x.insert.startsWith(shortest.insert))) applyAC(shortest)
          else showAC(c)
        }
        return
      }
      case 'ArrowUp':
        e.preventDefault()
        if (acItems.length) { acMove(-1); return }
        hideAC()
        if (histIdx.current < history.length - 1) setValue(history[++histIdx.current])
        return
      case 'ArrowDown':
        e.preventDefault()
        if (acItems.length) { acMove(1); return }
        hideAC()
        if (histIdx.current > 0) setValue(history[--histIdx.current])
        else if (histIdx.current === 0) { histIdx.current = -1; setValue('') }
        return
      case 'Enter':
        // Commands can move focus (nano, dialogs); don't let this keystroke follow it there.
        e.preventDefault()
        if (acItems.length && acIdx >= 0) { applyAC(acItems[acIdx]); return }
        setValue(''); hideAC(); histIdx.current = -1
        terminal.submit(value)
        return
      case 'Escape':
        if (acItems.length) hideAC()
        else { setValue(''); histIdx.current = -1 }
        return
    }
  }

  return (
    <div id="term-input-row">
      <div id="autocomplete" ref={acRef} className={acItems.length ? 'visible' : ''}>
        {acItems.slice(0, 8).map((item, i) => {
          const [cls, glyph] = AC_ICONS[item.type]
          return (
            <div
              key={i}
              className={'ac-item' + (i === acIdx ? ' selected' : '')}
              onMouseDown={e => { e.preventDefault(); applyAC(item) }}
            >
              <div className={'ac-icon ' + cls}>{glyph}</div>
              <span className="ac-name">{item.text}</span>
              {item.desc && <span className="ac-desc">{item.desc}</span>}
            </div>
          )
        })}
      </div>
      <span id="input-prompt">
        <span className="t-prompt">{username}</span><span className="t-muted">@linux:</span>
        <span className="t-path">{dispPath(cwd)}</span><span className="t-dollar"> $ </span>
      </span>
      <input
        id="term-input"
        ref={inputRef}
        type="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="type a command..."
        value={value}
        onChange={e => { setValue(e.target.value); histIdx.current = -1; triggerAC(e.target.value) }}
        onKeyDown={onKeyDown}
        onBlur={() => setTimeout(hideAC, 150)}
      />
    </div>
  )
}
