import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon } from "lucide-react";

interface TargetLulusanProps {
  data?: Record<string, string>;
}

export function TargetLulusan({ data }: TargetLulusanProps) {
  const badge = data?.badge ?? "Target Lulusan";
  const title = data?.title ?? "Kompetensi Lulusan";
  const description = data?.description ?? "Lulusan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA diharapkan menjadi pribadi yang:";

  let items: string[] = [];
  if (data?.items) {
    try { items = JSON.parse(data.items); } catch { /* ignore */ }
  }
  if (items.length === 0) {
    items = [
      "Beriman dan bertakwa kepada Allah SWT.",
      "Memiliki akhlakul karimah.",
      "Hafal Al-Qur'an sesuai target yang dicapai.",
      "Menguasai dasar-dasar ilmu syar'i dan mampu membaca kitab turats.",
      "Memiliki kompetensi akademik yang baik.",
      "Siap melanjutkan pendidikan ke jenjang yang lebih tinggi maupun mengabdi di tengah masyarakat.",
    ];
  }

  return (
    <section className="bg-[#fef9e7] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <Card className="mx-auto max-w-3xl border-[#fde68a] bg-white shadow-sm">
          <CardContent>
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#b45309]" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
