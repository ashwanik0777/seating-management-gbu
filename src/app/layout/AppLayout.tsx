import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import { ThemeToggle } from '../../components/common/ThemeToggle'

export function AppLayout() {
  const location = useLocation()
  const activeItem = navigationItems.find((item) => item.path === location.pathname) ?? navigationItems[0]
  const totalModules = navigationItems.length - 1
  const isDocsRoute = location.pathname === '/docs'

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 bg-[rgb(var(--color-bg))] p-4">
      <header className="sticky top-0 z-20 rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.9)] p-6 shadow-sm backdrop-blur">
        <div className="mb-3 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Automated Examination Platform</p>
            <h1 className="text-2xl font-bold">Exam Management System</h1>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{activeItem.description}</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-[rgba(var(--color-border),0.85)] bg-[rgba(var(--color-bg),0.7)] px-3 py-1 text-xs text-[rgb(var(--color-text-secondary))]">
            {totalModules} Functional Modules
          </span>
          <span className="inline-flex items-center rounded-full border border-[rgba(var(--color-border),0.85)] bg-[rgba(var(--color-bg),0.7)] px-3 py-1 text-xs text-[rgb(var(--color-text-secondary))]">
            Centralized Documentation
          </span>
          <span className="inline-flex items-center rounded-full border border-[rgba(var(--color-border),0.85)] bg-[rgba(var(--color-bg),0.7)] px-3 py-1 text-xs text-[rgb(var(--color-text-secondary))]">
            Theme Enabled
          </span>
          {isDocsRoute ? (
            <span className="inline-flex items-center rounded-full border border-[rgba(var(--color-border),0.85)] bg-[rgba(var(--color-bg),0.7)] px-3 py-1 text-xs text-[rgb(var(--color-text-secondary))]">
              Current View: Docs
            </span>
          ) : null}
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Module Navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'inline-flex items-center rounded-full border border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] px-3 py-2 text-sm font-medium text-white'
                  : 'inline-flex items-center rounded-full border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.65)] px-3 py-2 text-sm font-medium text-[rgb(var(--color-text-secondary))] transition hover:border-[rgba(var(--color-primary),0.55)] hover:text-[rgb(var(--color-primary))]'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-1 pb-4">
        <section className="mb-3 flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{activeItem.label}</h2>
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">{activeItem.description}</p>
        </section>

        <Outlet />
      </main>
    </div>
  )
}
