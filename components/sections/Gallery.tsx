"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import type { Media } from "@/db/schema";

interface GalleryProps {
  compact?: boolean;
  media?: Media[];
}

export function Gallery({ compact = false, media: mediaProp }: GalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = React.useMemo(() => {
    if (mediaProp && mediaProp.length > 0) {
      return mediaProp.map((m) => ({ src: m.imageUrl, alt: m.alt ?? "Galeri" }));
    }
    return Array.from({ length: 19 }, (_, i) => ({
      src: `/gallery/gallery-${i + 1}.jpg`,
      alt: `Galeri Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA ${i + 1}`,
    }));
  }, [mediaProp]);

  const slidesToShow = compact ? 6 : 19;

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="galeri" className={compact ? "bg-primary/5 py-16 lg:py-24" : "min-h-screen bg-primary/5 py-16 lg:py-24"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">Dokumentasi</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Galeri Kegiatan</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Dokumentasi kegiatan dan keseharian di Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA.</p>
        </div>
        <div className="mb-4 flex items-center justify-end gap-2">
          <Button variant="outline" size="icon" onClick={scrollPrev}><ChevronLeftIcon className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" onClick={scrollNext}><ChevronRightIcon className="h-5 w-5" /></Button>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {galleryImages.slice(0, slidesToShow).map((image, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <Dialog open={selectedImage === index} onOpenChange={(open) => { if (!open) setSelectedImage(null); }}>
                  <DialogTrigger
                    render={
                      <button onClick={() => setSelectedImage(index)} className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted" />
                    }
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-2" showCloseButton={false}>
                    <DialogTitle className="sr-only">{image.alt}</DialogTitle>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image src={image.src} alt={image.alt} fill sizes="80vw" className="object-contain" priority />
                    </div>
                    <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted" aria-label="Tutup">
                      <XIcon className="h-4 w-4" />
                    </button>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: Math.min(slidesToShow, galleryImages.length) }).map((_, index) => (
            <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`h-2 rounded-full transition-all ${selectedIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
        {compact && (
          <div className="mt-8 text-center">
            <Button variant="outline" render={<Link href="/galeri" />}>Lihat Galeri Lengkap</Button>
          </div>
        )}
      </div>
    </section>
  );
}
