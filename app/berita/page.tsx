import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/badge";
import { createMetadata, createJsonLd } from "@/lib/seo";
import { getSectionData, getLayoutData } from "@/lib/home-data";
import {
  getPublishedPosts,
  getPublishedPostCategories,
} from "@/lib/cms-api";
import { cn } from "@/lib/utils";
import { NewspaperIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Berita & Artikel",
  description:
    "Berita, kegiatan, dan artikel terbaru dari Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA.",
  path: "/berita",
});

function formatDate(date: Date | string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;

  const [posts, postCategories, ctaData, layoutData] = await Promise.all([
    getPublishedPosts(kategori),
    getPublishedPostCategories(),
    getSectionData("home", "cta"),
    getLayoutData(),
  ]);

  const jsonLd = createJsonLd("Blog", {
    name: "Berita & Artikel Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Kumpulan berita, kegiatan, dan artikel dari Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA.",
  });

  return (
    <FrontendLayout
      socialLinks={layoutData.socialLinks}
      settings={layoutData.settings}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="min-h-screen bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <Badge className="mb-4 bg-[#1a5c2a] text-white">Informasi</Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Berita &amp; Artikel
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Kabar terbaru seputar kegiatan, prestasi, dan informasi dari
              Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA.
            </p>
          </div>

          {/* Category filter tabs — only when there are categorized posts */}
          {postCategories.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              <Link
                href="/berita"
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  !kategori
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
              >
                Semua
              </Link>
              {postCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/berita?kategori=${cat.slug}`}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    kategori === cat.slug
                      ? "border-primary bg-primary text-white"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Posts grid */}
          {posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
              <NewspaperIcon className="mx-auto mb-4 h-10 w-10 text-muted-foreground/60" />
              <p className="text-muted-foreground">
                Belum ada berita yang dipublikasikan.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/berita/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    {post.featuredImageUrl ? (
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#eef7ee]">
                        <NewspaperIcon className="h-10 w-10 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      {post.categoryName && (
                        <span className="rounded-full bg-[#eef7ee] px-2.5 py-0.5 font-medium text-primary">
                          {post.categoryName}
                        </span>
                      )}
                      <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                    </div>
                    <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-medium text-primary">
                      Baca selengkapnya &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
