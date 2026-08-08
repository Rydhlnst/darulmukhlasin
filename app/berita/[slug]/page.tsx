import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeftIcon, CalendarIcon } from "lucide-react";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd, SITE_URL } from "@/lib/seo";
import { getSectionData, getLayoutData } from "@/lib/home-data";
import { getPublishedPostBySlug } from "@/lib/cms-api";

export const dynamic = "force-dynamic";

function formatDate(date: Date | string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Berita Tidak Ditemukan",
      path: `/berita/${slug}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/berita/${post.slug}`,
    image: post.featuredImageUrl ?? undefined,
  });
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, layoutData, ctaData] = await Promise.all([
    getPublishedPostBySlug(slug),
    getLayoutData(),
    getSectionData("home", "cta"),
  ]);

  if (!post) notFound();

  const publishedDate = post.publishedAt ?? post.createdAt;

  const jsonLd = createJsonLd("NewsArticle", {
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.featuredImageUrl ?? undefined,
    datePublished: publishedDate ? new Date(publishedDate).toISOString() : undefined,
    mainEntityOfPage: `${SITE_URL}/berita/${post.slug}`,
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

      <article className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/berita"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Kembali ke Berita
          </Link>

          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.categoryName && (
              <Link
                href={`/berita?kategori=${post.categorySlug}`}
                className="rounded-full bg-[#eef7ee] px-3 py-1 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {post.categoryName}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              {formatDate(publishedDate)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          {/* Featured image */}
          {post.featuredImageUrl && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          {post.content ? (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : post.excerpt ? (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </article>

      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
