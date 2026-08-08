"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeletePostButtonProps {
  id: number;
}

export function DeletePostButton({ id }: DeletePostButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Artikel berhasil dihapus");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan saat menghapus");
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" disabled={deleting} />
        }
      >
        {deleting ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2Icon className="h-4 w-4 text-destructive" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/80"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
