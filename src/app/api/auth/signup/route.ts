import { NextResponse } from "next/server";
import { q } from "@/lib/db";

type Body = {
  nome: string;
  documento?: string;
  empresa?: string;
  segmento?: string;
  email: string;
  telefone?: string;
  senha: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body?.nome || !body?.email || !body?.senha) {
      return NextResponse.json(
        { error: "Nome, e-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // importa bcryptjs dinamicamente (evita treta de bundler)
    const { hash } = await import("bcryptjs");
    const senhaHash = await hash(body.senha, 10);

    // 1) checar se já existe e-mail
    const existing = await q<{ id: number }>(
      "SELECT id FROM clientes WHERE email = $1 LIMIT 1",
      [body.email]
    );
    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json(
        { error: "E-mail já cadastrado." },
        { status: 409 }
      );
    }

    // 2) inserir
    const insert = await q(
      `INSERT INTO clientes
        (nome, documento, empresa, segmento, email, telefone, senha_hash, created_at)
       VALUES
        ($1,   $2,        $3,      $4,       $5,    $6,       $7,         NOW())
       RETURNING id, nome, email`,
      [
        body.nome,
        body.documento || null,
        body.empresa || null,
        body.segmento || null,
        body.email,
        body.telefone || null,
        senhaHash,
      ]
    );

    return NextResponse.json(
      { ok: true, user: insert.rows[0] },
      { status: 201 }
    );
  } catch (err: any) {
    // conexão recusada (host/porta inacessível)
    if (err?.code === "ECONNREFUSED" || err?.errno === -111) {
      console.error("DB connection refused:", {
        address: err?.address,
        port: err?.port,
        message: err?.message,
      });
      return NextResponse.json(
        {
          error:
            "Não foi possível conectar ao banco de dados. Verifique DATABASE_URL/DB_SSL.",
          code: "DB_CONN_REFUSED",
        },
        { status: 503 }
      );
    }

    const code = err?.code as string | undefined;
    const map: Record<string, { status: number; msg: string }> = {
      "23505": { status: 409, msg: "Registro já existe (único)." },
      "42P01": { status: 500, msg: "Tabela 'clientes' não existe." },
      "42703": { status: 500, msg: "Coluna inexistente (ver esquema)." },
      "23503": { status: 500, msg: "Violação de FK." },
    };
    const chosen = code ? map[code] : undefined;

    console.error("signup error", {
      code,
      message: err?.message,
      detail: err?.detail,
      table: err?.table,
      constraint: err?.constraint,
      stack: err?.stack,
    });

    return NextResponse.json(
      {
        error: chosen?.msg ?? "Erro interno ao cadastrar.",
        code: code ?? "UNKNOWN",
      },
      { status: chosen?.status ?? 500 }
    );
  }
}
