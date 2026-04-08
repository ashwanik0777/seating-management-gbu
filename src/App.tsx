import { useState, useRef } from "react";

import Button from "./components/common/Button";
import Dropdown from "./components/common/Dropdown";
import Toggle from "./components/common/Toggle";
import Summary from "./components/common/Summary";

// ── Types ──────────────────────────────────────────────────────────
type CsvData = {
  // exam -> room -> roll numbers (in order)
  [exam: string]: { [room: string]: string[] };
};

// ── Room layout template ───────────────────────────────────────────
// 3 sections: [2 desks], [3 desks], [2 desks] — each desk = 2 sub-columns, 5 rows
// Total capacity: (4 + 6 + 4) * 5 = 70 seats
const ROOM_SECTIONS = [
  { desks: ["DESK-1", "DESK-2"], colsPerDesk: 2, totalCols: 4, rows: 5 },
  { desks: ["DESK-1", "DESK-2", "DESK-3"], colsPerDesk: 2, totalCols: 6, rows: 5 },
  { desks: ["DESK-1", "DESK-2"], colsPerDesk: 2, totalCols: 4, rows: 5 },
];

// Fill students column-by-column per desk across all sections.
// Each desk has 2 sub-columns: left col fills top-to-bottom first, then right col.
// This naturally keeps regular students left and highlighted students right per desk,
// and spreads students across all 3 sections before looping back.
function buildRoomSections(students: string[], alternate: boolean) {
  const totalSlots = ROOM_SECTIONS.reduce((a, s) => a + s.totalCols * s.rows, 0);
  const slots: (string | null)[] = new Array(totalSlots).fill(null);
  let studentIdx = 0;
  let slotOffset = 0;

  // Pass 1: assign students into slot array, column-by-column per section
  for (const section of ROOM_SECTIONS) {
    for (let col = 0; col < section.totalCols; col++) {
      if (alternate && col % 2 === 1) {
        slotOffset += section.rows;
        continue;
      }
      for (let row = 0; row < section.rows; row++) {
        const slotIndex = slotOffset + col * section.rows + row;
        slots[slotIndex] = students[studentIdx] ?? null;
        studentIdx++;
      }
    }
    slotOffset += section.totalCols * section.rows;
  }

  // Pass 2: convert slot array back into row-major grids for rendering
  let readOffset = 0;
  return ROOM_SECTIONS.map((section) => {
    const colMajor: (string | null)[][] = [];
    for (let col = 0; col < section.totalCols; col++) {
      const colData: (string | null)[] = [];
      for (let row = 0; row < section.rows; row++) {
        colData.push(slots[readOffset + col * section.rows + row]);
      }
      colMajor.push(colData);
    }
    readOffset += section.totalCols * section.rows;

    const grid: (string | null)[][] = [];
    for (let row = 0; row < section.rows; row++) {
      grid.push(colMajor.map(col => col[row]));
    }

    return { ...section, grid };
  });
}

// ── CSV parser ─────────────────────────────────────────────────────
function parseCsv(text: string): CsvData {
  const lines = text.trim().split("\n");
  const data: CsvData = {};
  const startIdx = lines[0].toLowerCase().includes("exam") ? 1 : 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 3) continue;
    const [exam, room, roll] = parts;
    if (!exam || !room || !roll) continue;
    if (!data[exam]) data[exam] = {};
    if (!data[exam][room]) data[exam][room] = [];
    data[exam][room].push(roll);
  }

  return data;
}

// ── Helpers ────────────────────────────────────────────────────────
const isHighlighted = (id: string | null) =>
  id !== null && id.startsWith("255PCS");

