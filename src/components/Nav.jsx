import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useOwnProfile } from '../hooks/useOwnProfile'

function Nav() {
  const { user, loading } = useAuth()
  const { profile } = useOwnProfile(user?.id ?? null)
  const { setUserTheme } = useTheme()

  const username = profile?.username ?? null

  // Apply the logged-in user's saved theme as the global base theme.
  // Runs once when the profile loads, and again if the saved theme changes.
  useEffect(() => {
    if (profile?.theme) {
      setUserTheme(profile.theme)
    }
  }, [profile?.theme, setUserTheme])

  const profileUrl = username ? `/profile/${username}` : '/login'

  return (
    <nav className="nav">
      <NavLink to={profileUrl} className="nav__brand" aria-label="Home">
        link·in·bio
      </NavLink>

      <div className="nav__links">
        <NavLink to={profileUrl} className="nav__link">Home</NavLink>
        <NavLink to="/dashboard" className="nav__link">Dashboard</NavLink>
        {!loading && !user && (
          <NavLink to="/login" className="nav__link nav__link--cta">Login</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Nav
