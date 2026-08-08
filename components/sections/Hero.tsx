import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon, GraduationCapIcon, HeartIcon } from "lucide-react";

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4">
              Didirikan Sejak 2014
            </Badge>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Pondok Pesantren
              <br />
              <span className="text-primary">Tahfidzul Qur&apos;an</span>
              <br />
              Darul Mukhlasin KUBA
            </h1>

            <p className="mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Membentuk generasi Qur&apos;ani yang beriman, berilmu, dan beramal
              melalui pendidikan Islam yang mengintegrasikan Tahfidzul Qur&apos;an,
              kajian kitab turats, dan pendidikan umum.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                <BookOpenIcon className="h-4 w-4" />
                Daftar Sekarang
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <GraduationCapIcon className="h-4 w-4" />
                Pelajari Program
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  2014
                </span>
                <span className="text-xs text-muted-foreground">
                  Tahun Berdiri
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  30 Juz
                </span>
                <span className="text-xs text-muted-foreground">
                  Target Hafalan
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  Metode Wafa
                </span>
                <span className="text-xs text-muted-foreground">
                  Metode Pembelajaran
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-2xl font-bold text-foreground sm:text-3xl">
                  <HeartIcon className="h-6 w-6 text-primary" />
                  Akhlak
                </span>
                <span className="text-xs text-muted-foreground">
                  Fondasi Pendidikan
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
