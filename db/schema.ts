import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);
export const faqStatusEnum = pgEnum("faq_status", ["draft", "published"]);
export const submissionStatusEnum = pgEnum("submission_status", [
  "new",
  "in_progress",
  "resolved",
]);
export const contentTypeEnum = pgEnum("content_type", ["text", "json", "image"]);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImageUrl: text("featured_image_url"),
  categoryId: integer("category_id").references(() => categories.id),
  status: postStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  alt: text("alt"),
  caption: text("caption"),
  category: text("category"),
  section: text("section").default("gallery"),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name"),
  siteDescription: text("site_description"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  whatsapp: text("whatsapp"),
  donationInfo: text("donation_info"),
  bankName: text("bank_name"),
  bankAccountNumber: text("bank_account_number"),
  bankAccountName: text("bank_account_name"),
  mapsEmbedUrl: text("maps_embed_url"),
  mapsLink: text("maps_link"),
  operationalHours: text("operational_hours"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
  status: faqStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  content: text("content").notNull(),
  photoUrl: text("photo_url"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: submissionStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pageContent = pgTable(
  "page_content",
  {
    id: serial("id").primaryKey(),
    page: varchar("page", { length: 100 }).notNull(),
    section: varchar("section", { length: 100 }).notNull(),
    key: varchar("key", { length: 255 }).notNull(),
    value: text("value"),
    type: contentTypeEnum("type").notNull().default("text"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("page_content_page_section_key_idx").on(
      table.page,
      table.section,
      table.key
    ),
  ]
);

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  subtitle: text("subtitle"),
  link: text("link"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 100 }).notNull(),
  url: text("url").notNull(),
  icon: varchar("icon", { length: 100 }),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Media = typeof media.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type PageContent = typeof pageContent.$inferSelect;
export type HeroSlide = typeof heroSlides.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;

export type NewPost = typeof posts.$inferInsert;
export type NewMedia = typeof media.$inferInsert;
export type NewCategory = typeof categories.$inferInsert;
export type NewPageContent = typeof pageContent.$inferInsert;
export type NewHeroSlide = typeof heroSlides.$inferInsert;
export type NewSocialLink = typeof socialLinks.$inferInsert;
