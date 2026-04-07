import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login')
      } else {
        setUser(session.user)
      }
      setChecking(false)
    })
  }, [navigate])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (checking) return <p className="status-message">Checking session...</p>

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">{user.email}</h1>
        <button type="button" className="dashboard__signout" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <section className="dashboard__section">
        <h2>Profile Editor</h2>
      </section>

      <section className="dashboard__section">
        <h2>Link Editor</h2>
      </section>

      <section className="dashboard__section">
        <h2>Stats Panel</h2>
      </section>
    </main>
  )
}

export default Dashboard
