import { useState, useRef } from "react";
import "./App.css";

import Button from "./components/common/Button";
import Dropdown from "./components/common/Dropdown";
import Toggle from "./components/common/Toggle";
import Summary from "./components/common/Summary";

// ── Types ──────────────────────────────────────────────────────────
// Mid-Sem shifts (1.5 hr)
const MIDSEM_SHIFTS: Record<string, string> = {
  "Shift 1": "09:00 AM - 10:30 AM",
  "Shift 2": "11:00 AM - 12:30 PM",
  "Shift 3": "03:00 PM - 04:30 PM",
};

// End-Sem shifts (3 hr)
const ENDSEM_SHIFTS: Record<string, string> = {
  "Shift 1": "09:30 AM - 12:30 PM",
  "Shift 2": "02:00 PM - 05:00 PM",
};

const SHIFT_LABELS: Record<string, string> = {
  "Shift 1": "Morning Shift",
  "Shift 2": "Afternoon Shift",
  "Shift 3": "Evening Shift",
};

function getShiftsForType(examType: string): Record<string, string> {
  return examType === "End-Sem" ? ENDSEM_SHIFTS : MIDSEM_SHIFTS;
}

function getShiftForTiming(timing: string, examType = "Mid-Sem"): string {
  const shifts = getShiftsForType(examType);
  for (const [shift, t] of Object.entries(shifts)) {
    if (timing.replace(/\s+/g, " ").trim() === t) return shift;
  }
  // fallback: try the other type too
  const allShifts = { ...MIDSEM_SHIFTS, ...ENDSEM_SHIFTS };
  for (const [shift, t] of Object.entries(allShifts)) {
    if (timing.replace(/\s+/g, " ").trim() === t) return shift;
  }
  return "Shift 1";
}

type CsvData = {
  // exam -> room -> roll numbers (expanded from ranges)
  [exam: string]: {
    timing: string;
    shift: string;
    rooms: { [room: string]: string[] };
  };
};


// ── Room layout definitions ────────────────────────────────────────
type SectionDef = { desks: string[]; colsPerDesk: number; totalCols: number; rows: number };

// Default: 3 sections — [2 desks, 3 desks, 2 desks], 5 rows each = 70 seats
const LAYOUT_DEFAULT: SectionDef[] = [
  { desks: ["DESK-1", "DESK-2"],           colsPerDesk: 2, totalCols: 4, rows: 5 },
  { desks: ["DESK-1", "DESK-2", "DESK-3"], colsPerDesk: 2, totalCols: 6, rows: 5 },
  { desks: ["DESK-1", "DESK-2"],           colsPerDesk: 2, totalCols: 4, rows: 5 },
];

// IL-101: 2 sections — [3 desks, 3 desks], 6 rows each = 72 seats
const LAYOUT_IL101: SectionDef[] = [
  { desks: ["DESK-1", "DESK-2", "DESK-3"], colsPerDesk: 2, totalCols: 6, rows: 6 },
  { desks: ["DESK-1", "DESK-2", "DESK-3"], colsPerDesk: 2, totalCols: 6, rows: 6 },
];

// IT-201: 1 section — 5 plain columns, 4 rows = 20 seats (no desk sub-headers)
const LAYOUT_IT201: SectionDef[] = [
  { desks: ["", "", "", "", ""], colsPerDesk: 1, totalCols: 5, rows: 4 },
];

// Name-based layout map — add more rooms here as needed
const ROOM_LAYOUT_MAP: Record<string, SectionDef[]> = {
  "IL-101": LAYOUT_IL101,
  "IT-201": LAYOUT_IT201,
  "IT-202": LAYOUT_IT201,
  "IL-103": LAYOUT_DEFAULT,
  "IL-104": LAYOUT_DEFAULT,
};

function getLayoutForRoom(room: string): SectionDef[] {
  return ROOM_LAYOUT_MAP[room] ?? LAYOUT_DEFAULT;
}

function getTotalCapacity(room: string): number {
  return getLayoutForRoom(room).reduce((a, s) => a + s.totalCols * s.rows, 0);
}

