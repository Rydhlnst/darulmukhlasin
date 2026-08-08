export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.src = url;
  });
}

/**
 * Produces a cropped image Blob from the source image and the pixel crop area
 * returned by react-easy-crop. Output is capped to `maxWidth` to keep uploads
 * light, and encoded as the requested mime type.
 */
export async function getCroppedBlob(
  imageSrc: string,
  cropAreaPixels: CropArea,
  mimeType = "image/jpeg",
  maxWidth = 1600,
  quality = 0.9
): Promise<Blob> {
  const image = await createImage(imageSrc);

  const scale =
    cropAreaPixels.width > maxWidth ? maxWidth / cropAreaPixels.width : 1;
  const outWidth = Math.round(cropAreaPixels.width * scale);
  const outHeight = Math.round(cropAreaPixels.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Tidak bisa memproses gambar");

  // JPEG has no alpha — paint a white background so transparent PNGs don't go black.
  if (mimeType === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outWidth, outHeight);
  }

  ctx.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    outWidth,
    outHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Gagal membuat gambar"));
      },
      mimeType,
      quality
    );
  });
}
