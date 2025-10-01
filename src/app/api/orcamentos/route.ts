// src/app/api/orcamentos/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(
      `select o.id, o.titulo, o.descricao, o.valor, o.criado_em,
              c.id as cliente_id, c.nome as cliente_nome, c.email as cliente_email
         from public.orcamentos o
         join public.clientes c on c.id = o.cliente_id
         order by o.id desc`
    );
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Erro ao listar orçamentos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, descricao, valor, clienteId } = body || {};

    if (!titulo || !descricao || !valor || !clienteId) {
      return NextResponse.json(
        { error: 'titulo, descricao, valor e clienteId são obrigatórios' },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      `insert into public.orcamentos (titulo, descricao, valor, cliente_id)
       values ($1, $2, $3, $4)
       returning id, titulo, descricao, valor, criado_em, cliente_id`,
      [titulo, descricao, valor, clienteId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Erro ao criar orçamento' }, { status: 500 });
  }
}
