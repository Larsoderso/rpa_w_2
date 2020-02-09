import React, {
  Component,
  Fragment,
  useState,
  type ComponentType,
  type Node
} from "react";

function UsecaseViewSwitcher() {
  const [selectedView, setSelectedView] = useState("Kanban");

  const [displaySw, setDisplaySW] = useState(<div>Kanban</div>);

  function switchView() {
    console.log("Hit!");
    if (selectedView == "Kanban") {
      setSelectedView("Kachel");
      setDisplaySW(
        <div style={{ display: "flex" }}>
          {" "}
          <svg
            width={15}
            height={10}
            viewBox="0 0 15 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "24px", height: "20px" }}
          >
            <rect
              x="8.44116"
              y="5.91162"
              width="6.05882"
              height="3.41177"
              rx="0.5"
              stroke="#45505E"
            />
            <rect
              x="8.44116"
              y="0.5"
              width="6.05882"
              height="3.41177"
              rx="0.5"
              stroke="#45505E"
            />
            <rect
              x="0.5"
              y="0.5"
              width="6.05882"
              height="3.41177"
              rx="0.5"
              stroke="#45505E"
            />
            <rect
              x="0.5"
              y="5.91162"
              width="6.05882"
              height="3.41177"
              rx="0.5"
              stroke="#45505E"
            />
          </svg>
          <div>Matrix</div>
        </div>
      );
    } else if (selectedView == "Kachel") {
      setSelectedView("Kanban");
      setDisplaySW(
        <div style={{ display: "flex" }}>
          {" "}
          <svg
            width={12}
            height={9}
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "20px", height: "18px" }}
          >
            <mask id="path-1-inside-1" fill="white">
              <rect width="2.66669" height="8.40007" rx="0.5" />
            </mask>
            <rect
              width="2.66669"
              height="8.40007"
              rx="0.5"
              stroke="#45505E"
              strokeWidth={2}
              mask="url(#path-1-inside-1)"
            />
            <mask id="path-2-inside-2" fill="white">
              <rect x="3.11108" width="2.66669" height="6.00005" rx="0.5" />
            </mask>
            <rect
              x="3.11108"
              width="2.66669"
              height="6.00005"
              rx="0.5"
              stroke="#45505E"
              strokeWidth={2}
              mask="url(#path-2-inside-2)"
            />
            <mask id="path-3-inside-3" fill="white">
              <rect x="6.22205" width="2.66669" height="6.60005" rx="0.5" />
            </mask>
            <rect
              x="6.22205"
              width="2.66669"
              height="6.60005"
              rx="0.5"
              stroke="#45505E"
              strokeWidth={2}
              mask="url(#path-3-inside-3)"
            />
            <mask id="path-4-inside-4" fill="white">
              <rect x="9.33337" width="2.66669" height="7.20006" rx="0.5" />
            </mask>
            <rect
              x="9.33337"
              width="2.66669"
              height="7.20006"
              rx="0.5"
              stroke="#45505E"
              strokeWidth={2}
              mask="url(#path-4-inside-4)"
            />
          </svg>
          <div>Kanban</div>
        </div>
      );
    }
  }
  return (
    <div
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.16)",
        borderRadius: "8px",
        width: "150px",
        height: "20px",
        display: "flex",
        padding: "12px",
        marginBottom: "8px"
      }}
    >
      <svg
        width={12}
        height={9}
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "20px", height: "18px" }}
      >
        <mask id="path-1-inside-1" fill="white">
          <rect width="2.66669" height="8.40007" rx="0.5" />
        </mask>
        <rect
          width="2.66669"
          height="8.40007"
          rx="0.5"
          stroke="#45505E"
          strokeWidth={2}
          mask="url(#path-1-inside-1)"
        />
        <mask id="path-2-inside-2" fill="white">
          <rect x="3.11108" width="2.66669" height="6.00005" rx="0.5" />
        </mask>
        <rect
          x="3.11108"
          width="2.66669"
          height="6.00005"
          rx="0.5"
          stroke="#45505E"
          strokeWidth={2}
          mask="url(#path-2-inside-2)"
        />
        <mask id="path-3-inside-3" fill="white">
          <rect x="6.22205" width="2.66669" height="6.60005" rx="0.5" />
        </mask>
        <rect
          x="6.22205"
          width="2.66669"
          height="6.60005"
          rx="0.5"
          stroke="#45505E"
          strokeWidth={2}
          mask="url(#path-3-inside-3)"
        />
        <mask id="path-4-inside-4" fill="white">
          <rect x="9.33337" width="2.66669" height="7.20006" rx="0.5" />
        </mask>
        <rect
          x="9.33337"
          width="2.66669"
          height="7.20006"
          rx="0.5"
          stroke="#45505E"
          strokeWidth={2}
          mask="url(#path-4-inside-4)"
        />
      </svg>
      <div style={{ paddingLeft: "12px", lineHeight: "20px", width: "80px" }}>
        {displaySw}
      </div>
      <svg
        onClick={switchView}
        width={6}
        height={4}
        viewBox="0 0 6 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "18px",
          height: "20px",
          marginLeft: "14px",
          transform: "rotate(270deg)"
        }}
      >
        <path d="M1 1L3 3L5 1" stroke="#45505D" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

export default UsecaseViewSwitcher;
