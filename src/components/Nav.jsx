import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Nav() {
  const [userId, setUserId] = useState(undefined) // undefined = auth not yet checked
  const [username, setUsername] = useState(null)

  // Step 1: track auth state — NO Supabase calls inside the callback
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Step 2: fetch username only after userId is known, outside the auth callback
  useEffect(() => {
    if (userId === undefined) return // still checking
    if (!userId) { setUsername(null); return }

    supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        setUsername(data?.username ?? null)
      })
  }, [userId])

  const isLoggedIn = userId !== undefined && userId !== null

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {username
        ? <NavLink to={`/profile/${username}`}>Profile</NavLink>
        : <NavLink to="/login">Profile</NavLink>
      }
      <NavLink to="/dashboard">Dashboard</NavLink>
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
    </nav>
  )
}

export default Nav
