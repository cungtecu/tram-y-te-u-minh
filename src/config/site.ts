/** Chỉ chỉnh thông tin trạm tại đây; các component không tự giữ bản sao. */
export const siteConfig = {
  name: "Trạm Y tế xã U Minh",
  tagline: "Vì một U Minh khỏe mạnh",
  location: "Xã U Minh, tỉnh Cà Mau",
  email: null as string | null,
  phone: null as string | null,
  hours: null as string | null,
  navigation: [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Thông báo", href: "/thong-bao" },
    { label: "Thư viện ảnh", href: "/thu-vien-anh" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
} as const;
