export type NavigationItem = {
  label: string
  path: string
  description: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/', description: 'System overview and quick metrics' },
  { label: 'Students', path: '/students', description: 'Student records and import operations' },
  { label: 'Rooms', path: '/rooms', description: 'Room setup and capacity management' },
  { label: 'Exams', path: '/exams', description: 'Exam and session configuration' },
  { label: 'Seating', path: '/seating', description: 'Automatic seating allocation workflows' },
  { label: 'Invigilation', path: '/invigilation', description: 'Duty assignment and balancing' },
  { label: 'Attendance', path: '/attendance', description: 'Room-wise attendance operations' },
  { label: 'Replacements', path: '/replacements', description: 'Replacement request and approval flow' },
  { label: 'Reports', path: '/reports', description: 'Operational and analytical reports' },
  { label: 'Docs', path: '/docs', description: 'Architecture and implementation documentation' },
]
