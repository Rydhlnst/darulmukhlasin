import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getSession } from "./session";

export async function adminGuard() {
  const session = await getSession();
  if (!session.isAdmin) {
    redirect("/admin/login");
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
  }
  return null;
}
