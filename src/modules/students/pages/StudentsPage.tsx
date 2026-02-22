const studentRows = [
  { rollNo: 'CS24001', name: 'Aarav Sharma', branch: 'CSE', semester: '6', section: 'A' },
  { rollNo: 'CS24002', name: 'Diya Verma', branch: 'CSE', semester: '6', section: 'A' },
  { rollNo: 'IT24011', name: 'Rahul Jain', branch: 'IT', semester: '6', section: 'B' },
]

export function StudentsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Student Management Module</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input className="input" placeholder="Search by name or roll no" />
          <input className="input" placeholder="Filter by branch" />
          <input className="input" placeholder="Filter by semester" />
          <button type="button" className="btn btn-primary">Upload CSV</button>
        </div>
      </article>

      <article className="card">
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="btn btn-primary" type="button">Add Student</button>
          <button className="btn btn-outline" type="button">Bulk Validate</button>
          <button className="btn btn-outline" type="button">Export List</button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {studentRows.map((student) => (
                <tr key={student.rollNo}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>{student.semester}</td>
                  <td>{student.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
