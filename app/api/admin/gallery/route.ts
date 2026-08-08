import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getAllMedia, createMedia, deleteMedia } from "@/lib/cms-api";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const media = await getAllMedia();
    return NextResponse.json(media);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const media = await createMedia(body);
    return NextResponse.json(media, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await request.json();
    await deleteMedia(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus media" },
      { status: 500 }
    );
  }
}
