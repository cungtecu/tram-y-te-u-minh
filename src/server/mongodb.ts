import "server-only";
import { MongoClient, type Db } from "mongodb";
const globalMongo = globalThis as typeof globalThis & {
  __umMongo?: Promise<MongoClient>;
};
export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI chưa cấu hình");
  if (!globalMongo.__umMongo) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 2500 });
    globalMongo.__umMongo = client.connect().catch((e) => {
      globalMongo.__umMongo = undefined;
      throw e;
    });
  }
  return (await globalMongo.__umMongo).db(
    process.env.MONGODB_DB || "tram_y_te_u_minh",
  );
}
