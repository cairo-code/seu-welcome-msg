import { useState } from 'react'
import TerminalLoginPage from './welcome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TerminalLoginPage />
  )
}

export default App;
