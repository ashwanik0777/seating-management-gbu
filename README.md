# Automated Examination Seating, Invigilation and Attendance Management System

## 1. Project Overview

This project is a modular web application for managing end-to-end university examination operations.
It is designed to reduce manual work, eliminate operational conflicts, and provide a transparent,
auditable workflow for exam cell teams, administrators, and faculty members.

The system covers:
- Student master data management
- Room and capacity configuration
- Exam session setup
- Automated seating allocation
- Invigilation duty allocation
- Attendance workflow
- Replacement request and approval process
- Reporting and export workflows

## 2. Vision and Objectives

### Core Objectives
- Automate operational steps that are usually manual and error-prone.
- Enforce rule-based validations for capacity, conflicts, and permissions.
- Provide role-aware UI and workflows for Admin, Exam Cell, and Faculty.
- Maintain complete traceability for critical actions.
- Support scalable data operations with pagination, filters, and exports.

### Target Outcomes
- Fair and conflict-free seating and duty assignments.
- Better planning visibility for exam operations.
- Reliable reporting and historical analysis support.

## 3. High-Level Architecture

Frontend (React + Vite + TypeScript + Tailwind CSS)
-> REST API (Node.js or Django REST Framework)
-> Relational Database (MySQL or PostgreSQL)

## 4. Current Frontend Implementation Status

This repository currently includes:
- A modular route-based frontend structure.
- A centralized app shell with theme toggle support.
- A dedicated `/docs` route containing detailed implementation documentation.
- Under-development pages for core operational modules.

## 5. Tech Stack

### Frontend
- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Router DOM

### Tooling
- ESLint 9
- TypeScript project references (`tsconfig.app.json`, `tsconfig.node.json`)

## 6. User Roles and Permissions

### Admin
- Full access to all modules
- User governance and system controls
- Replacement approvals and report oversight

### Exam Cell
- Student, room, and exam setup
- Seating and invigilation execution
- Attendance and report operations

### Faculty
- Duty visibility
- Attendance actions for assigned contexts (implementation-dependent)
- Replacement request creation and status tracking

## 7. Route Map

- `/` -> Dashboard (planned)
- `/students` -> Students module (planned)
- `/rooms` -> Rooms module (planned)
- `/exams` -> Exams module (planned)
- `/seating` -> Seating module (planned)
- `/invigilation` -> Invigilation module (planned)
- `/attendance` -> Attendance module (planned)
- `/replacements` -> Replacements module (planned)
- `/reports` -> Reports module (planned)
- `/docs` -> Full frontend documentation (active)

## 8. Module-Wise Functional Specifications

### 8.1 Dashboard Module

Purpose:
- Provide a system command center view.

Primary Features:
- KPI overview widgets
- Quick action shortcuts
- Operational blockers panel
- Recent activity timeline

Expected APIs:
- `GET /dashboard/metrics`
- `GET /dashboard/activity`
- `GET /dashboard/blockers`

### 8.2 Students Module

Purpose:
- Manage student master records used in all allocations.

Primary Features:
- Student CRUD
- Search and multi-filter (branch/semester/section)
- CSV import with row-level validation
- Pagination and sorting

Validations:
- Unique roll number
- Required identity and academic fields
- CSV schema/header integrity checks

Expected APIs:
- `GET /students`
- `POST /students`
- `PATCH /students/:id`
- `DELETE /students/:id`
- `POST /students/import`

### 8.3 Rooms Module

Purpose:
- Manage room inventory and exam readiness constraints.

Primary Features:
- Room CRUD
- Building/floor grouping
- Capacity validation board
- Room status management (ready/blocked/maintenance)

Validations:
- Unique room number policy
- Capacity range rules
- Status rules for allocation eligibility

Expected APIs:
- `GET /rooms`
- `POST /rooms`
- `PATCH /rooms/:id`
- `POST /rooms/validate-capacity`

### 8.4 Exams Module

Purpose:
- Create exam sessions and map eligible students.

Primary Features:
- Session creation wizard
- Draft/publish lifecycle
- Mapping by academic criteria
- Overlap conflict detection

Validations:
- Required date and shift
- Duplicate session prevention
- Mandatory eligibility mapping

Expected APIs:
- `GET /exams`
- `POST /exams`
- `PATCH /exams/:id`
- `POST /exams/:id/map-students`

### 8.5 Seating Module

Purpose:
- Allocate students to rooms based on capacity and exam configuration.

Primary Features:
- Allocation strategy controls
- Room-wise occupancy summary
- Unassigned exception list
- Print/PDF export

Validations:
- No over-capacity assignment
- No duplicate student assignment
- Requires published exam and ready rooms

Expected APIs:
- `POST /seating/generate`
- `GET /seating/:examId`
- `POST /seating/:examId/export`

### 8.6 Invigilation Module

Purpose:
- Assign invigilator duties fairly with conflict prevention.

Primary Features:
- Auto assignment
- Manual override with impact visibility
- Conflict review
- Workload trend indicators

Validations:
- No overlapping assignment per faculty
- Availability and eligibility checks
- Mandatory reason for manual override

