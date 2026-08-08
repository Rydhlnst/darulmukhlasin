import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { generatePresignedUrl } from "@/lib/r2";

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "filename dan contentType wajib diisi" },
        { status: 400 }
      );
    }

    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Hanya file gambar yang diperbolehkan" },
        { status: 400 }
      );
    }

    const { uploadUrl, publicUrl } = await generatePresignedUrl(
      filename,
      contentType
    );

    return NextResponse.json({ uploadUrl, publicUrl });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat presigned URL" },
      { status: 500 }
    );
  }
}
