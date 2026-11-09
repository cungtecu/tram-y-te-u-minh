import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { SITE_IMAGES } from "@/config/media";
import "./globals.css";
import "./modern.css";
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: {
    default: "Trạm Y tế xã U Minh",
    template: "%s | Trạm Y tế xã U Minh",
  },
  description:
    "Trang giới thiệu, tin tức, thông báo và thư viện ảnh Trạm Y tế xã U Minh.",
  icons: { icon: SITE_IMAGES.stationLogo },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
