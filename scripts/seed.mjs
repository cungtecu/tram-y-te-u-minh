import { MongoClient } from "mongodb";
import fs from "node:fs";

if (fs.existsSync(".env.local")) {
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match && !process.env[match[1]])
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}
const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
  { serverSelectionTimeoutMS: 5000 },
);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "tram_y_te_u_minh");
  const posts = [
    {
      cat: "phongbenh",
      icon: "🧼",
      title: "Những thói quen nhỏ giúp phòng bệnh mỗi ngày",
      intro: "Hướng dẫn vệ sinh cá nhân và môi trường sống.",
      detail: "Rửa tay đúng cách, giữ môi trường sạch, ăn uống hợp vệ sinh.",
    },
    {
      cat: "dinhduong",
      icon: "🥗",
      title: "Dinh dưỡng cân bằng cho gia đình",
      intro: "Nguyên tắc ăn uống đa dạng và lành mạnh.",
      detail: "Cân đối các nhóm thực phẩm tùy theo nhu cầu.",
    },
  ];
  const announcements = [
    {
      cat: "huongdan",
      title: "Hướng dẫn chuẩn bị khi đến khám (mẫu)",
      detail:
        "Mang theo giấy tờ tùy thân, thẻ BHYT nếu có và hồ sơ y tế liên quan.",
    },
  ];
  const services = [
    [
      "🩺",
      "Khám, tư vấn sức khỏe",
      "Hướng dẫn chăm sóc sức khỏe ban đầu và tiếp cận dịch vụ phù hợp.",
    ],
    [
      "💉",
      "Tiêm chủng",
      "Thông tin tiêm chủng và các lưu ý bảo vệ sức khỏe cộng đồng.",
    ],
    [
      "👩‍👧",
      "Bà mẹ & trẻ em",
      "Hỗ trợ kiến thức chăm sóc thai kỳ, trẻ em và sức khỏe gia đình.",
    ],
    [
      "🛡️",
      "Y tế dự phòng",
      "Truyền thông phòng chống dịch bệnh và nâng cao sức khỏe.",
    ],
    [
      "💊",
      "Quản lý sức khỏe",
      "Thông tin theo dõi sức khỏe theo hướng dẫn của nhân viên y tế.",
    ],
    [
      "📢",
      "Truyền thông giáo dục sức khỏe",
      "Chia sẻ kiến thức và các hoạt động nâng cao nhận thức.",
    ],
  ].map(([icon, title, description], sortOrder) => ({
    icon,
    title,
    description,
    sortOrder,
  }));
  for (const [name, items] of [
    ["posts", posts],
    ["announcements", announcements],
    ["services", services],
  ]) {
    const collection = db.collection(name);
    for (const item of items)
      await collection.updateOne(
        { title: item.title },
        { $setOnInsert: { ...item, published: true, createdAt: new Date() } },
        { upsert: true },
      );
    console.log(
      `Đã chuẩn bị ${name}: ${items.length} mục (không ghi đè dữ liệu cũ)`,
    );
  }
  for (const name of ["photos", "albums", "users", "settings", "audit_logs"])
    await db.createCollection(name).catch((error) => {
      if (error.code !== 48) throw error;
    });
  console.log("Hoàn tất. Database:", db.databaseName);
} finally {
  await client.close();
}
