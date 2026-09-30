import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { terminal, type NanoState } from '../engine/terminal.ts'
import { MOD_KEY, nanoModKey } from '../engine/platform.ts'

function caretPos(ta: HTMLTextAreaElement) {
  const linesBefore = ta.value.substring(0, ta.selectionStart).split('\n')
  return `Col ${linesBefore[linesBefore.length - 1].length + 1}, Row ${linesBefore.length}`
}

/** GNU nano look-alike. Buffer state lives in the engine; this owns only caret display. */
export default function Nano({ nano }: { nano: NanoState }) {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const gutRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState('Col 1, Row 1')
  const updatePos = () => { if (taRef.current) setPos(caretPos(taRef.current)) }

  // New file opened: caret to the top.
  useEffect(() => {
    const ta = taRef.current!
    ta.focus()
    ta.setSelectionRange(0, 0)
    setPos(caretPos(ta))
  }, [nano.filePath])

  // Save prompt: Y / N / Esc or ^C, and refocus the buffer when it closes.
  useEffect(() => {
    if (!nano.savePrompt) { taRef.current?.focus(); return }
    const onKey = (e: globalThis.KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'y') { e.preventDefault(); terminal.closeNano(true) }
      else if (key === 'n') { e.preventDefault(); terminal.closeNano(false) }
      else if (e.key === 'Escape' || (nanoModKey(e) && key === 'c')) { e.preventDefault(); terminal.nanoCancelSavePrompt() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [nano.savePrompt])

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase()
    if (nanoModKey(e)) {
      switch (key) {
        case 'x': e.preventDefault(); e.stopPropagation(); terminal.nanoExit(); return
        case 'o': e.preventDefault(); terminal.nanoSave(); return
        case 'k': e.preventDefault(); terminal.nanoCutLine(e.currentTarget.selectionStart); return
        case 'g': e.preventDefault(); terminal.nanoSetMsg(MOD_KEY + 'O Save  ' + MOD_KEY + 'X Exit'); return
        case 'c': {
          e.preventDefault()
          const p = caretPos(e.currentTarget)
          setPos(p)
          terminal.nanoSetMsg('[ ' + p + ' ]')
          return
        }
      }
    }
    setTimeout(updatePos, 0)
  }

  const gutters = nano.content.split('\n').map((_, i) => String(i + 1).padStart(3)).join('\n')

  return (
    <div id="nano-view" className="active" style={{ position: 'relative' }}>
      <div id="nano-topbar">
        <span className="nano-label">GNU nano</span>
        <span id="nano-filename">{nano.filePath.split('/').pop()}</span>
        <span id="nano-modified">{nano.content !== nano.original ? '[ Modified ]' : ''}</span>
      </div>
      <div id="nano-body">
        <div id="nano-gutters" ref={gutRef}>{gutters}</div>
        <textarea
          id="nano-textarea"
          ref={taRef}
          spellCheck={false}
          value={nano.content}
          onChange={e => terminal.nanoInput(e.target.value)}
          onKeyDown={onKeyDown}
          onKeyUp={updatePos}
          onClick={updatePos}
          onScroll={e => { if (gutRef.current) gutRef.current.scrollTop = e.currentTarget.scrollTop }}
        />
      </div>
      <div id="nano-statusbar">
        <span id="nano-status-msg">{nano.msg}</span>
        <span id="nano-pos">{pos}</span>
      </div>
      <div id="nano-keybinds">
        <div className="nk"><span className="nk-key">^O</span>Save File</div>
        <div className="nk"><span className="nk-key">^X</span>Exit</div>
      </div>
      <div id="nano-save-prompt" className={nano.savePrompt ? 'visible' : ''}>
        <span className="nsp-msg">Save modified buffer? &nbsp;<span style={{ color: '#8aaecc' }}>(Answering "No" discards changes.)</span></span>
        <span className="nsp-key" onClick={() => terminal.closeNano(true)}>Y Yes</span>
        <span className="nsp-key" onClick={() => terminal.closeNano(false)}>N No</span>
        <span className="nsp-key" onClick={() => terminal.nanoCancelSavePrompt()}>{MOD_KEY}C Cancel</span>
      </div>
    </div>
  )
}
