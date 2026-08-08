import type { Metadata } from "next";
import { Noto_Sans_Arabic, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA",
  description:
    "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal. Berdiri sejak 2014 di Karimun, Kepulauan Riau.",
  keywords: [
    "pondok pesantren",
    "tahfidz quran",
    "darul mukhlasin",
    "kuba",
    "karimun",
    "kepulauan riau",
    "pendidikan islam",
    "metode wafa",
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={cn(
              "h-full",
              "antialiased",
              notoSansArabic.variable
            , "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
