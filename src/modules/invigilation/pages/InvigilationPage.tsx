const dutyRows = [
  { faculty: 'Dr. Neha Sinha', exam: 'Mid Semester CSE', room: 'A-101', totalDuties: 4 },
  { faculty: 'Prof. Amit Roy', exam: 'Mid Semester CSE', room: 'A-102', totalDuties: 3 },
  { faculty: 'Dr. Kavya Mehta', exam: 'Mid Semester IT', room: 'B-204', totalDuties: 2 },
]

export function InvigilationPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Invigilation Allocation Module</h2>
        <p className="mb-4 text-sm text-[rgb(var(--color-text-secondary))]">
          Assign invigilators using least-duty-first balancing with overlap checks.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary" type="button">Auto Allocate Duties</button>
          <button className="btn btn-outline" type="button">Check Conflicts</button>
          <button className="btn btn-outline" type="button">Manual Override</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Faculty</th>
                <th>Exam</th>
                <th>Room</th>
                <th>Total Duties</th>
              </tr>
            </thead>
            <tbody>
              {dutyRows.map((row) => (
                <tr key={`${row.faculty}-${row.room}`}>
                  <td>{row.faculty}</td>
                  <td>{row.exam}</td>
                  <td>{row.room}</td>
                  <td>{row.totalDuties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
