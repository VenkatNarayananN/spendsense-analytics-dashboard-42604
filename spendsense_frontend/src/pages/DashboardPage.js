import React, { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { Card, Pill } from "../components/ui";
import BarChart from "../components/BarChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { fetchDashboardSummary, fetchTransactions } from "../services/mockData";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      const [s, tx] = await Promise.all([
        fetchDashboardSummary(),
        fetchTransactions({ limit: 6 }),
      ]);
      if (!alive) return;
      setSummary(s);
      setRecent(tx);
      setLoading(false);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  const subtitle = useMemo(
    () => "A quick look at your spending pulse with gentle, modern visuals.",
    []
  );

  return (
    <PageShell
      title="Dashboard"
      subtitle={subtitle}
      actions={<button className="btn btnGhost">Refresh</button>}
    >
      {loading || !summary ? (
        <Card className="skeleton">Loading dashboard…</Card>
      ) : (
        <>
          <div className="grid grid--kpis">
            {summary.kpis.map((k) => (
              <Card key={k.label} className="kpi">
                <div className="kpiTop">
                  <div className="kpiLabel">{k.label}</div>
                  <Pill tone={k.trend === "up" ? "success" : k.trend === "down" ? "error" : "neutral"}>
                    {k.delta}
                  </Pill>
                </div>
                <div className="kpiValue">{k.value}</div>
                <div className="kpiHint">
                  {k.trend === "up"
                    ? "Improving"
                    : k.trend === "down"
                      ? "Decreasing"
                      : "Stable"}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid--main">
            <Card className="cardPad">
              <BarChart data={summary.spendSeries} />
            </Card>

            <CategoryBreakdown items={summary.categoryBreakdown} />
          </div>

          <Card className="cardPad">
            <div className="sectionHeader">
              <div>
                <div className="sectionTitle">Recent Activity</div>
                <div className="sectionSubtitle">Latest transactions (mock)</div>
              </div>
              <a className="link" href="/transactions">
                View all
              </a>
            </div>

            <div className="tableWrap">
              <table className="table" aria-label="Recent transactions">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th className="right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td className="strong">{t.merchant}</td>
                      <td>{t.category}</td>
                      <td>
                        <span className={`status status--${t.status === "Pending" ? "warn" : "ok"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className={`right amount ${t.amount < 0 ? "amount--neg" : "amount--pos"}`}>
                        {t.amount.toLocaleString(undefined, { style: "currency", currency: "USD" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </PageShell>
  );
}
