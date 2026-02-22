type UnderDevelopmentPageProps = {
  moduleName: string
  description: string
}

export function UnderDevelopmentPage({ moduleName, description }: UnderDevelopmentPageProps) {
  const milestones = [
    'Information architecture and route contracts',
    'Feature-specific component composition',
    'Typed API integration with error boundaries',
    'Validation, audit trail and quality checks',
  ]

  const moduleDependencies = [
    'Authentication and role-aware permissions',
    'Reusable service client and response mappers',
    'Shared form rules and schema validation',
    'Export/report connector integration',
  ]

  return (
    <section className="grid min-h-[58vh] place-items-center">
      <article className="w-full max-w-7xl rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <span className="inline-flex items-center rounded-full border border-[rgba(var(--color-warning),0.35)] bg-[rgba(var(--color-warning),0.16)] px-3 py-1 text-xs font-semibold text-[rgb(var(--color-text-primary))]">
          Under Development
        </span>
        <h2 className="mt-4 text-2xl font-bold">{moduleName} Module</h2>
        <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
          {description} This section is currently being implemented with complete module isolation,
          production-grade validation and API integrations.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold">Planned Scope</p>
            <ul className="grid gap-1 pl-4 text-sm text-[rgb(var(--color-text-secondary))]">
              <li>Module-specific components and services</li>
              <li>Strict route-level ownership</li>
              <li>Typed request-response contracts</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Upcoming Deliverables</p>
            <ul className="grid gap-1 pl-4 text-sm text-[rgb(var(--color-text-secondary))]">
              <li>CRUD and workflow integrations</li>
              <li>Module test coverage and edge-case handling</li>
              <li>Export/report and operational actions</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.6)] p-4">
            <p className="mb-2 text-sm font-semibold">Delivery Milestones</p>
            <ul className="grid gap-1 pl-4 text-sm text-[rgb(var(--color-text-secondary))]">
              {milestones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.6)] p-4">
            <p className="mb-2 text-sm font-semibold">Module Dependencies</p>
            <ul className="grid gap-1 pl-4 text-sm text-[rgb(var(--color-text-secondary))]">
              {moduleDependencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.6)] p-4">
            <p className="mb-2 text-sm font-semibold">Readiness Checklist</p>
            <ul className="grid gap-1 pl-4 text-sm text-[rgb(var(--color-text-secondary))]">
              <li>Route and ownership boundary defined</li>
              <li>Input validation matrix complete</li>
              <li>API contracts reviewed and typed</li>
              <li>Operational logs and error states covered</li>
            </ul>
          </div>
        </div>
      </article>
    </section>
  )
}
