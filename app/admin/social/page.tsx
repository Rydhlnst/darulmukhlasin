import { adminGuard } from "@/lib/proxy";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SocialLinksForm } from "./social-links-form";

export default async function SocialPage() {
  await adminGuard();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Social Media</h1>
          <p className="text-sm text-muted-foreground">
            Kelola tautan media sosial yang ditampilkan di navbar dan footer.
          </p>
        </div>
        <SocialLinksForm />
      </div>
    </AdminLayout>
  );
}