// Fill students column-by-column per desk across all sections.
// Each desk has 2 sub-columns: left col fills top-to-bottom first, then right col.
// Fill the grid with two interleaved groups:
//   - regular students  -> odd  columns (0, 2, 4 …) left-to-right across sections, top-to-bottom
//   - highlighted (255PCS) students -> even columns (1, 3, 5 …) same order
// When alternate mode is ON, highlighted columns are left empty.
function buildRoomSections(students: string[], alternate: boolean, room: string) {
  const sections = getLayoutForRoom(room);

  // Separate into two pools: regular (left cols) and highlighted (right cols per desk)
  const regular     = students.filter(s => !isHighlighted(s));
  const highlighted = students.filter(s =>  isHighlighted(s));

  // Build a column-indexed slot map across all sections
  // Each section has totalCols columns; odd-indexed cols (0,2,4..) = regular, even-indexed (1,3,5..) = highlighted
  // We fill column by column, section by section
  const totalSlots = sections.reduce((a, s) => a + s.totalCols * s.rows, 0);
  const slots: (string | null)[] = new Array(totalSlots).fill(null);

  let regIdx = 0;
  let hilIdx = 0;
  let slotOffset = 0;

  for (const section of sections) {
    for (let col = 0; col < section.totalCols; col++) {
      const isHighlightCol = col % 2 === 1; // odd index = right sub-col of each desk pair

      // In alternate mode, skip highlighted columns entirely
      if (alternate && isHighlightCol) {
        slotOffset += section.rows;
        continue;
      }

      for (let row = 0; row < section.rows; row++) {
        const slotIndex = slotOffset + col * section.rows + row;
        if (isHighlightCol) {
          slots[slotIndex] = highlighted[hilIdx] ?? null;
          hilIdx++;
        } else {
          slots[slotIndex] = regular[regIdx] ?? null;
          regIdx++;
        }
      }
    }
    slotOffset += section.totalCols * section.rows;
  }

  // Convert slot array to row-major grids per section for rendering
  let readOffset = 0;
  return sections.map((section) => {
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
// Splits a roll number into its text prefix and numeric suffix
// e.g. "245UCS001" -> { prefix: "245UCS", num: 1, digits: 3 }
function splitRoll(roll: string): { prefix: string; num: number; digits: number } | null {
  const match = roll.match(/^([A-Za-z0-9]*?[A-Za-z])([0-9]+)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseInt(match[2], 10), digits: match[2].length };
}

// Expands "245UCS001" -> "245UCS005" into ["245UCS001","245UCS002","245UCS003","245UCS004","245UCS005"]
function expandRange(start: string, end: string): string[] {
  const s = splitRoll(start);
  const e = splitRoll(end);
  if (!s || !e || s.prefix !== e.prefix) return [start]; // fallback: treat as single roll
  const rolls: string[] = [];
  for (let n = s.num; n <= e.num; n++) {
    rolls.push(s.prefix + String(n).padStart(s.digits, "0"));
  }
  return rolls;
}

function parseCsv(text: string): CsvData {
  const lines = text.trim().split("\n");
  const data: CsvData = {};
  const startIdx = lines[0].toLowerCase().includes("exam") ? 1 : 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 4) continue;
    const [exam, room, startRoll, endRoll, timing] = parts;
    if (!exam || !room || !startRoll || !endRoll) continue;
    if (!data[exam]) data[exam] = { timing: timing ?? "", shift: getShiftForTiming(timing ?? ""), rooms: {} };
    if (timing && !data[exam].timing) data[exam].timing = timing;
    if (!data[exam].rooms[room]) data[exam].rooms[room] = [];
    const expanded = expandRange(startRoll, endRoll);
    data[exam].rooms[room].push(...expanded);
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
  timing,
  examType,
  dark,
}: {
  exam: string;
  room: string;
  students: string[];
  alternate: boolean;
  timing: string;
  examType: string;
  dark: boolean;
}) {
  const tableBg       = dark ? "#16181d" : "#ffffff";
  const tableText     = dark ? "#e8e6e1" : "#000000";
  const headerBg      = dark ? "#1e2028" : "#f0f0f0";
  const borderStrong  = dark ? "#3a3d48" : "#000000";
  const borderLight   = dark ? "#2a2d36" : "#eeeeee";
  const borderMid     = dark ? "#2e3140" : "#cccccc";
  const highlightBg   = dark ? "#c8960a" : "#ffff00";
  const highlightText = dark ? "#000" : "#000";
  const legendSwatch  = dark ? "#2a2d36" : "#ffffff";
  const sections = buildRoomSections(students, alternate, room);
  const totalSlots = getTotalCapacity(room);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: tableBg, padding: "16px", width: "100%", color: tableText, borderRadius: 8 }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: "bold", fontSize: 15 }}>Seating Plan (SOICT)</div>
        <div style={{ fontWeight: "bold", fontSize: 14 }}>{room}</div>
        <div style={{ fontWeight: "bold", fontSize: 13 }}>
          {alternate ? "Alternate Seating" : "Normal Seating"} · {exam}&nbsp;&nbsp;
          {new Date().toLocaleDateString("en-GB").replace(/\//g, "-")}
        </div>
        {timing && (
          <div style={{ fontSize: 13, fontWeight: "normal", marginTop: 2 }}>
            {timing}{" "}
            <span style={{ fontWeight: "normal" }}>
              ({SHIFT_LABELS[getShiftForTiming(timing, examType)] ?? ""})
            </span>
          </div>
        )}
      </div>

      {/* Sections — wrapped with row labels on left and col labels on bottom */}
      {(() => {
        const totalRows = sections[0]?.rows ?? 5;
        const totalCols = sections.reduce((a, s) => a + s.totalCols, 0);
        const labelStyle: React.CSSProperties = {
          fontSize: 8, color: tableText, opacity: 0.5,
          fontWeight: "bold", textAlign: "center", letterSpacing: "0.04em",
        };
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Row labels + sections side by side */}
            <div style={{ display: "flex", gap: 0 }}>
              {/* R labels column */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "stretch", marginRight: 3, paddingTop: sections[0]?.desks.some(d => d !== "") ? 42 : 26 }}>
                {Array.from({ length: totalRows }, (_, i) => (
                  <div key={i} style={{ ...labelStyle, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 26, minWidth: 16 }}>
                    R{i + 1}
                  </div>
                ))}
              </div>

              {/* Sections */}
              <div style={{ display: "flex", gap: 8, overflowX: "auto", flex: 1 }}>
                {sections.map((section, si) => (
                  <div
                    key={si}
                    style={{ flex: `${section.desks.length * section.colsPerDesk} 1 0`, minWidth: 0, border: `1px solid ${borderStrong}` }}
                  >
                    {/* Section header */}
                    <div style={{
                      textAlign: "center", fontWeight: "bold", fontSize: 12,
                      borderBottom: `1px solid ${borderStrong}`, padding: "4px 6px",
                      background: headerBg, color: tableText,
                    }}>
                      WHITE BOARD
                    </div>

                    {/* Desk headers — hidden if all desk labels are empty */}
                    {section.desks.some(d => d !== "") && (
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${section.totalCols}, 1fr)`,
                        borderBottom: `1px solid ${borderStrong}`,
                      }}>
                        {section.desks.map((desk, di) => (
                          <div key={di} style={{
                            gridColumn: `span ${section.colsPerDesk}`,
                            textAlign: "center", fontSize: 10, fontWeight: "bold",
                            padding: "3px 4px", color: tableText,
                            borderRight: di < section.desks.length - 1 ? `1px solid ${borderMid}` : "none",
                          }}>
                            {desk}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Data rows */}
                    {section.grid.map((row, rowIdx) => (
                      <div key={rowIdx} style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${section.totalCols}, 1fr)`,
                        borderBottom: `1px solid ${borderLight}`,
                      }}>
                        {row.map((cell, ci) => (
                          <div key={ci} style={{
                            textAlign: "center", fontSize: 9.5, padding: "4px 2px",
                            background: isHighlighted(cell) ? highlightBg : "transparent",
                            borderRight: ci < row.length - 1 ? `1px solid ${borderLight}` : "none",
                            fontWeight: isHighlighted(cell) ? "bold" : "normal",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            color: isHighlighted(cell) ? highlightText : tableText,
                          }}>
                            {cell ?? ""}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* C labels row — one per total column across all sections */}
            <div style={{ display: "flex", gap: 0, marginTop: 3, paddingLeft: 19 }}>
              {Array.from({ length: totalCols }, (_, i) => (
                <div key={i} style={{ ...labelStyle, flex: 1, minWidth: 0, textAlign: "center" }}>
                  C{i + 1}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Legend + stats */}
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
<div style={{ width: 14, height: 14, background: highlightBg, border: `1px solid ${borderMid}` }} />
            <span style={{ color: tableText }}>255PCS — highlighted</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
<div style={{ width: 14, height: 14, background: legendSwatch, border: `1px solid ${borderMid}` }} />
            <span style={{ color: tableText }}>Regular students</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: tableText, opacity: 0.6 }}>
          {students.length} students · {totalSlots - students.length} empty seats
        </div>
      </div>
    </div>
  );
}

// ── CSV Upload screen ──────────────────────────────────────────────
function CsvUploadPrompt({
  onUpload,
}: {
  onUpload: (mid: CsvData | null, end: CsvData | null) => void;
}) {
  const midRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const [midData, setMidData] = useState<CsvData | null>(null);
  const [endData, setEndData] = useState<CsvData | null>(null);
  const [midName, setMidName] = useState<string | null>(null);
  const [endName, setEndName] = useState<string | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  const readFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    onDone: (data: CsvData, name: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) { setError("Please upload a .csv file."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsv(text);
      if (Object.keys(parsed).length === 0) {
        setError("No valid data found. Check columns: exam, room, start_roll, end_roll, timing");
        return;
      }
      setError(null);
      onDone(parsed, file.name);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const canProceed = midData !== null || endData !== null;

  const slotStyle = (uploaded: boolean): React.CSSProperties => ({
    border: `2px dashed ${uploaded ? "#f5a623" : "#d0d0d0"}`,
    borderRadius: 10, padding: "28px 24px", textAlign: "center",
    cursor: "pointer", background: uploaded ? "#fffbf2" : "#fafafa",
    flex: 1, transition: "border-color 0.2s, background 0.2s",
  });

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100%", gap: 20, padding: 40,
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#1a1a1a", marginBottom: 4 }}>
        Upload Seating CSV
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textAlign: "center" }}>
        Upload one or both. You can always replace them later from the header.
      </div>

      <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 600 }}>
        {/* Mid-Sem slot */}
        <div style={slotStyle(!!midData)} onClick={() => midRef.current?.click()}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{midData ? "✅" : "📄"}</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a", marginBottom: 4 }}>Mid-Semester</div>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 10 }}>
            Shifts: 9:00–10:30 · 11:00–12:30 · 3:00–4:30
          </div>
          {midName
            ? <div style={{ fontSize: 11, color: "#f5a623", fontWeight: "bold" }}>{midName} ✓</div>
            : <div style={{ fontSize: 11, background: "#0e0f11", color: "#fff", borderRadius: 5, padding: "5px 12px", display: "inline-block" }}>Choose File</div>
          }
          <input ref={midRef} type="file" accept=".csv" style={{ display: "none" }}
            onChange={e => readFile(e, (data, name) => { setMidData(data); setMidName(name); })} />
        </div>

        {/* End-Sem slot */}
        <div style={slotStyle(!!endData)} onClick={() => endRef.current?.click()}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{endData ? "✅" : "📄"}</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a", marginBottom: 4 }}>End-Semester</div>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 10 }}>
            Shifts: 9:30–12:30 · 2:00–5:00
          </div>
          {endName
            ? <div style={{ fontSize: 11, color: "#f5a623", fontWeight: "bold" }}>{endName} ✓</div>
            : <div style={{ fontSize: 11, background: "#0e0f11", color: "#fff", borderRadius: 5, padding: "5px 12px", display: "inline-block" }}>Choose File</div>
          }
          <input ref={endRef} type="file" accept=".csv" style={{ display: "none" }}
            onChange={e => readFile(e, (data, name) => { setEndData(data); setEndName(name); })} />
        </div>
      </div>

      {error && <div style={{ color: "#c0392b", fontSize: 12 }}>{error}</div>}

      <button
        disabled={!canProceed}
        onClick={() => onUpload(midData, endData)}
        style={{
          padding: "10px 32px", borderRadius: 8, fontSize: 13, fontWeight: "bold",
          fontFamily: "'DM Mono', monospace", cursor: canProceed ? "pointer" : "not-allowed",
          background: canProceed ? "#f5a623" : "#ddd", border: "none",
          color: canProceed ? "#000" : "#aaa", transition: "background 0.2s",
        }}
      >
        {canProceed ? "Generate Seating Plans →" : "Upload at least one CSV to continue"}
      </button>

      <div style={{ fontSize: 11, color: "#aaa", fontFamily: "monospace", background: "#f5f5f5", padding: "10px 16px", borderRadius: 6, width: "100%", maxWidth: 600 }}>
        <div style={{ color: "#888", marginBottom: 4 }}>CSV format (same for both files):</div>
        <div>exam,room,start_roll,end_roll,timing</div>
        <div>Mathematics,IL-200,245UCS001,245UCS025,09:00 AM - 10:30 AM</div>
        <div>Mathematics,IL-200,255PCS001,255PCS025,09:00 AM - 10:30 AM</div>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────
function App() {
  const [midSemData, setMidSemData] = useState<CsvData | null>(null);
  const [endSemData, setEndSemData] = useState<CsvData | null>(null);
  const [alternate, setAlternate] = useState(false);
  const [dark, setDark] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedShift, setSelectedShift] = useState("All Shifts");
  const [examType, setExamType] = useState("Mid-Sem");
  const [selectedRoom, setSelectedRoom] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active data switches based on exam type dropdown
  const csvData = examType === "End-Sem" ? endSemData : midSemData;
  const anyDataLoaded = midSemData !== null || endSemData !== null;

  const handleDualUpload = (mid: CsvData | null, end: CsvData | null) => {
    setMidSemData(mid);
    setEndSemData(end);
    const activeType = mid ? "Mid-Sem" : "End-Sem";
    const activeData = (mid ?? end)!;
    setExamType(activeType);
    setSelectedShift("All Shifts");
    const firstExam = Object.keys(activeData)[0] ?? "";
    const firstRoom = firstExam ? (Object.keys(activeData[firstExam].rooms)[0] ?? "") : "";
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
      if (Object.keys(parsed).length > 0) {
        if (examType === "End-Sem") setEndSemData(parsed);
        else setMidSemData(parsed);
        const firstExam = Object.keys(parsed)[0] ?? "";
        setSelectedExam(firstExam);
        setSelectedRoom(firstExam ? (Object.keys(parsed[firstExam].rooms)[0] ?? "") : "");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExamChange = (val: string) => {
    setSelectedExam(val);
    const firstRoom = csvData ? (Object.keys(csvData[val]?.rooms ?? {})[0] ?? "") : "";
    setSelectedRoom(firstRoom);
  };

  const allExams = csvData ? Object.keys(csvData) : [];
  const exams = selectedShift === "All Shifts"
    ? allExams
    : allExams.filter(e => csvData![e].shift === selectedShift);
  const rooms = csvData && selectedExam ? Object.keys(csvData[selectedExam]?.rooms ?? {}) : [];
  const students: string[] = csvData && selectedExam && selectedRoom
    ? (csvData[selectedExam]?.rooms[selectedRoom] ?? [])
    : [];
  const examTiming: string = csvData && selectedExam ? (csvData[selectedExam]?.timing ?? "") : "";

  const totalCapacity = getTotalCapacity(selectedRoom);
  const emptySeats = totalCapacity - students.length;

  const handleReset = () => { setAlternate(false); setSelectedShift("All Shifts"); };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <>

      <input ref={fileInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileChange} />

      <div className={`app-shell${dark ? " dark" : ""}`}>
        <header className="header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/logo.png"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <div className="header-brand">Exam<span>Seat</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {anyDataLoaded && (
              <button className="header-upload-btn" onClick={() => fileInputRef.current?.click()}>
                ↑ Replace {examType} CSV
              </button>
            )}
            <div className="header-meta">Allocation Dashboard</div>
            {anyDataLoaded && (
              <button className="export-btn no-print" onClick={handleExportPdf}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="9,15 12,18 15,15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                Export PDF
              </button>
            )}
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

        {/* Sidebar collapse toggle */}
        <div
          className={`sidebar-toggle no-print${sidebarOpen ? "" : " collapsed"}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? "‹" : "›"}
        </div>

        <div className={`main-layout${sidebarOpen ? "" : " collapsed"}`}>
          {/* Sidebar */}
          <aside className={`sidebar${sidebarOpen ? "" : " collapsed"}`}>
            <div className="sidebar-section">
              <div className="sidebar-section-label">Examination</div>
              <Dropdown
                label="Exam Type"
                options={[...(midSemData ? ["Mid-Sem"] : []), ...(endSemData ? ["End-Sem"] : [])]}
                onChange={(val: string) => {
                  setExamType(val);
                  setSelectedShift("All Shifts");
                  const newData = val === "End-Sem" ? endSemData : midSemData;
                  if (newData) {
                    const first = Object.keys(newData)[0] ?? "";
                    setSelectedExam(first);
                    setSelectedRoom(first ? (Object.keys(newData[first].rooms)[0] ?? "") : "");
                  }
                }}
              />
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
                  <Dropdown
                    label="Select Shift"
                    options={["All Shifts", ...Object.keys(getShiftsForType(examType))]}
                    onChange={(val: string) => {
                      setSelectedShift(val);
                      // Re-filter exam to first valid one for this shift
                      if (csvData) {
                        const filtered = Object.keys(csvData).filter(
                          e => val === "All Shifts" || csvData[e].shift === val
                        );
                        const first = filtered[0] ?? "";
                        setSelectedExam(first);
                        setSelectedRoom(first ? (Object.keys(csvData[first].rooms)[0] ?? "") : "");
                      }
                    }}
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
            {!anyDataLoaded ? (
              <CsvUploadPrompt onUpload={handleDualUpload} />
            ) : (
              <>
                <div className="center-title">Seating Plan</div>
                <SeatingPlanPreview
                  exam={selectedExam}
                  room={selectedRoom}
                  students={students}
                  alternate={alternate}
                  timing={examTiming}
                  examType={examType}
                  dark={dark}
                />
                <Summary
                  students={students}
                  exam={selectedExam}
                  dark={dark}
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