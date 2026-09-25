import { useEffect, useState, useSyncExternalStore } from 'react'
import { terminal } from './engine/terminal.ts'
import { dialog } from './engine/dialog.ts'

export function useTerminal() {
  return useSyncExternalStore(terminal.subscribe, terminal.getSnapshot)
}

export function useDialog() {
  return useSyncExternalStore(dialog.subscribe, dialog.getSnapshot)
}

/** Current time, refreshed every `intervalMs`. */
export function useClock(intervalMs = 10000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

/** Run `onClose` on any document click (used to dismiss dropdown menus). */
export function useDocumentClick(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    document.addEventListener('click', onClose)
    return () => document.removeEventListener('click', onClose)
  }, [active, onClose])
}
