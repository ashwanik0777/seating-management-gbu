// ── Prefix → Batch detail map ─────────────────────────────────────
const PREFIX_DETAIL_MAP: Record<string, string> = {
  "245UCS": "B. Tech. (CSE) Batch (2024-2028) 4th Semester",
  "245UCA": "B. Tech. (CSE-AI) Batch (2024-2028) 4th Semester",
  "255PCS": "M. Tech. CSE (SE) Batch (2025-2027) 2nd Semester",
  "225ICS": "Int. B. Tech. CSE (SE) Batch (2022-2027) 8th Semester",
  "245ICS": "5 Year Integrated B. Tech.-M.Tech (CSE) Batch (2024-2029) 4th Semester",
};

type StudentGroup = {
  detail: string;
  startRoll: string;
  endRoll: string;
  count: number;
};

function groupStudentsByPrefix(students: string[], exam: string): StudentGroup[] {
  const groups: Record<string, string[]> = {};
  for (const roll of students) {
    const match = roll.match(/^([A-Za-z0-9]*?[A-Za-z])([0-9]+)$/);
    const prefix = match ? match[1] : roll;
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(roll);
  }
  return Object.entries(groups).map(([prefix, rolls]) => ({
    detail: `${PREFIX_DETAIL_MAP[prefix] ?? prefix} (${rolls[0]} To ${rolls[rolls.length - 1]}) ${exam}`,
    startRoll: rolls[0],
    endRoll: rolls[rolls.length - 1],
    count: rolls.length,
  }));
}

// ── Props ──────────────────────────────────────────────────────────
type SummaryProps = {
  totalStudents: number;
  totalSeats: number;
  occupiedSeats: number;
  emptySeats: number;
  dark?: boolean;
  // New props for the detail table
  students?: string[];
  exam?: string;
};

function Summary({
  dark = false,
  students = [],
  exam = "",
}: SummaryProps) {
  const groups = groupStudentsByPrefix(students, exam);
  const total  = students.length;

  const bg       = dark ? "#16181d" : "#ffffff";
  const border   = dark ? "#3a3d48" : "#cccccc";
  const headerBg = dark ? "#1e2028" : "#f0f0f0";
  const rowHl    = dark ? "#1a3a4a" : "#b3e5fc";
  const text     = dark ? "#e8e6e1" : "#000000";
  const subText  = dark ? "#9a9da8" : "#444444";

  const cellStyle = (highlight = false): React.CSSProperties => ({
    padding: "10px 14px",
    border: `1px solid ${border}`,
    color: highlight ? (dark ? "#fff" : "#000") : text,
    background: highlight ? rowHl : bg,
    fontWeight: highlight ? "bold" : "normal",
    fontSize: 12,
    transition: "background 0.2s",
  });

  const headerCell: React.CSSProperties = {
    padding: "10px 14px",
    border: `1px solid ${border}`,
    background: headerBg,
    color: subText,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  return (
    <div style={{ width: "100%", marginTop: 24, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ ...headerCell, width: 60 }}>S.No.</th>
            <th style={{ ...headerCell }}>Student Detail</th>
            <th style={{ ...headerCell, width: 140 }}>No. of Students</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g, i) => {
            const highlight = g.startRoll.startsWith("255PCS");
            return (
              <tr key={i}>
                <td style={{ ...cellStyle(highlight), textAlign: "center" }}>{i + 1}</td>
                <td style={{ ...cellStyle(highlight) }}>{g.detail}</td>
                <td style={{ ...cellStyle(highlight), textAlign: "center", fontWeight: "bold" }}>{g.count}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{ ...cellStyle(), textAlign: "right", fontWeight: "bold", color: subText }}>
              Total
            </td>
            <td style={{ ...cellStyle(), textAlign: "center", fontWeight: "bold" }}>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Summary;