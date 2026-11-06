import type {
  NewsItem,
  NoticeItem,
  PhotoItem,
  ServiceItem,
} from "@/features/types";

export const services: ServiceItem[] = [
  {
    id: "kham",
    icon: "🩺",
    title: "Khám, tư vấn sức khỏe",
    description:
      "Hướng dẫn chăm sóc sức khỏe ban đầu và tiếp cận dịch vụ phù hợp.",
  },
  {
    id: "tiem",
    icon: "💉",
    title: "Tiêm chủng",
    description: "Thông tin tiêm chủng và các lưu ý bảo vệ sức khỏe cộng đồng.",
  },
  {
    id: "mebe",
    icon: "👩‍👧",
    title: "Bà mẹ & trẻ em",
    description:
      "Hỗ trợ kiến thức chăm sóc thai kỳ, trẻ em và sức khỏe gia đình.",
  },
  {
    id: "phong",
    icon: "🛡️",
    title: "Y tế dự phòng",
    description: "Truyền thông phòng chống dịch bệnh và nâng cao sức khỏe.",
  },
  {
    id: "quanly",
    icon: "💊",
    title: "Quản lý sức khỏe",
    description:
      "Thông tin theo dõi sức khỏe theo hướng dẫn của nhân viên y tế.",
  },
  {
    id: "tt",
    icon: "📢",
    title: "Truyền thông giáo dục sức khỏe",
    description: "Chia sẻ kiến thức và các hoạt động nâng cao nhận thức.",
  },
];
export const sampleNews: NewsItem[] = [
  {
    id: "n1",
    category: "phongbenh",
    icon: "🧼",
    title: "Những thói quen nhỏ giúp phòng bệnh mỗi ngày",
    intro:
      "Cùng xây dựng nếp sống lành mạnh, giữ gìn vệ sinh cá nhân và môi trường.",
    detail:
      "Rửa tay đúng cách, giữ môi trường sống sạch, ăn uống hợp vệ sinh và chủ động theo dõi khuyến cáo y tế.",
    readingMinutes: 3,
  },
  {
    id: "n2",
    category: "dinhduong",
    icon: "🥗",
    title: "Bữa ăn cân bằng cho cả gia đình",
    intro: "Gợi ý nguyên tắc ăn uống đa dạng, cân đối và phù hợp.",
    detail:
      "Ăn đa dạng các nhóm thực phẩm, rau xanh, trái cây, nguồn đạm phù hợp và đủ nước.",
    readingMinutes: 2,
  },
  {
    id: "n3",
    category: "giadinh",
    icon: "💚",
    title: "Chăm sóc sức khỏe người cao tuổi",
    intro: "Những lưu ý hữu ích để đồng hành cùng ông bà, cha mẹ.",
    detail:
      "Vận động phù hợp, theo dõi sức khỏe và khám định kỳ theo tư vấn của nhân viên y tế.",
    readingMinutes: 3,
  },
];
export const sampleNotices: NoticeItem[] = [
  {
    id: "a1",
    category: "lich",
    title: "Lịch tiếp nhận và hướng dẫn người dân",
    detail:
      "Nội dung mẫu. Vui lòng liên hệ trực tiếp với trạm để xác nhận giờ làm việc và lịch tiếp nhận thực tế.",
  },
  {
    id: "a2",
    category: "huongdan",
    title: "Hướng dẫn chuẩn bị trước khi đến khám",
    detail:
      "Mang theo giấy tờ tùy thân, thẻ BHYT nếu có và các hồ sơ khám chữa bệnh liên quan.",
  },
  {
    id: "a3",
    category: "congdong",
    title: "Theo dõi hoạt động sức khỏe cộng đồng",
    detail:
      "Các chương trình và lịch truyền thông sẽ được cập nhật khi có thông tin chính thức.",
  },
];
export const samplePhotos: PhotoItem[] = [
  {
    id: "p1",
    category: "khambenh",
    title: "Khám và tư vấn sức khỏe",
    icon: "🩺",
    colors: ["#cceee8", "#8fcfc6"],
  },
  {
    id: "p2",
    category: "tiemchung",
    title: "Chương trình tiêm chủng",
    icon: "💉",
    colors: ["#d7e7fa", "#a7c8e9"],
  },
  {
    id: "p3",
    category: "truyenthong",
    title: "Truyền thông phòng bệnh",
    icon: "📢",
    colors: ["#f9ead5", "#edd19d"],
  },
  {
    id: "p4",
    category: "khambenh",
    title: "Chăm sóc bà mẹ và trẻ em",
    icon: "👩‍👧",
    colors: ["#f5e2e8", "#eab8c8"],
  },
  {
    id: "p5",
    category: "congdong",
    title: "Hoạt động sức khỏe cộng đồng",
    icon: "🤝",
    colors: ["#d7f1dc", "#a2d6b2"],
  },
  {
    id: "p6",
    category: "truyenthong",
    title: "Hướng dẫn chăm sóc sức khỏe",
    icon: "💚",
    colors: ["#d1ebe6", "#80bfb3"],
  },
];
