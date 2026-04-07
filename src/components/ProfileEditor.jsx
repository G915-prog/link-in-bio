import { useState } from 'react'
import { useOwnProfile } from '../hooks/useOwnProfile'
import { useProfileForm } from '../hooks/useProfileForm'
import { useTheme } from '../context/ThemeContext'
import ThemePicker from './ThemePicker'

function ProfileEditor({ userId }) {
  const { profile, loading, upsertProfile } = useOwnProfile(userId)
  const { fields, setField, usernameChanged, confirmUsernameSaved } = useProfileForm(profile)
  const { setUserTheme } = useTheme()

  const [saveStatus, setSaveStatus] = useState(null) // null | 'saving' | 'saved' | 'error'
  const [saveError, setSaveError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaveStatus('saving')
    setSaveError(null)

    const { error } = await upsertProfile({
      username: fields.username,
      display_name: fields.displayName,
      bio: fields.bio,
      avatar_url: fields.avatarUrl,
      theme: fields.theme,
    })

    if (error) {
      setSaveError(error)
      setSaveStatus('error')
    } else {
      confirmUsernameSaved()
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  function handleThemeChange(key) {
    setField('theme', key)
    setUserTheme(key)
  }

  if (loading) return <p className="status-message">Loading profile...</p>

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-username">Username</label>
        <input
          id="pe-username"
          type="text"
          className="profile-editor__input"
          value={fields.username}
          onChange={e => setField('username', e.target.value)}
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
          value={fields.displayName}
          onChange={e => setField('displayName', e.target.value)}
        />
      </div>

      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-bio">Bio</label>
        <textarea
          id="pe-bio"
          className="profile-editor__textarea"
          value={fields.bio}
          onChange={e => setField('bio', e.target.value)}
          rows={3}
        />
      </div>

      <div className="profile-editor__field">
        <label className="profile-editor__label" htmlFor="pe-avatar">Avatar URL</label>
        <input
          id="pe-avatar"
          type="url"
          className="profile-editor__input"
          value={fields.avatarUrl}
          onChange={e => setField('avatarUrl', e.target.value)}
        />
      </div>

      <ThemePicker value={fields.theme} onChange={handleThemeChange} />

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
