"use client";
import { useEffect, useState } from "react";
import { Mail, Plus, Trash2, Save } from "lucide-react";
import type { PortfolioData, SocialLink } from "@/lib/types";

export default function AdminContactPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/portfolio").then(r => r.json()).then(d => setData(d as PortfolioData));
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

  function addSocial() {
    if (!data) return;
    const newLink: SocialLink = { platform: "New", url: "https://" };
    setData({ ...data, socialLinks: [...data.socialLinks, newLink] });
  }

  function updateSocial(index: number, field: keyof SocialLink, value: string) {
    if (!data) return;
    const updated = [...data.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, socialLinks: updated });
  }

  function deleteSocial(index: number) {
    if (!data) return;
    const updated = [...data.socialLinks];
    updated.splice(index, 1);
    setData({ ...data, socialLinks: updated });
  }

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail size={24} className="text-cyan-300" />
          <h1 className="text-2xl font-bold">Edit Contact</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="font-semibold">Contact Info</h2>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Email</label>
            <input type="email" value={data.contact.email} onChange={e => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Phone</label>
            <input type="text" value={data.contact.phone || ""} onChange={e => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Location</label>
            <input type="text" value={data.contact.location || ""} onChange={e => setData({ ...data, contact: { ...data.contact, location: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Availability</label>
            <input type="text" value={data.contact.availability || ""} onChange={e => setData({ ...data, contact: { ...data.contact, availability: e.target.value } })} />
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Social Links</h2>
            <button onClick={addSocial} className="btn-secondary flex items-center gap-2 text-sm"><Plus size={14} /> Add</button>
          </div>
          <div className="space-y-3">
            {data.socialLinks.map((link, i) => (
              <div key={i} className="card flex items-center gap-3">
                <input type="text" value={link.platform} onChange={e => updateSocial(i, "platform", e.target.value)} placeholder="Platform" />
                <input type="text" value={link.url} onChange={e => updateSocial(i, "url", e.target.value)} placeholder="URL" />
                <button onClick={() => deleteSocial(i)} className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            ))}
            {data.socialLinks.length === 0 && <p className="text-center text-slate-500">No social links yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}