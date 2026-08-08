import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getSocialLinks, upsertSocialLinks } from "@/lib/cms-api";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const links = await getSocialLinks();
    return NextResponse.json(links);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil social links" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const items = await request.json();
    await upsertSocialLinks(items);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan social links" },
      { status: 500 }
    );
  }
}
