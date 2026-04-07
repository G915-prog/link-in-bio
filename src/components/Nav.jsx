import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Nav() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()
      if (data) setUsername(data.username)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) { setUsername(null); return }
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()
      if (data) setUsername(data.username)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {username
        ? <NavLink to={`/profile/${username}`}>Profile</NavLink>
        : <NavLink to="/login">Profile</NavLink>
      }
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
