import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { GalleryGrid } from "@/features/gallery";
import { listPhotos } from "@/server/content-repository";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Thư viện ảnh" };
export default async function Page() {
  const photos = await listPhotos();
  return (
    <>
      <PageHero
        eyebrow="Khoảnh khắc cộng đồng"
        title="Thư viện"
        highlight="hình ảnh."
        description="Nơi lưu giữ hình ảnh các hoạt động chăm sóc sức khỏe và cộng đồng tại Trạm Y tế xã U Minh."
        emoji="📸"
      />
      <section className="section">
        <div className="container">
          <span className="kicker">Hoạt động nổi bật</span>
          <h2>Khoảnh khắc đáng nhớ</h2>
          <p className="section-lead">
            Lọc theo nhóm hoạt động hoặc chọn ảnh từ thiết bị để xem thử.
          </p>
          <GalleryGrid items={photos} />
        </div>
      </section>
    </>
  );
}
