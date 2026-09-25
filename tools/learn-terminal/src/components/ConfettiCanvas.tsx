import { useEffect, useRef } from 'react'
import { registerConfettiCanvas } from '../engine/confetti.ts'

export default function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    registerConfettiCanvas(canvas)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      registerConfettiCanvas(null)
    }
  }, [])

  return <canvas id="confetti-canvas" ref={ref} />
}
