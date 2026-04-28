"use client";

import { useEffect, useState } from "react";
import { Settings, Save } from "lucide-react";
import type { PortfolioData } from "@/lib/types";

export default function AdminSettingsPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => setData(d as PortfolioData));
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved successfully!" : "Save failed.");
    setTimeout(() => setMsg(""), 3000);
  }

  if (!data) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings size={24} className="text-zinc-300" />
          <h1 className="text-2xl font-bold">Site Settings</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="font-semibold">Global</h2>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Site Name</label>
            <input
              type="text"
              value={data.settings.siteName}
              onChange={(e) =>
                setData({ ...data, settings: { ...data.settings, siteName: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Hero Background URL</label>
            <input
              type="text"
              value={data.settings.heroBackgroundUrl}
              onChange={(e) =>
                setData({ ...data, settings: { ...data.settings, heroBackgroundUrl: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Accent Color (hex)</label>
            <input
              type="text"
              value={data.settings.accentColor}
              onChange={(e) =>
                setData({ ...data, settings: { ...data.settings, accentColor: e.target.value } })
              }
            />
          </div>
        </div>

        <div className="card space-y-5">
          <h2 className="font-semibold">Section Headings</h2>
          {(["about", "skills", "projects", "experience", "contact"] as const).map((key) => (
            <div key={key} className="grid gap-2">
              <label className="text-xs uppercase tracking-wide text-zinc-500">{key}</label>
              <input
                type="text"
                value={data.settings.headings[key].title}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      headings: {
                        ...data.settings.headings,
                        [key]: {
                          ...data.settings.headings[key],
                          title: e.target.value,
                        },
                      },
                    },
                  })
                }
                placeholder={`${key} title`}
              />
              <input
                type="text"
                value={data.settings.headings[key].subtitle || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      headings: {
                        ...data.settings.headings,
                        [key]: {
                          ...data.settings.headings[key],
                          subtitle: e.target.value,
                        },
                      },
                    },
                  })
                }
                placeholder={`${key} subtitle`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
