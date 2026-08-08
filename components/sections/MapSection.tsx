import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  MessageCircleIcon,
  NavigationIcon,
  UsersIcon,
} from "lucide-react";
import type { SiteSetting } from "@/db/schema";

const adminContacts = [
  { name: "Ustadz Samsul Arifin", phone: "6281282810161", display: "0812-8281-0161" },
  { name: "Ustadzah Khafiyya Ramadhani", phone: "6282283198275", display: "0822-8319-8275" },
];

interface MapSectionProps {
  settings?: SiteSetting | null;
}

export function MapSection({ settings }: MapSectionProps) {
  const address = settings?.address ?? "Kobel Darat, Desa Sawang Laut, Kec. Kundur Barat, Kab. Karimun, Kepulauan Riau";
  const phone = settings?.whatsapp ?? "6287825279426";
  const email = settings?.email ?? "Email Pondok";
  const operationalHours = settings?.operationalHours ?? "Senin - Jumat: 07.00 - 16.00 WIB";
  const mapsEmbedUrl = settings?.mapsEmbedUrl ?? "https://maps.google.com/maps?q=Pondok%20Pesantren%20Darul%20Mukhlasin%20Kuba%20Kundur%20Barat%20Karimun&t=&z=14&ie=UTF8&iwloc=&output=embed";
  const mapsLink = settings?.mapsLink ?? "https://maps.app.goo.gl/LKRpJoxJxtTWNLTY7";

  return (
    <section className="bg-[#fef3c7] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-[#1a5c2a] text-white">Lokasi Kami</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Temukan Kami</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Kunjungi Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA di Karimun, Kepulauan Riau.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="border-[#d97706] bg-white shadow-sm lg:col-span-2">
            <CardHeader><CardTitle className="text-lg">Informasi Kontak</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a5c2a] text-white"><MapPinIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Alamat</h4>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a5c2a] text-white"><PhoneIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Telepon</h4>
                  <p className="text-sm text-muted-foreground">Hubungi via WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a5c2a] text-white"><MailIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Email</h4>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a5c2a] text-white"><ClockIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Jam Operasional</h4>
                  <p className="text-sm text-muted-foreground">{operationalHours}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button className="gap-2" render={<Link href={`https://wa.me/${phone}`} target="_blank" />}>
                  <MessageCircleIcon className="h-4 w-4" />Chat WhatsApp
                </Button>
                <Button variant="outline" className="gap-2" render={<Link href={mapsLink} target="_blank" />}>
                  <NavigationIcon className="h-4 w-4" />Lihat di Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-[#d97706] p-0 shadow-sm lg:col-span-3">
            <div className="aspect-square w-full lg:aspect-auto lg:min-h-[500px]">
              <iframe src={mapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA" />
            </div>
          </Card>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {adminContacts.map((c) => (
            <Card key={c.phone} className="border-[#d97706] bg-white shadow-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a5c2a] text-white">
                  <UsersIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.display}</p>
                </div>
                <Button size="sm" className="gap-1 shrink-0" render={<Link href={`https://wa.me/${c.phone}`} target="_blank" />}>
                  <MessageCircleIcon className="h-3 w-3" />WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
