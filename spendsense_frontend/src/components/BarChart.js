import React, { useMemo } from "react";

/**
 * Lightweight bar chart using SVG (no external chart library).
 */
export default function BarChart({ data, height = 96 }) {
  const { max } = useMemo(() => {
    const m = Math.max(...data.map((d) => d.value), 1);
    return { max: m };
  }, [data]);

  return (
    <div className="chart">
      <div className="chartHeader">
        <div className="chartTitle">Weekly Spend</div>
        <div className="chartMeta">Mock data</div>
      </div>
      <svg
        className="chartSvg"
        viewBox={`0 0 ${data.length * 36} ${height}`}
        role="img"
        aria-label="Weekly spend bar chart"
      >
        <defs>
          <linearGradient id="roseBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(244,114,182,0.95)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.35)" />
          </linearGradient>
        </defs>
        {data.map((d, i) => {
          const barH = Math.max(6, (d.value / max) * (height - 22));
          const x = i * 36 + 10;
          const y = height - 18 - barH;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width="18"
                height={barH}
                rx="8"
                fill="url(#roseBar)"
              />
              <text x={x + 9} y={height - 4} textAnchor="middle" className="chartLabel">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
