import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type AdminType = "posts" | "announcements" | "photos" | "services";
export const adminCollections: Record<AdminType, string> = {
  posts: "posts",
  announcements: "announcements",
  photos: "photos",
  services: "services",
};
const allowedCategories: Record<AdminType, string[]> = {
  posts: ["phongbenh", "dinhduong", "giadinh"],
  announcements: ["lich", "huongdan", "congdong"],
  photos: ["khambenh", "tiemchung", "truyenthong", "congdong"],
  services: [""],
};
export function isAdminType(value: string | null): value is AdminType {
  return value !== null && Object.hasOwn(adminCollections, value);
}
function requiredText(obj: Record<string, unknown>, name: string, max: number) {
  const value = obj[name];
  if (typeof value !== "string" || !value.trim() || value.trim().length > max)
    throw new Error(`${name} bắt buộc, tối đa ${max} ký tự`);
  return value.trim();
}
function optionalText(obj: Record<string, unknown>, name: string, max: number) {
  const value = obj[name];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > max)
    throw new Error(`${name} vượt giới hạn`);
  return value.trim();
}
export function validateAdminItem(type: AdminType, input: unknown) {
  if (typeof input !== "object" || input === null || Array.isArray(input))
    throw new Error("Dữ liệu không hợp lệ");
  const value = input as Record<string, unknown>;
  const title = requiredText(value, "title", 180);
  if (typeof value.published !== "boolean")
    throw new Error("Trạng thái xuất bản không hợp lệ");
  const base = { title, published: value.published, updatedAt: new Date() };
  if (type === "services") {
    const icon = optionalText(value, "icon", 16) || "🩺";
    const description = requiredText(value, "description", 800);
    const order = Number(value.sortOrder ?? 0);
    if (!Number.isInteger(order) || order < 0 || order > 9999)
      throw new Error("Thứ tự không hợp lệ");
    return { ...base, icon, description, sortOrder: order };
  }
  const cat = requiredText(value, "cat", 30);
  if (!allowedCategories[type].includes(cat))
    throw new Error("Danh mục không hợp lệ");
  if (type === "posts") {
    return {
      ...base,
      cat,
      icon: optionalText(value, "icon", 16) || "📰",
      intro: optionalText(value, "intro", 500),
      detail: requiredText(value, "detail", 15000),
    };
  }
  if (type === "announcements")
    return { ...base, cat, detail: requiredText(value, "detail", 10000) };
  const url = requiredText(value, "url", 300);
  if (!/^\/uploads\/[a-z0-9-]+\.(png|jpg|webp)$/.test(url))
    throw new Error("Ảnh phải được tải lên từ nút chọn ảnh trong quản trị");
  return { ...base, cat, url };
}
export async function listAdminItems(type: AdminType) {
  const db = await getDb();
  const list = await db
    .collection(adminCollections[type])
    .find({})
    .sort({ createdAt: -1, sortOrder: 1 })
    .limit(500)
    .toArray();
  return list.map(({ _id, ...rest }) => ({ id: _id.toHexString(), ...rest }));
}
export async function createAdminItem(type: AdminType, input: unknown) {
  const data = validateAdminItem(type, input);
  const db = await getDb();
  const result = await db
    .collection(adminCollections[type])
    .insertOne({ ...data, createdAt: new Date() });
  return result.insertedId.toHexString();
}
export async function updateAdminItem(
  type: AdminType,
  id: string,
  input: unknown,
) {
  if (!ObjectId.isValid(id)) throw new Error("ID không hợp lệ");
  const data = validateAdminItem(type, input);
  const db = await getDb();
  const result = await db
    .collection(adminCollections[type])
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  if (!result.matchedCount) throw new Error("Không tìm thấy nội dung");
}
export async function deleteAdminItem(type: AdminType, id: string) {
  if (!ObjectId.isValid(id)) throw new Error("ID không hợp lệ");
  const db = await getDb();
  const result = await db
    .collection(adminCollections[type])
    .deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) throw new Error("Không tìm thấy nội dung");
}
