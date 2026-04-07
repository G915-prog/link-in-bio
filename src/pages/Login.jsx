import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log('[Login] calling', isSignUp ? 'signUp' : 'signInWithPassword')

    let authData, authError
    try {
      const result = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
      authData = result.data
      authError = result.error
    } catch (thrown) {
      console.error('[Login] signIn threw an exception:', thrown)
      setError('Unexpected error — check console')
      setLoading(false)
      return
    }

    console.log('[Login] auth response — error:', authError, '| session:', authData?.session?.access_token ? 'present' : 'absent')

    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    console.log('[Login] navigating to /dashboard')
    navigate('/dashboard')
  }

  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">{isSignUp ? 'Create account' : 'Sign in'}</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label className="login__label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="login__submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          className="login__toggle"
          onClick={() => { setIsSignUp((v) => !v); setError(null) }}
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </main>
  )
}

export default Login
