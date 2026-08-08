import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/proxy";
import { updateContactSubmissionStatus } from "@/lib/cms-api";

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

    const { status } = await request.json();
    if (!["new", "in_progress", "resolved"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    const submission = await updateContactSubmissionStatus(
      id,
      status as "new" | "in_progress" | "resolved"
    );
    return NextResponse.json(submission);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui status pesan" },
      { status: 500 }
    );
  }
}
