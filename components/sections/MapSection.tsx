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
} from "lucide-react";
import type { SiteSetting } from "@/db/schema";

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
    <section className="bg-primary/5 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">Lokasi Kami</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Temukan Kami</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Kunjungi Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA di Karimun, Kepulauan Riau.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="border-primary/10 bg-primary/[0.03] shadow-sm lg:col-span-2">
            <CardHeader><CardTitle className="text-lg">Informasi Kontak</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><MapPinIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Alamat</h4>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><PhoneIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Telepon</h4>
                  <p className="text-sm text-muted-foreground">Hubungi via WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><MailIcon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Email</h4>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><ClockIcon className="h-5 w-5" /></div>
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
          <Card className="overflow-hidden border-primary/10 p-0 shadow-sm lg:col-span-3">
            <div className="aspect-square w-full lg:aspect-auto lg:min-h-[500px]">
              <iframe src={mapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
