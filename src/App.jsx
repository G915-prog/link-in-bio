import { Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useAuth } from './context/AuthContext'
import { useOwnProfile } from './hooks/useOwnProfile'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function HomePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useOwnProfile(user?.id ?? null)

  if (authLoading || profileLoading) return null
  if (!user) return <Navigate to="/login" replace />
  return <ProfilePage username={profile?.username} />
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
