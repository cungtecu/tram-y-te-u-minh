"use client";
import { useState } from "react";
import { Modal, Reveal } from "@/components/ui";
import type { NoticeItem } from "@/features/types";
const tabs = [
  ["all", "Tất cả"],
  ["lich", "Lịch hoạt động"],
  ["huongdan", "Hướng dẫn"],
  ["congdong", "Cộng đồng"],
] as const;
export function NoticeList({
  items,
  compact = false,
}: {
  items: NoticeItem[];
  compact?: boolean;
}) {
  const [filter, setFilter] = useState("all"),
    [selected, setSelected] = useState<NoticeItem | null>(null);
  const visible = items.filter(
    (n) => filter === "all" || n.category === filter,
  );
  return (
    <>
      <div>
        {!compact && (
          <div className="filters">
            {tabs.map(([id, name]) => (
              <button
                key={id}
                className={"filter" + (filter === id ? " active" : "")}
                onClick={() => setFilter(id)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        <div className="notice-list">
          {visible.map((n, i) => (
            <Reveal key={n.id}>
              <button className="notice-item" onClick={() => setSelected(n)}>
                <div className="datebox">
                  {String(i + 1).padStart(2, "0")}
                  <small>MẪU</small>
                </div>
                <div>
                  <strong>{n.title}</strong>
                  <span>Nội dung cần xác nhận trước khi công bố</span>
                </div>
                <b>↗</b>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p>{selected.detail}</p>
        </Modal>
      )}
    </>
  );
}
