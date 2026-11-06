import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactSection } from "@/features/contact";
import { getSettings } from "@/server/settings-repository";
export const metadata: Metadata = { title: "Liên hệ" };
export const dynamic = "force-dynamic";
export default async function Page() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Kết nối cùng chúng tôi"
        title="Liên hệ"
        highlight="với trạm."
        description="Thông tin liên hệ và biểu mẫu xem thử dành cho người dân."
        emoji="✉️"
      />
      <ContactSection settings={settings} />
    </>
  );
}
