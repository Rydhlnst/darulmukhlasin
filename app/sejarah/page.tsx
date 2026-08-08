import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Sejarah } from "@/components/sections/Sejarah";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Sejarah Pesantren",
  description:
    "Sejarah Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - didirikan tahun 2014 di Karimun oleh KH. Samsul Arifin, S.Pd.",
  path: "/sejarah",
});

export default function SejarahPage() {
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
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Sejarah />
      </div>
    </FrontendLayout>
  );
}
