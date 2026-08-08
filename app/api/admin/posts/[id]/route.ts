import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getPostById, updatePost, deletePost } from "@/lib/cms-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const post = await getPostById(parseInt(id));
    if (!post) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const post = await updatePost(parseInt(id), body);

    if (!post) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui artikel" },
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
    const { id } = await params;
    await deletePost(parseInt(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
