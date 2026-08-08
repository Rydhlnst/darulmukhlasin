import type { Metadata } from "next";
import { FrontendLayout } from "@/components/sections/FrontendLayout";
import { VisiMisi } from "@/components/sections/VisiMisi";
import { createMetadata, createJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Visi & Misi",
  description:
    "Visi dan Misi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
  path: "/visi-misi",
});

export default function VisiMisiPage() {
  const jsonLd = createJsonLd("Page", {
    name: "Visi & Misi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
    description:
      "Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
  });

  return (
    <FrontendLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <VisiMisi />
      </div>
    </FrontendLayout>
  );
}
