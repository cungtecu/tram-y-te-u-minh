import { notFound } from "next/navigation";
import { AdminDashboard } from "@/features/admin";
export const metadata = { title: "Quản trị nội dung (Local)" };
export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <AdminDashboard />;
}
