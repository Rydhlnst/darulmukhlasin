"use client";

import * as React from "react";
import { MessageCircleIcon, XIcon, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const contacts = [
  { name: "Ustadz Samsul Arifin", phone: "6281282810161", display: "0812-8281-0161" },
  { name: "Ustadzah Khafiyya Ramadhani", phone: "6282283198275", display: "0822-8319-8275" },
];

export function FloatingWhatsApp() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-[#d5ecd5] bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-primary px-4 py-3">
            <p className="text-sm font-semibold text-white">Hubungi Kami</p>
            <p className="text-xs text-white/70">Pilih kontak yang ingin dihubungi</p>
          </div>
          <div className="p-3">
            {contacts.map((c) => (
              <a
                key={c.phone}
                href={`https://wa.me/${c.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#eef7ee]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5ecd5] text-primary">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.display}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-lg transition-all duration-200",
          open ? "bg-foreground text-white" : "bg-primary text-white hover:bg-primary/90"
        )}
        aria-label={open ? "Tutup" : "Hubungi WhatsApp"}
      >
        {open ? <XIcon className="h-6 w-6" /> : <MessageCircleIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
