import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const img = t.closest("img[data-lightbox]") as HTMLImageElement | null;
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        setSrc(img.src);
      }
    };
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.src) setSrc(detail.src);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSrc(null);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("open-lightbox", onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("open-lightbox", onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
      onClick={() => setSrc(null)}
    >
      <button
        onClick={() => setSrc(null)}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-safety hover:text-navy transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt=""
        className="max-w-full max-h-full object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-widest">
        Klik di luar atau tekan ESC untuk menutup
      </div>
    </div>
  );
}
