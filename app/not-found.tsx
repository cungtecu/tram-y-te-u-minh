import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <span className="kicker">404</span>
        <h2>Không tìm thấy trang</h2>
        <p>Đường dẫn bạn truy cập không tồn tại.</p>
        <Link className="btn btn-primary" href="/">
          Về trang chủ →
        </Link>
      </div>
    </section>
  );
}
