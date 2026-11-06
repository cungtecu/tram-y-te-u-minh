import { NextRequest, NextResponse } from "next/server";
import { listNews, listNotices, listPhotos } from "@/server/content-repository";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (type === "posts") return NextResponse.json({ items: await listNews() });
  if (type === "notices")
    return NextResponse.json({ items: await listNotices() });
  if (type === "photos")
    return NextResponse.json({ items: await listPhotos() });
  return NextResponse.json({ error: "type không hợp lệ" }, { status: 400 });
}
