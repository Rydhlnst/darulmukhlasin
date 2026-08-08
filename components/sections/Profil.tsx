import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, CalendarIcon, BookOpenIcon } from "lucide-react";

export function Profil() {
  return (
    <section id="profil" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Tentang Kami
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Profil Pesantren
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA merupakan
            lembaga pendidikan Islam yang berkomitmen membina generasi muslim
            yang berakhlak mulia.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-primary" />
                Tentang Pesantren
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA merupakan
                lembaga pendidikan Islam yang berdiri pada tahun 2014 di Kobel
                Darat, Desa Sawang Laut, Kecamatan Kundur Barat, Kabupaten
                Karimun, Provinsi Kepulauan Riau.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sejak awal berdiri, pesantren berkomitmen untuk membina generasi
                muslim yang berakhlak mulia, berpegang teguh pada Al-Qur&apos;an dan
                As-Sunnah, serta memiliki pemahaman agama yang lurus sesuai
                manhaj Ahlus Sunnah wal Jama&apos;ah.
              </p>
              <Separator />
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <span>Karimun, Kepulauan Riau</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>Sejak 2014</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-primary" />
                Program Utama
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    Program Tahfidzul Qur&apos;an
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Metode Wafa - membaca, menghafal, memahami, dan mengamalkan
                    Al-Qur&apos;an secara menyenangkan dan sistematis.
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    Satuan Pendidikan Muadalah
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Pendidikan formal jenjang Wustha dan Ulya di bawah
                    Kementerian Agama RI.
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    Dirasah Islamiyah
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Pengkajian kitab-kitab turats berdasarkan manhaj Ahlus
                    Sunnah wal Jama&apos;ah.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
