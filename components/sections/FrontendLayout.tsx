"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import type { SocialLink, SiteSetting } from "@/db/schema";

interface FrontendLayoutProps {
  children: React.ReactNode;
  socialLinks?: SocialLink[];
  settings?: SiteSetting | null;
}

export function FrontendLayout({ children, socialLinks, settings }: FrontendLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Navbar socialLinks={socialLinks} />
      <main className={isHome ? "flex-1" : "flex-1 pt-28 lg:pt-32"}>
        {children}
      </main>
      <Footer socialLinks={socialLinks} settings={settings} />
      <FloatingWhatsApp />
    </>
  );
}
