import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { MapSection } from "@/components/sections/MapSection";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Kontak",
  description:
    "Hubungi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - alamat di Karimun, Kepulauan Riau. Tersedia WhatsApp dan email untuk konsultasi.",
  path: "/kontak",
});

export default function KontakPage() {
  const jsonLd = createJsonLd("ContactPage", {
    name: "Kontak Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description: "Hubungi kami melalui WhatsApp atau kunjungi lokasi pondok.",
  });

  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <MapSection />
      </div>
      <CTASection />
    </FrontendLayout>
  );
}
