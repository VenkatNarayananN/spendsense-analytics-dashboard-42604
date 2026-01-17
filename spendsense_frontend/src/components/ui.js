import React from "react";

export function Card({ className = "", children }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Pill({ tone = "neutral", children }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function Badge({ tone = "neutral", children }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
