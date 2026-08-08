import { db } from "@/db";
import { posts, media, categories, siteSettings, contactSubmissions } from "@/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { slugify } from "./utils";

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
  await db.delete(posts).where(eq(posts.id, id));
}

// ==================== CATEGORIES ====================

export async function getAllCategories() {
  return await db.select().from(categories).orderBy(categories.name);
}

// ==================== MEDIA ====================

export async function getAllMedia() {
  return await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt));
}

export interface CreateMediaInput {
  alt?: string;
  caption?: string;
  category?: string;
  imageUrl: string;
}

export async function createMedia(data: CreateMediaInput) {
  const result = await db
    .insert(media)
    .values({
      alt: data.alt,
      caption: data.caption,
      category: data.category,
      imageUrl: data.imageUrl,
    })
    .returning();

  return result[0];
}

export async function deleteMedia(id: number) {
  await db.delete(media).where(eq(media.id, id));
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
