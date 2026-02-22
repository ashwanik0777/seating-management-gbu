const roomRows = [
  { roomNo: 'A-101', building: 'Academic Block A', capacity: 40, status: 'Ready' },
  { roomNo: 'A-102', building: 'Academic Block A', capacity: 36, status: 'Ready' },
  { roomNo: 'B-204', building: 'Academic Block B', capacity: 48, status: 'Maintenance' },
]

export function RoomsPage() {
  return (
    <section className="space-y-6">
      <article className="card">
        <h2 className="mb-4 text-lg font-semibold">Room Management Module</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Room number" />
          <input className="input" placeholder="Building" />
          <input className="input" placeholder="Capacity" type="number" />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" type="button">Add Room</button>
          <button className="btn btn-outline" type="button">Validate Capacity Rules</button>
        </div>
      </article>

      <article className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Building</th>
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {roomRows.map((room) => (
                <tr key={room.roomNo}>
                  <td>{room.roomNo}</td>
                  <td>{room.building}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <span className={`badge ${room.status === 'Ready' ? 'badge-success' : 'badge-warning'}`}>
                      {room.status}
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
