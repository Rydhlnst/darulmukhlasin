import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { getAllPosts, createPost } from "@/lib/cms-api";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
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
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat artikel" },
      { status: 500 }
    );
  }
}
