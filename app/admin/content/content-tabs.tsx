"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionForm, type SectionField } from "./section-form";

type SectionConfig = {
  id: string;
  label: string;
  page: string;
  section: string;
  fields: SectionField[];
};

const sections: SectionConfig[] = [
  {
    id: "stats",
    label: "Statistik",
    page: "home",
    section: "stats",
    fields: [
      {
        key: "items",
        label: "Item Statistik",
        type: "object-list",
        itemFields: [
          { key: "icon", label: "Icon (Lucide)" },
          { key: "value", label: "Nilai" },
          { key: "suffix", label: "Suffix" },
          { key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    page: "home",
    section: "hero",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "titleLine1", label: "Judul Baris 1", type: "text" },
      { key: "titleLine2", label: "Judul Baris 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "stats",
        label: "Mini Stats (Hero)",
        type: "object-list",
        itemFields: [
          { key: "value", label: "Nilai" },
          { key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "profil",
    label: "Profil",
    page: "home",
    section: "profil",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi Singkat", type: "textarea" },
      { key: "body1", label: "Paragraf 1", type: "textarea" },
      { key: "body2", label: "Paragraf 2", type: "textarea" },
      { key: "location", label: "Lokasi", type: "text" },
      { key: "foundedYear", label: "Tahun Berdiri", type: "text" },
      {
        key: "programs",
        label: "Program Utama",
        type: "object-list",
        itemFields: [
          { key: "title", label: "Judul" },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "visi-misi",
    label: "Visi & Misi",
    page: "home",
    section: "visi-misi",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      { key: "vision", label: "Visi", type: "textarea" },
      {
        key: "misi",
        label: "Misi",
        type: "string-list",
      },
    ],
  },
  {
    id: "kurikulum",
    label: "Kurikulum",
    page: "home",
    section: "kurikulum",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "items",
        label: "Program Kurikulum",
        type: "object-list",
        itemFields: [
          { key: "number", label: "Nomor" },
          { key: "icon", label: "Icon (Lucide)" },
          { key: "title", label: "Judul" },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      {
        key: "dirasahItems",
        label: "Mata Pelajaran Dirasah Islamiyah",
        type: "string-list",
      },
    ],
  },
  {
    id: "pembinaan",
    label: "Pembinaan",
    page: "home",
    section: "pembinaan",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "items",
        label: "Kegiatan Pembinaan",
        type: "object-list",
        itemFields: [
          { key: "icon", label: "Icon (Lucide)" },
          { key: "title", label: "Judul" },
          { key: "description", label: "Deskripsi" },
        ],
      },
    ],
  },
  {
    id: "sejarah",
    label: "Sejarah",
    page: "home",
    section: "sejarah",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "timeline",
        label: "Linimasa",
        type: "object-list",
        itemFields: [
          { key: "year", label: "Tahun" },
          { key: "title", label: "Judul" },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      {
        key: "tokoh",
        label: "Tokoh Pendiri",
        type: "object-list",
        itemFields: [
          { key: "name", label: "Nama" },
          { key: "role", label: "Peran" },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      { key: "visionTitle", label: "Judul Visi Berkelanjutan", type: "text" },
      { key: "visionBody", label: "Visi Berkelanjutan", type: "textarea" },
    ],
  },
  {
    id: "metode",
    label: "Metode",
    page: "home",
    section: "metode",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "items",
        label: "Metode Pembelajaran",
        type: "object-list",
        itemFields: [
          { key: "icon", label: "Icon (Lucide)" },
          { key: "name", label: "Nama" },
          { key: "description", label: "Deskripsi" },
        ],
      },
    ],
  },
  {
    id: "target-lulusan",
    label: "Target Lulusan",
    page: "home",
    section: "target-lulusan",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
      {
        key: "items",
        label: "Kompetensi Lulusan",
        type: "string-list",
      },
    ],
  },
  {
    id: "cta",
    label: "CTA",
    page: "home",
    section: "cta",
    fields: [
      { key: "heading", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
    ],
  },
];

export function ContentTabs() {
  return (
    <Tabs defaultValue="stats">
      <TabsList className="flex-wrap" variant="line">
        {sections.map((s) => (
          <TabsTrigger key={s.id} value={s.id}>
            {s.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((s) => (
        <TabsContent key={s.id} value={s.id} className="mt-6">
          <SectionForm
            page={s.page}
            section={s.section}
            fields={s.fields}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
