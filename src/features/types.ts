export type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};
export type PublicSettings = { location: string; phone: string; email: string; hours: string; introduction: string };
export type NewsItem = {
  id: string;
  category: "phongbenh" | "dinhduong" | "giadinh";
  icon: string;
  title: string;
  intro: string;
  detail: string;
  readingMinutes?: number;
};
export type NoticeItem = {
  id: string;
  category: "lich" | "huongdan" | "congdong";
  title: string;
  detail: string;
};
export type PhotoItem = {
  id: string;
  category: "khambenh" | "tiemchung" | "truyenthong" | "congdong";
  title: string;
  icon: string;
  colors: [string, string];
  url?: string;
};
