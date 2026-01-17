import React, { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { Card, Pill } from "../components/ui";
import { fetchInsights } from "../services/mockData";

export default function InsightsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      const d = await fetchInsights();
      if (!alive) return;
      setData(d);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <PageShell
      title="Insights"
      subtitle="Smart patterns & gentle recommendations powered by mock analytics."
      actions={<button className="btn btnPrimary">Generate Report</button>}
    >
      {!data ? (
        <Card className="skeleton">Loading insights…</Card>
      ) : (
        <>
          <div className="grid grid--two">
            {data.highlights.map((h) => (
              <Card className="cardPad" key={h.title}>
                <div className="cardTopRow">
                  <div className="cardTitle">{h.title}</div>
                  <Pill tone="neutral">{h.tag}</Pill>
                </div>
                <div className="cardText">{h.detail}</div>
              </Card>
            ))}
          </div>

          <Card className="cardPad">
            <div className="sectionHeader">
              <div>
                <div className="sectionTitle">Recommendations</div>
                <div className="sectionSubtitle">Starter actions you can take today</div>
              </div>
            </div>

            <div className="recGrid">
              {data.recommendations.map((r) => (
                <div className="recItem" key={r.label}>
                  <div className="recLabel">{r.label}</div>
                  <div className="recValue">{r.value}</div>
                  <div className="recNote">{r.note}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </PageShell>
  );
}
