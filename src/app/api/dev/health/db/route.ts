 import { NextResponse } from "next/server";
import { q } from "@/lib/db";

export async function GET() {
  try {
    const res = await q<{ now: string; db: string; ver: string }>(
      "SELECT NOW() as now, current_database() as db, version() as ver"
    );
    return NextResponse.json(
      { ok: true, info: res.rows[0] },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Erro ao conectar",
        code: err?.code,
        detail: err?.detail,
      },
      { status: 500 }
    );
  }
}
