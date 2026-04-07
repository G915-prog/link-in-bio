/**
 * useProfile
 *
 * Fetches a profile by username or by user ID, and exposes an upsertProfile
 * helper for the authenticated user's own profile.
 *
 * @param {string|null} username  - Public username to fetch via WHERE username = :username.
 *                                  Pass null to skip the username fetch.
 * @param {object}      [options]
 * @param {string|null} [options.fetchById] - Supabase user ID to fetch via WHERE id = :id.
 *                                            Takes precedence over username when provided.
 * @returns {{ profile: object|null, loading: boolean, error: string|null, upsertProfile: Function }}
 */

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProfile(username = null, { fetchById = null } = {}) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(!!(username || fetchById))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username && !fetchById) return

    async function fetchProfile() {
      setLoading(true)
      setError(null)

      const query = fetchById
        ? supabase.from('profiles').select('*').eq('id', fetchById).single()
        : supabase.from('profiles').select('*').eq('username', username).single()

      const { data, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [username, fetchById])

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
