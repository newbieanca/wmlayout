import { useContentValue } from "@/lib/presentation-store";
import { useState, useEffect, useRef } from "react";
import { Pencil } from "lucide-react";

export function EditableText({
  contentKey,
  defaultValue,
  className = "",
  multiline = false,
  as: Tag = "span",
}: {
  contentKey: string;
  defaultValue: string;
  className?: string;
  multiline?: boolean;
  as?: any;
}) {
  const [value, setValue] = useContentValue(contentKey, defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  if (editing) {
    const commit = () => { setValue(draft); setEditing(false); };
    if (multiline) {
      return (
        <textarea
          ref={inputRef as any}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          className={`${className} bg-white border-2 border-safety rounded px-2 py-1 w-full min-h-[6rem] font-sans`}
        />
      );
    }
    return (
      <input
        ref={inputRef as any}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
        className={`${className} bg-white border-2 border-safety rounded px-2 py-1`}
      />
    );
  }

  return (
    <Tag
      onDoubleClick={() => setEditing(true)}
      className={`${className} group relative cursor-text hover:bg-safety/10 rounded transition-colors`}
      title="Klik dua kali untuk edit"
    >
      {value}
      <Pencil className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />
    </Tag>
  );
}
