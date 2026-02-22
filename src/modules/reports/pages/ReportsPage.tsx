const reportRows = [
  { report: 'Faculty Duty Distribution', format: 'CSV/PDF', lastGenerated: '2026-02-20' },
  { report: 'Room Utilization Report', format: 'CSV/PDF', lastGenerated: '2026-02-21' },
  { report: 'Attendance Summary', format: 'CSV/PDF', lastGenerated: '2026-02-22' },
]

export function ReportsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Reporting and Analytics Module</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input type="date" className="input" />
          <input type="date" className="input" />
          <button type="button" className="btn btn-primary">Apply Date Filter</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Formats</th>
                <th>Last Generated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((row) => (
                <tr key={row.report}>
                  <td>{row.report}</td>
                  <td>{row.format}</td>
                  <td>{row.lastGenerated}</td>
                  <td>
                    <button type="button" className="btn btn-outline">Generate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
