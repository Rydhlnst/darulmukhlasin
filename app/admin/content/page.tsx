import { adminGuard } from "@/lib/proxy";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentTabs } from "./content-tabs";

export default async function ContentPage() {
  await adminGuard();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Konten Halaman</h1>
          <p className="text-sm text-muted-foreground">
            Edit teks dan konten yang tampil di halaman website. Pilih bagian
            halaman yang ingin diubah.
          </p>
        </div>
        <ContentTabs />
      </div>
    </AdminLayout>
  );
}
