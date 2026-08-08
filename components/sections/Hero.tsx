"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenIcon,
  GraduationCapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const heroImages = [
  { src: "/hero/hero-1.jpg", alt: "Kegiatan santri" },
  { src: "/hero/hero-2.jpg", alt: "Pembelajaran Tahfidzul Qur'an" },
  { src: "/hero/hero-3.jpg", alt: "Kegiatan kebersamaan santri" },
  { src: "/hero/hero-4.jpg", alt: "Aktivitas pesantren" },
  { src: "/hero/hero-5.jpg", alt: "Kehidupan santri" },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/40 to-primary/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground">
                Didirikan Sejak 2014
              </Badge>
            </div>

            <h1
              className="mb-4 text-4xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-bottom-4 duration-700 sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
            >
              Pondok Pesantren
              <br />
              Tahfidzul Qur&apos;an
              <br />
              <span className="text-primary-foreground/90">
                Darul Mukhlasin KUBA
              </span>
            </h1>

            <p
              className="mb-8 max-w-2xl text-base text-primary-foreground/80 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:text-lg"
              style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            >
              Membentuk generasi Qur&apos;ani yang beriman, berilmu, dan beramal
              melalui pendidikan Islam yang mengintegrasikan Tahfidzul Qur&apos;an,
              kajian kitab turats, dan pendidikan umum.
            </p>

            <div
              className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:flex-row"
              style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                render={<Link href="/kontak" />}
              >
                <BookOpenIcon className="h-4 w-4" />
                Daftar Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={<Link href="/kurikulum" />}
              >
                <GraduationCapIcon className="h-4 w-4" />
                Pelajari Program
              </Button>
            </div>

            {/* Stats */}
            <div
              className="mt-16 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:grid-cols-4"
              style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
            >
              {[
                { value: "2014", label: "Tahun Berdiri" },
                { value: "30 Juz", label: "Target Hafalan" },
                { value: "Metode Wafa", label: "Sistem Tahfidz" },
                { value: "100%", label: "Akhlak & Ilmu" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-primary-foreground sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-primary-foreground/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/30 lg:flex"
        aria-label="Sebelumnya"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/30 lg:flex"
        aria-label="Berikutnya"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              selectedIndex === index
                ? "w-8 bg-primary-foreground"
                : "w-2 bg-primary-foreground/40"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
