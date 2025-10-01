// src/app/api/clientes/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // 3 níveis: clientes -> api -> app -> lib

export async function GET() {
  try {
    const { rows } = await pool.query(
      'select id, nome, email, telefone, created_at from public.clientes order by id desc'
    );
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Erro ao listar clientes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, telefone } = body || {};

    if (!nome || !email || !telefone) {
      return NextResponse.json({ error: 'nome, email e telefone são obrigatórios' }, { status: 400 });
    }

    const { rows } = await pool.query(
      `insert into public.clientes (nome, email, telefone)
       values ($1, $2, $3)
       returning id, nome, email, telefone, created_at`,
      [nome, email, telefone]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Erro ao criar cliente' }, { status: 500 });
  }
}
