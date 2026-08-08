import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import type { SocialLink, SiteSetting } from "@/db/schema";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Kurikulum", href: "/kurikulum" },
  { label: "Sejarah", href: "/sejarah" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

const programLinks = [
  "Tahfidzul Qur'an Metode Wafa",
  "Pendidikan Muadalah",
  "Dirasah Islamiyah",
  "Mata Pelajaran Umum",
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
};

interface FooterProps {
  socialLinks?: SocialLink[];
  settings?: SiteSetting | null;
}

export function Footer({ socialLinks: socialLinksProp, settings }: FooterProps) {
  const socialLinks = socialLinksProp && socialLinksProp.length > 0
    ? socialLinksProp.map((s) => ({
        icon: iconMap[s.icon ?? ""] ?? FacebookIcon,
        href: s.url,
        label: s.platform,
      }))
    : [
        { icon: FacebookIcon, href: "#", label: "Facebook" },
        { icon: InstagramIcon, href: "#", label: "Instagram" },
        { icon: YoutubeIcon, href: "#", label: "YouTube" },
      ];

  const address = settings?.address ?? "Kobel Darat, Desa Sawang Laut, Kec. Kundur Barat, Kab. Karimun, Kepulauan Riau";
  const phone = settings?.whatsapp ?? "6287825279426";
  const email = settings?.email ?? "Email Pondok";

  return (
    <footer className="border-t border-primary/20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/logo/logo.jpg" alt="Logo Darul Mukhlasin KUBA" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-background/20" />
              <div>
                <h3 className="text-sm font-bold text-primary-foreground">Darul Mukhlasin KUBA</h3>
                <p className="text-[10px] text-primary-foreground/60">Pondok Pesantren Tahfidzul Qur&apos;an</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/60">Membentuk generasi Qur&apos;ani yang beriman, berilmu, dan beramal melalui pendidikan Islam yang berkualitas.</p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label={social.label}>
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Program Unggulan</h4>
            <ul className="space-y-2">
              {programLinks.map((program) => (
                <li key={program}><span className="text-xs text-primary-foreground/60">{program}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-primary-foreground/60">{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-primary-foreground/60">Hubungi via WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-primary-foreground/60">{email}</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/10" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">&copy; {new Date().getFullYear()} Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA. All rights reserved.</p>
          <p className="text-xs text-primary-foreground/50">Designed for a modern, professional digital presence.</p>
        </div>
      </div>
    </footer>
  );
}
