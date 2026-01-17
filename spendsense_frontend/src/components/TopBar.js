import React from "react";

// PUBLIC_INTERFACE
export default function TopBar({ title, onToggleSidebar }) {
  /** Top app bar with page title and lightweight actions. */
  return (
    <header className="topbar" role="banner">
      <button className="iconBtn mobileOnly" onClick={onToggleSidebar} aria-label="Open navigation">
        <span aria-hidden="true">☰</span>
      </button>

      <div className="topbarTitleWrap">
        <div className="topbarTitle">{title}</div>
        <div className="topbarSubtitle">Elegant analytics • Rose Gold theme</div>
      </div>

      <div className="topbarActions">
        <label className="search" aria-label="Search">
          <span className="searchIcon" aria-hidden="true">⌕</span>
          <input className="searchInput" placeholder="Search transactions, categories..." />
        </label>

        <button className="btn btnSecondary" type="button">
          Export
        </button>
        <button className="btn btnPrimary" type="button">
          Add Transaction
        </button>
      </div>
    </header>
  );
}
