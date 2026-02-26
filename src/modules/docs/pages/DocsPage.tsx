type Role = 'Admin' | 'Exam Cell' | 'Faculty'

type ModuleSpec = {
  module: string
  route: string
  objective: string
  pages: string[]
  features: string[]
  validations: string[]
  api: string[]
  states: string[]
  permissions: Role[]
  dependencies: string[]
  acceptanceCriteria: string[]
}

const projectSummary = [
  'Single-page React application for complete examination operations.',
  'Feature-first architecture with strict module boundaries and shared primitives.',
  'Role-aware workflows for Admin, Exam Cell and Faculty users.',
  'Complete light/dark UI based on CSS variable tokens and Tailwind utilities.',
]

const frontendStack = [
  'React 19 + TypeScript 5',
  'Vite 7 build pipeline',
  'React Router for route isolation',
  'Tailwind CSS v4 utilities + custom theme variables',
  'Typed API/service contracts per module',
]

const routeRegistry = [
  { route: '/', module: 'Dashboard', status: 'Planned' },
  { route: '/students', module: 'Students', status: 'Planned' },
  { route: '/rooms', module: 'Rooms', status: 'Planned' },
  { route: '/exams', module: 'Exams', status: 'Planned' },
  { route: '/seating', module: 'Seating', status: 'Planned' },
  { route: '/invigilation', module: 'Invigilation', status: 'Planned' },
  { route: '/attendance', module: 'Attendance', status: 'Planned' },
  { route: '/replacements', module: 'Replacements', status: 'Planned' },
  { route: '/reports', module: 'Reports', status: 'Planned' },
  { route: '/docs', module: 'Documentation', status: 'Active' },
]

