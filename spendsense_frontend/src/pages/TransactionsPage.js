import React, { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { Card, Badge } from "../components/ui";
import { fetchTransactions } from "../services/mockData";

export default function TransactionsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      const tx = await fetchTransactions({ limit: 18 });
      if (!alive) return;
      setItems(tx);
      setLoading(false);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (status === "All") return items;
    return items.filter((t) => t.status === status);
  }, [items, status]);

  return (
    <PageShell
      title="Transactions"
      subtitle="Browse and filter your latest transactions (mock dataset)."
      actions={
        <div className="segmented" role="group" aria-label="Status filter">
          {["All", "Cleared", "Pending"].map((s) => (
            <button
              key={s}
              className={`segBtn ${status === s ? "segBtn--active" : ""}`}
              onClick={() => setStatus(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      }
    >
      {loading ? (
        <Card className="skeleton">Loading transactions…</Card>
      ) : (
        <Card className="cardPad">
          <div className="tableWrap">
            <table className="table" aria-label="Transactions table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th className="right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td className="strong">{t.merchant}</td>
                    <td>{t.category}</td>
                    <td>
                      <Badge tone="neutral">{t.method}</Badge>
                    </td>
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
      )}
    </PageShell>
  );
}
