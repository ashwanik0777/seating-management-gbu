const attendanceRows = [
  { rollNo: 'CS24001', name: 'Aarav Sharma', room: 'A-101', status: 'Present' },
  { rollNo: 'CS24002', name: 'Diya Verma', room: 'A-101', status: 'Absent' },
  { rollNo: 'IT24011', name: 'Rahul Jain', room: 'B-204', status: 'Present' },
]

export function AttendancePage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Attendance Management Module</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary" type="button">Generate Attendance Sheet</button>
          <button className="btn btn-outline" type="button">Mark Bulk Present</button>
          <button className="btn btn-outline" type="button">Export Attendance Report</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRows.map((row) => (
                <tr key={row.rollNo}>
                  <td>{row.rollNo}</td>
                  <td>{row.name}</td>
                  <td>{row.room}</td>
                  <td>
                    <span className={`badge ${row.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
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
