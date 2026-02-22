const kpis = [
  { title: 'Total Students', value: '2,480' },
  { title: 'Active Rooms', value: '64' },
  { title: 'Upcoming Exams', value: '12' },
  { title: 'Assigned Invigilations', value: '186' },
]

const quickActions = [
  'Upload student master file',
  'Verify room capacities',
  'Create exam session',
  'Generate seating and invigilation plans',
]

export function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <article key={kpi.title} className="kpi-card">
            <div>
              <p className="kpi-title">{kpi.title}</p>
              <p className="kpi-value">{kpi.value}</p>
            </div>
          </article>
        ))}
      </div>

      <article className="card">
        <h2 className="mb-3 text-lg font-semibold">Execution Checklist</h2>
        <ul className="space-y-2 text-[rgb(var(--color-text-secondary))]">
          {quickActions.map((action) => (
            <li key={action}>• {action}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
