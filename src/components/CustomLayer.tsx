import { useContentValue } from "@/lib/presentation-store";
import { supabase } from "@/integrations/supabase/client";
import { useRef, useState } from "react";
import { Image as ImageIcon, Type, Trash2, Loader2 } from "lucide-react";

type BaseItem = { id: string; x: number; y: number; w: number; h: number };
type ImageItem = BaseItem & { type: "image"; url: string };
type TextItem = BaseItem & { type: "text"; text: string; fontSize: number; color: string; bg: string };
type Item = ImageItem | TextItem;

export function CustomLayer({ slideKey }: { slideKey: string }) {
  const [raw, setRaw] = useContentValue(`custom_layer_${slideKey}`, "[]");
  let items: Item[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) items = parsed;
  } catch {}

  const containerRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const draggedRef = useRef(false);

  const save = (next: Item[]) => setRaw(JSON.stringify(next));
  const update = (id: string, patch: Partial<Item>) =>
    save(items.map((it) => (it.id === id ? ({ ...it, ...patch } as Item) : it)));
  const remove = (id: string) => {
    save(items.filter((it) => it.id !== id));
    setSelectedId(null);
  };

  const addImage = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) return alert("Maks 5MB");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `custom/${slideKey}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("slide-images").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data, error: signErr } = await supabase.storage
        .from("slide-images")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signErr) throw signErr;
      save([
        ...items,
        { id: crypto.randomUUID(), type: "image", url: data.signedUrl, x: 20, y: 20, w: 30, h: 25 },
      ]);
    } catch (e: any) {
      alert("Gagal upload: " + e.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addText = () => {
    save([
      ...items,
      {
        id: crypto.randomUUID(),
        type: "text",
        text: "Teks baru — klik untuk edit",
        x: 25,
        y: 25,
        w: 30,
        h: 10,
        fontSize: 18,
        color: "#16324A",
        bg: "rgba(255,255,255,0.9)",
      },
    ]);
  };

  const startDrag = (e: React.PointerEvent, item: Item, mode: "move" | "resize") => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(item.id);
    draggedRef.current = false;
    const rect = containerRef.current!.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const orig = { x: item.x, y: item.y, w: item.w, h: item.h };
    const move = (ev: PointerEvent) => {
      const dx = ((ev.clientX - startX) / rect.width) * 100;
      const dy = ((ev.clientY - startY) / rect.height) * 100;
      if (Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 3) draggedRef.current = true;
      if (mode === "move") {
        update(item.id, {
          x: Math.max(0, Math.min(98 - orig.w, orig.x + dx)),
          y: Math.max(0, Math.min(98 - orig.h, orig.y + dy)),
        } as any);
      } else {
        update(item.id, {
          w: Math.max(5, Math.min(100 - orig.x, orig.w + dx)),
          h: Math.max(5, Math.min(100 - orig.y, orig.h + dy)),
        } as any);
      }
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-30" onClick={() => setSelectedId(null)}>
      {/* Toolbar */}
      <div className="custom-layer-toolbar no-print pointer-events-auto absolute top-2 right-2 flex gap-1 bg-white/95 border border-navy/20 rounded-lg shadow-md p-1 backdrop-blur-sm">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && addImage(e.target.files[0])}
        />
        <button
          onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
          disabled={uploading}
          title="Tambah gambar (drag untuk pindah, sudut untuk resize)"
          className="w-8 h-8 rounded hover:bg-navy/10 text-navy flex items-center justify-center disabled:opacity-50"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); addText(); }}
          title="Tambah teks"
          className="w-8 h-8 rounded hover:bg-navy/10 text-navy flex items-center justify-center"
        >
          <Type className="w-4 h-4" />
        </button>
      </div>

      {items.map((item) => {
        const selected = selectedId === item.id;
        return (
          <div
            key={item.id}
            className={`pointer-events-auto absolute group ${selected ? "ring-2 ring-safety" : "ring-1 ring-transparent hover:ring-safety/50"}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.w}%`,
              height: `${item.h}%`,
              cursor: selected ? "move" : "pointer",
            }}
            onPointerDown={(e) => startDrag(e, item, "move")}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(item.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (item.type === "image") {
                window.dispatchEvent(new CustomEvent("open-lightbox", { detail: { src: item.url } }));
              }
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            ) : (
              <textarea
                value={item.text}
                onChange={(e) => update(item.id, { text: e.target.value } as any)}
                onPointerDown={(e) => selected && e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: item.fontSize,
                  color: item.color,
                  background: item.bg,
                }}
                className="w-full h-full border border-navy/20 rounded p-2 outline-none resize-none font-sans"
              />
            )}

            {selected && (
              <>
                <div className="absolute -top-9 left-0 pointer-events-auto flex gap-1 bg-navy text-white text-xs rounded shadow px-1 py-0.5" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                  {item.type === "text" && (
                    <>
                      <input
                        type="number"
                        min={10}
                        max={80}
                        value={item.fontSize}
                        onChange={(e) => update(item.id, { fontSize: parseInt(e.target.value) || 16 } as any)}
                        className="w-12 bg-white/10 rounded px-1 text-white"
                        title="Ukuran font"
                      />
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => update(item.id, { color: e.target.value } as any)}
                        className="w-6 h-6 rounded"
                        title="Warna teks"
                      />
                    </>
                  )}
                  {item.type === "image" && (
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("open-lightbox", { detail: { src: item.url } }))}
                      className="px-2 hover:bg-white/10 rounded"
                    >
                      Lihat penuh
                    </button>
                  )}
                  <button
                    onClick={() => remove(item.id)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-destructive"
                    title="Hapus"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div
                  onPointerDown={(e) => startDrag(e, item, "resize")}
                  className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-safety border-2 border-navy cursor-se-resize rounded pointer-events-auto"
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
