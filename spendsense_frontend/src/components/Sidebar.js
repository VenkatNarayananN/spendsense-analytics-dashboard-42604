import React from "react";
import { NavLink } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Sidebar({ isOpen, onClose }) {
  /** Sidebar navigation for primary pages. */
  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`} aria-label="Primary">
        <div className="sidebarHeader">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">S</div>
            <div className="brandText">
              <div className="brandName">SpendSense</div>
              <div className="brandTag">Analytics Dashboard</div>
            </div>
          </div>

          <button className="iconBtn mobileOnly" onClick={onClose} aria-label="Close navigation">
            ✕
          </button>
        </div>

        <nav className="nav" aria-label="Pages">
          <NavItem to="/" label="Dashboard" icon="▦" end />
          <NavItem to="/transactions" label="Transactions" icon="≋" />
          <NavItem to="/insights" label="Insights" icon="◔" />
          <NavItem to="/alerts" label="Alerts" icon="⚑" />
          <NavItem to="/settings" label="Settings" icon="⚙" />
        </nav>

        <div className="sidebarFooter">
          <div className="miniCard">
            <div className="miniTitle">Tip</div>
            <div className="miniBody">
              Connect backend APIs later by swapping <code>mockData</code> with real services.
            </div>
          </div>
        </div>
      </aside>

      <button
        className={`backdrop ${isOpen ? "backdrop--show" : ""}`}
        onClick={onClose}
        aria-label="Close navigation overlay"
      />
    </>
  );
}

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `navLink ${isActive ? "navLink--active" : ""}`}
    >
      <span className="navIcon" aria-hidden="true">{icon}</span>
      <span className="navLabel">{label}</span>
    </NavLink>
  );
}
