"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Trash2Icon,
  LoaderIcon,
  UploadIcon,
  ZoomInIcon,
} from "lucide-react";
import type { Media } from "@/db/schema";

interface GalleryManagerProps {
  initialMedia: Media[];
}

export function GalleryManager({ initialMedia }: GalleryManagerProps) {
  const router = useRouter();
  const [media, setMedia] = React.useState(initialMedia);
  const [imageUrl, setImageUrl] = React.useState("");
  const [alt, setAlt] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [section, setSection] = React.useState("gallery");
  const [uploading, setUploading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  async function handleSave() {
    if (!imageUrl) {
      toast.error("Unggah gambar terlebih dahulu");
      return;
    }

    setUploading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt, caption, category, section, imageUrl }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Media berhasil disimpan");
      const newMedia = await res.json();
      setMedia((prev) => [newMedia, ...prev]);
      setImageUrl("");
      setAlt("");
      setCaption("");
      setCategory("");
      setSection("gallery");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Gagal menghapus");

      toast.success("Media dihapus");
      setMedia((prev) => prev.filter((m) => m.id !== id));
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Unggah Media Baru
          </CardTitle>
          <CardDescription>
            Unggah gambar untuk digunakan di galeri dan artikel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            label="Unggah Foto"
          />
          {imageUrl && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Deskripsi singkat gambar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="mis: kegiatan, fasilitas"
                />
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Select value={section} onValueChange={setSection}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="profile">Profil</SelectItem>
                    <SelectItem value="berita">Berita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption gambar"
                  rows={2}
                />
              </div>
              <div className="sm:col-span-2">
                <Button onClick={handleSave} disabled={uploading} className="gap-2">
                  {uploading ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <UploadIcon className="h-4 w-4" />
                  )}
                  Simpan Media
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Media Tersimpan ({media.length})
        </h2>
        {media.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Belum ada media
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="group relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt ?? "Media"}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant="secondary"
                            size="icon-sm"
                            className="bg-white/90"
                          />
                        }
                      >
                        <ZoomInIcon className="h-4 w-4" />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-2">
                        <DialogTitle className="sr-only">
                          {item.alt ?? "Media"}
                        </DialogTitle>
                        <div className="relative aspect-video w-full">
                          <Image
                            src={item.imageUrl}
                            alt={item.alt ?? "Media"}
                            fill
                            sizes="80vw"
                            className="object-contain"
                            priority
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      className="bg-white/90"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? (
                        <LoaderIcon className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </div>
                {item.alt && (
                  <CardContent className="py-2">
                    <p className="truncate text-xs text-muted-foreground">
                      {item.alt}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
