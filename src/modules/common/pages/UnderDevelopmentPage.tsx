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
    <section className="under-dev-wrap">
      <article className="card under-dev-card">
        <span className="under-dev-pill">Under Development</span>
        <h2 className="under-dev-title">{moduleName} Module</h2>
        <p className="under-dev-text">
          {description} This section is currently being implemented with complete module isolation,
          production-grade validation and API integrations.
        </p>
        <div className="under-dev-grid">
          <div>
            <p className="under-dev-subtitle">Planned Scope</p>
            <ul className="under-dev-list">
              <li>Module-specific components and services</li>
              <li>Strict route-level ownership</li>
              <li>Typed request-response contracts</li>
            </ul>
          </div>
          <div>
            <p className="under-dev-subtitle">Upcoming Deliverables</p>
            <ul className="under-dev-list">
              <li>CRUD and workflow integrations</li>
              <li>Module test coverage and edge-case handling</li>
              <li>Export/report and operational actions</li>
            </ul>
          </div>
        </div>

        <div className="under-dev-grid under-dev-grid-3">
          <div className="under-dev-panel">
            <p className="under-dev-subtitle">Delivery Milestones</p>
            <ul className="under-dev-list">
              {milestones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="under-dev-panel">
            <p className="under-dev-subtitle">Module Dependencies</p>
            <ul className="under-dev-list">
              {moduleDependencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="under-dev-panel">
            <p className="under-dev-subtitle">Readiness Checklist</p>
            <ul className="under-dev-list">
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
