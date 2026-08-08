import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpenIcon, MessageCircleIcon, ArrowRightIcon } from "lucide-react";

interface CTASectionProps {
  data?: Record<string, string>;
}

export function CTASection({ data }: CTASectionProps) {
  const heading = data?.heading ?? "Siap bergabung bersama kami?";
  const description = data?.description ?? "Tim kami siap membantu proses pendaftaran dan konsultasi pendidikan putra-putri Anda. Bergabunglah dalam membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.";

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-0 bg-foreground text-background shadow-xl">
          <CardContent className="relative px-6 py-12 text-center lg:px-12 lg:py-20">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10" />
            <div className="relative">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-background sm:text-3xl lg:text-4xl">{heading}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-background/70">{description}</p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" render={<Link href="/kontak" />}>
                  <BookOpenIcon className="h-4 w-4" />Daftar Sekarang
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background" render={<Link href="/kontak" />}>
                  <MessageCircleIcon className="h-4 w-4" />Hubungi Kami<ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
