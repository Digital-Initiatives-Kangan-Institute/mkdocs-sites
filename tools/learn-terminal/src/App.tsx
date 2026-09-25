import { useCallback, useState } from 'react'
import { terminal } from './engine/terminal.ts'
import Desktop from './components/Desktop.tsx'
import LoginScreen from './components/LoginScreen.tsx'
import ConfettiCanvas from './components/ConfettiCanvas.tsx'
import Dialog from './components/Dialog.tsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const onLoggedIn = useCallback(() => {
    setLoggedIn(true)
    terminal.init()
  }, [])

  // DOM order matters: the dialog backdrop shares z-index 1000 with the login
  // overlay, so the overlay must come later to stay above the backdrop.
  return (
    <>
      <Desktop loggedIn={loggedIn} />
      <ConfettiCanvas />
      <Dialog />
      {!loggedIn && <LoginScreen onLoggedIn={onLoggedIn} />}
    </>
  )
}
