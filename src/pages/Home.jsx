import { Link } from 'react-router-dom'

const TEST_PROFILES = [
  { username: 'user_default', label: 'Default Theme' },
  { username: 'user_dark',    label: 'Dark Theme'    },
  { username: 'user_forest',  label: 'Forest Theme'  },
  { username: 'user_ocean',   label: 'Ocean Theme'   },
  { username: 'user_rose',    label: 'Rose Theme'    },
]

function Home() {
  return (
    <main className="home">
      <h1 className="home__title">Link-in-Bio</h1>
      <p className="home__subtitle">Test profiles</p>
      <ul className="home__profile-list">
        {TEST_PROFILES.map(({ username, label }) => (
          <li key={username} className="home__profile-item">
            <Link to={`/profile/${username}`} className="home__profile-link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
