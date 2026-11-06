import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { NoticeList } from "@/features/notices";
import { listNotices } from "@/server/content-repository";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Thông báo" };
export default async function Page() {
  const notices = await listNotices();
  return (
    <>
      <PageHero
        eyebrow="Thông tin cộng đồng"
        title="Bảng tin"
        highlight="thông báo."
        description="Theo dõi thông báo, hướng dẫn và lịch hoạt động khi được trạm cập nhật."
        emoji="📣"
      />
      <section className="section">
        <div className="container">
          <span className="kicker">Bảng tin</span>
          <h2>Thông báo mới</h2>
          <p className="section-lead">
            Thông tin mẫu chưa phải lịch triển khai chính thức.
          </p>
          <NoticeList items={notices} />
          <div className="detail-callout">
            Để biết lịch làm việc, tiêm chủng hoặc tiếp nhận khám, vui lòng liên
            hệ trực tiếp với Trạm Y tế xã U Minh.
          </div>
        </div>
      </section>
    </>
  );
}
