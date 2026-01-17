import React from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Card } from "../components/ui";

export default function NotFoundPage() {
  return (
    <PageShell title="Page not found" subtitle="That route doesn't exist.">
      <Card className="cardPad">
        <p className="cardText">
          Return to <Link className="link" to="/">Dashboard</Link>.
        </p>
      </Card>
    </PageShell>
  );
}
