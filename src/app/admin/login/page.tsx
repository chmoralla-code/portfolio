"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Shield, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(username, password);
    setLoading(false);
    if (!ok) {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1020] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {error && (
            <div className="rounded-lg bg-red-400/10 px-3 py-2 text-sm text-red-300">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin1234"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Default: admin / admin1234
        </p>
      </div>
    </div>
  );
}