Expected APIs:
- `POST /invigilation/auto-assign`
- `GET /invigilation/:examId`
- `PATCH /invigilation/:dutyId`

### 8.7 Attendance Module

Purpose:
- Generate and manage attendance for exam sessions.

Primary Features:
- Attendance sheet generation from seating
- Present/Absent status updates
- Bulk update and undo support
- Attendance summary exports

Validations:
- Marking only for active sessions
- Valid allocation-to-student relationship
- Bulk update confirmation

Expected APIs:
- `POST /attendance/sheets/:examId`
- `PATCH /attendance/:allocationId`
- `GET /attendance/:examId/summary`

### 8.8 Replacements Module

Purpose:
- Handle invigilation replacement requests and approvals.

Primary Features:
- Request submission
- Admin decision queue
- Auto suggestion for replacement candidates
- Audit timeline

Validations:
- Required reason and context for request
- Conflict-free replacement faculty check
- Mandatory decision note for approval/rejection

Expected APIs:
- `POST /replacements`
- `GET /replacements?status=`
- `PATCH /replacements/:id/decision`

### 8.9 Reports Module

Purpose:
- Deliver operational and analytical reports.

Primary Features:
- Report catalog
- Filtered generation
- Download history
- Async export queue support

Validations:
- Date/session filter constraints
- Required source-data availability checks

Expected APIs:
- `GET /reports/catalog`
- `POST /reports/generate`
- `GET /reports/jobs`
- `GET /reports/download/:jobId`

## 9. Frontend Architecture Guidelines

### Design Principles
- Module-first ownership
- Reusable shared primitives only
- Validation-first UX
- Explicit async state handling

### Required UI States per Page
- Loading
- Empty
- Error
- Success/Ready

### UX Standards
- Primary action clarity
- Search/filter/pagination patterns for data lists
- Confirmation for destructive actions
- Accessible focus and keyboard navigation

## 10. Folder Ownership and Development Boundaries

- `src/app` -> shell, router, providers, global policies
- `src/components/common` -> shared reusable components
- `src/modules/<module>/pages` -> module pages
- `src/modules/<module>/services` -> API and mapping logic
- `src/modules/<module>/hooks` -> local state/query hooks
- `src/modules/<module>/types` -> module DTOs and contracts

## 11. Complete Current File Structure

```text
seating-management/
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
├── public/
│   └── favicon.ico
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── assets/
    │   └── react.svg
    ├── app/
    │   ├── config/
    │   │   └── navigation.ts
    │   ├── layout/
    │   │   └── AppLayout.tsx
    │   ├── providers/
    │   │   └── ThemeProvider.tsx
    │   └── router/
    │       └── AppRouter.tsx
    ├── components/
    │   └── common/
    │       └── ThemeToggle.tsx
    └── modules/
        ├── attendance/
        │   └── pages/
        │       └── AttendancePage.tsx
        ├── common/
        │   └── pages/
        │       └── UnderDevelopmentPage.tsx
        ├── dashboard/
        │   └── pages/
        │       └── DashboardPage.tsx
        ├── docs/
        │   └── pages/
        │       └── DocsPage.tsx
        ├── exams/
        │   └── pages/
        │       └── ExamsPage.tsx
        ├── invigilation/
        │   └── pages/
        │       └── InvigilationPage.tsx
        ├── replacements/
        │   └── pages/
        │       └── ReplacementsPage.tsx
        ├── reports/
        │   └── pages/
        │       └── ReportsPage.tsx
        ├── rooms/
        │   └── pages/
        │       └── RoomsPage.tsx
        ├── seating/
        │   └── pages/
        │       └── SeatingPage.tsx
        └── students/
            └── pages/
                └── StudentsPage.tsx
```

## 12. `/docs` Page as the Primary Build Manual

The route `/docs` is the in-app source of truth for frontend implementation details.
It should be used by developers as the primary reference while building all modules.

The `/docs` page includes:
- module specifications
- route coverage
- role matrix
- validation standards
- API expectations
- testing and delivery guidance

## 13. Setup and Run

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 14. Engineering Quality Checklist

- Module boundaries are not mixed.
- Shared components do not include module-specific business logic.
- Route-level ownership is clear.
- Validation logic is complete and testable.
- All critical actions are auditable.
- UI supports light and dark themes consistently.

## 15. Testing Strategy (Frontend)

- Unit tests for validators and mappers
- Component tests for forms and tables
- Integration tests per module workflow
- Permission tests for route/action access
- Theme and responsive behavior checks

## 16. Non-Functional Requirements

- Performance: server-side pagination and optimized rendering for large datasets
- Security: strict role checks and safe token handling
- Accessibility: keyboard navigation and visible focus states
- Reliability: robust error and retry patterns
- Observability: logs for critical operational actions

## 17. Future Improvements

- Real backend integration for all module pages
- Export queue tracking with status notifications
- Advanced analytics dashboards
- ERP and notification integration (email/SMS)
- AI-assisted allocation optimization

## 18. Contributors

Exam Automation Development Team

## 19. License

Institutional Academic Use Only

