import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useLinks } from '../hooks/useLinks'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import ProfileEditor from '../components/ProfileEditor'
import LinkEditor from '../components/LinkEditor'
import StatsPanel from '../components/StatsPanel'

function Dashboard() {
  const { user } = useAuth()
  const { setTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    setTheme('default')
  }, [setTheme])
  const linksHook = useLinks(user?.id ?? null)

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">{user.email}</h1>
        <button type="button" className="dashboard__signout" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Profile</h2>
        <ProfileEditor userId={user.id} />
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Links</h2>
        <LinkEditor {...linksHook} />
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Stats</h2>
        <StatsPanel links={linksHook.links} />
      </section>
    </main>
  )
}

export default Dashboard
