import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ServiceGrid } from "@/features/services";
import { listServices } from "@/server/content-repository";
export const metadata: Metadata = { title: "Dịch vụ" };
export const dynamic = "force-dynamic";
export default async function Page() {
  const services = await listServices();
  return (
    <>
      <PageHero
        eyebrow="Lĩnh vực chuyên môn"
        title="Dịch vụ"
        highlight="y tế."
        description="Khám phá những lĩnh vực chăm sóc sức khỏe ban đầu tại cơ sở y tế tuyến xã."
        emoji="🩺"
      />
      <section className="section">
        <div className="container">
          <span className="kicker">Chăm sóc toàn diện</span>
          <h2>Các nhóm dịch vụ</h2>
          <p className="section-lead">
            Danh sách mô tả lĩnh vực y tế cơ sở điển hình. Phạm vi triển khai
            thực tế cần được xác nhận.
          </p>
          <ServiceGrid items={services} />
          <div className="detail-callout">
            Lịch thực hiện, phạm vi dịch vụ và chi phí cụ thể chưa được công bố.
            Vui lòng xác nhận với trạm trước khi đến.
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container about">
          <div className="detail-illustration">📋</div>
          <div>
            <span className="kicker">Hướng dẫn chung</span>
            <h2>Chuẩn bị trước khi đến trạm</h2>
            <ul className="checklist">
              <li>Mang giấy tờ tùy thân và thẻ BHYT nếu có</li>
              <li>Chuẩn bị đơn thuốc và hồ sơ khám trước đây</li>
              <li>Trao đổi rõ triệu chứng và thuốc đang sử dụng</li>
              <li>Xác nhận lịch tiếp nhận trước nếu cần</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
