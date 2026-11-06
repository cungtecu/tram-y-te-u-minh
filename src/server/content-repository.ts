import "server-only";
import { getDb } from "./mongodb";
import { sampleNews, sampleNotices, samplePhotos, services as sampleServices } from "@/config/content";
import type { NewsItem, NoticeItem, PhotoItem, ServiceItem } from "@/features/types";

/** Tầng đọc duy nhất: UI không import MongoDB và không biết schema database. */
async function fetchPublished<T>(
  collection: string,
  parse: (data: Record<string, unknown>) => T | null,
): Promise<T[] | null> {
  try {
    const db = await getDb();
    const data = await db
      .collection(collection)
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return data.map((d) => parse(d)).filter((item): item is T => item !== null);
  } catch {
    return null;
  }
}
function asText(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}
const categoriesNews = ["phongbenh", "dinhduong", "giadinh"];
const categoriesNotice = ["lich", "huongdan", "congdong"];
const categoriesPhoto = ["khambenh", "tiemchung", "truyenthong", "congdong"];
export async function listNews(): Promise<NewsItem[]> {
  const items = await fetchPublished<NewsItem>("posts", (d) =>
    categoriesNews.includes(asText(d.cat)) && asText(d.title)
      ? {
          id: String(d._id),
          category: asText(d.cat) as NewsItem["category"],
          icon: asText(d.icon) || "📰",
          title: asText(d.title),
          intro: asText(d.intro),
          detail: asText(d.detail),
        }
      : null,
  );
  return items === null ? sampleNews : items;
}
export async function listNotices(): Promise<NoticeItem[]> {
  const items = await fetchPublished<NoticeItem>("announcements", (d) =>
    categoriesNotice.includes(asText(d.cat)) && asText(d.title)
      ? {
          id: String(d._id),
          category: asText(d.cat) as NoticeItem["category"],
          title: asText(d.title),
          detail: asText(d.detail),
        }
      : null,
  );
  return items === null ? sampleNotices : items;
}
export async function listPhotos(): Promise<PhotoItem[]> {
  const items = await fetchPublished<PhotoItem>("photos", (d) =>
    categoriesPhoto.includes(asText(d.cat)) &&
    asText(d.title) &&
    asText(d.url).startsWith("/")
      ? {
          id: String(d._id),
          category: asText(d.cat) as PhotoItem["category"],
          title: asText(d.title),
          icon: "📷",
          url: asText(d.url),
          colors: ["#d6f0e5", "#9ccfbf"],
        }
      : null,
  );
  return items === null ? samplePhotos : items;
}
export async function listServices(): Promise<ServiceItem[]> {
  try {
    const db = await getDb();
    const data = await db.collection("services").find({ published: true }).sort({ sortOrder: 1, createdAt: 1 }).limit(100).toArray();
    const items = data.filter(d => asText(d.title) && asText(d.description)).map(d => ({ id: String(d._id), title: asText(d.title), description: asText(d.description), icon: asText(d.icon) || "🩺" }));
    return items;
  } catch { return sampleServices; }
}
