"use client";
import { useEffect, type ReactNode } from "react";
type Props = { title: string; children: ReactNode; onClose: () => void };
export function Modal({ title, children, onClose }: Props) {
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);
  return (
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Đóng">
          ×
        </button>
        <span className="sample">NỘI DUNG THAM KHẢO</span>
        <h2 id="detail-title">{title}</h2>
        <div className="modal-text">{children}</div>
        <button className="btn btn-primary" onClick={onClose}>
          Đã hiểu →
        </button>
      </div>
    </div>
  );
}
