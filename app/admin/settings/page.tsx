export const dynamic = "force-dynamic";

import { adminGuard } from "@/lib/proxy";
import { getSettings } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  await adminGuard();
  const settings = await getSettings();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Pengaturan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola informasi situs, kontak, dan donasi
          </p>
        </div>
        <SettingsForm initialSettings={settings} />
      </div>
    </AdminLayout>
  );
}
