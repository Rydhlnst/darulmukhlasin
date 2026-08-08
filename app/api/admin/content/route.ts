import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getPageContent, upsertPageContent } from "@/lib/cms-api";

export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const section = searchParams.get("section") ?? undefined;

    if (!page) {
      return NextResponse.json(
        { error: "Parameter 'page' wajib diisi" },
        { status: 400 }
      );
    }

    const content = await getPageContent(page, section);
    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data konten" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const section = searchParams.get("section");

    if (!page || !section) {
      return NextResponse.json(
        { error: "Parameter 'page' dan 'section' wajib diisi" },
        { status: 400 }
      );
    }

    const items = await request.json();
    await upsertPageContent(page, section, items);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan konten" },
      { status: 500 }
    );
  }
}
