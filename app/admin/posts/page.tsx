export const dynamic = "force-dynamic";

import Link from "next/link";
import { adminGuard } from "@/lib/proxy";
import { getAllPosts } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { PlusIcon, PencilIcon } from "lucide-react";

export default async function PostsPage() {
  await adminGuard();
  const allPosts = await getAllPosts();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Berita
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Kelola artikel dan berita
            </p>
          </div>
          <Button render={<Link href="/admin/posts/new" />} className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Tambah Artikel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            {allPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Belum ada artikel.{" "}
                <Link
                  href="/admin/posts/new"
                  className="text-primary hover:underline"
                >
                  Buat artikel pertama
                </Link>
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="max-w-xs truncate font-medium text-foreground">
                        {post.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {post.categoryName ?? "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {post.status === "published" ? "Dipublikasi" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            render={
                              <Link href={`/admin/posts/${post.id}/edit`} />
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <DeletePostButton id={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
