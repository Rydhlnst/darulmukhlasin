import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Profil } from "@/components/sections/Profil";
import { VisiMisi } from "@/components/sections/VisiMisi";
import { Kurikulum } from "@/components/sections/Kurikulum";
import { Pembinaan } from "@/components/sections/Pembinaan";
import { Sejarah } from "@/components/sections/Sejarah";
import { Gallery } from "@/components/sections/Gallery";
import { CTASection } from "@/components/sections/CTASection";
import { MapSection } from "@/components/sections/MapSection";
import { Reveal } from "@/components/sections/Reveal";
import { createMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
  description:
    "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal. Berdiri sejak 2014 di Karimun, Kepulauan Riau.",
  path: "",
});

export default function Home() {
  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Stats />
      <Reveal><Profil /></Reveal>
      <Reveal><VisiMisi /></Reveal>
      <Reveal><Kurikulum /></Reveal>
      <Reveal><Pembinaan /></Reveal>
      <Reveal><Sejarah /></Reveal>
      <Reveal><Gallery compact /></Reveal>
      <CTASection />
      <Reveal><MapSection /></Reveal>
    </FrontendLayout>
  );
}
