const replacementRows = [
  {
    originalFaculty: 'Dr. Neha Sinha',
    replacementFaculty: 'Prof. Saurabh Rao',
    exam: 'Mid Semester CSE',
    status: 'Approved',
  },
  {
    originalFaculty: 'Prof. Amit Roy',
    replacementFaculty: 'Dr. Ritu Das',
    exam: 'Mid Semester IT',
    status: 'Pending',
  },
]

export function ReplacementsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Replacement Management Module</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Original faculty" />
          <input className="input" placeholder="Replacement faculty" />
          <input className="input" placeholder="Reason" />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" type="button">Submit Request</button>
          <button className="btn btn-outline" type="button">View Approval Queue</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Original Faculty</th>
                <th>Replacement Faculty</th>
                <th>Exam</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {replacementRows.map((row) => (
                <tr key={`${row.originalFaculty}-${row.exam}`}>
                  <td>{row.originalFaculty}</td>
                  <td>{row.replacementFaculty}</td>
                  <td>{row.exam}</td>
                  <td>
                    <span className={`badge ${row.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                      {row.status}
                    </span>
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
