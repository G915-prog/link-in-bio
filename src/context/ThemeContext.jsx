import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('default')
  const userThemeRef = useRef('default')

  // Sets the active theme AND records it as the user's own preference.
  // Call this when the user's saved theme is loaded or when they pick a new one.
  const setUserTheme = useCallback((key) => {
    const t = key ?? 'default'
    userThemeRef.current = t
    setThemeState(t)
  }, [])

  // Temporary override — use when displaying someone else's profile.
  const setTheme = useCallback((key) => {
    setThemeState(key ?? 'default')
  }, [])

  // Revert to the user's own saved preference (e.g. after leaving a public profile).
  const resetToUserTheme = useCallback(() => {
    setThemeState(userThemeRef.current)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.removeProperty('--theme-bg')
    document.documentElement.style.removeProperty('--theme-text')
    document.documentElement.style.removeProperty('--theme-accent')
    document.body.style.backgroundColor = ''
    document.body.style.color = ''
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setUserTheme, resetToUserTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
