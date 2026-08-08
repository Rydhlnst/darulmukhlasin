"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export function FrontendLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Navbar />
      <main className={isHome ? "flex-1" : "flex-1 pt-28 lg:pt-32"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
