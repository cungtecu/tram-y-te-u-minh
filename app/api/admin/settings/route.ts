import { NextRequest, NextResponse } from "next/server";
import { checkLocalAdmin } from "@/server/admin-guard";
import { getSettings, saveSettings } from "@/server/settings-repository";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    return NextResponse.json(await getSettings());
  } catch {
    return NextResponse.json(
      { error: "Không thể tải cấu hình" },
      { status: 500 },
    );
  }
}
export async function PUT(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    const result = await saveSettings(await request.json());
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể lưu" },
      { status: 400 },
    );
  }
}
