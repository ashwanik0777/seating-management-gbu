import { useTheme } from '../../app/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className="btn btn-outline" onClick={toggleTheme} type="button">
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  )
}
