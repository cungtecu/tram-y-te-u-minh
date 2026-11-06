"use client";
import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { PublicSettings } from "@/features/types";
export function ContactSection({ settings }: { settings?: PublicSettings }) {
  const info = settings || { location: siteConfig.location, phone: siteConfig.phone || "", email: siteConfig.email || "", hours: siteConfig.hours || "", introduction: "" };
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSummary(
      `Họ và tên: ${data.get("name")}\nSố điện thoại: ${data.get("phone") || "Không cung cấp"}\nChủ đề: ${data.get("topic")}\nNội dung: ${data.get("message")}`,
    );
    setMessage("Đã hiển thị nội dung để xem lại. Chưa gửi dữ liệu.");
  }
  return (
    <section className="section section-alt" id="lien-he">
      <div className="container contact">
        <div className="contact-info">
          <span className="kicker">Kết nối cùng chúng tôi</span>
          <h2>
            Liên hệ
            <br />
            Trạm Y tế xã U Minh
          </h2>
          <p>
            Hãy để lại câu hỏi hoặc nội dung bạn quan tâm. Biểu mẫu này chưa kết
            nối hệ thống tiếp nhận chính thức.
          </p>
          <div className="contact-note">
            <strong>📍 Khu vực phục vụ:</strong> {info.location}
            <br />
            <strong>☎ Điện thoại:</strong>{" "}
            {info.phone || "Chờ trạm cung cấp"}
            <br />
            <strong>✉ Email:</strong> {info.email || "Chờ trạm cung cấp"}
            <br />
            <strong>🕘 Giờ làm việc:</strong>{" "}
              {info.hours || "Chờ xác nhận"}
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-grid">
            <label className="field">
              Họ và tên *
              <input
                name="name"
                required
                maxLength={100}
                placeholder="Nhập họ tên"
              />
            </label>
            <label className="field">
              Số điện thoại
              <input
                name="phone"
                type="tel"
                pattern="[0-9+ .()\-]{9,18}"
                placeholder="Số điện thoại"
              />
            </label>
          </div>
          <label className="field">
            Chủ đề
            <select name="topic">
              <option>Tư vấn thông tin chung</option>
              <option>Thông tin dịch vụ</option>
              <option>Góp ý về website</option>
            </select>
          </label>
          <label className="field">
            Nội dung *
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              placeholder="Nhập nội dung cần liên hệ..."
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Xem lại nội dung ↗
          </button>
          <p className="form-status" role="status">
            {message || "Biểu mẫu demo: không lưu hoặc gửi thông tin."}
          </p>
        </form>
      </div>
      {summary && (
        <Modal title="Xem lại nội dung liên hệ" onClose={() => setSummary("")}>
          <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
          <p>
            <strong>
              Đây là bản trình diễn. Thông tin chưa được gửi hoặc lưu trữ.
            </strong>
          </p>
        </Modal>
      )}
    </section>
  );
}
