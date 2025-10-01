// src/app/(auth)/reset/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // Se chegou sem token, redireciona para "esqueci a senha"
    if (!token) router.replace("/forgot");
  }, [token, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!senha || !confirm) return setMsg("Preencha a nova senha.");
    if (senha !== confirm) return setMsg("As senhas não coincidem.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha ao redefinir senha");

      setOk(true);
    } catch (err: any) {
      setMsg(err?.message || "Erro ao redefinir");
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <AuthLayout title="Senha redefinida!">
        <p className="msg-ok mb-4">Sua senha foi atualizada com sucesso.</p>
        <a href="/login" className="btn btn-primary w-full">Ir para o login</a>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Redefinir senha">
      {email && (
        <p className="text-xs text-center text-white/70 mb-3">
          Conta: <span className="font-medium">{email}</span>
        </p>
      )}
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          type="password"
          placeholder="Nova senha"
          className="input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          className="input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
        />
        {msg && <p className="msg-err">{msg}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </AuthLayout>
  );
}
