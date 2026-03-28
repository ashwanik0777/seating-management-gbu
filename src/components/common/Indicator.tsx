type IndicatorProps = {
  label: string;
  value: number;
};

function Indicator({ label, value }: IndicatorProps) {
  return (
    <div style={{ marginTop: "10px" }}>
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Indicator;