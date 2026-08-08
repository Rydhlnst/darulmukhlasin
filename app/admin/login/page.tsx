import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session.isAdmin) {
    redirect("/admin/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pondok Pesantren Tahfidzul Qur&apos;an Darul Mukhlasin KUBA
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
