import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getContactSubmissions } from "@/lib/cms-api";

export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") ?? undefined;

    const submissions = await getContactSubmissions(status);
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil pesan" },
      { status: 500 }
    );
  }
}
