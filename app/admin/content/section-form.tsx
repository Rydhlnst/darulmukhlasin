"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  SaveIcon,
  LoaderIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

export type SectionField =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "string-list" }
  | {
      key: string;
      label: string;
      type: "object-list";
      itemFields: { key: string; label: string; type?: "text" | "textarea" }[];
    };

type ContentValue = Record<string, string>;

interface SectionFormProps {
  page: string;
  section: string;
  fields: SectionField[];
}

export function SectionForm({ page, section, fields }: SectionFormProps) {
  const [values, setValues] = React.useState<ContentValue>({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/admin/content?page=${page}&section=${section}`
        );
        if (!res.ok) throw new Error("Gagal memuat");
        const data: { key: string; value: string }[] = await res.json();
        const obj: ContentValue = {};
        for (const item of data) {
          obj[item.key] = item.value;
        }
        setValues(obj);
      } catch {
        toast.error("Gagal memuat konten");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, section]);

  function updateField(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const items = fields.map((field) => {
      const f = field as SectionField;
      const value = values[f.key] ?? "";
      const type =
        f.type === "textarea" || f.type === "text"
          ? "text"
          : "json";
      return { key: f.key, value, type: type as "text" | "json" };
    });

    try {
      const res = await fetch(
        `/api/admin/content?page=${page}&section=${section}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(items),
        }
      );
      if (!res.ok) throw new Error("Gagal menyimpan");
      toast.success("Konten berhasil disimpan");
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.key}>
          {index > 0 && <Separator className="mb-6" />}
          <FieldRenderer
            field={field}
            value={values[field.key] ?? ""}
            onChange={(val) => updateField(field.key, val)}
          />
        </div>
      ))}

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="h-4 w-4" />
          )}
          Simpan Konten
        </Button>
      </div>
    </form>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: SectionField;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "text") {
    return (
      <div className="space-y-2">
        <Label htmlFor={field.key}>{field.label}</Label>
        <Input
          id={field.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={field.key}>{field.label}</Label>
        <Textarea
          id={field.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      </div>
    );
  }

  if (field.type === "string-list") {
    return (
      <StringListEditor
        label={field.label}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (field.type === "object-list") {
    return (
      <ObjectListEditor
        label={field.label}
        itemFields={field.itemFields}
        value={value}
        onChange={onChange}
      />
    );
  }

  return null;
}

function StringListEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const items: string[] = React.useMemo(() => {
    try {
      return JSON.parse(value || "[]");
    } catch {
      return [];
    }
  }, [value]);

  function updateItem(index: number, val: string) {
    const next = [...items];
    next[index] = val;
    onChange(JSON.stringify(next));
  }

  function addItem() {
    onChange(JSON.stringify([...items, ""]));
  }

  function removeItem(index: number) {
    onChange(JSON.stringify(items.filter((_, i) => i !== index)));
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        Tambah Item
      </Button>
    </div>
  );
}

function ObjectListEditor({
  label,
  itemFields,
  value,
  onChange,
}: {
  label: string;
  itemFields: { key: string; label: string; type?: "text" | "textarea" }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const items: Record<string, string>[] = React.useMemo(() => {
    try {
      return JSON.parse(value || "[]");
    } catch {
      return [];
    }
  }, [value]);

  function updateItem(index: number, fieldKey: string, val: string) {
    const next = [...items];
    next[index] = { ...next[index], [fieldKey]: val };
    onChange(JSON.stringify(next));
  }

  function addItem() {
    const newItem: Record<string, string> = {};
    for (const f of itemFields) {
      newItem[f.key] = "";
    }
    onChange(JSON.stringify([...items, newItem]));
  }

  function removeItem(index: number) {
    onChange(JSON.stringify(items.filter((_, i) => i !== index)));
  }

  function moveItem(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(JSON.stringify(next));
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Item {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {itemFields.map((f) => (
                  <div
                    key={f.key}
                    className={
                      f.type === "textarea" ? "sm:col-span-2" : ""
                    }
                  >
                    <Label className="text-xs">{f.label}</Label>
                    {f.type === "textarea" ? (
                      <Textarea
                        value={item[f.key] ?? ""}
                        onChange={(e) =>
                          updateItem(index, f.key, e.target.value)
                        }
                        rows={2}
                        className="mt-1"
                      />
                    ) : (
                      <Input
                        value={item[f.key] ?? ""}
                        onChange={(e) =>
                          updateItem(index, f.key, e.target.value)
                        }
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        Tambah Item
      </Button>
    </div>
  );
}
