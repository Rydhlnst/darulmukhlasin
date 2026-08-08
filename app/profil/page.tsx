import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Profil } from "@/components/sections/Profil";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Profil Pesantren",
  description:
    "Profil Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - lembaga pendidikan Islam di Karimun, Kepulauan Riau yang berdiri sejak 2014.",
  path: "/profil",
});

export default function ProfilPage() {
  const jsonLd = createJsonLd("AboutPage", {
    name: "Profil Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Lembaga pendidikan Islam yang berkomitmen membina generasi muslim berakhlak mulia di Karimun, Kepulauan Riau.",
  });

  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Profil />
      </div>
    </FrontendLayout>
  );
}
