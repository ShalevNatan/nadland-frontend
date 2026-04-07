import { useState, useEffect } from 'react'
import { getCurrentUser } from 'aws-amplify/auth'
import LoginPage from './pages/LoginPage'
import CalculatorPage from './pages/CalculatorPage'
import HistoryPage from './pages/HistoryPage'
import Navbar from './components/Navbar'

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [page, setPage] = useState('calculator')

  useEffect(() => {
    getCurrentUser()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  if (checking) return <div className="loading">Loading...</div>
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />

  return (
    <>
      <Navbar page={page} onNavigate={setPage} />
      {page === 'calculator' && <CalculatorPage />}
      {page === 'history' && <HistoryPage />}
    </>
  )
}
