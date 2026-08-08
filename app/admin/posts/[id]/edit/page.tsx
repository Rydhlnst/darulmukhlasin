export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { adminGuard } from "@/lib/proxy";
import { getPostById, getAllCategories } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await adminGuard();
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) notFound();

  const [post, categories] = await Promise.all([
    getPostById(postId),
    getAllCategories(),
  ]);

  if (!post) notFound();

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
            Edit Artikel
          </h1>
        </div>

        <PostForm post={post} categories={categories} />
      </div>
    </AdminLayout>
  );
}
