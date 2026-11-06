import { HomePage } from "@/features/home";
import { listNews, listNotices, listPhotos, listServices } from "@/server/content-repository";
import { getSettings } from "@/server/settings-repository";
export const dynamic = "force-dynamic";
export default async function Page() {
  const [news, notices, photos, services, settings] = await Promise.all([
    listNews(),
    listNotices(),
    listPhotos(),
    listServices(),
    getSettings(),
  ]);
  return <HomePage news={news} notices={notices} photos={photos} services={services} settings={settings} />;
}
