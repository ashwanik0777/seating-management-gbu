import { useTheme } from '../../app/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="inline-flex items-center rounded-lg border border-[rgb(var(--color-border))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-text-primary))] transition hover:bg-[rgba(var(--color-border),0.35)]"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  )
}
