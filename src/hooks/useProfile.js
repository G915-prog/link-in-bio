import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProfile(username) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(!!username)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    async function fetchProfile() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [username])

  return { profile, loading, error }
}
