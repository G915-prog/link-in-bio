import { useState, useEffect } from 'react'

export function useProfileForm(profile) {
  const [fields, setFields] = useState({
    username: '',
    displayName: '',
    bio: '',
    avatarUrl: '',
    theme: 'default',
  })
  const [originalUsername, setOriginalUsername] = useState('')

  useEffect(() => {
    if (!profile) return
    const next = {
      username: profile.username ?? '',
      displayName: profile.display_name ?? '',
      bio: profile.bio ?? '',
      avatarUrl: profile.avatar_url ?? '',
      theme: profile.theme ?? 'default',
    }
    setFields(next)
    setOriginalUsername(next.username)
  }, [profile])

  function setField(key, value) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  const usernameChanged = fields.username !== originalUsername

  function confirmUsernameSaved() {
    setOriginalUsername(fields.username)
  }

  return { fields, setField, usernameChanged, confirmUsernameSaved }
}
