import { db } from "@/db";
import {
  posts,
  media,
  categories,
  siteSettings,
  contactSubmissions,
  pageContent,
  heroSlides,
  socialLinks,
} from "@/db/schema";
import { eq, desc, count, and, asc } from "drizzle-orm";
import { slugify } from "./utils";
import { deleteR2Object } from "./r2";

// ==================== POSTS ====================

export async function getAllPosts() {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImageUrl: posts.featuredImageUrl,
      categoryName: categories.name,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.createdAt));
}

export async function getPostById(id: number) {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  return result[0];
}

export async function getRecentPosts(limit: number = 5) {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      status: posts.status,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImageUrl?: string;
  categoryId?: number;
  status: "draft" | "published";
}

export async function createPost(data: CreatePostInput) {
  const slug = data.slug || slugify(data.title);
  const publishedAt =
    data.status === "published" ? new Date() : null;

  const result = await db
    .insert(posts)
    .values({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImageUrl: data.featuredImageUrl,
      categoryId: data.categoryId,
      status: data.status,
      publishedAt,
    })
    .returning();

  return result[0];
}

export interface UpdatePostInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImageUrl?: string | null;
  categoryId?: number | null;
  status?: "draft" | "published";
}

export async function updatePost(id: number, data: UpdatePostInput) {
  const updateData: Record<string, unknown> = {
    ...data,
    updatedAt: new Date(),
  };

  if (data.status === "published") {
    const existing = await getPostById(id);
    if (!existing?.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  const result = await db
    .update(posts)
    .set(updateData)
    .where(eq(posts.id, id))
    .returning();

  return result[0];
}

export async function deletePost(id: number) {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  const post = result[0];

  await db.delete(posts).where(eq(posts.id, id));

  if (post?.featuredImageUrl) {
    try {
      await deleteR2Object(post.featuredImageUrl);
    } catch {
      // R2 object may not exist or already deleted — continue silently
    }
  }
}

// ==================== CATEGORIES ====================

export async function getAllCategories() {
  return await db.select().from(categories).orderBy(categories.name);
}

// ==================== PUBLIC POSTS (frontend) ====================

export async function getPublishedPosts(categorySlug?: string) {
  const conditions = [eq(posts.status, "published")];
  if (categorySlug) {
    conditions.push(eq(categories.slug, categorySlug));
  }

  return await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImageUrl: posts.featuredImageUrl,
      categoryName: categories.name,
      categorySlug: categories.slug,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));
}

export async function getPublishedPostBySlug(slug: string) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      categoryName: categories.name,
      categorySlug: categories.slug,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  return result[0];
}

// Categories that actually have at least one published post — used for filter tabs
export async function getPublishedPostCategories() {
  const rows = await db
    .select({
      name: categories.name,
      slug: categories.slug,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, "published"))
    .orderBy(categories.name);

  const seen = new Set<string>();
  const unique: { name: string; slug: string }[] = [];
  for (const row of rows) {
    if (!seen.has(row.slug)) {
      seen.add(row.slug);
      unique.push(row);
    }
  }
  return unique;
}

// ==================== MEDIA ====================

export async function getAllMedia() {
  return await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt));
}

export async function getMediaBySection(section: string) {
  return await db
    .select()
    .from(media)
    .where(eq(media.section, section))
    .orderBy(desc(media.createdAt));
}

export interface CreateMediaInput {
  alt?: string;
  caption?: string;
  category?: string;
  section?: string;
  imageUrl: string;
}

export async function createMedia(data: CreateMediaInput) {
  const result = await db
    .insert(media)
    .values({
      alt: data.alt,
      caption: data.caption,
      category: data.category,
      section: data.section ?? "gallery",
      imageUrl: data.imageUrl,
    })
    .returning();

  return result[0];
}

export async function deleteMedia(id: number) {
  const result = await db
    .select()
    .from(media)
    .where(eq(media.id, id))
    .limit(1);
  const item = result[0];

  await db.delete(media).where(eq(media.id, id));

  if (item?.imageUrl) {
    try {
      await deleteR2Object(item.imageUrl);
    } catch {
      // R2 object may not exist or already deleted — continue silently
    }
  }
}

// ==================== SETTINGS ====================

export async function getSettings() {
  const result = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1);
  return result[0];
}

export interface UpdateSettingsInput {
  siteName?: string;
  siteDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  donationInfo?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  mapsEmbedUrl?: string;
  mapsLink?: string;
  operationalHours?: string;
}

