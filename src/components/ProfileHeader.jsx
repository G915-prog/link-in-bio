import { useTheme } from '../hooks/useTheme'

function ProfileHeader({ profile }) {
  const { display_name, bio, avatar_url, theme } = profile

  useTheme(theme)

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
