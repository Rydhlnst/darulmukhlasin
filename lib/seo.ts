import type { Metadata } from "next";

const SITE_URL = "https://darulmukhlasin.ponpes.id";
const SITE_NAME = "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA";
const SITE_DESCRIPTION =
  "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal. Berdiri sejak 2014 di Karimun, Kepulauan Riau.";

export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const desc = description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${path || ""}`;
  const ogImage = image || `${SITE_URL}/logo/logo.jpg`;

  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

export function createJsonLd(type: string, data: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logo.jpg`,
  foundingDate: "2014",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kobel Darat, Desa Sawang Laut, Kec. Kundur Barat",
    addressLocality: "Karimun",
    addressRegion: "Kepulauan Riau",
    addressCountry: "ID",
  },
  founder: {
    "@type": "Person",
    name: "KH. Samsul Arifin, S.Pd.",
  },
};

export {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
};
