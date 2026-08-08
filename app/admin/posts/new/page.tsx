export const dynamic = "force-dynamic";

import { adminGuard } from "@/lib/proxy";
import { getAllCategories } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

export default async function NewPostPage() {
  await adminGuard();
  const categories = await getAllCategories();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <Link
            href="/admin/posts"
            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Buat Artikel Baru
          </h1>
        </div>

        <PostForm categories={categories} />
      </div>
    </AdminLayout>
  );
}
