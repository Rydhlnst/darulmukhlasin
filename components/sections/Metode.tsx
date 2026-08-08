import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenIcon,
  UserIcon,
  UsersIcon,
  MessageCircleIcon,
  HandshakeIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
} from "lucide-react";

const metodeItems = [
  {
    icon: BookOpenIcon,
    name: "Talaqqi",
    description: "Pembelajaran langsung dari guru ke santri secara individu.",
  },
  {
    icon: UserIcon,
    name: "Sorogan",
    description: "Santri maju secara bergantian untuk membaca di hadapan guru.",
  },
  {
    icon: UsersIcon,
    name: "Bandongan",
    description: "Guru menyampaikan materi kepada sekelompok santri sekaligus.",
  },
  {
    icon: MessageCircleIcon,
    name: "Halaqah",
    description: "Diskusi kelompok kecil untuk pendalaman materi.",
  },
  {
    icon: HandshakeIcon,
    name: "Musyawarah",
    description: "Diskusi dan musyawarah untuk pengambilan keputusan bersama.",
  },
  {
    icon: CheckCircleIcon,
    name: "Praktik Ibadah",
    description: "Praktik langsung ibadah sebagai pembelajaran experiential.",
  },
  {
    icon: ClipboardCheckIcon,
    name: "Evaluasi & Munaqasyah",
    description: "Evaluasi berkala dan diskusi ilmiah tentang materi yang dipelajari.",
  },
];

export function Metode() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Metode Pembelajaran
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pendekatan Pendidikan
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Berbagai metode pembelajaran tradisional pesantren yang telah
            terbukti efektif dalam membentuk karakter santri.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metodeItems.map((item) => (
            <Card key={item.name} className="group hover:shadow-md transition-shadow">
              <CardContent className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
