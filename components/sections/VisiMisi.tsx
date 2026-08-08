import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TargetIcon, ListIcon } from "lucide-react";

interface VisiMisiProps {
  data?: Record<string, string>;
}

export function VisiMisi({ data }: VisiMisiProps) {
  const badge = data?.badge ?? "Arah Pendidikan";
  const title = data?.title ?? "Visi & Misi";
  const description = data?.description ?? "Landasan filosofis yang memandu seluruh kegiatan pendidikan di pesantren.";
  const vision = data?.vision ?? "Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.";

  let misiItems: string[] = [];
  if (data?.misi) {
    try { misiItems = JSON.parse(data.misi); } catch { /* ignore */ }
  }
  if (misiItems.length === 0) {
    misiItems = [
      "Mewujudkan generasi Qur'ani berpegang teguh dalam keimanan kepada Allah dan ajaran Islam yang haq dengan ajaran salafussholihin.",
      "Menjadikan pondok pesantren pusat pengkajian ilmu Agama dan dakwah dalam merangkai pemahaman Ahlussunnah wal Jama'ah (Asariyah Syafi'iyah).",
      "Menyiapkan santri yang memiliki daya saing dalam menempuh kehidupan kerja yang berakal dan berilmu pengetahuan.",
    ];
  }

  return (
    <section id="visi-misi" className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-5 w-5 text-primary" />Visi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-2 border-primary pl-4 text-lg italic text-foreground">
                &quot;{vision}&quot;
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListIcon className="h-5 w-5 text-primary" />Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {misiItems.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{index + 1}</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
