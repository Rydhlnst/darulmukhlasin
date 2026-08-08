"use client";

import * as React from "react";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="flex items-center gap-3">
          <Image
            src="/logo/logo.jpg"
            alt="Logo Darul Mukhlasin KUBA"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            priority
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground sm:text-base">
              Darul Mukhlasin KUBA
            </span>
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              Pondok Pesantren Tahfidzul Qur&apos;an
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Buka menu</span>
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
