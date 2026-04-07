import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useOwnProfile } from '../hooks/useOwnProfile'

function Nav() {
  const { user, loading } = useAuth()
  const { profile } = useOwnProfile(user?.id ?? null)

  const username = profile?.username ?? null

  return (
    <nav className="nav">
      <NavLink to="/" className="nav__link">Home</NavLink>
      <NavLink to={username ? `/profile/${username}` : '/login'} className="nav__link">
        Profile
      </NavLink>
      <NavLink to="/dashboard" className="nav__link">Dashboard</NavLink>
      {!loading && !user && (
        <NavLink to="/login" className="nav__link">Login</NavLink>
      )}
    </nav>
  )
}

export default Nav
