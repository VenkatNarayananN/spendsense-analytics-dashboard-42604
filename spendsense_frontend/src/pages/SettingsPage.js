import React, { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { Card, Pill } from "../components/ui";
import { fetchSettings } from "../services/mockData";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      const s = await fetchSettings();
      if (!alive) return;
      setSettings(s);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <PageShell
      title="Settings"
      subtitle="Personalize preferences (mock). Backend wiring comes later."
      actions={<button className="btn btnPrimary">Save</button>}
    >
      {!settings ? (
        <Card className="skeleton">Loading settings…</Card>
      ) : (
        <div className="grid grid--two">
          <Card className="cardPad">
            <div className="sectionTitle">Profile</div>
            <div className="formRow">
              <div className="formLabel">Name</div>
              <div className="formValue">{settings.profile.name}</div>
            </div>
            <div className="formRow">
              <div className="formLabel">Email</div>
              <div className="formValue">{settings.profile.email}</div>
            </div>
            <div className="muted">This is placeholder content.</div>
          </Card>

          <Card className="cardPad">
            <div className="sectionTitle">Preferences</div>
            <div className="formRow">
              <div className="formLabel">Theme</div>
              <div className="formValue">
                <Pill tone="neutral">{settings.preferences.theme}</Pill>
              </div>
            </div>
            <div className="formRow">
              <div className="formLabel">Currency</div>
              <div className="formValue">{settings.preferences.currency}</div>
            </div>
            <div className="formRow">
              <div className="formLabel">Weekly Digest</div>
              <div className="formValue">{settings.preferences.weeklyDigest ? "Enabled" : "Disabled"}</div>
            </div>
            <div className="formRow">
              <div className="formLabel">Alerts</div>
              <div className="formValue">{settings.preferences.alertsEnabled ? "Enabled" : "Disabled"}</div>
            </div>
          </Card>
        </div>
      )}
    </PageShell>
  );
}
