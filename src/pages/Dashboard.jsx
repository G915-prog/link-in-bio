import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useLinks } from '../hooks/useLinks'
import ProfileEditor from '../components/ProfileEditor'
import LinkEditor from '../components/LinkEditor'
import StatsPanel from '../components/StatsPanel'

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const linksHook = useLinks(user?.id ?? null)

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
        <ProfileEditor user={user} />
      </section>

      <section className="dashboard__section">
        <h2>Link Editor</h2>
        <LinkEditor {...linksHook} />
      </section>

      <section className="dashboard__section">
        <h2>Stats Panel</h2>
        <StatsPanel links={linksHook.links} />
      </section>
    </main>
  )
}

export default Dashboard
