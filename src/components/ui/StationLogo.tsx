import Image from "next/image";
import { SITE_IMAGES } from "@/config/media";

/** Nhận diện trạm dùng chung; nơi sử dụng quyết định kích thước khung. */
export function StationLogo() {
  return (
    <Image
      className="station-logo"
      src={SITE_IMAGES.stationLogo}
      alt="Logo Trạm Y tế xã U Minh"
      width={96}
      height={96}
      priority
    />
  );
}
