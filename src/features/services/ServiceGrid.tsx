"use client";
import { useState } from "react";
import { Modal, Reveal } from "@/components/ui";
import type { ServiceItem } from "@/features/types";
export function ServiceGrid({
  items,
  compact = false,
}: {
  items: ServiceItem[];
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<ServiceItem | null>(null);
  return (
    <>
      <div className={compact ? "service-grid" : "detail-card-grid"}>
        {items.map((s) => (
          <Reveal key={s.id} className={compact ? "service" : "detail-card"}>
            <button
              className="card-action"
              onClick={() => setSelected(s)}
              aria-label={"Tìm hiểu " + s.title}
            >
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="text-link">Tìm hiểu thêm ↗</span>
            </button>
          </Reveal>
        ))}
      </div>
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p>{selected.description}</p>
          <p>
            Thông tin về phạm vi dịch vụ và lịch tiếp nhận cần được Trạm Y tế
            xác nhận trước khi công bố.
          </p>
        </Modal>
      )}
    </>
  );
}
