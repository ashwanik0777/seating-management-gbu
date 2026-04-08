import { useState } from "react";

import Button from "./components/common/Button";
import Dropdown from "./components/common/Dropdown";
import Toggle from "./components/common/Toggle";
import Indicator from "./components/common/Indicator";
import SeatingGrid from "./components/common/SeatingGrid";
import Summary from "./components/common/Summary";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0e0f11;
    color: #e9e6de;
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
  }

  .app-shell {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    background: #0e0f11;
  }

  /* ── Header ── */
  .header {
    border-bottom: 1px solid #232529;
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #c5c6c8;
  }
  .header-brand {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #161514;
  }
  .header-brand span { color: #f5a623; }
  .header-meta {
    font-size: 11px;
    color: #4a4d56;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ── Main layout ── */
  .main-layout {
    display: grid;
    grid-template-columns: 260px 1fr 220px;
    gap: 0;
    height: calc(100vh - 61px);
  }

  /* ── Sidebar ── */
  .sidebar {
    border-right: 1px solid #232529;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto;
    background: #0c0d0f;
  }
  .sidebar-section-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4d56;
    margin-bottom: 12px;
  }
  .sidebar-section { display: flex; flex-direction: column; gap: 10px; }

  /* ── Center content ── */
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 48px;
    gap: 28px;
    color: #1a1a1a;
    background: #ffffff;
  }
  .center-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #12141a;
    align-self: flex-start;
  }
  .seating-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #1a1a1a;
    gap: 8px;
  }

  /* ── Right panel ── */
  .right-panel {
    border-left: 1px solid #232529;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #0c0d0f;
    overflow-y: auto;
  }
  .right-panel-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4d56;
    margin-bottom: 4px;
  }
  .indicators-stack { display: flex; flex-direction: column; gap: 12px; }

  .divider {
    height: 1px;
    background: #232529;
    margin: 4px 0;
  }

  .reset-wrap { margin-top: auto; }
`;

function generateSeats(alternate: boolean) {
  const students = ["S1","S2","S3","S4","S5","S6","S7","S8","S9"];
  const grid: (string | null)[][] = [];
  let index = 0;

  for (let i = 0; i < 3; i++) {
    const row: (string | null)[] = [];
    for (let j = 0; j < 3; j++) {
      if (alternate && (i + j) % 2 === 1) {
        row.push(null);
      } else {
        row.push(students[index] || null);
        index++;
      }
    }
    grid.push(row);
  }
  return grid;
}

function App() {
  const [alternate, setAlternate] = useState(false);

  const seats = generateSeats(alternate);
  const totalSeats = seats.flat().length;
  const occupiedSeats = seats.flat().filter((s) => s !== null).length;
  const emptySeats = seats.flat().filter((s) => s === null).length;
  const totalStudents = occupiedSeats;

  const handleReset = () => setAlternate(false);

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">

        {/* Header */}
        <header className="header">
          <div className="header-brand">Exam<span>Seat</span></div>
          <div className="header-meta">Allocation Dashboard</div>
        </header>

        {/* Three-column layout */}
        <div className="main-layout">

          {/* Left sidebar — configuration */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-section-label">Examination</div>
              <Dropdown label="Select Exam" options={["Math", "Physics", "CS"]} />
              <Dropdown label="Select Room" options={["Room A", "Room B"]} />
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
          </aside>

          {/* Center — seating grid */}
          <main className="center-content">
            <div className="center-title">Seating Layout</div>
            <div className="seating-wrapper">
              <SeatingGrid seats={seats} />
            </div>
            <Summary
              totalStudents={totalStudents}
              totalSeats={totalSeats}
              occupiedSeats={occupiedSeats}
              emptySeats={emptySeats}
            />
          </main>

          {/* Right panel — stats + reset */}
          <aside className="right-panel">
            <div>
              <div className="right-panel-label">Overview</div>
              <div className="indicators-stack">
                <Indicator label="Students" value={120} />
                <Indicator label="Capacity" value={150} />
              </div>
            </div>

            <div className="divider" />

            <div className="reset-wrap">
              <Button text="Reset Allocation" onClick={handleReset} />
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}

export default App;