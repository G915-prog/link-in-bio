import { useEffect } from 'react'

const THEMES = {
  default: { bg: '#ffffff', text: '#111111', accent: '#c84b2f' },
  dark:    { bg: '#111111', text: '#f5f5f5', accent: '#e87c5e' },
  forest:  { bg: '#1a2e1a', text: '#d4edda', accent: '#52b788' },
  ocean:   { bg: '#0a1628', text: '#caf0f8', accent: '#48cae4' },
  rose:    { bg: '#fff0f3', text: '#3d0017', accent: '#e63362' },
}

const DEFAULT_THEME = THEMES.default

function applyTheme(theme) {
  const values = THEMES[theme] ?? DEFAULT_THEME
  const root = document.documentElement
  root.style.setProperty('--theme-bg', values.bg)
  root.style.setProperty('--theme-text', values.text)
  root.style.setProperty('--theme-accent', values.accent)
  document.body.style.backgroundColor = values.bg
}

function resetTheme() {
  const root = document.documentElement
  root.style.setProperty('--theme-bg', DEFAULT_THEME.bg)
  root.style.setProperty('--theme-text', DEFAULT_THEME.text)
  root.style.setProperty('--theme-accent', DEFAULT_THEME.accent)
  document.body.style.backgroundColor = DEFAULT_THEME.bg
}

function ProfileHeader({ profile }) {
  const { display_name, bio, avatar_url, theme } = profile

  useEffect(() => {
    applyTheme(theme)
    return () => resetTheme()
  }, [theme])

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
