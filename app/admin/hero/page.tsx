import { adminGuard } from "@/lib/proxy";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { HeroManager } from "./hero-manager";

export default async function HeroPage() {
  await adminGuard();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hero Slides</h1>
          <p className="text-sm text-muted-foreground">
            Kelola gambar carousel yang tampil di halaman beranda. Gambar
            diunggah ke Cloudflare R2.
          </p>
        </div>
        <HeroManager />
      </div>
    </AdminLayout>
  );
}
