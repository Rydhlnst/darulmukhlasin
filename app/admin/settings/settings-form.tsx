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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SaveIcon, LoaderIcon } from "lucide-react";
import type { SiteSetting } from "@/db/schema";

interface SettingsFormProps {
  initialSettings?: SiteSetting;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [form, setForm] = React.useState({
    siteName: initialSettings?.siteName ?? "",
    siteDescription: initialSettings?.siteDescription ?? "",
    phone: initialSettings?.phone ?? "",
    email: initialSettings?.email ?? "",
    address: initialSettings?.address ?? "",
    whatsapp: initialSettings?.whatsapp ?? "",
    donationInfo: initialSettings?.donationInfo ?? "",
    bankName: initialSettings?.bankName ?? "",
    bankAccountNumber: initialSettings?.bankAccountNumber ?? "",
    bankAccountName: initialSettings?.bankAccountName ?? "",
    mapsEmbedUrl: initialSettings?.mapsEmbedUrl ?? "",
    mapsLink: initialSettings?.mapsLink ?? "",
    operationalHours: initialSettings?.operationalHours ?? "",
  });
  const [saving, setSaving] = React.useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Pengaturan berhasil disimpan");
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Situs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="siteName">Nama Situs</Label>
            <Input
              id="siteName"
              value={form.siteName}
              onChange={(e) => updateField("siteName", e.target.value)}
              placeholder="Pondok Pesantren..."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="siteDescription">Deskripsi Situs</Label>
            <Textarea
              id="siteDescription"
              value={form.siteDescription}
              onChange={(e) => updateField("siteDescription", e.target.value)}
              placeholder="Deskripsi singkat tentang pesantren"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="08xx-xxxx-xxxx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={form.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
              placeholder="628xx-xxxx-xxxx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="email@domain.com"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Alamat lengkap"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Lokasi & Operasional</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="mapsEmbedUrl">Google Maps Embed URL</Label>
            <Textarea
              id="mapsEmbedUrl"
              value={form.mapsEmbedUrl}
              onChange={(e) => updateField("mapsEmbedUrl", e.target.value)}
              placeholder="https://maps.google.com/maps?q=...&output=embed"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              URL iframe Google Maps untuk peta di halaman kontak.
            </p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="mapsLink">Google Maps Link</Label>
            <Input
              id="mapsLink"
              value={form.mapsLink}
              onChange={(e) => updateField("mapsLink", e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operationalHours">Jam Operasional</Label>
            <Input
              id="operationalHours"
              value={form.operationalHours}
              onChange={(e) => updateField("operationalHours", e.target.value)}
              placeholder="mis: Senin - Jumat: 07.00 - 16.00 WIB"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Donasi</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="donationInfo">Keterangan Donasi</Label>
            <Textarea
              id="donationInfo"
              value={form.donationInfo}
              onChange={(e) => updateField("donationInfo", e.target.value)}
              placeholder="Informasi tentang cara berdonasi"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Nama Bank</Label>
            <Input
              id="bankName"
              value={form.bankName}
              onChange={(e) => updateField("bankName", e.target.value)}
              placeholder="mis: Bank BCA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankAccountNumber">Nomor Rekening</Label>
            <Input
              id="bankAccountNumber"
              value={form.bankAccountNumber}
              onChange={(e) => updateField("bankAccountNumber", e.target.value)}
              placeholder="0000-0000-0000"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bankAccountName">Atas Nama</Label>
            <Input
              id="bankAccountName"
              value={form.bankAccountName}
              onChange={(e) => updateField("bankAccountName", e.target.value)}
              placeholder="Nama pemilik rekening"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="h-4 w-4" />
          )}
          Simpan Pengaturan
        </Button>
      </div>
    </form>
  );
}