export async function upsertSettings(data: UpdateSettingsInput) {
  const existing = await getSettings();

  if (existing) {
    const result = await db
      .update(siteSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(siteSettings.id, 1))
      .returning();
    return result[0];
  }

  const result = await db
    .insert(siteSettings)
    .values({ id: 1, ...data })
    .returning();
  return result[0];
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  const [postCount] = await db
    .select({ value: count() })
    .from(posts);

  const [mediaCount] = await db
    .select({ value: count() })
    .from(media);

  const [newMessages] = await db
    .select({ value: count() })
    .from(contactSubmissions)
    .where(eq(contactSubmissions.status, "new"));

  return {
    totalPosts: postCount?.value ?? 0,
    totalMedia: mediaCount?.value ?? 0,
    newMessages: newMessages?.value ?? 0,
  };
}

// ==================== PAGE CONTENT ====================

export async function getPageContent(page: string, section?: string) {
  const query = section
    ? db
        .select()
        .from(pageContent)
        .where(
          and(eq(pageContent.page, page), eq(pageContent.section, section))
        )
    : db.select().from(pageContent).where(eq(pageContent.page, page));

  return await query.orderBy(asc(pageContent.id));
}

export async function getPageContentAsObject(
  page: string,
  section: string
): Promise<Record<string, string>> {
  const rows = await getPageContent(page, section);
  const result: Record<string, string> = {};
  for (const row of rows) {
    if (row.value !== null) {
      result[row.key] = row.value;
    }
  }
  return result;
}

export interface ContentItem {
  key: string;
  value: string;
  type?: "text" | "json" | "image";
}

export async function upsertPageContent(
  page: string,
  section: string,
  items: ContentItem[]
) {
  for (const item of items) {
    const existing = await db
      .select()
      .from(pageContent)
      .where(
        and(
          eq(pageContent.page, page),
          eq(pageContent.section, section),
          eq(pageContent.key, item.key)
        )
      )
      .limit(1);

    const type = item.type ?? "text";

    if (existing.length > 0) {
      await db
        .update(pageContent)
        .set({ value: item.value, type, updatedAt: new Date() })
        .where(eq(pageContent.id, existing[0].id));
    } else {
      await db.insert(pageContent).values({
        page,
        section,
        key: item.key,
        value: item.value,
        type,
      });
    }
  }
}

// ==================== HERO SLIDES ====================

export async function getHeroSlides(activeOnly = false) {
  const query = activeOnly
    ? db
        .select()
        .from(heroSlides)
        .where(eq(heroSlides.active, true))
        .orderBy(asc(heroSlides.order))
    : db.select().from(heroSlides).orderBy(asc(heroSlides.order));
  return await query;
}

export interface CreateHeroSlideInput {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  link?: string;
  order?: number;
  active?: boolean;
}

export async function createHeroSlide(data: CreateHeroSlideInput) {
  const result = await db.insert(heroSlides).values(data).returning();
  return result[0];
}

export interface UpdateHeroSlideInput {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  order?: number;
  active?: boolean;
}

export async function updateHeroSlide(id: number, data: UpdateHeroSlideInput) {
  const result = await db
    .update(heroSlides)
    .set(data)
    .where(eq(heroSlides.id, id))
    .returning();
  return result[0];
}

export async function deleteHeroSlide(id: number) {
  const result = await db
    .select()
    .from(heroSlides)
    .where(eq(heroSlides.id, id))
    .limit(1);
  const slide = result[0];

  await db.delete(heroSlides).where(eq(heroSlides.id, id));

  if (slide?.imageUrl) {
    try {
      await deleteR2Object(slide.imageUrl);
    } catch {
      // R2 object may not exist or already deleted — continue silently
    }
  }
}

// ==================== SOCIAL LINKS ====================

export async function getSocialLinks() {
  return await db.select().from(socialLinks).orderBy(asc(socialLinks.order));
}

export interface SocialLinkInput {
  platform: string;
  url: string;
  icon?: string;
  order?: number;
}

export async function upsertSocialLinks(items: SocialLinkInput[]) {
  await db.delete(socialLinks);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await db.insert(socialLinks).values({
      platform: item.platform,
      url: item.url,
      icon: item.icon ?? null,
      order: item.order ?? i,
    });
  }
}

// ==================== CONTACT SUBMISSIONS ====================

export async function getContactSubmissions(status?: string) {
  const query = status
    ? db
        .select()
        .from(contactSubmissions)
        .where(eq(contactSubmissions.status, status as "new" | "in_progress" | "resolved"))
    : db.select().from(contactSubmissions);
  return await query.orderBy(desc(contactSubmissions.createdAt));
}

export async function getContactSubmissionById(id: number) {
  const result = await db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);
  return result[0];
}

export async function updateContactSubmissionStatus(
  id: number,
  status: "new" | "in_progress" | "resolved"
) {
  const result = await db
    .update(contactSubmissions)
    .set({ status })
    .where(eq(contactSubmissions.id, id))
    .returning();
  return result[0];
}

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const result = await db.insert(contactSubmissions).values(data).returning();
  return result[0];
}
