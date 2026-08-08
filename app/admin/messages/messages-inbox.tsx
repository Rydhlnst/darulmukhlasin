"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderIcon, MailIcon, Trash2Icon } from "lucide-react";
import type { ContactSubmission } from "@/db/schema";

const statusConfig = {
  new: { label: "Baru", variant: "default" as const },
  in_progress: { label: "Diproses", variant: "secondary" as const },
  resolved: { label: "Selesai", variant: "outline" as const },
};

export function MessagesInbox() {
  const [submissions, setSubmissions] = React.useState<ContactSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<string>("all");

  React.useEffect(() => {
    loadSubmissions();
  }, [filter]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const url =
        filter !== "all"
          ? `/api/admin/contact-submissions?status=${filter}`
          : "/api/admin/contact-submissions";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal memuat");
      const data = await res.json();
      setSubmissions(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Gagal");
      loadSubmissions();
    } catch {
      // silently fail
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <MailIcon className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Belum ada pesan masuk.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="new">Baru</SelectItem>
            <SelectItem value="in_progress">Diproses</SelectItem>
            <SelectItem value="resolved">Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {submissions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{sub.subject || sub.name}</CardTitle>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{sub.name}</span>
                    <span>{sub.email}</span>
                    {sub.phone && <span>{sub.phone}</span>}
                    <span>
                      {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <Badge variant={statusConfig[sub.status].variant}>
                  {statusConfig[sub.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">{sub.message}</p>
              <div className="flex items-center gap-2">
                <Select
                  value={sub.status}
                  onValueChange={(val) => updateStatus(sub.id, val)}
                >
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Baru</SelectItem>
                    <SelectItem value="in_progress">Diproses</SelectItem>
                    <SelectItem value="resolved">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
