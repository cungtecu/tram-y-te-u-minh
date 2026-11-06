import { NextResponse } from "next/server";
import { getDb } from "@/server/mongodb";
export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return NextResponse.json({ ok: true, database: db.databaseName });
  } catch {
    return NextResponse.json(
      { ok: false, error: "MongoDB chưa sẵn sàng" },
      { status: 503 },
    );
  }
}
