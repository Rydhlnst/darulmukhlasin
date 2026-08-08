import { db } from "@/db";
import { pageContent, heroSlides, socialLinks, media, siteSettings } from "@/db/schema";
import { eq, and, asc, desc } from "drizzle-orm";

export async function getHomepageData() {
  const [
    heroSlidesData,
    statsContent,
    heroContent,
    profilContent,
    visiMisiContent,
    kurikulumContent,
    pembinaanContent,
    sejarahContent,
    metodeContent,
    targetLulusanContent,
    ctaContent,
    galleryMedia,
    settingsData,
    socialLinksData,
  ] = await Promise.all([
    db.select().from(heroSlides).where(eq(heroSlides.active, true)).orderBy(asc(heroSlides.order)),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "stats"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "hero"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "profil"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "visi-misi"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "kurikulum"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "pembinaan"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "sejarah"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "metode"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "target-lulusan"))),
    db.select().from(pageContent).where(and(eq(pageContent.page, "home"), eq(pageContent.section, "cta"))),
    db.select().from(media).where(eq(media.section, "gallery")).orderBy(desc(media.createdAt)),
    db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1),
    db.select().from(socialLinks).orderBy(asc(socialLinks.order)),
  ]);

  function toObj(rows: { key: string; value: string | null }[]) {
    const obj: Record<string, string> = {};
    for (const r of rows) {
      if (r.value !== null) obj[r.key] = r.value;
    }
    return obj;
  }

  function parseJson<T>(val: string | undefined, fallback: T): T {
    if (!val) return fallback;
    try { return JSON.parse(val) as T; } catch { return fallback; }
  }

  return {
    heroSlides: heroSlidesData,
    stats: parseJson(toObj(statsContent).items, []),
    hero: toObj(heroContent),
    profil: toObj(profilContent),
    visiMisi: toObj(visiMisiContent),
    kurikulum: toObj(kurikulumContent),
    pembinaan: toObj(pembinaanContent),
    sejarah: toObj(sejarahContent),
    metode: toObj(metodeContent),
    targetLulusan: toObj(targetLulusanContent),
    cta: toObj(ctaContent),
    gallery: galleryMedia,
    settings: settingsData[0] ?? null,
    socialLinks: socialLinksData,
  };
}

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>;

export async function getSectionData(page: string, section: string) {
  const rows = await db
    .select()
    .from(pageContent)
    .where(and(eq(pageContent.page, page), eq(pageContent.section, section)));
  const obj: Record<string, string> = {};
  for (const r of rows) {
    if (r.value !== null) obj[r.key] = r.value;
  }
  return obj;
}

export async function getLayoutData() {
  const [socialLinksData, settingsData] = await Promise.all([
    db.select().from(socialLinks).orderBy(asc(socialLinks.order)),
    db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1),
  ]);
  return {
    socialLinks: socialLinksData,
    settings: settingsData[0] ?? null,
  };
}

export function parseJsonArray<T>(val: string | undefined, fallback: T[]): T[] {
  if (!val) return fallback;
  try { return JSON.parse(val) as T[]; } catch { return fallback; }
}
