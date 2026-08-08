import { NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/cms-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    const submission = await createContactSubmission({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
