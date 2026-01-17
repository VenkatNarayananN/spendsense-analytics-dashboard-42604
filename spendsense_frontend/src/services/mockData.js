/**
 * Small deterministic mock-data helpers for SpendSense UI.
 * These are intentionally synchronous-ish (Promises) to mimic future API calls.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const currency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const percent = (n) => `${Math.round(n * 100)}%`;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function seededRandom(seed) {
  // Very small deterministic PRNG for stable UI output.
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const merchantNames = [
  "Aurora Market",
  "Rose Café",
  "Metro Grocers",
  "Nimbus Streaming",
  "Golden Fuel",
  "Lumen Books",
  "Bloom Boutique",
  "Transit Pass",
  "Cloud Kitchen",
  "Evergreen Pharmacy",
];

const categories = [
  "Groceries",
  "Dining",
  "Transport",
  "Shopping",
  "Subscriptions",
  "Health",
];

const alertTypes = [
  { type: "Budget", severity: "medium" },
  { type: "Unusual spend", severity: "high" },
  { type: "Subscription", severity: "low" },
];

// PUBLIC_INTERFACE
export async function fetchDashboardSummary() {
  /** Returns a dashboard summary with KPI cards and simple chart data. */
  await delay(250);
  return {
    kpis: [
      {
        label: "Monthly Spend",
        value: currency(2876.43),
        delta: percent(-0.07),
        trend: "down",
      },
      {
        label: "Income",
        value: currency(5120.0),
        delta: percent(0.02),
        trend: "up",
      },
      {
        label: "Savings Rate",
        value: percent(0.24),
        delta: percent(0.03),
        trend: "up",
      },
      {
        label: "Active Alerts",
        value: "3",
        delta: "—",
        trend: "flat",
      },
    ],
    spendSeries: [
      { label: "Mon", value: 210 },
      { label: "Tue", value: 460 },
      { label: "Wed", value: 320 },
      { label: "Thu", value: 540 },
      { label: "Fri", value: 680 },
      { label: "Sat", value: 420 },
      { label: "Sun", value: 310 },
    ],
    categoryBreakdown: [
      { label: "Groceries", value: 0.32 },
      { label: "Dining", value: 0.21 },
      { label: "Shopping", value: 0.18 },
      { label: "Transport", value: 0.12 },
      { label: "Subscriptions", value: 0.11 },
      { label: "Health", value: 0.06 },
    ],
  };
}

// PUBLIC_INTERFACE
export async function fetchTransactions({ limit = 12 } = {}) {
  /** Returns a list of recent transactions. */
  await delay(250);
  const rnd = seededRandom(42);
  const today = new Date();
  const items = Array.from({ length: limit }).map((_, idx) => {
    const amountRaw = clamp(rnd() * 120 + (idx % 5 === 0 ? 240 : 0), 6, 420);
    const isIncome = idx % 11 === 0;
    const amount = isIncome ? amountRaw * 8 : amountRaw;
    const date = new Date(today);
    date.setDate(today.getDate() - idx);

    const merchant = isIncome ? "Direct Deposit" : merchantNames[idx % merchantNames.length];
    const category = isIncome ? "Income" : categories[Math.floor(rnd() * categories.length)];

    return {
      id: `txn_${idx + 1}`,
      date: date.toISOString().slice(0, 10),
      merchant,
      category,
      amount: (isIncome ? 1 : -1) * Number(amount.toFixed(2)),
      status: idx % 9 === 0 ? "Pending" : "Cleared",
      method: idx % 3 === 0 ? "Card" : idx % 3 === 1 ? "Bank" : "Wallet",
    };
  });

  return items;
}

// PUBLIC_INTERFACE
export async function fetchInsights() {
  /** Returns mock insights for the Insights page. */
  await delay(250);
  return {
    highlights: [
      {
        title: "Dining spend is trending down",
        detail: "You're 12% lower than last month. Keep it up with planned meals.",
        tag: "Habit",
      },
      {
        title: "Subscription audit opportunity",
        detail: "You have 6 active subscriptions. Consider pausing 1–2 to save ~$24/mo.",
        tag: "Savings",
      },
      {
        title: "Shopping peak on Fridays",
        detail: "Most discretionary spend happens Fri evening. Try a 24h wait rule.",
        tag: "Pattern",
      },
    ],
    recommendations: [
      { label: "Set Dining budget", value: currency(320), note: "per month" },
      { label: "Round-up savings", value: currency(45), note: "estimated/month" },
      { label: "Emergency fund", value: currency(2500), note: "target" },
    ],
  };
}

// PUBLIC_INTERFACE
export async function fetchAlerts() {
  /** Returns mock alerts for Alerts page. */
  await delay(250);
  const now = new Date();
  return Array.from({ length: 4 }).map((_, i) => {
    const meta = alertTypes[i % alertTypes.length];
    const ts = new Date(now);
    ts.setHours(now.getHours() - (i + 2) * 5);
    return {
      id: `alt_${i + 1}`,
      type: meta.type,
      severity: meta.severity,
      message:
        meta.type === "Budget"
          ? "You're at 86% of your Dining budget."
          : meta.type === "Unusual spend"
            ? "A larger-than-usual charge was detected at Bloom Boutique."
            : "Subscription renewal due in 2 days (Nimbus Streaming).",
      time: ts.toLocaleString(),
      action: meta.type === "Unusual spend" ? "Review" : "View",
    };
  });
}

// PUBLIC_INTERFACE
export async function fetchSettings() {
  /** Returns mock user preferences/settings. */
  await delay(150);
  return {
    profile: { name: "Avery", email: "avery@spendsense.app" },
    preferences: {
      currency: "USD",
      weeklyDigest: true,
      alertsEnabled: true,
      theme: "Rose Gold",
    },
  };
}
