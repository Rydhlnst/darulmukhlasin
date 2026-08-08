import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, UsersIcon, MicIcon, BookOpenIcon, HandHeartIcon, GlobeIcon, HandIcon, SparklesIcon, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { HeartIcon, UsersIcon, MicIcon, BookOpenIcon, HandHeartIcon, GlobeIcon, HandIcon, SparklesIcon };

interface PembinaanProps {
  data?: Record<string, string>;
}

export function Pembinaan({ data }: PembinaanProps) {
  const badge = data?.badge ?? "Program Pembinaan";
  const title = data?.title ?? "Pembinaan Santri";
  const description = data?.description ?? "Program pembinaan holistik yang mengembangkan aspek spiritual, intelektual, dan sosial santri.";

  let items: { icon: string; title: string; description: string }[] = [];
  if (data?.items) {
    try { items = JSON.parse(data.items); } catch { /* ignore */ }
  }
  if (items.length === 0) {
    items = [
      { icon: "HeartIcon", title: "Shalat Berjamaah", description: "Lima waktu shalat berjamaah di masjid sebagai rutinitas wajib." },
      { icon: "SparklesIcon", title: "Qiyamul Lail", description: "Shalat malam dan pembinaan ibadah untuk ketakwaan santri." },
      { icon: "MicIcon", title: "Muhadharah", description: "Latihan pidato dan presentasi untuk keterampilan komunikasi." },
      { icon: "BookOpenIcon", title: "Kajian Kitab", description: "Pembacaan dan pengkajian kitab-kitab turats secara rutin." },
      { icon: "HandHeartIcon", title: "Pembiasaan Adab", description: "Pembinaan adab dan akhlak Islami dalam kehidupan sehari-hari." },
      { icon: "GlobeIcon", title: "Kegiatan Kebahasaan", description: "Pembinaan kemampuan bahasa Arab dan Inggris." },
      { icon: "UsersIcon", title: "Bakti Sosial", description: "Kegiatan pengabdian masyarakat dan kepedulian sosial." },
      { icon: "HandIcon", title: "Ekstrakurikuler", description: "Kegiatan sesuai minat dan bakat santri." },
    ];
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-[#1a5c2a] text-white">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? HeartIcon;
            return (
              <Card key={item.title} className="group border-[#d5ecd5] bg-[#eef7ee] shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a5c2a] text-white transition-colors group-hover:bg-[#b45309]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
