"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/db/schema";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Kurikulum", href: "/kurikulum" },
  { label: "Sejarah", href: "/sejarah" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
};

interface NavbarProps {
  socialLinks?: SocialLink[];
}

export function Navbar({ socialLinks: socialLinksProp }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const socialLinks = React.useMemo(() => {
    if (socialLinksProp && socialLinksProp.length > 0) {
      return socialLinksProp.map((s) => ({
        icon: iconMap[s.icon ?? ""] ?? FacebookIcon,
        href: s.url,
        label: s.platform,
      }));
    }
    return [
      { icon: FacebookIcon, href: "#", label: "Facebook" },
      { icon: InstagramIcon, href: "#", label: "Instagram" },
      { icon: YoutubeIcon, href: "#", label: "YouTube" },
    ];
  }, [socialLinksProp]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Tier 1: Logo + Social Icons */}
      <div className="bg-white shadow-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo/logo.jpg" alt="Logo Darul Mukhlasin KUBA" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-primary/20" priority />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight text-primary sm:text-base">Darul Mukhlasin KUBA</span>
              <span className="hidden text-[10px] text-gray-500 sm:block">Pondok Pesantren Tahfidzul Qur&apos;an</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary hover:text-white" aria-label={social.label}>
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 lg:hidden" aria-label="Toggle menu">
              {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Nav Links (desktop) */}
      <div className="hidden bg-primary lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("px-4 py-3 text-sm font-medium transition-colors", isActive(item.href) ? "text-white font-semibold" : "text-white/80 hover:text-white")}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn("rounded-md px-3 py-2.5 text-sm font-medium transition-colors", isActive(item.href) ? "bg-primary text-white" : "text-gray-600 hover:bg-[#eef7ee] hover:text-primary")}>
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 sm:hidden">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef7ee] text-primary transition-colors hover:bg-primary hover:text-white" aria-label={social.label}>
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
