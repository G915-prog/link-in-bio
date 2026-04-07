import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useOwnProfile(userId) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(!!userId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    async function fetchProfile() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [userId])

  async function upsertProfile(data) {
    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...data, updated_at: new Date().toISOString() })

    if (upsertError) {
      setError(upsertError.message)
      return { error: upsertError.message }
    }

    setProfile(prev => ({ ...prev, ...data }))
    return { error: null }
  }

  return { profile, loading, error, upsertProfile }
}
