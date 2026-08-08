"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

const galleryImages = Array.from({ length: 19 }, (_, i) => ({
  src: `/gallery/gallery-${i + 1}.jpg`,
  alt: `Galeri Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA ${i + 1}`,
  width: 600,
  height: 450,
}));

export function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  return (
    <section id="galeri" className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Dokumentasi
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Galeri Kegiatan
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Dokumentasi kegiatan dan keseharian di Pondok Pesantren Tahfidzul
            Qur&apos;an Darul Mukhlasin KUBA.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <Dialog
              key={index}
              open={selectedImage === index}
              onOpenChange={(open) => {
                if (!open) setSelectedImage(null);
              }}
            >
              <DialogTrigger
                render={
                  <button
                    onClick={() => setSelectedImage(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="sr-only">Lihat gambar {index + 1}</span>
              </DialogTrigger>
              <DialogContent
                className="max-w-4xl p-2 sm:p-4"
                showCloseButton={false}
              >
                <DialogTitle className="sr-only">
                  Galeri {index + 1}
                </DialogTitle>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted sm:top-4 sm:right-4"
                  aria-label="Tutup"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
