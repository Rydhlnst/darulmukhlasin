import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HeartIcon,
  UsersIcon,
  MicIcon,
  BookOpenIcon,
  HandHeartIcon,
  GlobeIcon,
  HandIcon,
  SparklesIcon,
} from "lucide-react";

const pembinaanItems = [
  {
    icon: HeartIcon,
    title: "Shalat Berjamaah",
    description: "Lima waktu shalat berjamaah di masjid sebagai rutinitas wajib.",
  },
  {
    icon: SparklesIcon,
    title: "Qiyamul Lail",
    description: "Shalat malam dan pembinaan ibadah untuk ketakwaan santri.",
  },
  {
    icon: MicIcon,
    title: "Muhadharah",
    description: "Latihan pidato dan presentasi untuk keterampilan komunikasi.",
  },
  {
    icon: BookOpenIcon,
    title: "Kajian Kitab",
    description: "Pembacaan dan pengkajian kitab-kitab turats secara rutin.",
  },
  {
    icon: HandHeartIcon,
    title: "Pembiasaan Adab",
    description: "Pembinaan adab dan akhlak Islami dalam kehidupan sehari-hari.",
  },
  {
    icon: GlobeIcon,
    title: "Kegiatan Kebahasaan",
    description: "Pembinaan kemampuan bahasa Arab dan Inggris.",
  },
  {
    icon: UsersIcon,
    title: "Bakti Sosial",
    description: "Kegiatan pengabdian masyarakat dan kepedulian sosial.",
  },
  {
    icon: HandIcon,
    title: "Ekstrakurikuler",
    description: "Kegiatan sesuai minat dan bakat santri.",
  },
];

export function Pembinaan() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Program Pembinaan
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pembinaan Santri
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Program pembinaan holistik yang mengembangkan aspek spiritual,
            intelektual, dan sosial santri.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pembinaanItems.map((item) => (
            <Card key={item.title} className="group hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
