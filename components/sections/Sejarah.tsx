import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, UserIcon, BuildingIcon } from "lucide-react";

interface SejarahProps {
  data?: Record<string, string>;
}

export function Sejarah({ data }: SejarahProps) {
  const badge = data?.badge ?? "Sejarah";
  const title = data?.title ?? "Perjalanan Pesantren";
  const description = data?.description ?? "Sejarah singkat perjalanan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA dari awal berdiri hingga saat ini.";

  let timelineItems: { year: string; title: string; description: string }[] = [];
  if (data?.timeline) {
    try { timelineItems = JSON.parse(data.timeline); } catch { /* ignore */ }
  }
  if (timelineItems.length === 0) {
    timelineItems = [
      { year: "2014", title: "Pendirian Pesantren", description: "Gagasan pendirian pesantren berawal dari keinginan untuk menghadirkan lembaga pendidikan Islam. Peletakan batu pertama dilaksanakan pada 14 Februari 2014 di atas tanah wakaf yang diamanahkan oleh Bapak Sutarno." },
      { year: "2017", title: "Lulusan Pertama", description: "Pesantren berhasil meluluskan angkatan pertama setelah menyelenggarakan Satuan Pendidikan Kesetaraan Pondok Pesantren." },
      { year: "2026", title: "Transformasi SPM", description: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA bertransformasi menjadi penyelenggara Satuan Pendidikan Muadalah (SPM) jenjang Wustha dan Ulya di bawah Kementerian Agama RI." },
    ];
  }

  let tokohItems: { name: string; role: string; description: string }[] = [];
  if (data?.tokoh) {
    try { tokohItems = JSON.parse(data.tokoh); } catch { /* ignore */ }
  }
  if (tokohItems.length === 0) {
    tokohItems = [
      { name: "KH. Samsul Arifin, S.Pd.", role: "Pendiri & Pengasuh", description: "Pendidik dan pengasuh pesantren yang berasal dari Madura." },
      { name: "Almarhum H. Ismail Puteh", role: "Tokoh Masyarakat", description: "Sal satu tokoh masyarakat yang ikut membidani berdirinya pesantren." },
      { name: "H. Makmun Santoso, S.Pd.", role: "Tokoh Masyarakat", description: "Tokoh masyarakat yang mendukung pendirian pesantren." },
      { name: "Bapak Sutarto", role: "Tokoh Masyarakat", description: "Tokoh masyarakat yang turut serta dalam musyawarah pendirian." },
    ];
  }

  const visionTitle = data?.visionTitle ?? "Visi Berkelanjutan";
  const visionBody = data?.visionBody ?? "Dengan semangat pengabdian yang terus dijaga, Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA berkomitmen untuk terus mencetak generasi Qur'ani yang beriman, berilmu, dan beramal, serta menjadi pusat pendidikan Islam yang memberikan manfaat bagi umat, bangsa, dan negara.";

  return (
    <section id="sejarah" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />Linimasa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineItems.map((item, index) => (
                    <div key={item.year}>
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.year}</div>
                        <div>
                          <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      {index < timelineItems.length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-primary" />Tokoh Pendiri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokohItems.map((tokoh) => (
                    <div key={tokoh.name} className="rounded-md bg-muted/50 p-3">
                      <h4 className="text-sm font-semibold text-foreground">{tokoh.name}</h4>
                      <p className="mb-1 text-xs font-medium text-primary">{tokoh.role}</p>
                      <p className="text-xs text-muted-foreground">{tokoh.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="mt-8">
          <CardContent className="flex items-start gap-4">
            <BuildingIcon className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{visionTitle}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{visionBody}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
