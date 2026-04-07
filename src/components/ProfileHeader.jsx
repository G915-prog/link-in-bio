import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function ProfileHeader({ profile }) {
  const { display_name, bio, avatar_url, theme } = profile
  const { setTheme, resetToUserTheme } = useTheme()

  useEffect(() => {
    setTheme(theme ?? 'default')
    return () => resetToUserTheme()
  }, [theme, setTheme, resetToUserTheme])

  return (
    <div className="profile-header">
      {avatar_url ? (
        <img
          src={avatar_url}
          alt={display_name}
          className="profile-header__avatar"
        />
      ) : (
        <div className="profile-header__avatar-placeholder" aria-hidden="true" />
      )}
      <h1 className="profile-header__name">{display_name}</h1>
      <p className="profile-header__bio">{bio}</p>
    </div>
  )
}

export default ProfileHeader
