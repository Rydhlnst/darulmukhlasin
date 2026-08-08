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
import { toast } from "sonner";
import {
  SaveIcon,
  LoaderIcon,
  PlusIcon,
  Trash2Icon,
  GripIcon,
} from "lucide-react";
import type { SocialLink } from "@/db/schema";

export function SocialLinksForm() {
  const [links, setLinks] = React.useState<
    { platform: string; url: string; icon: string; order: number }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/social");
        if (!res.ok) throw new Error("Gagal memuat");
        const data: SocialLink[] = await res.json();
        if (data.length > 0) {
          setLinks(
            data.map((d) => ({
              platform: d.platform,
              url: d.url,
              icon: d.icon ?? "",
              order: d.order,
            }))
          );
        } else {
          setLinks([
            { platform: "Facebook", url: "#", icon: "FacebookIcon", order: 0 },
          ]);
        }
      } catch {
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function addLink() {
    setLinks((prev) => [
      ...prev,
      { platform: "", url: "#", icon: "", order: prev.length },
    ]);
  }

  function removeLink(index: number) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLink(index: number, field: string, value: string) {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(links.filter((l) => l.platform && l.url)),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      toast.success("Social links berhasil disimpan");
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {links.map((link, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 rounded-md border border-border p-3 sm:grid-cols-[1fr_2fr_1fr_auto]"
            >
              <div className="space-y-1">
                <Label className="text-xs">Platform</Label>
                <Input
                  value={link.platform}
                  onChange={(e) => updateLink(index, "platform", e.target.value)}
                  placeholder="mis: Facebook"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Icon (Lucide)</Label>
                <Input
                  value={link.icon}
                  onChange={(e) => updateLink(index, "icon", e.target.value)}
                  placeholder="mis: FacebookIcon"
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLink}
            className="gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Social Media
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="h-4 w-4" />
          )}
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}
