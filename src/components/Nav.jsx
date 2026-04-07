import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile/demo">Profile</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
