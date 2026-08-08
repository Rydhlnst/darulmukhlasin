import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Gallery } from "@/components/sections/Gallery";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Galeri Kegiatan",
  description:
    "Galeri foto kegiatan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - dokumentasi pembelajaran, Tahfidzul Qur'an, dan aktivitas santri.",
  path: "/galeri",
});

export default function GaleriPage() {
  const jsonLd = createJsonLd("ImageGallery", {
    name: "Galeri Kegiatan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description: "Dokumentasi kegiatan dan keseharian santri di pesantren.",
  });

  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Gallery />
      <CTASection />
    </FrontendLayout>
  );
}
