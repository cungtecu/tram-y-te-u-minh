import Link from "next/link";
import { siteConfig } from "@/config/site";
import { StationLogo } from "@/components/ui";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand">
              <span className="brandmark"><StationLogo /></span>
              <span className="brandtext">
                <small>Cổng thông tin y tế</small>TRẠM Y TẾ XÃ U MINH
              </span>
            </Link>
            <p>
              Hướng đến một cộng đồng khỏe mạnh, chủ động phòng bệnh và dễ dàng
              tiếp cận thông tin chăm sóc sức khỏe.
            </p>
            <span className="sample">
              Website mẫu — chưa phải kênh thông tin chính thức
            </span>
          </div>
          <div>
            <h3>Khám phá</h3>
            <div className="footlinks">
              {siteConfig.navigation.slice(0, 4).map((l) => (
                <Link href={l.href} key={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Thông tin</h3>
            <div className="footlinks">
              {siteConfig.navigation.slice(4).map((l) => (
                <Link href={l.href} key={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Trạm Y tế xã U Minh · Bản thiết kế giao diện mẫu</span>
          <span>Thiết kế hướng đến cộng đồng ♡</span>
        </div>
      </div>
    </footer>
  );
}
