const moduleDocs = [
  {
    module: 'Students',
    objective: 'Maintain student master records for allocation processing.',
    frontend: ['CSV upload with preview', 'Search/filter/sort', 'Bulk validation actions'],
    backend: ['Duplicate roll checks', 'Bulk parser', 'Paginated CRUD APIs'],
    data: ['student_id', 'roll_no', 'name', 'branch', 'semester', 'section'],
  },
  {
    module: 'Rooms',
    objective: 'Maintain room inventory and capacity rules.',
    frontend: ['Room CRUD form', 'Building-wise filter', 'Capacity validation controls'],
    backend: ['Duplicate room prevention', 'Capacity range checks', 'Availability status APIs'],
    data: ['room_id', 'room_no', 'capacity', 'building'],
  },
  {
    module: 'Exams',
    objective: 'Configure exam sessions and schedules.',
    frontend: ['Exam/session form', 'Date/session selection', 'Exam list view'],
    backend: ['Session integrity checks', 'Exam CRUD APIs', 'Student mapping APIs'],
    data: ['exam_id', 'exam_name', 'date', 'session'],
  },
  {
    module: 'Seating',
    objective: 'Allocate students to rooms according to capacity.',
    frontend: ['Generate action', 'Room-wise occupancy view', 'Export/print actions'],
    backend: ['Allocation algorithm', 'Atomic persistence', 'Capacity and duplication guards'],
    data: ['allocation_id', 'exam_id', 'student_id', 'room_id'],
  },
  {
    module: 'Invigilation',
    objective: 'Distribute duties fairly with conflict prevention.',
    frontend: ['Auto allocation trigger', 'Conflict indicators', 'Manual override tools'],
    backend: ['Least-duty-first logic', 'Overlap checks', 'Duty counters and logs'],
    data: ['duty_id', 'exam_id', 'faculty_id', 'room_id'],
  },
  {
    module: 'Attendance',
    objective: 'Generate sheets and capture exam-day attendance.',
    frontend: ['Room-wise sheet', 'Present/Absent marking', 'Export summary'],
    backend: ['Sheet generation APIs', 'Status persistence', 'Summary aggregations'],
    data: ['attendance_id', 'allocation_id', 'status'],
  },
  {
    module: 'Replacements',
    objective: 'Handle replacement requests with approval workflow.',
    frontend: ['Request form', 'Approval queue', 'Status timeline'],
    backend: ['Approval workflow', 'Reassignment processing', 'Audit logs'],
    data: ['replacement_id', 'original_faculty_id', 'replacement_faculty_id', 'exam_id', 'reason'],
  },
  {
    module: 'Reports',
    objective: 'Provide operational and analytical outputs.',
    frontend: ['Date/session filters', 'Report listing', 'CSV/PDF export actions'],
    backend: ['Aggregation queries', 'Export generation', 'Access-controlled report APIs'],
    data: ['faculty duty summary', 'room utilization', 'attendance summary'],
  },
]

const architectureLayers = [
  'Presentation Layer: Route-based module pages and shared layout components.',
  'Application Layer: Module-specific orchestration and feature workflows.',
  'Service Layer: API clients, auth interceptors and DTO mappers.',
  'Domain/Data Layer: Backend services, algorithms and relational persistence.',
]

const deliveryPhases = [
  {
    phase: 'Phase 1 - Foundation',
    details: 'Routing, module boundaries, shared layout, theme system and project conventions.',
  },
  {
    phase: 'Phase 2 - Core Workflows',
    details: 'Student, room and exam modules with validation-first forms and list management.',
  },
  {
    phase: 'Phase 3 - Allocation Engines',
    details: 'Seating and invigilation orchestration with conflict handling and audit tracing.',
  },
  {
    phase: 'Phase 4 - Operations',
    details: 'Attendance capture, replacement flow and role-governed approvals.',
  },
  {
    phase: 'Phase 5 - Insights',
    details: 'Report generation, exports, quality checks and operational hardening.',
  },
]

const qualityChecklist = [
  'Every module has isolated page, services and type contracts.',
  'No cross-module UI logic coupling outside shared components.',
  'All API calls follow common error and retry strategy.',
  'Forms include field-level and submit-level validation paths.',
  'User-facing states include loading, empty, success and error.',
  'Light/Dark theme accessibility verified across major screens.',
]

const folderOwnership = [
  {
    area: 'src/modules/<module>/pages',
    owner: 'Feature Team',
    responsibility: 'Module screens, feature composition, route-specific orchestration.',
  },
  {
    area: 'src/modules/<module>/services',
    owner: 'Feature Team',
    responsibility: 'Module API calls, mapping, business-facing helper functions.',
  },
  {
    area: 'src/components/common',
    owner: 'Platform UI Team',
    responsibility: 'Reusable UI building blocks without module-specific logic.',
  },
  {
    area: 'src/app',
    owner: 'Platform Team',
    responsibility: 'Routing, providers, shell layout, global app policies.',
  },
]

