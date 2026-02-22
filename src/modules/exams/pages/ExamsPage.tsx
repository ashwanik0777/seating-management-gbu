const examRows = [
  { exam: 'Mid Semester CSE', date: '2026-03-10', session: 'Morning', students: 620 },
  { exam: 'Mid Semester IT', date: '2026-03-11', session: 'Evening', students: 480 },
]

export function ExamsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Examination Management Module</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <input className="input" placeholder="Exam name" />
          <input className="input" type="date" />
          <select className="input" defaultValue="Morning">
            <option>Morning</option>
            <option>Evening</option>
          </select>
          <button type="button" className="btn btn-primary">Create Session</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Date</th>
                <th>Session</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {examRows.map((row) => (
                <tr key={`${row.exam}-${row.date}`}>
                  <td>{row.exam}</td>
                  <td>{row.date}</td>
                  <td>{row.session}</td>
                  <td>{row.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
