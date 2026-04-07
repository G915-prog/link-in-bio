/**
 * useTheme
 *
 * Applies a theme's CSS variables to :root and sets document.body background.
 * Resets to the default theme values on unmount.
 *
 * @param {string} theme - One of: 'default' | 'dark' | 'forest' | 'ocean' | 'rose'
 */

import { useEffect } from 'react'
import { THEMES, DEFAULT_THEME } from '../lib/themes'

export function useTheme(theme) {
  useEffect(() => {
    const values = THEMES[theme] ?? DEFAULT_THEME
    const root = document.documentElement

    root.style.setProperty('--theme-bg', values.bg)
    root.style.setProperty('--theme-text', values.text)
    root.style.setProperty('--theme-accent', values.accent)
    document.body.style.backgroundColor = values.bg

    return () => {
      root.style.setProperty('--theme-bg', DEFAULT_THEME.bg)
      root.style.setProperty('--theme-text', DEFAULT_THEME.text)
      root.style.setProperty('--theme-accent', DEFAULT_THEME.accent)
      document.body.style.backgroundColor = DEFAULT_THEME.bg
    }
  }, [theme])
}
