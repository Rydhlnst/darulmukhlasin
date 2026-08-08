import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getHeroSlides, createHeroSlide } from "@/lib/cms-api";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const slides = await getHeroSlides();
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil hero slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const slide = await createHeroSlide(body);
    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat hero slide" },
      { status: 500 }
    );
  }
}
