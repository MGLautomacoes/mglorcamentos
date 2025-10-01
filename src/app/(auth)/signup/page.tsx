"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    empresa: "",
    segmento: "",
    email: "",
    telefone: "",
    senha: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!form.nome || !form.email || !form.senha) {
      setMsg("Preencha nome, email e senha.");
      return;
    }
    if (form.senha !== form.confirm) {
      setMsg("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          documento: form.documento || undefined,
          empresa: form.empresa || undefined,
          segmento: form.segmento || undefined,
          email: form.email,
          telefone: form.telefone || undefined,
          senha: form.senha,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha no cadastro");

      setMsg("Cadastro realizado com sucesso!");
      // window.location.href = "/login";
    } catch (err: any) {
      setMsg(err?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      {/* largura mais estreita e centralizada DENTRO do cartão */}
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-center text-white text-xl font-semibold mb-4">
          Cadastrar nova conta
        </h2>

        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={onChange}
            className="input"
            required
          />
          <input
            name="documento"
            placeholder="CPF/CNPJ"
            value={form.documento}
            onChange={onChange}
            className="input"
          />
          <input
            name="empresa"
            placeholder="Empresa"
            value={form.empresa}
            onChange={onChange}
            className="input"
          />

          <select
            name="segmento"
            value={form.segmento}
            onChange={onChange}
            className="input"
          >
            <option value="">Selecione um segmento</option>
            <option value="Alimentação & Delivery">Alimentação &amp; Delivery</option>
            <option value="Beleza & Bem-estar">Beleza &amp; Bem-estar</option>
            <option value="Construção (marcenaria, serralheria, elétrica, hidráulica)">
              Construção (marcenaria, serralheria, elétrica, hidráulica)
            </option>
            <option value="Serviços Automotivos (mecânica, funilaria, autopeças)">
              Serviços Automotivos (mecânica, funilaria, autopeças)
            </option>
            <option value="Saúde & Fitness">Saúde &amp; Fitness</option>
            <option value="Educação & Cursos">Educação &amp; Cursos</option>
            <option value="Serviços Profissionais & Consultorias">
              Serviços Profissionais &amp; Consultorias
            </option>
            <option value="Tecnologia & Serviços Digitais">
              Tecnologia &amp; Serviços Digitais
            </option>
            <option value="Pet & Agro">Pet &amp; Agro</option>
            <option value="Outros">Outros</option>
          </select>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            className="input"
            required
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={onChange}
            className="input"
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={onChange}
            autoComplete="new-password"
            className="input"
            required
          />
          <input
            name="confirm"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirm}
            onChange={onChange}
            autoComplete="new-password"
            className="input"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-2 w-full"
          >
            {loading ? "Enviando..." : "Cadastrar"}
          </button>
        </form>

        {msg && <p className="text-center text-sm text-white/80 mt-4">{msg}</p>}

        <div className="text-center text-xs text-white/60 mt-3">
          Já possui conta?{" "}
          <a href="/login" className="link">
            Entrar
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
