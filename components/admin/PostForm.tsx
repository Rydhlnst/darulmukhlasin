"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "./ImageUpload";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";
import { SaveIcon, SendIcon, LoaderIcon } from "lucide-react";
import type { Category } from "@/db/schema";

interface PostFormProps {
  post?: {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featuredImageUrl: string | null;
    categoryId: number | null;
    status: "draft" | "published";
  };
  categories: Category[];
}

export function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState(post?.title ?? "");
  const [slug, setSlug] = React.useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = React.useState(!!post);
  const [excerpt, setExcerpt] = React.useState(post?.excerpt ?? "");
  const [content, setContent] = React.useState(post?.content ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = React.useState(
    post?.featuredImageUrl ?? ""
  );
  const [categoryId, setCategoryId] = React.useState<string>(
    post?.categoryId?.toString() ?? ""
  );
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!slugEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  async function handleSubmit(status: "draft" | "published") {
    if (!title.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const url = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const method = post ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || slugify(title),
          excerpt,
          content,
          featuredImageUrl: featuredImageUrl || null,
          categoryId: categoryId ? parseInt(categoryId) : null,
          status,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan");
      }

      toast.success(
        status === "published" ? "Artikel dipublikasikan" : "Disimpan sebagai draft"
      );
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Terjadi kesalahan"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Konten Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug URL</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugEdited(true);
                }}
                placeholder="slug-otomatis"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan singkat artikel"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Isi Artikel</Label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-ring"
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gambar Unggulan</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={featuredImageUrl}
              onChange={setFeaturedImageUrl}
              label="Unggah Gambar Unggulan"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <Button
              onClick={() => handleSubmit("published")}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
              {post?.status === "published" ? "Update" : "Publikasikan"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={saving}
              className="gap-2"
            >
              <SaveIcon className="h-4 w-4" />
              Simpan Draft
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
