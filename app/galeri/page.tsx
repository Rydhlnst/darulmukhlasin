import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Gallery } from "@/components/sections/Gallery";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd } from "@/lib/seo";
import { getLayoutData } from "@/lib/home-data";
import { db } from "@/db";
import { media } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Galeri Kegiatan",
  description:
    "Galeri foto kegiatan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - dokumentasi pembelajaran, Tahfidzul Qur'an, dan aktivitas santri.",
  path: "/galeri",
});

export default async function GaleriPage() {
  const [galleryMedia, ctaData, layoutData] = await Promise.all([
    db.select().from(media).where(eq(media.section, "gallery")).orderBy(desc(media.createdAt)),
    import("@/lib/home-data").then((m) => m.getSectionData("home", "cta")),
    getLayoutData(),
  ]);

  const jsonLd = createJsonLd("ImageGallery", {
    name: "Galeri Kegiatan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description: "Dokumentasi kegiatan dan keseharian santri di pesantren.",
  });

  return (
    <FrontendLayout socialLinks={layoutData.socialLinks} settings={layoutData.settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Gallery media={galleryMedia} />
      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
