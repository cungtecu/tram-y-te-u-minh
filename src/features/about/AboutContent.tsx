import Link from "next/link";
import { Reveal } from "@/components/ui";
export function AboutContent({ introduction }: { introduction?: string }) {
  return (
    <>
      <section className="section section-alt">
        <div className="container about">
          <Reveal>
            <span className="kicker">Về chúng tôi</span>
            <h2>Vì sức khỏe người dân U Minh</h2>
            <p>{introduction || "Trạm Y tế xã U Minh là cơ sở y tế tuyến xã, hướng đến chăm sóc sức khỏe ban đầu, y tế dự phòng và truyền thông giáo dục sức khỏe cho cộng đồng."}</p>
            <ul className="checklist">
              <li>Chăm sóc sức khỏe ban đầu</li>
              <li>Nâng cao nhận thức phòng bệnh</li>
              <li>Hỗ trợ tiếp cận thông tin y tế</li>
              <li>Gắn kết cơ sở y tế và cộng đồng</li>
            </ul>
          </Reveal>
          <Reveal className="about-visual">
            <img
              className="clinic-figure"
              src="/clinic.svg"
              alt="Minh họa trạm y tế"
            />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="kicker">Định hướng hoạt động</span>
          <h2>Những giá trị chúng tôi hướng đến</h2>
          <div className="detail-card-grid">
            {[
              [
                "💚",
                "Tận tâm với người dân",
                "Chú trọng sự thân thiện, rõ ràng và khả năng tiếp cận thông tin sức khỏe.",
              ],
              [
                "🛡️",
                "Chủ động phòng bệnh",
                "Khuyến khích kiến thức và thực hành dự phòng trong mỗi gia đình.",
              ],
              [
                "🤝",
                "Đồng hành cộng đồng",
                "Hỗ trợ kết nối người dân với hoạt động chăm sóc sức khỏe tại địa phương.",
              ],
            ].map(([icon, title, text]) => (
              <Reveal className="detail-card" key={title}>
                <span className="detail-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container about">
          <Reveal className="detail-illustration">👩‍⚕️</Reveal>
          <Reveal>
            <span className="kicker">Đội ngũ & tổ chức</span>
            <h2>Thông tin nhân sự</h2>
            <p>
              Thông tin cơ cấu tổ chức, người phụ trách và nhân sự chuyên môn sẽ
              được bổ sung sau khi Trạm Y tế cung cấp danh sách được phép công
              khai.
            </p>
            <Link href="/lien-he" className="btn btn-primary">
              Liên hệ trạm →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
