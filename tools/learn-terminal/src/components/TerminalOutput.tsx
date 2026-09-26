import { memo, useLayoutEffect, useRef } from 'react'
import type { OutputLine } from '../engine/terminal.ts'

// Output lines are pre-escaped HTML built by the engine (see engine/terminal.ts).
const Line = memo(function Line({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
})

export default function TerminalOutput({ lines, visible }: { lines: OutputLine[]; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (el && visible) el.scrollTop = el.scrollHeight
  }, [lines, visible])

  return (
    <div id="term-output" ref={ref}>
      {lines.map(l => <Line key={l.id} html={l.html} />)}
    </div>
  )
}
