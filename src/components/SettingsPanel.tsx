import { useState, useRef } from "react";
import { X, Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";
import { IMAGE_SLOTS, usePresentationStore, getSlot, saveSlot, resetSlot, uploadSlotImage, type ImageSlot } from "@/lib/presentation-store";
import { toast } from "sonner";

export function SettingsPanel({ open, onClose, jumpToSlide }: { open: boolean; onClose: () => void; jumpToSlide: (n: number) => void }) {
  usePresentationStore();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFile = async (key: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimum 5MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Hanya JPG, PNG, atau WebP yang diperbolehkan");
      return;
    }
    setUploadingKey(key);
    try {
      const existing = getSlot(key);
      const { url, path } = await uploadSlotImage(key, file);
      await saveSlot({ ...existing, slot_key: key, image_url: url, storage_path: path });
      toast.success("Gambar berhasil diunggah");
    } catch (e: any) {
      toast.error("Gagal upload: " + e.message);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleReset = async (key: string) => {
    if (!confirm("Hapus gambar ini?")) return;
    await resetSlot(key);
    toast.success("Gambar dihapus");
  };

  const updateSetting = async (key: string, patch: Partial<ImageSlot>) => {
    const existing = getSlot(key);
    await saveSlot({ ...existing, slot_key: key, ...patch });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside className={`fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-surface z-50 shadow-2xl transition-transform overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="sticky top-0 bg-navy text-white px-6 py-4 flex items-center justify-between shadow z-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-safety">Settings</div>
            <h2 className="font-display text-2xl font-bold">Kelola Gambar Slide</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-steel">
            Upload foto real dari lapangan (JPG/PNG/WebP, maks 5MB). Perubahan otomatis tersimpan &amp; muncul di slide.
          </p>
          {IMAGE_SLOTS.map((cfg) => {
            const slot = getSlot(cfg.key);
            const isUploading = uploadingKey === cfg.key;
            return (
              <div key={cfg.key} className="bg-white rounded-xl border border-navy/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-navy/5 border-b border-navy/10">
                  <div>
                    <div className="text-xs font-mono text-steel uppercase">Slot</div>
                    <div className="font-semibold text-navy text-sm">{cfg.label}</div>
                  </div>
                  <button
                    onClick={() => { onClose(); jumpToSlide(cfg.slide); }}
                    className="text-xs font-mono uppercase text-safety hover:underline"
                  >
                    Ke Slide {cfg.slide} →
                  </button>
                </div>
                <div className="p-4 grid grid-cols-[120px_1fr] gap-4">
                  <div className="aspect-square bg-hatch rounded-lg overflow-hidden border border-navy/10 flex items-center justify-center">
                    {slot.image_url ? (
                      <img src={slot.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-navy/30" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        ref={(el) => { fileRefs.current[cfg.key] = el; }}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(cfg.key, e.target.files[0])}
                      />
                      <button
                        onClick={() => fileRefs.current[cfg.key]?.click()}
                        disabled={isUploading}
                        className="flex-1 flex items-center justify-center gap-2 bg-navy text-white text-sm rounded-md py-2 px-3 hover:bg-navy/90 disabled:opacity-60"
                      >
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {slot.image_url ? "Ganti" : "Upload"}
                      </button>
                      {slot.image_url && (
                        <button onClick={() => handleReset(cfg.key)} className="w-9 h-9 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-white flex items-center justify-center">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="text-xs">
                        <span className="text-steel font-mono uppercase">Posisi</span>
                        <select value={slot.position} onChange={(e) => updateSetting(cfg.key, { position: e.target.value as any })}
                          className="w-full mt-1 border border-navy/15 rounded px-2 py-1 bg-white">
                          <option value="left">Kiri</option>
                          <option value="right">Kanan</option>
                          <option value="center">Tengah</option>
                          <option value="background">Background</option>
                        </select>
                      </label>
                      <label className="text-xs">
                        <span className="text-steel font-mono uppercase">Fit</span>
                        <select value={slot.object_fit} onChange={(e) => updateSetting(cfg.key, { object_fit: e.target.value as any })}
                          className="w-full mt-1 border border-navy/15 rounded px-2 py-1 bg-white">
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="stretch">Stretch</option>
                        </select>
                      </label>
                    </div>

                    <label className="text-xs block">
                      <div className="flex justify-between text-steel font-mono uppercase">
                        <span>Ukuran</span><span>{slot.size_percent}%</span>
                      </div>
                      <input type="range" min={50} max={100} value={slot.size_percent}
                        onChange={(e) => updateSetting(cfg.key, { size_percent: parseInt(e.target.value) })}
                        className="w-full accent-safety" />
                    </label>

                    {slot.position === "background" && (
                      <label className="text-xs block">
                        <div className="flex justify-between text-steel font-mono uppercase">
                          <span>Overlay Gelap</span><span>{slot.overlay_opacity}%</span>
                        </div>
                        <input type="range" min={0} max={80} value={slot.overlay_opacity}
                          onChange={(e) => updateSetting(cfg.key, { overlay_opacity: parseInt(e.target.value) })}
                          className="w-full accent-safety" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
