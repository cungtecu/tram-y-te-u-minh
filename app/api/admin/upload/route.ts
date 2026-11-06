import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { checkLocalAdmin } from "@/server/admin-guard";

export const runtime = "nodejs";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
function detectFormat(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (
    bytes.length > 12 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  )
    return "jpg";
  if (
    bytes.length > 12 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  )
    return "png";
  if (
    bytes.length > 12 &&
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP"
  )
    return "webp";
  return null;
}
export async function POST(request: NextRequest) {
  const blocked = checkLocalAdmin(request);
  if (blocked) return blocked;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      file.size <= 0 ||
      file.size > MAX_IMAGE_BYTES
    )
      return NextResponse.json(
        { error: "Chọn ảnh PNG, JPG hoặc WebP tối đa 5 MB" },
        { status: 400 },
      );
    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = detectFormat(bytes);
    if (!ext)
      return NextResponse.json(
        { error: "Định dạng ảnh không hợp lệ" },
        { status: 400 },
      );
    const name = `${randomUUID()}.${ext}`;
    const directory = join(process.cwd(), "public", "uploads");
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, name), bytes, { flag: "wx" });
    return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Không thể tải ảnh lên" },
      { status: 500 },
    );
  }
}
