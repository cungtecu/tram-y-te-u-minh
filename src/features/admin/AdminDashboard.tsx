"use client";

import { useCallback, useEffect, useState } from "react";
import { StationLogo } from "@/components/ui";
import styles from "./AdminDashboard.module.css";

type ItemType = "posts" | "announcements" | "photos" | "services";
type Tab = ItemType | "settings";
type Item = {
  id: string;
  title: string;
  published: boolean;
  cat?: string;
  intro?: string;
  detail?: string;
  icon?: string;
  description?: string;
  url?: string;
  sortOrder?: number;
  createdAt?: string;
};
type Settings = {
  location: string;
  phone: string;
  email: string;
  hours: string;
  introduction: string;
};
const sections: { id: Tab; title: string; icon: string; subtitle: string }[] = [
  {
    id: "posts",
    title: "Tin tức",
    icon: "📰",
    subtitle: "Đăng bài viết và kiến thức sức khỏe",
  },
  {
    id: "announcements",
    title: "Thông báo",
    icon: "📣",
    subtitle: "Quản lý bảng tin của trạm",
  },
  {
    id: "photos",
    title: "Thư viện ảnh",
    icon: "🖼️",
    subtitle: "Lưu ảnh hoạt động thực tế",
  },
  {
    id: "services",
    title: "Dịch vụ",
    icon: "🩺",
    subtitle: "Danh sách lĩnh vực chăm sóc sức khỏe",
  },
  {
    id: "settings",
    title: "Thông tin trạm",
    icon: "⚙️",
    subtitle: "Giới thiệu và thông tin liên hệ",
  },
];
const categories: Record<ItemType, [string, string][]> = {
  posts: [
    ["phongbenh", "Phòng bệnh"],
    ["dinhduong", "Dinh dưỡng"],
    ["giadinh", "Sức khỏe gia đình"],
  ],
  announcements: [
    ["lich", "Lịch hoạt động"],
    ["huongdan", "Hướng dẫn"],
    ["congdong", "Cộng đồng"],
  ],
  photos: [
    ["khambenh", "Khám chữa bệnh"],
    ["tiemchung", "Tiêm chủng"],
    ["truyenthong", "Truyền thông"],
    ["congdong", "Hoạt động cộng đồng"],
  ],
  services: [],
};
function emptyItem(type: ItemType): Item {
  return {
    id: "",
    title: "",
    published: false,
    cat: categories[type][0]?.[0] || "",
    intro: "",
    detail: "",
    icon: type === "services" ? "🩺" : "📰",
    description: "",
    url: "",
    sortOrder: 0,
  };
}
const emptySettings: Settings = {
  location: "",
  phone: "",
  email: "",
  hours: "",
  introduction: "",
};
async function requestJSON(url: string, options?: RequestInit) {
  const response = await fetch(url, { cache: "no-store", ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}
export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("posts");
  const [items, setItems] = useState<Item[]>([]);
  const [current, setCurrent] = useState<Item | null>(null);
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showDrafts, setShowDrafts] = useState(true);

  const reload = useCallback(async (selected: Tab) => {
    setLoading(true);
    setError("");
    try {
      if (selected === "settings")
        setSettings(await requestJSON("/api/admin/settings"));
      else
        setItems(
          (await requestJSON(`/api/admin/items?type=${selected}`)).items,
        );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void reload(tab);
  }, [tab, reload]);

  function changeTab(selected: Tab) {
    setTab(selected);
    setCurrent(null);
    setQuery("");
    setNotice("");
    setError("");
  }
  function patch(field: keyof Item, value: string | boolean | number) {
    setCurrent((old) => (old ? { ...old, [field]: value } : old));
  }
  async function saveItem(event: React.FormEvent) {
    event.preventDefault();
    if (!current || tab === "settings") return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const isEdit = Boolean(current.id);
      await requestJSON(
        `/api/admin/items?type=${tab}${isEdit ? `&id=${current.id}` : ""}`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(current),
        },
      );
      setCurrent(null);
      setNotice(isEdit ? "Đã cập nhật nội dung." : "Đã tạo nội dung mới.");
      await reload(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không lưu được");
    } finally {
      setBusy(false);
    }
  }
  async function removeItem(item: Item) {
    if (
      tab === "settings" ||
      !window.confirm(
        `Bạn chắc chắn muốn xóa “${item.title}”? Thao tác này không thể hoàn tác.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await requestJSON(`/api/admin/items?type=${tab}&id=${item.id}`, {
        method: "DELETE",
      });
      setCurrent(null);
      setNotice("Đã xóa nội dung.");
      await reload(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không xóa được");
    } finally {
      setBusy(false);
    }
  }
  async function togglePublished(item: Item) {
    if (tab === "settings") return;
    setBusy(true);
    setError("");
    try {
      await requestJSON(`/api/admin/items?type=${tab}&id=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, published: !item.published }),
      });
      setNotice(
        item.published ? "Đã chuyển về bản nháp." : "Đã xuất bản nội dung.",
      );
      await reload(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không đổi được trạng thái");
    } finally {
      setBusy(false);
    }
  }
  async function uploadImage(file?: File) {
    if (!file || tab !== "photos") return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await requestJSON("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      patch("url", response.url);
      setNotice(
        "Đã tải ảnh lên máy tính local. Nhấn Lưu để tạo bản ghi trong thư viện.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải ảnh được");
    } finally {
      setBusy(false);
    }
  }
  async function saveSettings(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await requestJSON("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSettings(data);
      setNotice("Đã lưu thông tin trạm. Tải lại trang ngoài để xem thay đổi.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setBusy(false);
    }
  }
  const selected = sections.find((s) => s.id === tab)!;
  const visible = items.filter(
    (item) =>
      (!query || item.title.toLowerCase().includes(query.toLowerCase())) &&
      (showDrafts || item.published),
  );
  const publishedCount = items.filter((item) => item.published).length;
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeading}>
          <span><StationLogo /></span>
          <div>
            <strong>TYT U MINH</strong>
            <small>Quản lý nội dung</small>
          </div>
        </div>
        <div className={styles.sidebarLabel}>QUẢN LÝ WEBSITE</div>
        <nav aria-label="Điều hướng quản trị">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`${styles.navButton} ${tab === s.id ? styles.active : ""}`}
              onClick={() => changeTab(s.id)}
            >
              <span>{s.icon}</span>
              {s.title}
              <span className={styles.navArrow}>›</span>
            </button>
          ))}
        </nav>
        <a
          className={styles.backLink}
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          ↗ Xem website công khai
        </a>
        <div className={styles.localTag}>
          🔒 Chỉ dùng localhost · Không đăng nhập
        </div>
      </aside>
      <div className={styles.main}>
        <div className={styles.topline}>
          <div>
            <span className={styles.overline}>TRANG QUẢN TRỊ</span>
            <h1>
              {selected.icon} {selected.title}
            </h1>
            <p>{selected.subtitle}</p>
          </div>
          {tab !== "settings" && (
            <button
              className={styles.primary}
              disabled={busy}
              onClick={() => {
                setCurrent(emptyItem(tab));
                setNotice("");
              }}
            >
              ＋ Thêm mới
            </button>
          )}
        </div>
        <div className={styles.alertInfo}>
          Bản quản trị thử nghiệm chỉ dành cho máy cá nhân. Chưa có xác thực,
          không mở cổng 3000 ra mạng LAN hoặc Internet.
        </div>
        {error && (
          <div role="alert" className={styles.alertError}>
            ⚠ {error}
          </div>
        )}
        {notice && (
          <div role="status" className={styles.alertSuccess}>
            ✓ {notice}
          </div>
        )}
        {loading ? (
          <div className={styles.loading}>Đang tải dữ liệu từ MongoDB...</div>
        ) : tab === "settings" ? (
          <form className={styles.settingsForm} onSubmit={saveSettings}>
            <h2>Thông tin hiển thị ngoài website</h2>
            <div className={styles.fieldGrid}>
              {(
                [
                  ["location", "Địa chỉ / khu vực"],
                  ["phone", "Số điện thoại"],
                  ["email", "Email"],
                  ["hours", "Giờ làm việc"],
                ] as [keyof Settings, string][]
              ).map(([key, label]) => (
                <label className={styles.field} key={key}>
                  {label}
                  <input
                    value={settings[key]}
                    onChange={(e) =>
                      setSettings((old) => ({ ...old, [key]: e.target.value }))
                    }
                    maxLength={200}
                  />
                </label>
              ))}
            </div>
            <label className={styles.field}>
              Đoạn giới thiệu về trạm
              <textarea
                rows={7}
                maxLength={2000}
                value={settings.introduction}
                onChange={(e) =>
                  setSettings((old) => ({
                    ...old,
                    introduction: e.target.value,
                  }))
                }
                placeholder="Giới thiệu nhiệm vụ, định hướng và hoạt động của đơn vị..."
              />
            </label>
            <div className={styles.formActions}>
              <button disabled={busy} className={styles.primary} type="submit">
                {busy ? "Đang lưu..." : "Lưu thông tin"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.statGrid}>
              <div className={styles.stat}>
                <span>Tổng nội dung</span>
                <strong>{items.length}</strong>
              </div>
              <div className={styles.stat}>
                <span>Đã xuất bản</span>
                <strong>{publishedCount}</strong>
              </div>
              <div className={styles.stat}>
                <span>Bản nháp</span>
                <strong>{items.length - publishedCount}</strong>
              </div>
            </div>
            <div className={styles.toolbar}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Tìm theo tiêu đề..."
                aria-label="Tìm nội dung"
              />
              <label>
                <input
                  type="checkbox"
                  checked={showDrafts}
                  onChange={(e) => setShowDrafts(e.target.checked)}
                />{" "}
                Hiện cả bản nháp
              </label>
              <button onClick={() => void reload(tab)} disabled={busy}>
                ↻ Làm mới
              </button>
            </div>
            <div className={styles.list}>
              {visible.length ? (
                visible.map((item) => (
                  <article className={styles.listItem} key={item.id}>
                    {tab === "photos" && item.url ? (
                      <img className={styles.thumbnail} src={item.url} alt="" />
                    ) : (
                      <div className={styles.itemIcon}>
                        {item.icon || selected.icon}
                      </div>
                    )}
                    <div className={styles.itemText}>
                      <strong>{item.title}</strong>
                      <small>
                        {item.cat
                          ? categories[tab]?.find(
                              (c) => c[0] === item.cat,
                            )?.[1] || item.cat
                          : "Dịch vụ"}{" "}
                        ·{" "}
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                          : "Mới tạo"}
                      </small>
                    </div>
                    <span
                      className={
                        item.published ? styles.published : styles.draft
                      }
                    >
                      {item.published ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                    <div className={styles.itemActions}>
                      <button
                        title="Sửa"
                        onClick={() => {
                          setCurrent({ ...item });
                          setNotice("");
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        title="Đổi trạng thái"
                        onClick={() => void togglePublished(item)}
                        disabled={busy}
                      >
                        {item.published ? "Ẩn" : "Đăng"}
                      </button>
                      <button
                        className={styles.deleteButton}
                        title="Xóa"
                        disabled={busy}
                        onClick={() => void removeItem(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.empty}>
                  Chưa có nội dung phù hợp. Nhấn “Thêm mới” để bắt đầu.
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {current && tab !== "settings" && (
        <div
          className={styles.overlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !busy) setCurrent(null);
          }}
        >
          <form className={styles.editor} onSubmit={saveItem}>
            <div className={styles.editorHead}>
              <div>
                <span className={styles.overline}>
                  {current.id ? "CHỈNH SỬA" : "TẠO MỚI"}
                </span>
                <h2>{selected.title}</h2>
              </div>
              <button
                type="button"
                aria-label="Đóng"
                disabled={busy}
                onClick={() => setCurrent(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.editorBody}>
              {error && (
                <div className={styles.alertError} role="alert">
                  ⚠ {error}
                </div>
              )}
              {notice && (
                <div className={styles.alertSuccess} role="status">
                  ✓ {notice}
                </div>
              )}
              <label className={styles.field}>
                Tiêu đề *
                <input
                  required
                  maxLength={180}
                  value={current.title}
                  onChange={(e) => patch("title", e.target.value)}
                  placeholder="Nhập tiêu đề..."
                />
              </label>
              {tab !== "services" && (
                <label className={styles.field}>
                  Danh mục
                  <select
                    value={current.cat || ""}
                    onChange={(e) => patch("cat", e.target.value)}
                  >
                    {categories[tab].map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {(tab === "posts" || tab === "services") && (
                <label className={styles.field}>
                  Biểu tượng (emoji)
                  <input
                    value={current.icon || ""}
                    onChange={(e) => patch("icon", e.target.value)}
                    maxLength={16}
                    placeholder="📰"
                  />
                </label>
              )}
              {tab === "posts" && (
                <label className={styles.field}>
                  Tóm tắt ngắn
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={current.intro || ""}
                    onChange={(e) => patch("intro", e.target.value)}
                    placeholder="Nội dung xuất hiện trên thẻ tin..."
                  />
                </label>
              )}
              {(tab === "posts" || tab === "announcements") && (
                <label className={styles.field}>
                  Nội dung chi tiết *
                  <textarea
                    required
                    rows={9}
                    maxLength={15000}
                    value={current.detail || ""}
                    onChange={(e) => patch("detail", e.target.value)}
                    placeholder="Nhập nội dung bài viết/thông báo..."
                  />
                </label>
              )}
              {tab === "services" && (
                <>
                  <label className={styles.field}>
                    Mô tả dịch vụ *
                    <textarea
                      required
                      rows={5}
                      maxLength={800}
                      value={current.description || ""}
                      onChange={(e) => patch("description", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    Thứ tự
                    <input
                      type="number"
                      min={0}
                      max={9999}
                      value={current.sortOrder ?? 0}
                      onChange={(e) =>
                        patch("sortOrder", Number(e.target.value))
                      }
                    />
                  </label>
                </>
              )}
              {tab === "photos" && (
                <>
                  <label className={styles.field}>
                    Chọn ảnh (PNG / JPG / WebP, tối đa 5MB)
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      disabled={busy}
                      onChange={(e) => void uploadImage(e.target.files?.[0])}
                    />
                  </label>
                  {current.url && (
                    <div className={styles.imagePreview}>
                      <img src={current.url} alt="Ảnh xem trước" />
                      <span>{current.url}</span>
                    </div>
                  )}
                </>
              )}
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={current.published}
                  onChange={(e) => patch("published", e.target.checked)}
                />{" "}
                <span>
                  <strong>Xuất bản ngay</strong>
                  <small>
                    Bỏ chọn để lưu dưới dạng bản nháp, không hiển thị ngoài
                    website.
                  </small>
                </span>
              </label>
            </div>
            <div className={styles.editorFooter}>
              <button
                type="button"
                disabled={busy}
                onClick={() => setCurrent(null)}
              >
                Hủy
              </button>
              <button className={styles.primary} disabled={busy} type="submit">
                {busy
                  ? "Đang xử lý..."
                  : current.id
                    ? "Lưu thay đổi"
                    : "Tạo nội dung"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
