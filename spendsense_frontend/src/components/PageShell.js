import React from "react";

/**
 * Generic page wrapper with title, subtitle and actions area.
 */
export default function PageShell({ title, subtitle, actions, children }) {
  return (
    <section className="page">
      <header className="pageHeader">
        <div>
          <h1 className="pageTitle">{title}</h1>
          {subtitle ? <p className="pageSubtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="pageActions">{actions}</div> : null}
      </header>
      <div className="pageBody">{children}</div>
    </section>
  );
}
