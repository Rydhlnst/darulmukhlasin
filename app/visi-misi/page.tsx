import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { VisiMisi } from "@/components/sections/VisiMisi";
import { Metode } from "@/components/sections/Metode";
import { TargetLulusan } from "@/components/sections/TargetLulusan";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/sections/Reveal";
import { createMetadata, createJsonLd } from "@/lib/seo";
import { getSectionData, getLayoutData } from "@/lib/home-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Visi & Misi",
  description:
    "Visi dan Misi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
  path: "/visi-misi",
});

export default async function VisiMisiPage() {
  const [visiMisiData, metodeData, targetData, ctaData, layoutData] = await Promise.all([
    getSectionData("home", "visi-misi"),
    getSectionData("home", "metode"),
    getSectionData("home", "target-lulusan"),
    getSectionData("home", "cta"),
    getLayoutData(),
  ]);

  const jsonLd = createJsonLd("Page", {
    name: "Visi & Misi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
  });

  return (
    <FrontendLayout socialLinks={layoutData.socialLinks} settings={layoutData.settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <VisiMisi data={visiMisiData} />
      </div>
      <Reveal><Metode data={metodeData} /></Reveal>
      <Reveal><TargetLulusan data={targetData} /></Reveal>
      <CTASection data={ctaData} />
    </FrontendLayout>
  );
}
