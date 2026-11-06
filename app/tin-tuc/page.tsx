import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { NewsGrid } from "@/features/news";
import { listNews } from "@/server/content-repository";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tin tức" };
export default async function Page() {
  const news = await listNews();
  return (
    <>
      <PageHero
        eyebrow="Góc thông tin"
        title="Tin tức &"
        highlight="sức khỏe."
        description="Chia sẻ kiến thức chăm sóc sức khỏe và các bài viết tham khảo cho người dân."
        emoji="📰"
      />
      <section className="section">
        <div className="container">
          <span className="kicker">Kiến thức hữu ích</span>
          <h2>Bài viết & tin tức</h2>
          <p className="section-lead">
            Các bài viết mẫu sẽ được thay bằng bài viết đã xuất bản từ MongoDB
            khi có dữ liệu.
          </p>
          <NewsGrid items={news} />
        </div>
      </section>
    </>
  );
}
