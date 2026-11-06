import { NextRequest, NextResponse } from "next/server";
import { checkLocalAdmin } from "@/server/admin-guard";
import {
  createAdminItem,
  deleteAdminItem,
  isAdminType,
  listAdminItems,
  updateAdminItem,
} from "@/server/admin-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function errorResponse(error: unknown) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Đã xảy ra lỗi" },
    { status: 400 },
  );
}
function typeFrom(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (!isAdminType(type)) throw new Error("Loại dữ liệu không hợp lệ");
  return type;
}
export async function GET(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    return NextResponse.json({
      items: await listAdminItems(typeFrom(request)),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    const id = await createAdminItem(typeFrom(request), await request.json());
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function PUT(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    const type = typeFrom(request),
      id = request.nextUrl.searchParams.get("id") || "";
    await updateAdminItem(type, id, await request.json());
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function DELETE(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    const type = typeFrom(request),
      id = request.nextUrl.searchParams.get("id") || "";
    await deleteAdminItem(type, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
