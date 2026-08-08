"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/db/schema";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Kurikulum", href: "/kurikulum" },
  { label: "Sejarah", href: "/sejarah" },
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
  const [open, setOpen] = React.useState(false);
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
      {/* Top bar: white bg */}
      <div className="bg-white shadow-md transition-all duration-300">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo/logo.jpg" alt="Logo Darul Mukhlasin KUBA" width={40} height={40} className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-primary/20" priority />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight text-primary">Darul Mukhlasin KUBA</span>
              <span className="hidden text-[10px] text-gray-500 sm:block">Pondok Pesantren Tahfidzul Qur&apos;an</span>
            </div>
          </Link>
          <div className="hidden items-center gap-2 sm:flex">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary hover:text-white" aria-label={social.label}>
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-primary hover:bg-gray-100 sm:hidden" />}>
              <MenuIcon className="h-5 w-5 text-primary" />
              <span className="sr-only">Buka menu</span>
            </SheetTrigger>
            <SheetContent side="left" showCloseButton={false}>
              <SheetHeader className="border-b border-border pb-4"><SheetTitle>Menu Navigasi</SheetTitle></SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive(item.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-[#d5ecd5] hover:text-primary")}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3 border-t border-border p-4">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d5ecd5] text-primary transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Bottom bar: solid green */}
      <div className="bg-primary transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto px-4 scrollbar-none sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium transition-colors sm:px-4 sm:py-4 sm:text-sm", isActive(item.href) ? "border-white text-white font-semibold" : "border-transparent text-white hover:text-white")}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
