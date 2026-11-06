import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/ui";
import { AboutContent } from "@/features/about";
import { getSettings } from "@/server/settings-repository";
export const metadata: Metadata = { title: "Giới thiệu" };
export const dynamic = "force-dynamic";
export default async function Page() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Giới thiệu"
        highlight="về trạm."
        description="Tìm hiểu vai trò, định hướng và các lĩnh vực hoạt động của Trạm Y tế xã U Minh."
        emoji="🏥"
      />
      <AboutContent introduction={settings.introduction} />
    </>
  );
}