const apiContracts = [
  {
    module: 'Students',
    endpoints: ['POST /students/import', 'GET /students', 'POST /students', 'PATCH /students/:id'],
    requestModel: 'rollNo, name, branch, semester, section',
    responseModel: 'id, rollNo, profile, academicMeta, createdAt, updatedAt',
  },
  {
    module: 'Rooms',
    endpoints: ['GET /rooms', 'POST /rooms', 'PATCH /rooms/:id', 'POST /rooms/validate-capacity'],
    requestModel: 'roomNo, building, capacity, availabilityStatus',
    responseModel: 'id, roomNo, capacity, occupancyConfig, status',
  },
  {
    module: 'Exams',
    endpoints: ['GET /exams', 'POST /exams', 'PATCH /exams/:id', 'POST /exams/:id/map-students'],
    requestModel: 'examName, date, session, studentCriteria',
    responseModel: 'id, examCode, schedule, mappedStudents, state',
  },
  {
    module: 'Seating',
    endpoints: ['POST /seating/generate', 'GET /seating/:examId', 'POST /seating/:examId/export'],
    requestModel: 'examId, roomFilters, strategy, constraints',
    responseModel: 'allocationId, roomWiseSummary, unassignedList, generatedAt',
  },
]

const engineeringWorkflow = [
  'Step 1: Freeze module scope and define acceptance criteria.',
  'Step 2: Create route, page skeleton and module-local types.',
  'Step 3: Build service layer and API mappers for the module.',
  'Step 4: Implement forms, tables and action workflows with validation.',
  'Step 5: Add loading, empty, error and success states.',
  'Step 6: Integrate audit logging points and role checks.',
  'Step 7: Complete unit/integration testing and release checklist.',
]

const testStrategy = [
  'Unit tests for module helpers, validators and mappers.',
  'Component tests for critical forms and tables per module.',
  'Route-level integration tests for end-to-end user workflows.',
  'Theme verification for light/dark visual consistency.',
  'Regression checks for seating and invigilation algorithms.',
]

const releaseReadiness = [
  'Environment variables documented and validated at startup.',
  'API timeout, retry and fallback behavior verified.',
  'Role matrix validated against all module routes and actions.',
  'Operational reports and exports verified with sample datasets.',
  'Critical logs and observability events confirmed in monitoring.',
]

export function DocsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-3 text-xl font-semibold">Implementation Documentation</h2>
        <p className="text-sm text-[rgb(var(--color-text-secondary))]">
          This page defines the complete module-wise development blueprint for the Automated Examination
          Seating, Invigilation and Attendance Management System.
        </p>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">System Design Principles</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <section className="rounded-xl border border-[rgb(var(--color-border))] p-4">
            <h4 className="font-semibold">Module Isolation</h4>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
              Each module owns its page, interaction model and integration points.
            </p>
          </section>
          <section className="rounded-xl border border-[rgb(var(--color-border))] p-4">
            <h4 className="font-semibold">Shared-Only Reuse</h4>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
              Common UI and helper utilities live in shared space without leaking business logic.
            </p>
          </section>
          <section className="rounded-xl border border-[rgb(var(--color-border))] p-4">
            <h4 className="font-semibold">Validation-First UX</h4>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
              Inputs, workflows and state transitions are designed to prevent operational errors.
            </p>
          </section>
        </div>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Architecture Blueprint</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {architectureLayers.map((layer) => (
            <li key={layer}>• {layer}</li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3 className="mb-4 text-lg font-semibold">Module-wise Development Details</h3>
        <div className="space-y-5">
          {moduleDocs.map((item) => (
            <section key={item.module} className="rounded-xl border border-[rgb(var(--color-border))] p-4">
              <h4 className="text-base font-semibold">{item.module} Module</h4>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">{item.objective}</p>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Frontend Scope</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {item.frontend.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Backend Scope</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {item.backend.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Core Data Contracts</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {item.data.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Delivery Roadmap</h3>
        <div className="space-y-3">
          {deliveryPhases.map((item) => (
            <section key={item.phase} className="rounded-xl border border-[rgb(var(--color-border))] p-4">
              <h4 className="font-semibold">{item.phase}</h4>
              <p className="mt-1 text-sm text-[rgb(var(--color-text-secondary))]">{item.details}</p>
            </section>
          ))}
        </div>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Folder Ownership and Responsibilities</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Owner</th>
                <th>Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {folderOwnership.map((item) => (
                <tr key={item.area}>
                  <td>{item.area}</td>
                  <td>{item.owner}</td>
                  <td>{item.responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">API Contract Blueprint</h3>
        <div className="space-y-4">
          {apiContracts.map((contract) => (
            <section key={contract.module} className="rounded-xl border border-[rgb(var(--color-border))] p-4">
              <h4 className="text-base font-semibold">{contract.module}</h4>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Suggested Endpoints</p>
                  <ul className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    {contract.endpoints.map((endpoint) => (
                      <li key={endpoint}>• {endpoint}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Request Model</p>
                  <p className="text-sm text-[rgb(var(--color-text-secondary))]">{contract.requestModel}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Response Model</p>
                  <p className="text-sm text-[rgb(var(--color-text-secondary))]">{contract.responseModel}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Engineering Workflow</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {engineeringWorkflow.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Testing Strategy</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {testStrategy.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Development Requirements Checklist</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {qualityChecklist.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3 className="mb-3 text-lg font-semibold">Release Readiness Checklist</h3>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {releaseReadiness.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
