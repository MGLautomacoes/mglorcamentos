import { NextResponse } from "next/server";
import { clearSession } from "@/lib/jwt";
export async function GET(){ clearSession(); return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL||"http://localhost:5173")); }
