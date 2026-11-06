import "server-only";
import { NextRequest, NextResponse } from "next/server";

/** Admin tạm thời chỉ được dùng trong Next.js dev chạy trên localhost. */
export function checkLocalAdmin(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") || "";
  const origin = request.headers.get("origin");
  const allowedHost = /^127\.0\.0\.1:3000$|^localhost:3000$/.test(host);
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  const allowedOrigin = mutating
    ? origin === `http://${host}`
    : !origin || origin === `http://${host}`;
  if (
    process.env.NODE_ENV !== "development" ||
    !allowedHost ||
    !allowedOrigin
  ) {
    return NextResponse.json(
      {
        error:
          "Quản trị không đăng nhập chỉ hoạt động trên localhost:3000 ở chế độ dev.",
      },
      { status: 403 },
    );
  }
  return null;
}
