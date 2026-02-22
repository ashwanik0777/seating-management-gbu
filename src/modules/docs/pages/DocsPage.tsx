const frontendPillars = [
  {
    title: 'Module-First Architecture',
    description: 'Every module owns routes, page composition, services and feature-specific types.',
  },
  {
    title: 'Reusable Design System',
    description: 'Shared UI primitives remain generic and are reused through composition, not duplication.',
  },
  {
    title: 'Validation-Driven UX',
    description: 'All user inputs are validated early to avoid operational errors during exam workflows.',
  },
  {
    title: 'Observable Workflows',
    description: 'Critical actions expose processing states, confirmations and actionable error handling.',
  },
]

const frontendTechStack = [
  'React 19 with functional component architecture',
  'TypeScript-first contracts for module DTOs and forms',
  'React Router based module isolation by route',
  'Tailwind + CSS variables for light/dark design consistency',
  'Centralized providers for theme and app-level policies',
]

const pageBlueprints = [
  {
    module: 'Dashboard',
    primaryPages: ['Overview page', 'Execution status page', 'Alerts and blockers panel'],
    features: [
      'KPI tiles for students, rooms, duties and pending approvals',
      'Quick action shortcuts for top operational workflows',
      'System health banner for incomplete configuration',
      'Role-tailored widget visibility',
    ],
  },
  {
    module: 'Students',
    primaryPages: ['Student list page', 'Create/Edit drawer', 'CSV import preview page'],
    features: [
      'Advanced search and multi-filtering (branch/semester/section)',
      'Bulk import validation with row-level errors',
      'Duplicate roll detection before submit',
      'Bulk actions for activate/archive/export',
    ],
  },
  {
    module: 'Rooms',
    primaryPages: ['Room list page', 'Create/Edit form page', 'Capacity validation page'],
    features: [
      'Building and floor-wise grouping',
      'Capacity range validation and conflict prompts',
      'Availability status chips (ready/blocked/maintenance)',
      'Batch update actions for exam-day room controls',
    ],
  },
  {
    module: 'Exams',
    primaryPages: ['Exam sessions page', 'Session wizard', 'Student mapping page'],
    features: [
      'Session creation with date and shift controls',
      'Student eligibility mapping by rules or upload',
      'Draft/published state transitions',
      'Validation for overlapping schedule windows',
    ],
  },
  {
    module: 'Seating',
    primaryPages: ['Allocation setup page', 'Allocation result page', 'Print/export preview page'],
    features: [
      'Strategy selection and room constraint configuration',
      'Room-wise occupancy visual summary',
      'Unassigned student exception panel',
      'Printable seating chart and PDF export',
    ],
  },
  {
    module: 'Invigilation',
    primaryPages: ['Duty generation page', 'Manual assignment page', 'Conflict resolution page'],
    features: [
      'Least-duty-first auto allocation action',
      'Conflict indicators for schedule overlaps',
      'Manual reassignment with impact preview',
      'Faculty workload trend and fairness indicator',
    ],
  },
  {
    module: 'Attendance',
    primaryPages: ['Attendance sheet page', 'Marking page', 'Attendance summary page'],
    features: [
      'Room-wise attendance sheet generation',
      'Bulk present/absent actions with undo support',
      'Defaulter summary and discrepancy markers',
      'PDF and CSV attendance exports',
    ],
  },
  {
    module: 'Replacements',
    primaryPages: ['Request submission page', 'Approval queue page', 'Decision timeline page'],
    features: [
      'Replacement request workflow with reason capture',
      'Approver actions with decision notes',
      'Faculty availability checks before approval',
      'Audit timeline for complete traceability',
    ],
  },
  {
    module: 'Reports',
    primaryPages: ['Report catalog page', 'Filter and generation page', 'Download history page'],
    features: [
      'Predefined and custom report templates',
      'Date/session/program based filters',
      'CSV/PDF export queue with status tracking',
      'Recent report downloads and regeneration actions',
    ],
  },
]

const frontendArchitecture = [
  {
    layer: 'App Layer',
    ownership: 'src/app',
    details: 'Router, global providers, app shell, high-level policies and navigation.',
  },
  {
    layer: 'Module Layer',
    ownership: 'src/modules/<module>',
    details: 'Module pages, module components, module hooks and module services.',
  },
  {
    layer: 'Shared UI Layer',
    ownership: 'src/components/common',
    details: 'Reusable UI primitives such as cards, buttons, toggles, table shell.',
  },
  {
    layer: 'Domain Contracts Layer',
    ownership: 'src/modules/<module>/types',
    details: 'DTOs, form models, response mappers and validation schemas.',
  },
]

