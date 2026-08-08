import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon, GraduationCapIcon, BookIcon, PencilIcon } from "lucide-react";

const kurikulumItems = [
  {
    number: "01",
    icon: BookOpenIcon,
    title: "Tahfidzul Qur'an",
    description:
      "Program unggulan pesantren dengan Metode Wafa, meliputi Tahsin Al-Qur'an, Tahfidz Al-Qur'an, Muraja'ah harian, Munaqasyah hafalan, dengan target hafalan hingga 30 juz sesuai kemampuan santri.",
  },
  {
    number: "02",
    icon: GraduationCapIcon,
    title: "Pendidikan Muadalah",
    description:
      "Pembelajaran sesuai kurikulum Satuan Pendidikan Muadalah jenjang Wustha dan Ulya yang memadukan ilmu agama dan ilmu pengetahuan umum.",
  },
  {
    number: "03",
    icon: BookIcon,
    title: "Dirasah Islamiyah",
    description:
      "Pengkajian kitab-kitab turats (kitab kuning) berdasarkan manhaj Ahlus Sunnah wal Jama'ah berakidah Asy'ariyyah dan bermadzhab Syafi'iyyah.",
  },
  {
    number: "04",
    icon: PencilIcon,
    title: "Mata Pelajaran Umum",
    description:
      "Bahasa Indonesia, Matematika, IPA, IPS, PPKn, Bahasa Inggris, Teknologi Informasi, dan mata pelajaran umum lainnya sesuai jenjang pendidikan.",
  },
];

const dirasahItems = [
  "Al-Qur'an dan Tafsir",
  "Hadis",
  "Aqidah",
  "Fikih",
  "Ushul Fikih",
  "Akhlak dan Tasawuf",
  "Nahwu",
  "Sharaf",
  "Balaghah",
  "Mantiq",
  "Tarikh Islam",
];

export function Kurikulum() {
  return (
    <section id="kurikulum" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Kurikulum Terpadu
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Berbasis Al-Qur&apos;an dan Kepesantrenan
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Kurikulum disusun untuk membentuk santri yang memiliki akidah yang
            lurus, akhlak mulia, penguasaan ilmu syar&apos;i, kemampuan akademik,
            serta kecakapan hidup yang bermanfaat bagi masyarakat.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kurikulumItems.map((item) => (
            <Card key={item.number} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2 text-3xl font-bold text-primary/20">
                  {item.number}
                </div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Mata Pelajaran Dirasah Islamiyah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {dirasahItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
