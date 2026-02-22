import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { DocsPage } from '../../modules/docs/pages/DocsPage'
import { UnderDevelopmentPage } from '../../modules/common/pages/UnderDevelopmentPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <UnderDevelopmentPage
              moduleName="Dashboard"
              description="System overview, KPI cards and execution insights are"
            />
          }
        />
        <Route
          path="students"
          element={
            <UnderDevelopmentPage
              moduleName="Students"
              description="Student onboarding, CSV processing and record management are"
            />
          }
        />
        <Route
          path="rooms"
          element={
            <UnderDevelopmentPage
              moduleName="Rooms"
              description="Room inventory, capacity controls and building-wise operations are"
            />
          }
        />
        <Route
          path="exams"
          element={
            <UnderDevelopmentPage
              moduleName="Exams"
              description="Exam setup, session scheduling and student mapping workflows are"
            />
          }
        />
        <Route
          path="seating"
          element={
            <UnderDevelopmentPage
              moduleName="Seating"
              description="Auto-allocation engine, occupancy planning and seating exports are"
            />
          }
        />
        <Route
          path="invigilation"
          element={
            <UnderDevelopmentPage
              moduleName="Invigilation"
              description="Fair duty balancing, conflict checks and assignment tools are"
            />
          }
        />
        <Route
          path="attendance"
          element={
            <UnderDevelopmentPage
              moduleName="Attendance"
              description="Attendance sheet generation, marking and analytics workflows are"
            />
          }
        />
        <Route
          path="replacements"
          element={
            <UnderDevelopmentPage
              moduleName="Replacements"
              description="Replacement request approvals and reassignment tracking are"
            />
          }
        />
        <Route
          path="reports"
          element={
            <UnderDevelopmentPage
              moduleName="Reports"
              description="Report generation, filtering and export pipelines are"
            />
          }
        />
        <Route path="docs" element={<DocsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