const moduleSpecs: ModuleSpec[] = [
  {
    module: 'Dashboard',
    route: '/',
    objective: 'Provide a command center view for exam operations, blockers and quick actions.',
    pages: ['Overview dashboard', 'Critical alerts panel', 'Execution checklist board'],
    features: [
      'KPI cards for students, rooms, exams, attendance and pending replacements',
      'Action shortcuts to generate seating/invigilation and attendance sheets',
      'Recent activity feed with timestamped events',
      'Role-wise widgets and priority sections',
    ],
    validations: [
      'Show configuration warning when rooms/exams/students are missing',
      'Prevent execution actions until required setup is complete',
    ],
    api: ['GET /dashboard/metrics', 'GET /dashboard/activity', 'GET /dashboard/blockers'],
    states: ['loading', 'empty', 'error', 'ready'],
    permissions: ['Admin', 'Exam Cell', 'Faculty'],
    dependencies: ['students', 'rooms', 'exams', 'seating', 'invigilation', 'attendance'],
    acceptanceCriteria: [
      'All KPI values update with backend data and date filters',
      'Quick actions trigger correct workflow routes',
      'Dashboard remains readable in both light and dark themes',
    ],
  },
  {
    module: 'Students',
    route: '/students',
    objective: 'Manage student master records for all exam allocation workflows.',
    pages: ['Student list page', 'Student create/edit form', 'CSV import + preview'],
    features: [
      'Search by roll number or student name',
      'Filter by branch, semester and section',
      'Bulk CSV import with row-level validation and error export',
      'Inline and bulk CRUD actions with confirmations',
      'Pagination with server-side sorting',
    ],
    validations: [
      'Roll number uniqueness',
      'Mandatory fields: rollNo, name, branch, semester, section',
      'Semester range and branch code format validation',
      'CSV template schema and header validation',
    ],
    api: [
      'GET /students?page=&limit=&search=&branch=&semester=&section=',
      'POST /students',
      'PATCH /students/:id',
      'DELETE /students/:id',
      'POST /students/import',
    ],
    states: ['loading', 'empty', 'error', 'import-processing', 'success'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['shared table shell', 'validation schemas', 'file upload parser'],
    acceptanceCriteria: [
      'Import rejects invalid rows and shows exact error reason',
      'Filters preserve URL query state for sharing',
      'Create/edit forms prevent submission on invalid inputs',
    ],
  },
  {
    module: 'Rooms',
    route: '/rooms',
    objective: 'Configure room inventory with capacity and availability controls.',
    pages: ['Room list page', 'Room create/edit form', 'Capacity validation board'],
    features: [
      'Add room metadata (room number, building, floor, capacity)',
      'Room status controls (ready, blocked, maintenance)',
      'Batch actions for enabling/disabling rooms',
      'Capacity compliance checks for exam readiness',
    ],
    validations: [
      'Unique room number per building',
      'Capacity should be positive and within configured limits',
      'Status transition rules (maintenance rooms cannot be allocated)',
    ],
    api: ['GET /rooms', 'POST /rooms', 'PATCH /rooms/:id', 'POST /rooms/validate-capacity'],
    states: ['loading', 'empty', 'error', 'saving', 'validated'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['exam module', 'seating allocator'],
    acceptanceCriteria: [
      'Blocked/maintenance rooms are excluded from seating generation',
      'Capacity warnings are visible before allocation actions',
    ],
  },
  {
    module: 'Exams',
    route: '/exams',
    objective: 'Create and manage exam sessions and student mapping rules.',
    pages: ['Exam list page', 'Session setup wizard', 'Student mapping page'],
    features: [
      'Create exam with date, shift and exam metadata',
      'Assign participating branches/semesters',
      'Draft and publish exam states',
      'Session overlap detection with clear conflict messages',
    ],
    validations: [
      'Date and shift are mandatory',
      'No duplicate exam session for same date and shift',
      'Student mapping must have at least one eligible group',
    ],
    api: ['GET /exams', 'POST /exams', 'PATCH /exams/:id', 'POST /exams/:id/map-students'],
    states: ['loading', 'empty', 'error', 'draft', 'published'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['students module', 'rooms module'],
    acceptanceCriteria: [
      'Publish action locked until all required mappings exist',
      'Conflicting sessions are blocked with actionable error messages',
    ],
  },
  {
    module: 'Seating',
    route: '/seating',
    objective: 'Generate room-wise seating allocation from student and room data.',
    pages: ['Allocation setup page', 'Allocation results page', 'Print/export preview'],
    features: [
      'Select exam and allocation strategy',
      'Generate allocation using capacity constraints',
      'Show room occupancy and unassigned students',
      'Print and PDF export for room-wise seating charts',
    ],
    validations: [
      'Allocation requires published exam and ready rooms',
      'No over-capacity room allocation',
      'No duplicate student assignment',
    ],
    api: ['POST /seating/generate', 'GET /seating/:examId', 'POST /seating/:examId/export'],
    states: ['loading', 'empty', 'error', 'generating', 'generated'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['students', 'rooms', 'exams'],
    acceptanceCriteria: [
      '100% eligible students allocated or clearly reported as exceptions',
      'Exports match on-screen allocation data',
    ],
  },
  {
    module: 'Invigilation',
    route: '/invigilation',
    objective: 'Assign invigilators fairly while preventing conflicts.',
    pages: ['Duty generation page', 'Manual adjustment page', 'Conflict review page'],
    features: [
      'Auto allocation using least-duty-first logic',
      'Manual reassignment with impact preview',
      'Conflict markers for overlapping time slots',
      'Faculty workload trend indicators',
    ],
    validations: [
      'Faculty cannot be assigned to overlapping sessions',
      'Duty assignment requires active faculty availability',
      'Manual overrides must capture reason and actor',
    ],
    api: ['POST /invigilation/auto-assign', 'GET /invigilation/:examId', 'PATCH /invigilation/:dutyId'],
    states: ['loading', 'empty', 'error', 'assigning', 'assigned'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['exams', 'faculty master', 'rooms'],
    acceptanceCriteria: [
      'No overlapping duties in final generated output',
      'Manual changes persist and appear in audit timeline',
    ],
  },
  {
    module: 'Attendance',
    route: '/attendance',
    objective: 'Generate attendance sheets and capture present/absent status.',
    pages: ['Attendance sheet generation', 'Attendance marking page', 'Attendance summary page'],
    features: [
      'Room-wise sheet generation from seating allocations',
      'Mark present/absent with bulk actions and undo',
      'Discrepancy markers and missing signature flags',
      'Attendance summary export to PDF/CSV',
    ],
    validations: [
      'Attendance can only be marked for active exam sessions',
      'Status update requires valid student-allocation mapping',
      'Bulk actions require confirmation',
    ],
    api: ['POST /attendance/sheets/:examId', 'PATCH /attendance/:allocationId', 'GET /attendance/:examId/summary'],
    states: ['loading', 'empty', 'error', 'saving', 'finalized'],
    permissions: ['Admin', 'Exam Cell', 'Faculty'],
    dependencies: ['seating allocations', 'exam session status'],
    acceptanceCriteria: [
      'Attendance totals match room-level marked counts',
      'Summary exports are consistent with captured statuses',
    ],
  },
  {
    module: 'Replacements',
    route: '/replacements',
    objective: 'Handle invigilation replacement requests through approval workflows.',
    pages: ['Request form page', 'Approval queue page', 'Decision timeline page'],
    features: [
      'Faculty request creation with reason and supporting notes',
      'Admin approval/rejection workflow',
      'Auto suggest available replacement faculty',
      'Immutable audit timeline for every decision',
    ],
    validations: [
      'Request must include exam, original faculty and reason',
      'Replacement faculty must be available and conflict-free',
      'Approval action requires decision note',
    ],
    api: ['POST /replacements', 'GET /replacements?status=', 'PATCH /replacements/:id/decision'],
    states: ['loading', 'empty', 'error', 'pending', 'approved', 'rejected'],
    permissions: ['Admin', 'Faculty'],
    dependencies: ['invigilation assignments', 'faculty availability service'],
    acceptanceCriteria: [
      'Approved replacements immediately reflect in duty views',
      'All decisions are fully auditable with actor and timestamp',
    ],
  },
  {
    module: 'Reports',
    route: '/reports',
    objective: 'Generate analytics and operational reports for exam administration.',
    pages: ['Report catalog page', 'Filtered generation page', 'Download history page'],
    features: [
      'Predefined reports (faculty duties, room utilization, attendance summary)',
      'Date/session/branch filters',
      'Export queue and status tracking',
      'Recent download and regeneration actions',
    ],
    validations: [
      'Filter range must be valid and within policy limits',
      'Report generation blocked if required source data is missing',
    ],
    api: ['GET /reports/catalog', 'POST /reports/generate', 'GET /reports/jobs', 'GET /reports/download/:jobId'],
    states: ['loading', 'empty', 'error', 'queued', 'processing', 'ready'],
    permissions: ['Admin', 'Exam Cell'],
    dependencies: ['students', 'rooms', 'seating', 'invigilation', 'attendance'],
    acceptanceCriteria: [
      'Report outputs match source system totals',
      'Large reports remain usable via async generation flow',
    ],
  },
]

const rolePermissionMatrix = [
  { area: 'System Configuration', admin: 'Full', examCell: 'View', faculty: 'None' },
  { area: 'Students & Rooms Management', admin: 'Full', examCell: 'Full', faculty: 'None' },
  { area: 'Exam Setup & Publish', admin: 'Full', examCell: 'Full', faculty: 'None' },
  { area: 'Seating & Invigilation Generation', admin: 'Full', examCell: 'Full', faculty: 'None' },
  { area: 'Attendance Marking', admin: 'Full', examCell: 'Full', faculty: 'Assigned Rooms Only' },
  { area: 'Replacement Request', admin: 'Approve/Reject', examCell: 'View', faculty: 'Create/View Own' },
  { area: 'Reports and Exports', admin: 'Full', examCell: 'Full', faculty: 'Limited View' },
]

const uiStandards = [
  'Every page must have a consistent module header with title, context and primary action.',
  'All list pages must include search, filter, sort, pagination and export controls.',
  'All forms must include inline validation, summary validation and submit state indicator.',
  'All async actions must show loading state and disable duplicate submissions.',
  'Destructive actions must require explicit confirmation before execution.',
  'All key UI components must be verified in light and dark themes.',
]

const folderStructure = [
  'src/app/router -> route map and protected route strategy',
  'src/app/providers -> theme, auth and app-level providers',
  'src/components/common -> reusable UI components only',
  'src/modules/<module>/pages -> module pages and local composition',
  'src/modules/<module>/services -> API clients and response mappers',
  'src/modules/<module>/types -> DTOs, view models and schema contracts',
  'src/modules/<module>/hooks -> module-level query and mutation hooks',
]

const testingStrategy = [
  'Unit tests: validators, mappers, and data transformation utilities',
  'Component tests: forms, tables, action bars, and status badges',
  'Integration tests: full route-level workflows per module',
  'Role tests: verify route access and action restrictions per role',
  'Theme tests: verify readability and contrast in dark and light modes',
  'Regression tests: seating and invigilation workflow outputs',
]

const nonFunctionalRequirements = [
  'Performance: list screens should remain responsive for large datasets via pagination and debounced search.',
  'Security: role checks must be enforced in UI and server APIs.',
  'Auditability: critical actions should include actor, timestamp and before/after state.',
  'Reliability: network failures must show actionable retry paths.',
  'Accessibility: keyboard navigation and focus visibility across forms and tables.',
]

const deliveryPlan = [
  'Phase 1: module scaffolding + route ownership + shared primitive setup',
  'Phase 2: students, rooms, exams core CRUD and validation flows',
  'Phase 3: seating + invigilation engines and conflict handling screens',
  'Phase 4: attendance + replacements workflows and audit timelines',
  'Phase 5: reports, exports, optimization, and full QA hardening',
]

const doneDefinition = [
  'Feature complete as per module acceptance criteria',
  'Validated against role matrix and route permissions',
  'All required loading, empty, error and success states implemented',
  'Test coverage added for critical workflows and edge cases',
  'Dark/light UI and responsive behavior validated',
  'Documentation updated with API contracts and UI behavior',
]

export function DocsPage() {
  return (
    <section className="space-y-6 pb-8">
      <article className="rounded-xl border border-[rgba(var(--color-primary),0.24)] bg-[linear-gradient(120deg,rgba(var(--color-primary),0.08)_0%,rgba(var(--color-card),0.95)_52%,rgba(var(--color-accent),0.08)_100%)] p-6 shadow-sm">
        <p className="mb-3 inline-flex rounded-full border border-[rgba(var(--color-primary),0.35)] px-3 py-1 text-xs font-semibold text-[rgb(var(--color-primary))]">
          Complete Frontend Documentation
        </p>
        <h2 className="text-2xl font-semibold">End-to-End Frontend Build Manual for the Entire Application</h2>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
          This page is the single source of truth for building the full application frontend: module
          boundaries, pages, feature requirements, validations, API contracts, role permissions, UI standards,
          testing strategy, non-functional requirements and delivery plan.
        </p>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Project Scope and Goals</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {projectSummary.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Technology Stack</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {frontendStack.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Route Registry</h3>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--color-border))]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Route</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Module</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Status</th>
              </tr>
            </thead>
            <tbody>
              {routeRegistry.map((item) => (
                <tr key={item.route} className="transition hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)]">
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.route}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.module}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Role and Permission Matrix</h3>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--color-border))]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Area</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Admin</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Exam Cell</th>
                <th className="bg-[rgb(var(--color-card))] px-4 py-3 text-sm font-semibold text-[rgb(var(--color-text-secondary))]">Faculty</th>
              </tr>
            </thead>
            <tbody>
              {rolePermissionMatrix.map((item) => (
                <tr key={item.area} className="transition hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)]">
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.area}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.admin}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.examCell}</td>
                  <td className="border-t border-[rgb(var(--color-border))] px-4 py-3">{item.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Detailed Module Specifications</h3>
        <div className="space-y-5">
          {moduleSpecs.map((spec) => (
            <section key={spec.module} className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-card),0.78)] p-5">
              <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <h4 className="text-base font-semibold">{spec.module} Module</h4>
                <span className="inline-flex w-fit rounded-full border border-[rgb(var(--color-border))] px-3 py-1 text-xs text-[rgb(var(--color-text-secondary))]">
                  Route: {spec.route}
                </span>
              </div>

              <p className="mb-4 text-sm text-[rgb(var(--color-text-secondary))]">{spec.objective}</p>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Pages</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.pages.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Features</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.features.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Validations</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.validations.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">API Endpoints</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.api.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">UI States</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.states.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Allowed Roles</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.permissions.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">Dependencies</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.dependencies.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Acceptance Criteria</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {spec.acceptanceCriteria.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">UI/UX Standards</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {uiStandards.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Recommended Folder Ownership</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {folderStructure.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Testing Strategy</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {testingStrategy.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Non-Functional Requirements</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {nonFunctionalRequirements.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Delivery Plan</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {deliveryPlan.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Definition of Done</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {doneDefinition.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
