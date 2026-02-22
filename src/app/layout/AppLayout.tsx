import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import { ThemeToggle } from '../../components/common/ThemeToggle'

export function AppLayout() {
  const location = useLocation()
  const activeItem = navigationItems.find((item) => item.path === location.pathname) ?? navigationItems[0]
  const totalModules = navigationItems.length - 1
  const isDocsRoute = location.pathname === '/docs'

  return (
    <div className="app-layout">
      <header className="app-header card">
        <div className="header-top-row">
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Automated Examination Platform</p>
            <h1 className="text-2xl font-bold">Exam Management System</h1>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{activeItem.description}</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="header-meta-row">
          <span className="header-meta-chip">{totalModules} Functional Modules</span>
          <span className="header-meta-chip">Centralized Documentation</span>
          <span className="header-meta-chip">Theme Enabled</span>
          {isDocsRoute ? <span className="header-meta-chip">Current View: Docs</span> : null}
        </div>

        <nav className="header-nav" aria-label="Module Navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `header-nav-link ${isActive ? 'header-nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <section className="topbar">
          <h2 className="text-xl font-semibold">{activeItem.label}</h2>
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">{activeItem.description}</p>
        </section>

        <Outlet />
      </main>
    </div>
  )
}
