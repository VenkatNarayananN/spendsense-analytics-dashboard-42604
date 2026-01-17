import React from "react";
import { Card, Pill } from "./ui";

export default function CategoryBreakdown({ items }) {
  return (
    <Card className="chart">
      <div className="chartHeader">
        <div className="chartTitle">Top Categories</div>
        <div className="chartMeta">Share of spend</div>
      </div>

      <div className="breakdownList" role="list">
        {items.map((c) => (
          <div className="breakdownRow" role="listitem" key={c.label}>
            <div className="breakdownLabel">
              <span className="dot" aria-hidden="true" />
              <span>{c.label}</span>
            </div>
            <div className="breakdownValue">
              <Pill tone="neutral">{Math.round(c.value * 100)}%</Pill>
            </div>
            <div className="breakdownBar" aria-hidden="true">
              <div className="breakdownFill" style={{ width: `${c.value * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
