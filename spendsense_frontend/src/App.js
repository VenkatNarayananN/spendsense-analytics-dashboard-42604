import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * App layout wrapper: sidebar + topbar + main content area.
 */
function AppFrame() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path.startsWith("/transactions")) return "Transactions";
    if (path.startsWith("/insights")) return "Insights";
    if (path.startsWith("/alerts")) return "Alerts";
    if (path.startsWith("/settings")) return "Settings";
    return "SpendSense";
  }, [location.pathname]);

  return (
    <div className="appRoot">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="appMain">
        <TopBar title={title} onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="content" role="main">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Main SpendSense frontend entrypoint with client-side routing. */
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}

export default App;
