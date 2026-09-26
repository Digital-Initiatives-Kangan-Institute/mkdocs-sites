import { useEffect, useRef } from 'react'
import { dialog } from '../engine/dialog.ts'
import { useDialog } from '../hooks.ts'

export default function Dialog() {
  const state = useDialog()
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!state) return
    confirmRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dialog.close(false)
      if (e.key === 'Enter') dialog.close(true)
    }
    // Attach on the next tick so the Enter that opened the dialog doesn't also confirm it.
    const id = setTimeout(() => document.addEventListener('keydown', onKey))
    return () => {
      clearTimeout(id)
      document.removeEventListener('keydown', onKey)
    }
  }, [state])

  const visible = state ? ' visible' : ''
  return (
    <>
      <div id="dialog-backdrop" className={visible.trim()} onClick={() => dialog.close(false)} />
      <div id="dialog-box" className={visible.trim()}>
        <div className="dialog-title">{state?.title}</div>
        <div className="dialog-msg">{state?.msg}</div>
        <div className="dialog-btns">
          <button className="dialog-btn dialog-cancel" onClick={() => dialog.close(false)}>Cancel</button>
          <button
            ref={confirmRef}
            className={'dialog-btn dialog-confirm' + (state?.confirmClass ? ' ' + state.confirmClass : '')}
            onClick={() => dialog.close(true)}
          >
            {state?.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </>
  )
}
