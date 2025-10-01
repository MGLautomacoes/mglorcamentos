// src/lib/db.ts
import { Pool } from "pg";

function toBool(v: any) {
  const s = String(v ?? "").toLowerCase().trim();
  return s === "true" || s === "1" || s === "yes";
}

const USE_SSL = toBool(process.env.DB_SSL);
const DEBUG = toBool(process.env.DEBUG_SQL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: USE_SSL ? { rejectUnauthorized: false } : undefined,
});

export async function q<T = any>(text: string, params?: any[]) {
  const started = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    if (DEBUG) {
      console.log("[SQL ok]", { text, params, rows: res.rowCount, ms: Date.now() - started });
    }
    return res;
  } catch (err: any) {
    console.error("[SQL error]", {
      text,
      params,
      code: err?.code,
      message: err?.message,
      detail: err?.detail,
      table: err?.table,
      constraint: err?.constraint,
    });
    throw err;
  }
}

export default pool;
