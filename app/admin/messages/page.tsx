import { adminGuard } from "@/lib/proxy";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MessagesInbox } from "./messages-inbox";

export default async function MessagesPage() {
  await adminGuard();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pesan Masuk</h1>
          <p className="text-sm text-muted-foreground">
            Pesan dari form kontak pengunjung website.
          </p>
        </div>
        <MessagesInbox />
      </div>
    </AdminLayout>
  );
}
