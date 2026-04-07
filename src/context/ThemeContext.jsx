import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('default')

  const setTheme = useCallback((key) => {
    setThemeState(key ?? 'default')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // Clear any inline styles set by the previous implementation
    document.documentElement.style.removeProperty('--theme-bg')
    document.documentElement.style.removeProperty('--theme-text')
    document.documentElement.style.removeProperty('--theme-accent')
    document.body.style.backgroundColor = ''
    document.body.style.color = ''
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
