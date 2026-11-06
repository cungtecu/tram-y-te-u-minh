"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui";
import type { PhotoItem } from "@/features/types";
type GalleryItem = PhotoItem & { temporary?: boolean };
const tabs = [
  ["all", "Tất cả hình ảnh"],
  ["khambenh", "Khám chữa bệnh"],
  ["tiemchung", "Tiêm chủng"],
  ["truyenthong", "Truyền thông"],
  ["congdong", "Hoạt động cộng đồng"],
  ["user", "Ảnh vừa chọn"],
] as const;
export function GalleryGrid({ items }: { items: PhotoItem[] }) {
  const [uploaded, setUploaded] = useState<GalleryItem[]>([]),
    [filter, setFilter] = useState("all"),
    [current, setCurrent] = useState<number | null>(null);
  const blobUrls = useRef<string[]>([]);
  const all: GalleryItem[] = [...uploaded, ...items],
    visible = all.filter(
      (p) =>
        filter === "all" ||
        (filter === "user" ? p.temporary : p.category === filter),
    );
  const photo = current === null ? null : visible[current];
  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null);
      if (e.key === "ArrowRight")
        setCurrent((c) => (c === null ? null : (c + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setCurrent((c) =>
          c === null ? null : (c - 1 + visible.length) % visible.length,
        );
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, visible.length]);
  useEffect(() => {
    const urls = blobUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);
  return (
    <>
      <div className="detail-gallery-toolbar">
        <div className="filters">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={"filter" + (filter === id ? " active" : "")}
              onClick={() => {
                setFilter(id);
                setCurrent(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="btn btn-primary gallery-upload">
          ＋ Thêm ảnh xem thử
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={(e) => {
              const files = Array.from(e.target.files || []).filter((f) =>
                f.type.startsWith("image/"),
              );
              setUploaded((old) => [
                ...files.map((f, i): GalleryItem => {
                  const url = URL.createObjectURL(f);
                  blobUrls.current.push(url);
                  return {
                    id: crypto.randomUUID() + i,
                    category: "congdong",
                    title: f.name,
                    icon: "📷",
                    colors: ["#d9f4ea", "#b1dcd0"],
                    url,
                    temporary: true,
                  };
                }),
                ...old,
              ]);
              if (files.length) setFilter("user");
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <div className="detail-gallery-grid">
        {visible.map((p, i) => (
          <Reveal key={p.id} className="detail-gallery-card">
            <button className="card-action" onClick={() => setCurrent(i)}>
              <div
                className="detail-gallery-image"
                style={{
                  background: `linear-gradient(145deg, ${p.colors[0]}, ${p.colors[1]})`,
                }}
              >
                {p.url ? (
                  <img src={p.url} alt={p.title} />
                ) : (
                  <span>{p.icon}</span>
                )}
              </div>
              <div className="detail-gallery-label">
                <h3>{p.title}</h3>
                <p>
                  {p.temporary ? "Ảnh xem thử" : "Hình ảnh / minh họa"} · Xem
                  chi tiết ↗
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      {visible.length === 0 && <p>Chưa có hình ảnh trong danh mục này.</p>}
      <p className="gallery-disclaimer">
        Ảnh chọn từ máy chỉ hiển thị tạm thời trong trình duyệt, không được tải
        lên máy chủ.
      </p>
      {photo && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={"Xem ảnh " + photo.title}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCurrent(null);
          }}
        >
          <button
            aria-label="Đóng"
            className="gallery-close"
            onClick={() => setCurrent(null)}
          >
            ×
          </button>
          <button
            aria-label="Ảnh trước"
            className="gallery-prev"
            onClick={() =>
              setCurrent((current! - 1 + visible.length) % visible.length)
            }
          >
            ‹
          </button>
          <div className="gallery-lightbox-content">
            <div
              className="gallery-lightbox-image"
              style={{
                background: `linear-gradient(145deg, ${photo.colors[0]}, ${photo.colors[1]})`,
              }}
            >
              {photo.url ? (
                <img src={photo.url} alt={photo.title} />
              ) : (
                <span>{photo.icon}</span>
              )}
            </div>
            <h3>{photo.title}</h3>
            <p>
              {current! + 1} / {visible.length}
            </p>
          </div>
          <button
            aria-label="Ảnh kế"
            className="gallery-next"
            onClick={() => setCurrent((current! + 1) % visible.length)}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
