"use client";
import { useState } from "react";
import { Modal, Reveal } from "@/components/ui";
import type { NewsItem } from "@/features/types";
const tabs = [
  ["all", "Tất cả"],
  ["phongbenh", "Phòng bệnh"],
  ["dinhduong", "Dinh dưỡng"],
  ["giadinh", "Gia đình"],
] as const;
export function NewsGrid({
  items,
  compact = false,
}: {
  items: NewsItem[];
  compact?: boolean;
}) {
  const [filter, setFilter] = useState("all"),
    [selected, setSelected] = useState<NewsItem | null>(null);
  const visible = items.filter(
    (n) => filter === "all" || filter === n.category,
  );
  return (
    <>
      <div className="filters" role="group" aria-label="Lọc tin tức">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            className={"filter" + (filter === id ? " active" : "")}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={compact ? "news-grid" : "detail-news-grid"}>
        {visible.map((n) => (
          <Reveal key={n.id} className="news-card">
            <button className="card-action" onClick={() => setSelected(n)}>
              <div className="news-art">
                <span>{n.icon}</span>
              </div>
              <div className="news-body">
                <span className="pill">
                  {tabs.find((t) => t[0] === n.category)?.[1]}
                </span>
                <h3>{n.title}</h3>
                <p>{n.intro}</p>
                <div className="meta">
                  {n.id.startsWith("n") ? "Bài viết mẫu" : "Bài viết"}{" "}
                  <span>•</span> {n.readingMinutes || 3} phút đọc
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p>{selected.detail}</p>
        </Modal>
      )}
    </>
  );
}
