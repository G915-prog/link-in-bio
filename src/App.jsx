import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
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
