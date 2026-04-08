type SummaryProps = {
  totalStudents: number;
  totalSeats: number;
  occupiedSeats: number;
  emptySeats: number;
};

function Summary({
  totalStudents,
  totalSeats,
  occupiedSeats,
  emptySeats,
}: SummaryProps) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid black",
        width: "250px",
      }}
    >
      <h3>Seating Summary</h3>

      <p>Total Students: {totalStudents}</p>
      <p>Total Seats: {totalSeats}</p>
      <p>Occupied Seats: {occupiedSeats}</p>
      <p>Empty Seats: {emptySeats}</p>
    </div>
  );
}

export default Summary;