import "dotenv/config";
import { db } from "@/db";
import {
  siteSettings,
  pageContent,
  heroSlides,
  socialLinks,
  media,
} from "@/db/schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // ==================== SITE SETTINGS ====================
  console.log("  -> Seeding site_settings...");
  const existingSettings = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1);

  const settingsData = {
    id: 1,
    siteName: "Darul Mukhlasin KUBA",
    siteDescription:
      "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA - Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
    phone: "6287825279426",
    email: "info@darulmukhlasin.sch.id",
    address:
      "Kobel Darat, Desa Sawang Laut, Kec. Kundur Barat, Kab. Karimun, Kepulauan Riau",
    whatsapp: "6287825279426",
    donationInfo: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Pondok%20Pesantren%20Darul%20Mukhlasin%20Kuba%20Kundur%20Barat%20Karimun&t=&z=14&ie=UTF8&iwloc=&output=embed",
    mapsLink: "https://maps.app.goo.gl/LKRpJoxJxtTWNLTY7",
    operationalHours: "Senin - Jumat: 07.00 - 16.00 WIB",
  };

  if (existingSettings.length === 0) {
    await db.insert(siteSettings).values(settingsData);
  } else {
    await db
      .update(siteSettings)
      .set({ ...settingsData, updatedAt: new Date() })
      .where(eq(siteSettings.id, 1));
  }

  // ==================== HERO SLIDES ====================
  console.log("  -> Seeding hero_slides...");
  const existingHero = await db.select().from(heroSlides).limit(1);
  if (existingHero.length === 0) {
    const heroData = [
      { src: "/hero/hero-1.jpg", alt: "Kegiatan santri" },
      { src: "/hero/hero-2.jpg", alt: "Pembelajaran Tahfidzul Qur'an" },
      { src: "/hero/hero-3.jpg", alt: "Kegiatan kebersamaan santri" },
      { src: "/hero/hero-4.jpg", alt: "Aktivitas pesantren" },
      { src: "/hero/hero-5.jpg", alt: "Kehidupan santri" },
    ];
    for (let i = 0; i < heroData.length; i++) {
      await db.insert(heroSlides).values({
        imageUrl: heroData[i].src,
        title: heroData[i].alt,
        order: i,
        active: true,
      });
    }
  }

  // ==================== SOCIAL LINKS ====================
  console.log("  -> Seeding social_links...");
  const existingSocial = await db.select().from(socialLinks).limit(1);
  if (existingSocial.length === 0) {
    const socialData = [
      { platform: "Facebook", url: "#", icon: "FacebookIcon", order: 0 },
      { platform: "Instagram", url: "#", icon: "InstagramIcon", order: 1 },
      { platform: "YouTube", url: "#", icon: "YoutubeIcon", order: 2 },
    ];
    for (const s of socialData) {
      await db.insert(socialLinks).values(s);
    }
  }

  // ==================== MEDIA (GALLERY) ====================
  console.log("  -> Seeding media (gallery)...");
  const existingMedia = await db.select().from(media).limit(1);
  if (existingMedia.length === 0) {
    for (let i = 1; i <= 24; i++) {
      await db.insert(media).values({
        imageUrl: `/gallery/gallery-${i}.jpg`,
        alt: `Galeri Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA ${i}`,
        section: "gallery",
      });
    }
  }

  // ==================== PAGE CONTENT ====================
  console.log("  -> Seeding page_content...");
  const existingContent = await db.select().from(pageContent).limit(1);
  if (existingContent.length === 0) {
    type ContentRow = {
      page: string;
      section: string;
      key: string;
      value: string;
      type: "text" | "json" | "image";
    };

    const rows: ContentRow[] = [
      // --- STATS ---
      {
        page: "home",
        section: "stats",
        key: "items",
        type: "json",
        value: JSON.stringify([
          { icon: "UsersIcon", value: 100, suffix: "+", label: "Santri Aktif" },
          { icon: "BookOpenIcon", value: 30, suffix: " Juz", label: "Target Hafalan" },
          { icon: "AwardIcon", value: 10, suffix: "+", label: "Tahun Pengabdian" },
          { icon: "HeartIcon", value: 100, suffix: "%", label: "Akhlak Islami" },
        ]),
      },

      // --- HERO TEXT ---
      {
        page: "home",
        section: "hero",
        key: "badge",
        type: "text",
        value: "Didirikan Sejak 2014",
      },
      {
        page: "home",
        section: "hero",
        key: "titleLine1",
        type: "text",
        value: "Pondok Pesantren",
      },
      {
        page: "home",
        section: "hero",
        key: "titleLine2",
        type: "text",
        value: "Tahfidzul Qur'an",
      },
      {
        page: "home",
        section: "hero",
        key: "subtitle",
        type: "text",
        value: "Darul Mukhlasin KUBA",
      },
      {
        page: "home",
        section: "hero",
        key: "description",
        type: "text",
        value:
          "Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal melalui pendidikan Islam yang mengintegrasikan Tahfidzul Qur'an, kajian kitab turats, dan pendidikan umum.",
      },
      {
        page: "home",
        section: "hero",
        key: "stats",
        type: "json",
        value: JSON.stringify([
          { value: "2014", label: "Tahun Berdiri" },
          { value: "30 Juz", label: "Target Hafalan" },
          { value: "Metode Wafa", label: "Sistem Tahfidz" },
          { value: "100%", label: "Akhlak & Ilmu" },
        ]),
      },

      // --- PROFIL ---
      {
        page: "home",
        section: "profil",
        key: "badge",
        type: "text",
        value: "Tentang Kami",
      },
      {
        page: "home",
        section: "profil",
        key: "title",
        type: "text",
        value: "Profil Pesantren",
      },
      {
        page: "home",
        section: "profil",
        key: "description",
        type: "text",
        value:
          "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA merupakan lembaga pendidikan Islam yang berkomitmen membina generasi muslim yang berakhlak mulia.",
      },
      {
        page: "home",
        section: "profil",
        key: "body1",
        type: "text",
        value:
          "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA merupakan lembaga pendidikan Islam yang berdiri pada tahun 2014 di Kobel Darat, Desa Sawang Laut, Kecamatan Kundur Barat, Kabupaten Karimun, Provinsi Kepulauan Riau.",
      },
      {
        page: "home",
        section: "profil",
        key: "body2",
        type: "text",
        value:
          "Sejak awal berdiri, pesantren berkomitmen untuk membina generasi muslim yang berakhlak mulia, berpegang teguh pada Al-Qur'an dan As-Sunnah, serta memiliki pemahaman agama yang lurus sesuai manhaj Ahlus Sunnah wal Jama'ah.",
      },
      {
        page: "home",
        section: "profil",
        key: "location",
        type: "text",
        value: "Karimun, Kepulauan Riau",
      },
      {
        page: "home",
        section: "profil",
        key: "foundedYear",
        type: "text",
        value: "Sejak 2014",
      },
      {
        page: "home",
        section: "profil",
        key: "programs",
        type: "json",
        value: JSON.stringify([
          {
            title: "Program Tahfidzul Qur'an",
            description:
              "Metode Wafa - membaca, menghafal, memahami, dan mengamalkan Al-Qur'an secara menyenangkan dan sistematis.",
          },
          {
            title: "Satuan Pendidikan Muadalah",
            description:
              "Pendidikan formal jenjang Wustha dan Ulya di bawah Kementerian Agama RI.",
          },
          {
            title: "Dirasah Islamiyah",
            description:
              "Pengkajian kitab-kitab turats berdasarkan manhaj Ahlus Sunnah wal Jama'ah.",
          },
        ]),
      },

      // --- VISI MISI ---
      {
        page: "home",
        section: "visi-misi",
        key: "badge",
        type: "text",
        value: "Arah Pendidikan",
      },
      {
        page: "home",
        section: "visi-misi",
        key: "title",
        type: "text",
        value: "Visi & Misi",
      },
      {
        page: "home",
        section: "visi-misi",
        key: "description",
        type: "text",
        value:
          "Landasan filosofis yang memandu seluruh kegiatan pendidikan di pesantren.",
      },
      {
        page: "home",
        section: "visi-misi",
        key: "vision",
        type: "text",
        value:
          "Membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
      },
      {
        page: "home",
        section: "visi-misi",
        key: "misi",
        type: "json",
        value: JSON.stringify([
          "Mewujudkan generasi Qur'ani berpegang teguh dalam keimanan kepada Allah dan ajaran Islam yang haq dengan ajaran salafussholihin.",
          "Menjadikan pondok pesantren pusat pengkajian ilmu Agama dan dakwah dalam merangkai pemahaman Ahlussunnah wal Jama'ah (Asariyah Syafi'iyah).",
          "Menyiapkan santri yang memiliki daya saing dalam menempuh kehidupan kerja yang berakal dan berilmu pengetahuan.",
        ]),
      },

      // --- KURIKULUM ---
      {
        page: "home",
        section: "kurikulum",
        key: "badge",
        type: "text",
        value: "Kurikulum Terpadu",
      },
      {
        page: "home",
        section: "kurikulum",
        key: "title",
        type: "text",
        value: "Berbasis Al-Qur'an dan Kepesantrenan",
      },
      {
        page: "home",
        section: "kurikulum",
        key: "description",
        type: "text",
        value:
          "Kurikulum disusun untuk membentuk santri yang memiliki akidah yang lurus, akhlak mulia, penguasaan ilmu syar'i, kemampuan akademik, serta kecakapan hidup yang bermanfaat bagi masyarakat.",
      },
      {
        page: "home",
        section: "kurikulum",
        key: "items",
        type: "json",
        value: JSON.stringify([
          {
            number: "01",
            icon: "BookOpenIcon",
            title: "Tahfidzul Qur'an",
            description:
              "Program unggulan pesantren dengan Metode Wafa, meliputi Tahsin Al-Qur'an, Tahfidz Al-Qur'an, Muraja'ah harian, Munaqasyah hafalan, dengan target hafalan hingga 30 juz sesuai kemampuan santri.",
          },
          {
            number: "02",
            icon: "GraduationCapIcon",
            title: "Pendidikan Muadalah",
            description:
              "Pembelajaran sesuai kurikulum Satuan Pendidikan Muadalah jenjang Wustha dan Ulya yang memadukan ilmu agama dan ilmu pengetahuan umum.",
          },
          {
            number: "03",
            icon: "BookIcon",
            title: "Dirasah Islamiyah",
            description:
              "Pengkajian kitab-kitab turats (kitab kuning) berdasarkan manhaj Ahlus Sunnah wal Jama'ah berakidah Asy'ariyyah dan bermadzhab Syafi'iyyah.",
          },
          {
            number: "04",
            icon: "PencilIcon",
            title: "Mata Pelajaran Umum",
            description:
              "Bahasa Indonesia, Matematika, IPA, IPS, PPKn, Bahasa Inggris, Teknologi Informasi, dan mata pelajaran umum lainnya sesuai jenjang pendidikan.",
          },
        ]),
      },
      {
        page: "home",
        section: "kurikulum",
        key: "dirasahItems",
        type: "json",
        value: JSON.stringify([
          "Al-Qur'an dan Tafsir",
          "Hadis",
          "Aqidah",
          "Fikih",
          "Ushul Fikih",
          "Akhlak dan Tasawuf",
          "Nahwu",
          "Sharaf",
          "Balaghah",
          "Mantiq",
          "Tarikh Islam",
        ]),
      },

      // --- PEMBINAAN ---
      {
        page: "home",
        section: "pembinaan",
        key: "badge",
        type: "text",
        value: "Program Pembinaan",
      },
      {
        page: "home",
        section: "pembinaan",
        key: "title",
        type: "text",
        value: "Pembinaan Santri",
      },
      {
        page: "home",
        section: "pembinaan",
        key: "description",
        type: "text",
        value:
          "Program pembinaan holistik yang mengembangkan aspek spiritual, intelektual, dan sosial santri.",
      },
      {
        page: "home",
        section: "pembinaan",
        key: "items",
        type: "json",
        value: JSON.stringify([
          { icon: "HeartIcon", title: "Shalat Berjamaah", description: "Lima waktu shalat berjamaah di masjid sebagai rutinitas wajib." },
          { icon: "SparklesIcon", title: "Qiyamul Lail", description: "Shalat malam dan pembinaan ibadah untuk ketakwaan santri." },
          { icon: "MicIcon", title: "Muhadharah", description: "Latihan pidato dan presentasi untuk keterampilan komunikasi." },
          { icon: "BookOpenIcon", title: "Kajian Kitab", description: "Pembacaan dan pengkajian kitab-kitab turats secara rutin." },
          { icon: "HandHeartIcon", title: "Pembiasaan Adab", description: "Pembinaan adab dan akhlak Islami dalam kehidupan sehari-hari." },
          { icon: "GlobeIcon", title: "Kegiatan Kebahasaan", description: "Pembinaan kemampuan bahasa Arab dan Inggris." },
          { icon: "UsersIcon", title: "Bakti Sosial", description: "Kegiatan pengabdian masyarakat dan kepedulian sosial." },
          { icon: "HandIcon", title: "Ekstrakurikuler", description: "Kegiatan sesuai minat dan bakat santri." },
        ]),
      },

      // --- SEJARAH ---
      {
        page: "home",
        section: "sejarah",
        key: "badge",
        type: "text",
        value: "Sejarah",
      },
      {
        page: "home",
        section: "sejarah",
        key: "title",
        type: "text",
        value: "Perjalanan Pesantren",
      },
      {
        page: "home",
        section: "sejarah",
        key: "description",
        type: "text",
        value:
          "Sejarah singkat perjalanan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA dari awal berdiri hingga saat ini.",
      },
      {
        page: "home",
        section: "sejarah",
        key: "timeline",
        type: "json",
        value: JSON.stringify([
          {
            year: "2014",
            title: "Pendirian Pesantren",
            description:
              "Gagasan pendirian pesantren berawal dari keinginan untuk menghadirkan lembaga pendidikan Islam. Peletakan batu pertama dilaksanakan pada 14 Februari 2014 di atas tanah wakaf yang diamanahkan oleh Bapak Sutarno.",
          },
          {
            year: "2017",
            title: "Lulusan Pertama",
            description:
              "Pesantren berhasil meluluskan angkatan pertama setelah menyelenggarakan Satuan Pendidikan Kesetaraan Pondok Pesantren.",
          },
          {
            year: "2026",
            title: "Transformasi SPM",
            description:
              "Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA bertransformasi menjadi penyelenggara Satuan Pendidikan Muadalah (SPM) jenjang Wustha dan Ulya di bawah Kementerian Agama RI.",
          },
        ]),
      },
      {
        page: "home",
        section: "sejarah",
        key: "tokoh",
        type: "json",
        value: JSON.stringify([
          { name: "KH. Samsul Arifin, S.Pd.", role: "Pendiri & Pengasuh", description: "Pendidik dan pengasuh pesantren yang berasal dari Madura." },
          { name: "Almarhum H. Ismail Puteh", role: "Tokoh Masyarakat", description: "Sal satu tokoh masyarakat yang ikut membidani berdirinya pesantren." },
          { name: "H. Makmun Santoso, S.Pd.", role: "Tokoh Masyarakat", description: "Tokoh masyarakat yang mendukung pendirian pesantren." },
          { name: "Bapak Sutarto", role: "Tokoh Masyarakat", description: "Tokoh masyarakat yang turut serta dalam musyawarah pendirian." },
        ]),
      },
      {
        page: "home",
        section: "sejarah",
        key: "visionTitle",
        type: "text",
        value: "Visi Berkelanjutan",
      },
      {
        page: "home",
        section: "sejarah",
        key: "visionBody",
        type: "text",
        value:
          "Dengan semangat pengabdian yang terus dijaga, Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA berkomitmen untuk terus mencetak generasi Qur'ani yang beriman, berilmu, dan beramal, serta menjadi pusat pendidikan Islam yang memberikan manfaat bagi umat, bangsa, dan negara.",
      },

      // --- METODE ---
      {
        page: "home",
        section: "metode",
        key: "badge",
        type: "text",
        value: "Metode Pembelajaran",
      },
      {
        page: "home",
        section: "metode",
        key: "title",
        type: "text",
        value: "Pendekatan Pendidikan",
      },
      {
        page: "home",
        section: "metode",
        key: "description",
        type: "text",
        value:
          "Berbagai metode pembelajaran tradisional pesantren yang telah terbukti efektif dalam membentuk karakter santri.",
      },
      {
        page: "home",
        section: "metode",
        key: "items",
        type: "json",
        value: JSON.stringify([
          { icon: "BookOpenIcon", name: "Talaqqi", description: "Pembelajaran langsung dari guru ke santri secara individu." },
          { icon: "UserIcon", name: "Sorogan", description: "Santri maju secara bergantian untuk membaca di hadapan guru." },
          { icon: "UsersIcon", name: "Bandongan", description: "Guru menyampaikan materi kepada sekelompok santri sekaligus." },
          { icon: "MessageCircleIcon", name: "Halaqah", description: "Diskusi kelompok kecil untuk pendalaman materi." },
          { icon: "HandshakeIcon", name: "Musyawarah", description: "Diskusi dan musyawarah untuk pengambilan keputusan bersama." },
          { icon: "CheckCircleIcon", name: "Praktik Ibadah", description: "Praktik langsung ibadah sebagai pembelajaran experiential." },
          { icon: "ClipboardCheckIcon", name: "Evaluasi & Munaqasyah", description: "Evaluasi berkala dan diskusi ilmiah tentang materi yang dipelajari." },
        ]),
      },

      // --- TARGET LULUSAN ---
      {
        page: "home",
        section: "target-lulusan",
        key: "badge",
        type: "text",
        value: "Target Lulusan",
      },
      {
        page: "home",
        section: "target-lulusan",
        key: "title",
        type: "text",
        value: "Kompetensi Lulusan",
      },
      {
        page: "home",
        section: "target-lulusan",
        key: "description",
        type: "text",
        value:
          "Lulusan Pondok Pesantren Tahfidzul Qur'an Darul Mukhlasin KUBA diharapkan menjadi pribadi yang:",
      },
      {
        page: "home",
        section: "target-lulusan",
        key: "items",
        type: "json",
        value: JSON.stringify([
          "Beriman dan bertakwa kepada Allah SWT.",
          "Memiliki akhlakul karimah.",
          "Hafal Al-Qur'an sesuai target yang dicapai.",
          "Menguasai dasar-dasar ilmu syar'i dan mampu membaca kitab turats.",
          "Memiliki kompetensi akademik yang baik.",
          "Siap melanjutkan pendidikan ke jenjang yang lebih tinggi maupun mengabdi di tengah masyarakat.",
        ]),
      },

      // --- CTA ---
      {
        page: "home",
        section: "cta",
        key: "heading",
        type: "text",
        value: "Siap bergabung bersama kami?",
      },
      {
        page: "home",
        section: "cta",
        key: "description",
        type: "text",
        value:
          "Tim kami siap membantu proses pendaftaran dan konsultasi pendidikan putra-putri Anda. Bergabunglah dalam membentuk generasi Qur'ani yang beriman, berilmu, dan beramal.",
      },
    ];

    for (const row of rows) {
      await db.insert(pageContent).values(row);
    }
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
