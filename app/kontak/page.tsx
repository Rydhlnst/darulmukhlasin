import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { MapSection } from "@/components/sections/MapSection";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd } from "@/lib/seo";
import { getSectionData, getLayoutData } from "@/lib/home-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Kontak",
  description:
    "Hubungi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - alamat di Karimun, Kepulauan Riau. Tersedia WhatsApp dan email untuk konsultasi.",
  path: "/kontak",
});

export default async function KontakPage() {
  const [ctaData, layoutData] = await Promise.all([
    getSectionData("home", "cta"),
    getLayoutData(),
  ]);

  const jsonLd = createJsonLd("ContactPage", {
    name: "Kontak Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description: "Hubungi kami melalui WhatsApp atau kunjungi lokasi pondok.",
  });

  return (
    <FrontendLayout socialLinks={layoutData.socialLinks} settings={layoutData.settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <MapSection settings={layoutData.settings} />
      </div>
      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
