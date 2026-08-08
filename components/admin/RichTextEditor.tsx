"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  BoldIcon,
  ItalicIcon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  LinkIcon,
  ImageIcon,
  Undo2Icon,
  Redo2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  icon: Icon,
  onClick,
  isActive,
  label,
}: {
  icon: React.ElementType;
  onClick: () => void;
  isActive?: boolean;
  label: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={onClick}
      className={cn(isActive && "bg-muted text-foreground")}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("URL Gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
      <ToolbarButton
        icon={BoldIcon}
        label="Tebal"
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={ItalicIcon}
        label="Miring"
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <div className="mx-1 h-6 w-px bg-border" />
      <ToolbarButton
        icon={Heading2Icon}
        label="Heading 2"
        isActive={editor.isActive("heading", { level: 2 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      />
      <ToolbarButton
        icon={Heading3Icon}
        label="Heading 3"
        isActive={editor.isActive("heading", { level: 3 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      />
      <div className="mx-1 h-6 w-px bg-border" />
      <ToolbarButton
        icon={ListIcon}
        label="Daftar"
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={ListOrderedIcon}
        label="Daftar bernomor"
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        icon={QuoteIcon}
        label="Kutipan"
        isActive={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <div className="mx-1 h-6 w-px bg-border" />
      <ToolbarButton
        icon={LinkIcon}
        label="Tautan"
        isActive={editor.isActive("link")}
        onClick={addLink}
      />
      <ToolbarButton
        icon={ImageIcon}
        label="Gambar"
        onClick={addImage}
      />
      <div className="mx-1 h-6 w-px bg-border" />
      <ToolbarButton
        icon={Undo2Icon}
        label="Batal"
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        icon={Redo2Icon}
        label="Ulangi"
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="min-h-[360px] rounded-md border border-border bg-muted/30" />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
