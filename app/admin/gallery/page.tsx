export const dynamic = "force-dynamic";

import { adminGuard } from "@/lib/proxy";
import { getAllMedia } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { GalleryManager } from "./gallery-manager";

export default async function GalleryPage() {
  await adminGuard();
  const media = await getAllMedia();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Galeri
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola foto dan media
          </p>
        </div>
        <GalleryManager initialMedia={media} />
      </div>
    </AdminLayout>
  );
}
