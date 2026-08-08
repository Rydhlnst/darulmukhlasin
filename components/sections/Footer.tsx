import { Separator } from "@/components/ui/separator";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Sejarah", href: "#sejarah" },
];

const programLinks = [
  "Tahfidzul Qur'an Metode Wafa",
  "Pendidikan Muadalah",
  "Dirasah Islamiyah",
  "Mata Pelajaran Umum",
];

export function Footer() {
  return (
    <footer id="kontak" className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/logo.jpg"
                alt="Logo Darul Mukhlasin KUBA"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Darul Mukhlasin KUBA
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Pondok Pesantren Tahfidzul Qur&apos;an
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Membentuk generasi Qur&apos;ani yang beriman, berilmu, dan beramal
              melalui pendidikan Islam yang berkualitas.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Program */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Program Unggulan
            </h4>
            <ul className="space-y-2">
              {programLinks.map((program) => (
                <li key={program}>
                  <span className="text-xs text-muted-foreground">{program}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Hubungi Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Kobel Darat, Desa Sawang Laut, Kec. Kundur Barat, Kab.
                  Karimun, Kepulauan Riau
                </span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Hubungi via WhatsApp
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Email Pondok
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pondok Pesantren Tahfidzul
            Qur&apos;an Darul Mukhlasin KUBA. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for a modern, professional digital presence.
          </p>
        </div>
      </div>
    </footer>
  );
}