// ── SeatingPlanPreview ─────────────────────────────────────────────
function SeatingPlanPreview({
  exam,
  room,
  students,
  alternate,
}: {
  exam: string;
  room: string;
  students: string[];
  alternate: boolean;
}) {
  const sections = buildRoomSections(students, alternate);
  const totalSlots = ROOM_SECTIONS.reduce((a, s) => a + s.totalCols * s.rows, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff", padding: "16px", width: "100%", color: "#000" }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: "bold", fontSize: 15 }}>Seating Plan (SOICT)</div>
        <div style={{ fontWeight: "bold", fontSize: 14 }}>{room}</div>
        <div style={{ fontWeight: "bold", fontSize: 13 }}>
          {alternate ? "Alternate Seating" : "Normal Seating"} · {exam}&nbsp;&nbsp;
          {new Date().toLocaleDateString("en-GB").replace(/\//g, "-")}
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
        {sections.map((section, si) => (
          <div
            key={si}
            style={{ flex: `${section.desks.length} 1 0`, minWidth: 0, border: "1px solid #000" }}
          >
            {/* Section header */}
            <div style={{
              textAlign: "center", fontWeight: "bold", fontSize: 12,
              borderBottom: "1px solid #000", padding: "4px 6px",
              background: "#f0f0f0", color: "#000",
            }}>
              WHITE BOARD
            </div>

            {/* Desk headers — each spans 2 sub-columns */}
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${section.totalCols}, 1fr)`,
              borderBottom: "1px solid #000",
            }}>
              {section.desks.map((desk, di) => (
                <div key={di} style={{
                  gridColumn: "span 2",
                  textAlign: "center", fontSize: 10, fontWeight: "bold",
                  padding: "3px 4px", color: "#000",
                  borderRight: di < section.desks.length - 1 ? "1px solid #ccc" : "none",
                }}>
                  {desk}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {section.grid.map((row, rowIdx) => (
              <div key={rowIdx} style={{
                display: "grid",
                gridTemplateColumns: `repeat(${section.totalCols}, 1fr)`,
                borderBottom: "1px solid #eee",
              }}>
                {row.map((cell, ci) => (
                  <div key={ci} style={{
                    textAlign: "center", fontSize: 9.5, padding: "4px 2px",
                    background: isHighlighted(cell) ? "#ffff00" : "transparent",
                    borderRight: ci < row.length - 1 ? "1px solid #eee" : "none",
                    fontWeight: isHighlighted(cell) ? "bold" : "normal",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    color: "#000",
                  }}>
                    {cell ?? ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend + stats */}
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 14, height: 14, background: "#ffff00", border: "1px solid #ccc" }} />
            <span>255PCS — highlighted</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 14, height: 14, background: "#fff", border: "1px solid #ccc" }} />
            <span>Regular students</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>
          {students.length} students · {totalSlots - students.length} empty seats
        </div>
      </div>
    </div>
  );
}

// ── CSV Upload screen ──────────────────────────────────────────────
function CsvUploadPrompt({ onUpload }: { onUpload: (data: CsvData) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) { setError("Please upload a .csv file."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsv(text);
      if (Object.keys(parsed).length === 0) {
        setError("No valid data found. Expected columns: exam, room, roll_number");
        return;
      }
      setError(null);
      onUpload(parsed);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100%", gap: 16, padding: 40,
    }}>
      <div
        style={{
          border: "2px dashed #d0d0d0", borderRadius: 12, padding: "48px 40px",
          textAlign: "center", cursor: "pointer", background: "#fafafa",
          width: "100%", maxWidth: 420,
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>📂</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 6 }}>
          Upload your seating CSV
        </div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
          Expected columns: <strong>exam, room, roll_number</strong><br />
          One student per row
        </div>
        <div style={{
          marginTop: 16, display: "inline-block", padding: "8px 20px",
          background: "#0e0f11", color: "#fff", borderRadius: 6, fontSize: 12,
          fontFamily: "'DM Mono', monospace",
        }}>
          Choose File
        </div>
        <input ref={inputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFile} />
      </div>
      {error && <div style={{ color: "#c0392b", fontSize: 12 }}>{error}</div>}
      <div style={{ fontSize: 11, color: "#aaa", fontFamily: "monospace", background: "#f5f5f5", padding: "10px 16px", borderRadius: 6, width: "100%", maxWidth: 420 }}>
        <div style={{ color: "#888", marginBottom: 4 }}>Sample CSV format:</div>
        <div>exam,room,roll_number</div>
        <div>Mathematics,IL-200,245UCS082</div>
        <div>Mathematics,IL-200,255PCS002</div>
        <div>Mathematics,IL-201,245UCS110</div>
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const lightTheme = `
  --bg-shell: #f4f4f6;
  --bg-header: #ffffff;
  --bg-sidebar: #f9f9fb;
  --bg-center: #ffffff;
  --border: #e2e2e8;
  --text-primary: #1a1a1a;
  --text-secondary: #6b6e7a;
  --text-muted: #a0a3ae;
  --divider: #e2e2e8;
  --upload-btn-bg: #f0f0f3;
  --upload-btn-border: #d0d0d8;
  --upload-btn-color: #555;
  --section-label: #9a9da8;
  --hint-color: #b0b3be;
`;

const darkTheme = `
  --bg-shell: #0e0f11;
  --bg-header: #0e0f11;
  --bg-sidebar: #0c0d0f;
  --bg-center: #ffffff;
  --border: #232529;
  --text-primary: #f0ede8;
  --text-secondary: #9a9da8;
  --text-muted: #4a4d56;
  --divider: #232529;
  --upload-btn-bg: #1e2025;
  --upload-btn-border: #333;
  --upload-btn-color: #aaa;
  --section-label: #4a4d56;
  --hint-color: #3a3d46;
`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg-shell);
    color: var(--text-primary);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    transition: background 0.2s, color 0.2s;
  }
  .app-shell {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    background: var(--bg-shell);
    transition: background 0.2s;
  }
  .header {
    border-bottom: 1px solid var(--border);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-header);
    transition: background 0.2s, border-color 0.2s;
  }
  .header-brand {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    transition: color 0.2s;
  }
  .header-brand span { color: #f5a623; }
  .header-meta {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .header-upload-btn {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    padding: 6px 14px;
    background: var(--upload-btn-bg);
    border: 1px solid var(--upload-btn-border);
    color: var(--upload-btn-color);
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.2s;
  }
  .header-upload-btn:hover { border-color: #f5a623; color: #f5a623; }

  /* ── Dark/Light toggle ── */
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    background: var(--upload-btn-bg);
    border: 1px solid var(--upload-btn-border);
    border-radius: 20px;
    padding: 4px 10px 4px 6px;
    transition: background 0.2s, border-color 0.2s;
  }
  .theme-toggle:hover { border-color: #f5a623; }
  .theme-toggle-icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
  }
  .theme-toggle:hover .theme-toggle-icon { transform: rotate(20deg); }
  .theme-toggle-label {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 0;
    height: calc(100vh - 61px);
  }
  .sidebar {
    border-right: 1px solid var(--border);
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto;
    background: var(--bg-sidebar);
    transition: background 0.2s, border-color 0.2s;
  }
  .sidebar-section-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--section-label);
    margin-bottom: 12px;
    transition: color 0.2s;
  }
  .sidebar-section { display: flex; flex-direction: column; gap: 10px; }
  .no-data-hint {
    font-size: 11px;
    color: var(--hint-color);
    font-style: italic;
    line-height: 1.6;
  }
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 36px;
    gap: 20px;
    background: var(--bg-center);
    overflow-y: auto;
    transition: background 0.2s;
  }
  .center-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--section-label);
    align-self: flex-start;
  }
  .seating-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .divider { height: 1px; background: var(--divider); margin: 4px 0; transition: background 0.2s; }
`;


// ── App ────────────────────────────────────────────────────────────
function App() {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [alternate, setAlternate] = useState(false);
  const [dark, setDark] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCsvUpload = (data: CsvData) => {
    setCsvData(data);
    const firstExam = Object.keys(data)[0] ?? "";
    const firstRoom = firstExam ? (Object.keys(data[firstExam])[0] ?? "") : "";
    setSelectedExam(firstExam);
    setSelectedRoom(firstRoom);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsv(text);
      if (Object.keys(parsed).length > 0) handleCsvUpload(parsed);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExamChange = (val: string) => {
    setSelectedExam(val);
    const firstRoom = csvData ? (Object.keys(csvData[val] ?? {})[0] ?? "") : "";
    setSelectedRoom(firstRoom);
  };

  const exams = csvData ? Object.keys(csvData) : [];
  const rooms = csvData && selectedExam ? Object.keys(csvData[selectedExam] ?? {}) : [];
  const students: string[] = csvData && selectedExam && selectedRoom
    ? (csvData[selectedExam]?.[selectedRoom] ?? [])
    : [];

  const totalCapacity = ROOM_SECTIONS.reduce((a, s) => a + s.totalCols * s.rows, 0);
  const emptySeats = totalCapacity - students.length;

  const handleReset = () => { setAlternate(false); };

  return (
    <>
      <style>{styles}</style>
      <style>{`:root { ${dark ? darkTheme : lightTheme} }`}</style>
      <input ref={fileInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileChange} />

      <div className="app-shell">
        <header className="header">
          <div className="header-brand">Exam<span>Seat</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {csvData && (
              <button className="header-upload-btn" onClick={() => fileInputRef.current?.click()}>
                ↑ Replace CSV
              </button>
            )}
            <div className="header-meta">Allocation Dashboard</div>
            <div className="theme-toggle" onClick={() => setDark(!dark)}>
              <span className="theme-toggle-icon">
                {dark ? (
                  // Moon icon
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="#f5a623" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  // Sun icon
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="#f5a623" strokeWidth="1.8"/>
                    <line x1="12" y1="2" x2="12" y2="4" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="12" y1="20" x2="12" y2="22" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="2" y1="12" x2="4" y2="12" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="20" y1="12" x2="22" y2="12" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
              <span className="theme-toggle-label">{dark ? "Dark" : "Light"}</span>
            </div>
          </div>
        </header>

        <div className="main-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-section-label">Examination</div>
              {csvData ? (
                <>
                  <Dropdown
                    label="Select Exam"
                    options={exams}
                    onChange={handleExamChange}
                  />
                  <Dropdown
                    label="Select Room"
                    options={rooms}
                    onChange={(val: string) => setSelectedRoom(val)}
                  />
                </>
              ) : (
                <div className="no-data-hint">Upload a CSV to populate exams &amp; rooms</div>
              )}
            </div>

            <div className="divider" />

            <div className="sidebar-section">
              <div className="sidebar-section-label">Seating Mode</div>
              <Toggle
                label="Alternate Seating"
                enabled={alternate}
                onToggle={() => setAlternate(!alternate)}
              />
            </div>

            <div className="divider" />

            <div style={{ marginTop: "auto" }}>
              <Button text="Reset Allocation" onClick={handleReset} />
            </div>
          </aside>

          {/* Center */}
          <main className="center-content">
            {!csvData ? (
              <CsvUploadPrompt onUpload={handleCsvUpload} />
            ) : (
              <>
                <div className="center-title">Seating Plan</div>
                <SeatingPlanPreview
                  exam={selectedExam}
                  room={selectedRoom}
                  students={students}
                  alternate={alternate}
                />
                <Summary
                  totalStudents={students.length}
                  totalSeats={totalCapacity}
                  occupiedSeats={students.length}
                  emptySeats={emptySeats}
                />
              </>
            )}
          </main>

        </div>
      </div>
    </>
  );
}

export default App;