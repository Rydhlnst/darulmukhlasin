import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Kurikulum } from "@/components/sections/Kurikulum";
import { Pembinaan } from "@/components/sections/Pembinaan";
import { Metode } from "@/components/sections/Metode";
import { TargetLulusan } from "@/components/sections/TargetLulusan";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/sections/Reveal";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Kurikulum & Program Pendidikan",
  description:
    "Kurikulum terpadu Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Tahfidzul Qur'an Metode Wafa, Pendidikan Muadalah, Dirasah Islamiyah, dan mata pelajaran umum.",
  path: "/kurikulum",
});

export default function KurikulumPage() {
  const jsonLd = createJsonLd("EducationalOccupationalProgram", {
    name: "Kurikulum Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Kurikulum terpadu berbasis Al-Qur'an dan kepesantrenan dengan 4 pilar utama.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    },
  });

  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Kurikulum />
      <Reveal>
        <Pembinaan />
      </Reveal>
      <Reveal>
        <Metode />
      </Reveal>
      <Reveal>
        <TargetLulusan />
      </Reveal>
      <CTASection />
    </FrontendLayout>
  );
}
