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
        color: "#000",
      }}
    >
      <h3 style={{ color: "#000" }}>Seating Summary</h3>

      <p style={{ color: "#000" }}>Total Students: {totalStudents}</p>
      <p style={{ color: "#000" }}>Total Seats: {totalSeats}</p>
      <p style={{ color: "#000" }}>Occupied Seats: {occupiedSeats}</p>
      <p style={{ color: "#000" }}>Empty Seats: {emptySeats}</p>
    </div>
  );
}

export default Summary;