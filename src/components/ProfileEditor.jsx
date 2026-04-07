import { useState, useEffect } from 'react'
import { useProfile } from '../hooks/useProfile'
import ThemePicker from './ThemePicker'

function ProfileEditor({ user }) {
  const { profile, loading, upsertProfile } = useProfile(null, { fetchById: user.id })

  const [username, setUsername]       = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio]                 = useState('')
  const [avatarUrl, setAvatarUrl]     = useState('')
  const [theme, setTheme]             = useState('default')
  const [originalUsername, setOriginalUsername] = useState('')

  const [saveStatus, setSaveStatus] = useState(null) // null | 'saving' | 'saved' | 'error'
  const [saveError, setSaveError]   = useState(null)

  useEffect(() => {
    if (!profile) return
    setUsername(profile.username ?? '')
    setDisplayName(profile.display_name ?? '')
    setBio(profile.bio ?? '')
    setAvatarUrl(profile.avatar_url ?? '')
    setTheme(profile.theme ?? 'default')
    setOriginalUsername(profile.username ?? '')
  }, [profile])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaveStatus('saving')
    setSaveError(null)

    const { error } = await upsertProfile({
      username,
      display_name: displayName,
      bio,
      avatar_url: avatarUrl,
      theme,
    })

    if (error) {
      setSaveError(error)
      setSaveStatus('error')
    } else {
      setOriginalUsername(username)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  if (loading) return <p className="status-message">Loading profile...</p>

  const usernameChanged = username !== originalUsername

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-username">Username</label>
        <input
          id="pe-username"
          type="text"
          className="profile-editor__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {usernameChanged && (
          <p className="profile-editor__warning">
            Changing your username will break any links shared to your old URL.
          </p>
        )}
      </div>

      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-display-name">Display name</label>
        <input
          id="pe-display-name"
          type="text"
          className="profile-editor__input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-bio">Bio</label>
        <textarea
          id="pe-bio"
          className="profile-editor__textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
        />
      </div>

      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-avatar">Avatar URL</label>
        <input
          id="pe-avatar"
          type="url"
          className="profile-editor__input"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>

      <ThemePicker value={theme} onChange={setTheme} />

      {saveStatus === 'error' && (
        <p className="profile-editor__error">{saveError}</p>
      )}

      <button
        type="submit"
        className="profile-editor__submit"
        disabled={saveStatus === 'saving'}
      >
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save profile'}
      </button>
    </form>
  )
}

export default ProfileEditor
