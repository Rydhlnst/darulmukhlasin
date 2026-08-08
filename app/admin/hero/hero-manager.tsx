"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import {
  LoaderIcon,
  PlusIcon,
  Trash2Icon,
  SaveIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import type { HeroSlide } from "@/db/schema";

export function HeroManager() {
  const [slides, setSlides] = React.useState<HeroSlide[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const [newSlide, setNewSlide] = React.useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    link: "",
  });

  React.useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {
    try {
      const res = await fetch("/api/admin/hero");
      if (!res.ok) throw new Error("Gagal memuat");
      const data = await res.json();
      setSlides(data);
    } catch {
      toast.error("Gagal memuat hero slides");
    } finally {
      setLoading(false);
    }
  }

  async function addSlide() {
    if (!newSlide.imageUrl) {
      toast.error("Gambar wajib diunggah");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSlide,
          order: slides.length,
          active: true,
        }),
      });
      if (!res.ok) throw new Error("Gagal menambah");
      toast.success("Slide berhasil ditambahkan");
      setNewSlide({ imageUrl: "", title: "", subtitle: "", link: "" });
      loadSlides();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setAdding(false);
    }
  }

  async function updateSlide(id: number, data: Partial<HeroSlide>) {
    try {
      const res = await fetch(`/api/admin/hero/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal memperbarui");
      loadSlides();
    } catch {
      toast.error("Gagal memperbarui slide");
    }
  }

  async function deleteSlide(id: number) {
    if (!confirm("Hapus slide ini?")) return;
    try {
      const res = await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Slide dihapus");
      loadSlides();
    } catch {
      toast.error("Gagal menghapus slide");
    }
  }

  async function moveSlide(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const slideA = slides[index];
    const slideB = slides[targetIndex];

    await updateSlide(slideA.id, { order: targetIndex });
    await updateSlide(slideB.id, { order: index });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Slide */}
      <Card>
        <CardHeader>
          <CardTitle>Tambah Slide Baru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload
            value={newSlide.imageUrl}
            onChange={(url) => setNewSlide((prev) => ({ ...prev, imageUrl: url }))}
            label="Unggah Gambar Hero"
            aspect={16 / 9}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-title">Judul</Label>
              <Input
                id="new-title"
                value={newSlide.title}
                onChange={(e) =>
                  setNewSlide((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Judul slide"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subtitle">Subtitle</Label>
              <Input
                id="new-subtitle"
                value={newSlide.subtitle}
                onChange={(e) =>
                  setNewSlide((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                placeholder="Subtitle slide"
              />
            </div>
          </div>
          <Button onClick={addSlide} disabled={adding} className="gap-2">
            {adding ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
            Tambah Slide
          </Button>
        </CardContent>
      </Card>

      {/* Existing Slides */}
      <div className="space-y-3">
        {slides.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              Belum ada slide. Tambahkan slide baru di atas.
            </CardContent>
          </Card>
        ) : (
          slides.map((slide, index) => (
            <Card key={slide.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-md sm:w-48">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title ?? ""}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">#{slide.order + 1}</Badge>
                    {slide.active ? (
                      <Badge>Aktif</Badge>
                    ) : (
                      <Badge variant="secondary">Nonaktif</Badge>
                    )}
                  </div>
                  <Input
                    value={slide.title ?? ""}
                    onChange={(e) => {
                      setSlides((prev) =>
                        prev.map((s) =>
                          s.id === slide.id ? { ...s, title: e.target.value } : s
                        )
                      );
                    }}
                    placeholder="Judul"
                    className="text-sm"
                  />
                  <Input
                    value={slide.subtitle ?? ""}
                    onChange={(e) => {
                      setSlides((prev) =>
                        prev.map((s) =>
                          s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                        )
                      );
                    }}
                    placeholder="Subtitle"
                    className="text-sm"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateSlide(slide.id, {
                          title: slide.title,
                          subtitle: slide.subtitle,
                        })
                      }
                      className="gap-1"
                    >
                      <SaveIcon className="h-3 w-3" />
                      Simpan
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => moveSlide(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => moveSlide(index, "down")}
                      disabled={index === slides.length - 1}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={slide.active}
                        onCheckedChange={(checked) =>
                          updateSlide(slide.id, { active: checked })
                        }
                      />
                      <span className="text-xs text-muted-foreground">
                        {slide.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </div>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => deleteSlide(slide.id)}
                      className="ml-auto text-destructive hover:text-destructive"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