const uiStandards = [
  'Every page must have clear primary action and contextual secondary actions.',
  'List pages must include search, filter, pagination and empty states.',
  'Forms must include inline errors, summary errors and success feedback.',
  'Action buttons must show loading state during async operations.',
  'Destructive actions must require confirmation and intent statement.',
  'Dark mode contrast must remain readable for all badges, tables and form controls.',
]

const stateAndApiGuidelines = [
  'Keep server state within module service hooks and normalize responses.',
  'Centralize HTTP client and token refresh policy in app-level service wrapper.',
  'Use optimistic updates only where rollback logic is explicit.',
  'Keep module filters in URL query params for shareable state.',
  'Map API errors to user-friendly messages and actionable retries.',
  'Use strict typing for request payloads, response DTOs and transformed UI models.',
]

const componentCatalog = [
  {
    component: 'ModulePageHeader',
    purpose: 'Title, subtitle, breadcrumbs and action buttons for page context.',
    where: 'All module pages',
  },
  {
    component: 'FilterBar',
    purpose: 'Search inputs, dropdown filters and reset controls.',
    where: 'Students, Rooms, Reports, Attendance',
  },
  {
    component: 'DataTableShell',
    purpose: 'Reusable table header, body, loading skeleton, empty state.',
    where: 'All list and reporting pages',
  },
  {
    component: 'StatusBadge',
    purpose: 'Standard visual states such as pending, approved, blocked, completed.',
    where: 'Seating, Replacements, Reports, Invigilation',
  },
  {
    component: 'ActionFooter',
    purpose: 'Primary save/submit and secondary cancel/reset controls.',
    where: 'All form and wizard flows',
  },
]

const frontendExecutionPlan = [
  'Phase 1: Build module scaffolding and route-level page placeholders.',
  'Phase 2: Implement reusable components and shared visual language.',
  'Phase 3: Integrate module APIs with typed contracts and response mappers.',
  'Phase 4: Add module workflows, validations and action handlers.',
  'Phase 5: Add exports, print flows and operational edge-case handling.',
  'Phase 6: Finalize accessibility, responsiveness and dark-theme polish.',
]

const qaChecklist = [
  'All module pages render correctly in light and dark themes.',
  'No page allows action submission with invalid data.',
  'Every module page supports loading, empty, error and success states.',
  'Tables remain usable and readable on tablet and mobile widths.',
  'Navigation state and route highlighting are consistent across modules.',
  'Critical workflows have at least one integration test path.',
]

export function DocsPage() {
  return (
    <section className="space-y-6 pb-6">
      <article className="rounded-xl border border-[rgba(var(--color-primary),0.24)] bg-[linear-gradient(120deg,rgba(var(--color-primary),0.08)_0%,rgba(var(--color-card),0.95)_52%,rgba(var(--color-accent),0.08)_100%)] p-6 shadow-sm">
        <p className="mb-3 inline-flex rounded-full border border-[rgba(var(--color-primary),0.35)] px-3 py-1 text-xs font-semibold text-[rgb(var(--color-primary))]">
          Frontend Development Handbook
        </p>
        <h2 className="text-2xl font-semibold">Module-wise Frontend Blueprint and Feature Specification</h2>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
          This document defines the complete frontend architecture, page planning, component strategy,
          module features and delivery standards for the Automated Examination Seating, Invigilation
          and Attendance Management System.
        </p>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Frontend Design Pillars</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {frontendPillars.map((item) => (
            <section
              key={item.title}
              className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.78)] p-4"
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">{item.description}</p>
            </section>
          ))}
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Frontend Stack and Standards</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {frontendTechStack.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Frontend Architecture Layers</h3>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--color-border))]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Layer</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Ownership</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {frontendArchitecture.map((item) => (
                <tr key={item.layer} className="transition hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)]">
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.layer}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.ownership}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Module-wise Page Blueprint and Features</h3>
        <div className="space-y-4">
          {pageBlueprints.map((module) => (
            <section
              key={module.module}
              className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.78)] p-4"
            >
              <h4 className="text-base font-semibold">{module.module} Module</h4>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">Primary Pages</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {module.primaryPages.map((page) => (
                      <li key={page}>• {page}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Required Features</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {module.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Shared Component Catalog</h3>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--color-border))]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Component</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Purpose</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Where Used</th>
              </tr>
            </thead>
            <tbody>
              {componentCatalog.map((item) => (
                <tr key={item.component} className="transition hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)]">
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.component}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.purpose}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">UI and Interaction Standards</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {uiStandards.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">State Management and API Integration Rules</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {stateAndApiGuidelines.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Frontend Execution Plan</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {frontendExecutionPlan.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Frontend QA and Release Checklist</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {qaChecklist.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
