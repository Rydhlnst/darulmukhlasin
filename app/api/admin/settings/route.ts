import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getSettings, upsertSettings } from "@/lib/cms-api";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const settings = await getSettings();
    return NextResponse.json(settings ?? {});
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil pengaturan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const settings = await upsertSettings(body);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan pengaturan" },
      { status: 500 }
    );
  }
}
