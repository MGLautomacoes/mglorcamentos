"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => !!email && !!senha && !loading, [email, senha, loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!email || !senha) {
      setMsg("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha no login");
      router.push("/dashboard");
    } catch (err: any) {
      setMsg(err.message || "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-white text-xl font-semibold">Bem-vindo(a) à MGL</h1>
        <p className="text-sm text-white/80">Acesse sua conta</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3" noValidate>
        <label htmlFor="email" className="text-left text-sm text-white/90">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
          autoFocus
        />

        <label htmlFor="password" className="text-left text-sm text-white/90 mt-1">Senha</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input"
          required
        />

        {msg && (
          <p className="msg-err mt-1" role="status" aria-live="polite">
            {msg}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn btn-primary mt-3"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a href="/forgot" className="link text-sm mt-2 text-center">
          Esqueci minha senha
        </a>

        <div className="text-center text-xs text-white/60 mt-2">
          Ainda não tem conta?{" "}
          <a href="/signup" className="link">
            Cadastrar
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
