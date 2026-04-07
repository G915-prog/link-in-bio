/**
 * useProfile
 *
 * Fetches a public profile by username and exposes an upsertProfile helper
 * for the authenticated user's own profile.
 *
 * @param {string|null} username - Public username to fetch. Pass null to skip
 *   the initial fetch (e.g. on the dashboard where the user upserts directly).
 * @returns {{ profile: object|null, loading: boolean, error: string|null, upsertProfile: Function }}
 */

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProfile(username = null) {
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

  /**
   * Upserts the authenticated user's profile row.
   *
   * @param {{ username: string, display_name: string, bio: string, avatar_url: string, theme: string }} data
   * @returns {Promise<{ error: string|null }>}
   */
  async function upsertProfile(data) {
    const { data: { user } } = await supabase.auth.getUser()

    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...data,
        updated_at: new Date().toISOString(),
      })

    if (upsertError) {
      setError(upsertError.message)
      return { error: upsertError.message }
    }

    return { error: null }
  }

  return { profile, loading, error, upsertProfile }
}
