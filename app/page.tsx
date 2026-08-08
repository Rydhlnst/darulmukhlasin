import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Profil } from "@/components/sections/Profil";
import { VisiMisi } from "@/components/sections/VisiMisi";
import { Kurikulum } from "@/components/sections/Kurikulum";
import { Pembinaan } from "@/components/sections/Pembinaan";
import { Metode } from "@/components/sections/Metode";
import { TargetLulusan } from "@/components/sections/TargetLulusan";
import { Sejarah } from "@/components/sections/Sejarah";
import { Gallery } from "@/components/sections/Gallery";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Profil />
        <VisiMisi />
        <Kurikulum />
        <Pembinaan />
        <Metode />
        <TargetLulusan />
        <Sejarah />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
