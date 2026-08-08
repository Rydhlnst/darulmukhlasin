import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { updateHeroSlide, deleteHeroSlide } from "@/lib/cms-api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const slide = await updateHeroSlide(id, body);
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui hero slide" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await deleteHeroSlide(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus hero slide" },
      { status: 500 }
    );
  }
}
