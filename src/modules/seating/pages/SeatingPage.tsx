const allocationRows = [
  { room: 'A-101', capacity: 40, allocated: 40, exam: 'Mid Semester CSE' },
  { room: 'A-102', capacity: 36, allocated: 34, exam: 'Mid Semester CSE' },
  { room: 'B-204', capacity: 48, allocated: 48, exam: 'Mid Semester IT' },
]

export function SeatingPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Seating Allocation Module</h2>
        <p className="mb-4 text-sm text-[rgb(var(--color-text-secondary))]">
          Generate room-wise allocation based on exam session, sorted roll numbers and room capacities.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary">Generate Seating Plan</button>
          <button type="button" className="btn btn-outline">Run Capacity Validation</button>
          <button type="button" className="btn btn-outline">Export Seating PDF</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Room</th>
                <th>Capacity</th>
                <th>Allocated</th>
                <th>Occupancy</th>
              </tr>
            </thead>
            <tbody>
              {allocationRows.map((row) => {
                const occupancy = Math.round((row.allocated / row.capacity) * 100)
                return (
                  <tr key={`${row.exam}-${row.room}`}>
                    <td>{row.exam}</td>
                    <td>{row.room}</td>
                    <td>{row.capacity}</td>
                    <td>{row.allocated}</td>
                    <td>
                      <span className={`badge ${occupancy >= 95 ? 'badge-success' : 'badge-warning'}`}>
                        {occupancy}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
