"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const r = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Erro ao enviar e-mail");
      setSent(true);
    } catch (err: any) {
      setMsg(err?.message || "Erro");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Verifique seu e-mail">
        <div className="text-center text-white space-y-4">
          <p>Enviamos um link para redefinir sua senha.</p>
          <a
            className="inline-block mt-2 bg-[var(--brand-orange)] hover:brightness-110 text-white py-2 px-4 rounded-lg transition"
            href="/login"
          >
            Voltar ao login
          </a>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Esqueci a senha">
      <form onSubmit={submit} className="grid gap-3">
        <input
          className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 outline-none"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {msg && (
          <p className="text-sm text-center text-red-400 font-medium">
            {msg}
          </p>
        )}
        <button
          className="bg-[var(--brand-orange)] hover:brightness-110 text-white py-3 rounded-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </AuthLayout>
  );
}
