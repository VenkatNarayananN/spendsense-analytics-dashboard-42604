import React, { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { Card, Pill } from "../components/ui";
import { fetchAlerts } from "../services/mockData";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      const a = await fetchAlerts();
      if (!alive) return;
      setAlerts(a);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <PageShell
      title="Alerts"
      subtitle="Stay informed with proactive notifications (mock)."
      actions={<button className="btn btnSecondary">Mark all read</button>}
    >
      {!alerts ? (
        <Card className="skeleton">Loading alerts…</Card>
      ) : (
        <div className="stack">
          {alerts.map((a) => (
            <Card key={a.id} className="cardPad alertRow">
              <div className="alertMain">
                <div className="cardTopRow">
                  <div className="cardTitle">{a.type}</div>
                  <Pill
                    tone={a.severity === "high" ? "error" : a.severity === "medium" ? "warn" : "success"}
                  >
                    {a.severity}
                  </Pill>
                </div>
                <div className="cardText">{a.message}</div>
                <div className="muted">{a.time}</div>
              </div>
              <div className="alertActions">
                <button className="btn btnGhost" type="button">
                  Dismiss
                </button>
                <button className="btn btnPrimary" type="button">
                  {a.action}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
