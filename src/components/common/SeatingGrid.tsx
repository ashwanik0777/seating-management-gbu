type SeatingGridProps = {
  seats: (string | null)[][];
};

function SeatingGrid({ seats }: SeatingGridProps) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Seating Grid</h3>

      {seats.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((seat, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: seat ? "black" : "red", 
                margin: "4px",
              }}
            >
              {seat ? seat : "X"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatingGrid;