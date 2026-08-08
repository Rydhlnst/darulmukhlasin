import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, CalendarIcon, BookOpenIcon } from "lucide-react";

interface ProfilProps {
  data?: Record<string, string>;
}

export function Profil({ data }: ProfilProps) {
  const badge = data?.badge ?? "Tentang Kami";
  const title = data?.title ?? "Profil Pesantren";
  const description = data?.description ?? "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA merupakan lembaga pendidikan Islam yang berkomitmen membina generasi muslim yang berakhlak mulia.";
  const body1 = data?.body1 ?? "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA merupakan lembaga pendidikan Islam yang berdiri pada tahun 2014 di Kobel Darat, Desa Sawang Laut, Kecamatan Kundur Barat, Kabupaten Karimun, Provinsi Kepulauan Riau.";
  const body2 = data?.body2 ?? "Sejak awal berdiri, pesantren berkomitmen untuk membina generasi muslim yang berakhlak mulia, berpegang teguh pada Al-Qur'an dan As-Sunnah, serta memiliki pemahaman agama yang lurus sesuai manhaj Ahlus Sunnah wal Jama'ah.";
  const location = data?.location ?? "Karimun, Kepulauan Riau";
  const foundedYear = data?.foundedYear ?? "Sejak 2014";

  let programs: { title: string; description: string }[] = [];
  if (data?.programs) {
    try { programs = JSON.parse(data.programs); } catch { /* ignore */ }
  }
  if (programs.length === 0) {
    programs = [
      { title: "Program Tahfidzul Qur'an", description: "Metode Wafa - membaca, menghafal, memahami, dan mengamalkan Al-Qur'an secara menyenangkan dan sistematis." },
      { title: "Satuan Pendidikan Muadalah", description: "Pendidikan formal jenjang Wustha dan Ulya di bawah Kementerian Agama RI." },
      { title: "Dirasah Islamiyah", description: "Pengkajian kitab-kitab turats berdasarkan manhaj Ahlus Sunnah wal Jama'ah." },
    ];
  }

  return (
    <section id="profil" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-[#1a5c2a] text-white">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-[#d97706] bg-[#fef3c7]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-[#1a5c2a]" />Tentang Pesantren
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{body1}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{body2}</p>
              <Separator />
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 text-primary" /><span>{location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" /><span>{foundedYear}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#d97706] bg-[#fef3c7]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-[#1a5c2a]" />Program Utama
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {programs.map((program) => (
                  <div key={program.title} className="rounded-md bg-[#fef3c7] p-3">
                    <h4 className="mb-1 text-sm font-semibold text-foreground">{program.title}</h4>
                    <p className="text-xs text-muted-foreground">{program.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
