"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            ✚ &nbsp; Chăm sóc sức khỏe ban đầu · Đồng hành cùng cộng đồng
          </span>
          <span>Website giới thiệu mẫu — nội dung chờ xác nhận</span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Link href="/" className="brand">
            <span className="brandmark">✚</span>
            <span className="brandtext">
              <small>Cổng thông tin y tế</small>TRẠM Y TẾ
              <br />
              XÃ U MINH
            </span>
          </Link>
          <nav
            id="navlinks"
            className={"navlinks" + (open ? " open" : "")}
            aria-label="Điều hướng chính"
          >
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="navcta" href="/lien-he">
            ✉ &nbsp; Gửi liên hệ
          </Link>
          <button
            type="button"
            className="hamb"
            aria-expanded={open}
            aria-label="Mở menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </header>
    </>
  );
}
