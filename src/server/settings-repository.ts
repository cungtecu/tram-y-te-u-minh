import "server-only";
import { getDb } from "./mongodb";
import { siteConfig } from "@/config/site";
import type { PublicSettings } from "@/features/types";
type StoredSettings = PublicSettings & { _id: string; updatedAt?: Date };
const fallback: PublicSettings = {
  location: siteConfig.location,
  phone: siteConfig.phone || "",
  email: siteConfig.email || "",
  hours: siteConfig.hours || "",
  introduction: "",
};
export async function getSettings(): Promise<PublicSettings> {
  try {
    const db = await getDb();
    const doc = await db.collection<StoredSettings>("settings").findOne({ _id: "site" });
    if (!doc) return fallback;
    return Object.fromEntries(
      (Object.keys(fallback) as (keyof PublicSettings)[]).map((k) => [
        k,
        typeof doc[k] === "string"
          ? doc[k]
          : fallback[k as keyof PublicSettings],
      ]),
    ) as PublicSettings;
  } catch {
    return fallback;
  }
}
export async function saveSettings(input: unknown): Promise<PublicSettings> {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Dữ liệu không hợp lệ");
  const obj = input as Record<string, unknown>;
  const max: Record<keyof PublicSettings, number> = {
    location: 200,
    phone: 40,
    email: 120,
    hours: 200,
    introduction: 2000,
  };
  const result = {} as PublicSettings;
  for (const field of Object.keys(max) as (keyof PublicSettings)[]) {
    if (typeof obj[field] !== "string" || obj[field].length > max[field])
      throw new Error(`Trường ${field} không hợp lệ`);
    result[field] = obj[field].trim();
  }
  const db = await getDb();
  await db
    .collection<StoredSettings>("settings")
    .updateOne(
      { _id: "site" },
      { $set: { ...result, updatedAt: new Date() } },
      { upsert: true },
    );
  return result;
}
