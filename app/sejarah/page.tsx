import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Sejarah } from "@/components/sections/Sejarah";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, createJsonLd } from "@/lib/seo";
import { getSectionData, getLayoutData } from "@/lib/home-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Sejarah Pesantren",
  description:
    "Sejarah Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - didirikan tahun 2014 di Karimun oleh KH. Samsul Arifin, S.Pd.",
  path: "/sejarah",
});

export default async function SejarahPage() {
  const [sejarahData, ctaData, layoutData] = await Promise.all([
    getSectionData("home", "sejarah"),
    getSectionData("home", "cta"),
    getLayoutData(),
  ]);

  const jsonLd = createJsonLd("Article", {
    headline: "Sejarah Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Perjalanan pesantren dari pendirian tahun 2014 hingga transformasi menjadi Satuan Pendidikan Muadalah.",
    datePublished: "2014-02-14",
    author: {
      "@type": "Organization",
      name: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    },
  });

  return (
    <FrontendLayout socialLinks={layoutData.socialLinks} settings={layoutData.settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Sejarah data={sejarahData} />
      </div>
      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
