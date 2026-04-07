import { Link } from 'react-router-dom'

const TEST_PROFILES = [
  { username: 'user_default', label: 'Default Theme' },
  { username: 'user_dark',    label: 'Dark Theme'    },
  { username: 'user_forest',  label: 'Forest Theme'  },
  { username: 'user_ocean',   label: 'Ocean Theme'   },
  { username: 'user_rose',    label: 'Rose Theme'    },
]

function Home() {
  const origin = window.location.origin

  return (
    <main className="home">
      <h1 className="home__title">Link-in-Bio</h1>
      <p className="home__subtitle">Test profiles</p>
      <ul className="home__profile-list">
        {TEST_PROFILES.map(({ username, label }) => {
          const profilePath = `/profile/${username}`
          return (
            <li key={username} className="home__profile-item">
              <Link to={profilePath} className="home__profile-link">
                <span className="home__profile-label">{label}</span>
                <span className="home__profile-url">{origin}{profilePath}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default Home
