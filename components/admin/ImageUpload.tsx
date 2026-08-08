"use client";

import * as React from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import {
  UploadIcon,
  XIcon,
  LoaderIcon,
  ZoomInIcon,
  CropIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getCroppedBlob } from "@/lib/crop-image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  /** Crop aspect ratio (width / height). Defaults to 16:9. */
  aspect?: number;
}

export function ImageUpload({
  value,
  onChange,
  label = "Unggah Gambar",
  aspect = 16 / 9,
}: ImageUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Crop dialog state
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);
  const [originalName, setOriginalName] = React.useState("image.jpg");
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    React.useState<Area | null>(null);

  function openCropper(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB");
      return;
    }
    setOriginalName(file.name);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropSrc(URL.createObjectURL(file));
  }

  const onCropComplete = React.useCallback(
    (_area: Area, areaPixels: Area) => {
      setCroppedAreaPixels(areaPixels);
    },
    []
  );

  function closeCropper() {
    setCropSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }

  async function uploadCroppedBlob(
    blob: Blob,
    filename: string
  ): Promise<string> {
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, contentType: blob.type }),
    });
    if (!res.ok) throw new Error("Gagal membuat presigned URL");

    const { uploadUrl, publicUrl } = await res.json();

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: blob,
      headers: { "Content-Type": blob.type },
    });
    if (!uploadRes.ok) throw new Error("Gagal mengunggah ke R2");

    return publicUrl;
  }

  async function handleConfirmCrop() {
    if (!cropSrc || !croppedAreaPixels) return;
    setUploading(true);
    try {
      const blob = await getCroppedBlob(cropSrc, croppedAreaPixels, "image/jpeg");
      const base = originalName.replace(/\.[^.]+$/, "") || "gambar";
      const publicUrl = await uploadCroppedBlob(blob, `${base}.jpg`);
      onChange(publicUrl);
      toast.success("Gambar berhasil diunggah");
      // Close the dialog last, batched with the uploading reset below, so the
      // exit animation isn't interrupted by a mid-flight re-render.
      closeCropper();
    } catch {
      toast.error("Terjadi kesalahan saat mengunggah");
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) openCropper(file);
    e.target.value = ""; // allow re-selecting the same file
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) openCropper(file);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative overflow-hidden rounded-md border border-border">
          <img src={value} alt="Preview" className="h-48 w-full object-cover" />
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-8 items-center gap-1.5 rounded-full bg-black/60 px-3 text-xs font-medium text-white transition-colors hover:bg-black/80"
              aria-label="Ganti gambar"
            >
              <CropIcon className="h-3.5 w-3.5" />
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="Hapus gambar"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={cn(
            "flex h-48 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:bg-muted/50",
            dragOver && "border-primary bg-primary/5",
            uploading && "opacity-50"
          )}
        >
          {uploading ? (
            <>
              <LoaderIcon className="h-6 w-6 animate-spin" />
              <span className="text-sm">Mengunggah...</span>
            </>
          ) : (
            <>
              <UploadIcon className="h-6 w-6" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs">
                Tarik &amp; lepas atau klik untuk memilih
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Crop dialog */}
      <Dialog
        open={!!cropSrc}
        onOpenChange={(open) => {
          if (!open && !uploading) closeCropper();
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Atur Tampilan Gambar</DialogTitle>
            <DialogDescription>
              Geser untuk mengatur posisi, gunakan slider untuk memperbesar.
              Area di dalam bingkai yang akan tampil.
            </DialogDescription>
          </DialogHeader>

          <div className="relative h-[300px] w-full overflow-hidden rounded-md bg-black sm:h-[360px]">
            {cropSrc && (
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <div className="flex items-center gap-3 px-1">
            <ZoomInIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Slider
              min={1}
              max={3}
              step={0.01}
              value={[zoom]}
              onValueChange={(v) => setZoom(v[0])}
              aria-label="Zoom"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeCropper}
              disabled={uploading}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCrop}
              disabled={uploading || !croppedAreaPixels}
              className="gap-2"
            >
              {uploading ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                <CropIcon className="h-4 w-4" />
              )}
              Simpan &amp; Unggah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
