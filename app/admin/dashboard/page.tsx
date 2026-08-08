export const dynamic = "force-dynamic";

import { adminGuard } from "@/lib/proxy";
import { getDashboardStats, getRecentPosts } from "@/lib/cms-api";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  NewspaperIcon,
  ImageIcon,
  MailIcon,
  ArrowRightIcon,
} from "lucide-react";

export default async function DashboardPage() {
  await adminGuard();
  const [stats, recentPosts] = await Promise.all([
    getDashboardStats(),
    getRecentPosts(5),
  ]);

  const statCards = [
    {
      label: "Total Artikel",
      value: stats.totalPosts,
      icon: NewspaperIcon,
      href: "/admin/posts",
    },
    {
      label: "Total Media",
      value: stats.totalMedia,
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    {
      label: "Pesan Baru",
      value: stats.newMessages,
      icon: MailIcon,
      href: "#",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ringkasan aktivitas dan statistik situs
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="transition-opacity hover:opacity-80"
            >
              <Card>
                <CardContent className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Artikel Terbaru</CardTitle>
            <Link
              href="/admin/posts"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Lihat semua
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Belum ada artikel
              </p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="truncate text-sm font-medium text-foreground hover:text-primary"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Dipublikasi" : "Draft"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
