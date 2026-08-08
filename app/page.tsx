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
import { getHomepageData } from "@/lib/home-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
  description:
    "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal. Berdiri sejak 2014 di Karimun, Kepulauan Riau.",
  path: "",
});

export default async function Home() {
  const data = await getHomepageData();

  return (
    <FrontendLayout socialLinks={data.socialLinks} settings={data.settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero data={data} />
      <Stats items={data.stats} />
      <Reveal><Profil data={data.profil} /></Reveal>
      <Reveal><VisiMisi data={data.visiMisi} /></Reveal>
      <Reveal><Kurikulum data={data.kurikulum} /></Reveal>
      <Reveal><Pembinaan data={data.pembinaan} /></Reveal>
      <Reveal><Sejarah data={data.sejarah} /></Reveal>
      <Reveal><Gallery compact media={data.gallery} /></Reveal>
      <CTASection data={data.cta} />
      <Reveal><MapSection settings={data.settings} /></Reveal>
    </FrontendLayout>
  );
}
