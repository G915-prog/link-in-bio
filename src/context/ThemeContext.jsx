import { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, DEFAULT_THEME } from '../lib/themes'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    const values = THEMES[theme] ?? DEFAULT_THEME
    const root = document.documentElement
    root.style.setProperty('--theme-bg', values.bg)
    root.style.setProperty('--theme-text', values.text)
    root.style.setProperty('--theme-accent', values.accent)
    document.body.style.backgroundColor = values.bg
    document.body.style.color = values.text
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
