import Link from "next/link";
import { Reveal } from "@/components/ui";
import { ServiceGrid } from "@/features/services";
import { NewsGrid } from "@/features/news";
import { NoticeList } from "@/features/notices";
import { ContactSection } from "@/features/contact";
import type { NewsItem, NoticeItem, PhotoItem, ServiceItem, PublicSettings } from "@/features/types";

export function HomePage({
  news,
  notices,
  photos,
  services,
  settings,
}: {
  news: NewsItem[];
  notices: NoticeItem[];
  photos: PhotoItem[];
  services: ServiceItem[];
  settings: PublicSettings;
}) {
  return (
    <>
      <section className="hero" id="trang-chu">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Vì một U Minh khỏe mạnh</span>
            <h1>
              Trạm Y tế xã 
              <br />
              U MINH
              <br />
              <em>Vì sức khỏe cộng đồng bền vững</em>
            </h1>
            <p>
              Chào mừng đến với trang thông tin Trạm Y tế xã U Minh. Cùng tiếp
              cận kiến thức sức khỏe, theo dõi thông báo và tìm hiểu các hoạt
              động chăm sóc sức khỏe cộng đồng một cách dễ dàng.
            </p>
            <div className="hero-actions">
              <Link href="/dich-vu" className="btn btn-primary">
                Khám phá dịch vụ ↗
              </Link>
              <Link href="/gioi-thieu" className="btn btn-white">
                Tìm hiểu về chúng tôi →
              </Link>
            </div>
            <div className="hero-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hero-art">
            <div className="art-disc" />
            <div className="float-card fc1">
              <span>❤</span> Sức khỏe là ưu tiên
            </div>
            <div className="float-card fc2">
              <span>✚</span> Đồng hành mỗi ngày
            </div>
            <img
              className="doctor-figure"
              src="/doctor.svg"
              alt="Minh họa nhân viên y tế thân thiện"
            />
          </div>
        </div>
      </section>
      <div className="ticker">
        <div className="container">
          <strong>THÔNG TIN</strong>
          <Link href="/thong-bao">
            Theo dõi mục Thông báo để cập nhật lịch hoạt động và các hướng dẫn
            từ Trạm Y tế xã U Minh.
          </Link>
          <time>● Cập nhật thông tin</time>
        </div>
      </div>
      <section className="section" id="dich-vu">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Chăm sóc toàn diện</span>
              <h2>Dịch vụ & lĩnh vực hoạt động</h2>
              <p className="section-lead">
                Các lĩnh vực chăm sóc sức khỏe ban đầu thường gặp tại tuyến y tế
                cơ sở. Nội dung cụ thể cần được trạm xác nhận.
              </p>
            </div>
            <Link className="text-link" href="/dich-vu">
              Xem tất cả dịch vụ →
            </Link>
          </div>
          <ServiceGrid items={services.slice(0, 4)} compact />
        </div>
      </section>
      <section className="section section-alt" id="gioi-thieu">
        <div className="container about">
          <Reveal className="about-visual">
            <img
              className="clinic-figure"
              src="/clinic.svg"
              alt="Minh họa cơ sở y tế"
            />
            <div className="about-stamp">
              ✚ &nbsp; Sức khỏe cộng đồng là trọng tâm
            </div>
          </Reveal>
          <Reveal>
            <span className="kicker">Về chúng tôi</span>
            <h2>
              Gần dân hơn.
              <br />
              Hiểu sức khỏe hơn.
            </h2>
            <p>
              Trạm Y tế xã U Minh là điểm kết nối chăm sóc sức khỏe ban đầu tại
              địa phương. Website giúp người dân dễ dàng tìm kiếm thông tin,
              tiếp cận các hướng dẫn hữu ích và theo dõi hoạt động của trạm.
            </p>
            <ul className="checklist">
              <li>Thông tin rõ ràng, dễ tra cứu</li>
              <li>Hướng đến chăm sóc sức khỏe dự phòng</li>
              <li>Kết nối người dân và cơ sở y tế</li>
            </ul>
            <Link className="btn btn-primary" href="/gioi-thieu">
              Xem giới thiệu đầy đủ →
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section" id="tin-tuc">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Góc sức khỏe</span>
              <h2>Tin tức & kiến thức hữu ích</h2>
              <p className="section-lead">
                Bài viết tham khảo. Nội dung mẫu được thay bằng dữ liệu từ
                MongoDB khi có dữ liệu đã xuất bản.
              </p>
            </div>
            <Link className="text-link" href="/tin-tuc">
              Xem tất cả →
            </Link>
          </div>
          <NewsGrid items={news.slice(0, 3)} compact />
        </div>
      </section>
      <section className="section section-alt" id="thong-bao">
        <div className="container notice-wrap">
          <div className="notice-intro">
            <span className="kicker" style={{ color: "#a9e9cf" }}>
              Bảng tin cộng đồng
            </span>
            <h2>
              Thông báo
              <br />& lịch hoạt động
            </h2>
            <p>
              Nơi cập nhật lịch làm việc, chương trình y tế và những thông tin
              cần lưu ý khi đến trạm.
            </p>
            <span className="sample">Xác nhận thông tin trước khi sử dụng</span>
            <p>
              <Link className="btn btn-white" href="/thong-bao">
                Xem tất cả thông báo →
              </Link>
            </p>
          </div>
          <NoticeList items={notices.slice(0, 3)} compact />
        </div>
      </section>
      <section className="section" id="thu-vien">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Khoảnh khắc tại trạm</span>
              <h2>Thư viện hình ảnh</h2>
              <p className="section-lead">
                Lưu giữ hoạt động chăm sóc sức khỏe và khoảnh khắc cộng đồng.
              </p>
            </div>
            <Link className="text-link" href="/thu-vien-anh">
              Khám phá thư viện →
            </Link>
          </div>
          <div className="home-gallery">
            {photos.slice(0, 4).map((p) => (
              <Link
                className="gallery-tile"
                key={p.id}
                href="/thu-vien-anh"
                style={{
                  background: `linear-gradient(145deg,${p.colors[0]},${p.colors[1]})`,
                }}
              >
                {p.url ? (
                  <img src={p.url} alt="" className="gallery-preview-image" />
                ) : (
                  <span className="gallery-emoji">{p.icon}</span>
                )}
                <strong>{p.title}</strong>
                <small>Xem album ↗</small>
              </Link>
            ))}
          </div>
          <p className="gallery-disclaimer">
            Ảnh minh họa đang chờ thay thế bằng ảnh hoạt động thực tế được phép
            công bố.
          </p>
        </div>
      </section>
      <section className="section section-alt" id="hoi-dap">
        <div className="container">
          <div
            className="section-head"
            style={{ display: "block", textAlign: "center" }}
          >
            <span className="kicker">Giải đáp nhanh</span>
            <h2>Câu hỏi thường gặp</h2>
          </div>
          <div className="faq">
            {[
              [
                "Làm sao biết lịch hoạt động của trạm?",
                "Theo dõi mục Thông báo khi được cập nhật chính thức hoặc liên hệ trực tiếp với trạm.",
              ],
              [
                "Khi đến khám nên chuẩn bị những gì?",
                "Mang giấy tờ tùy thân, thẻ BHYT (nếu có), đơn thuốc và hồ sơ khám trước đây.",
              ],
              [
                "Website có đặt lịch khám trực tuyến không?",
                "Chưa. Bản hiện tại chưa kết nối hệ thống đặt lịch khám.",
              ],
            ].map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary className="faq-q">
                  {q}
                  <span>＋</span>
                </summary>
                <div className="faq-a faq-answer">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactSection settings={settings} />
    </>
  );
}
