import { usePresentationStore, getSlot } from "@/lib/presentation-store";
import { ImageIcon } from "lucide-react";

type Props = {
  slotKey: string;
  className?: string;
  placeholderLabel?: string;
  aspect?: string;
  rounded?: string;
};

export function SlotImage({ slotKey, className = "", placeholderLabel, aspect = "aspect-video", rounded = "rounded-lg" }: Props) {
  usePresentationStore();
  const slot = getSlot(slotKey);
  const fit = slot.object_fit === "stretch" ? "object-fill" : slot.object_fit === "contain" ? "object-contain" : "object-cover";
  if (!slot.image_url) {
    return (
      <div className={`${aspect} ${rounded} bg-hatch border-2 border-dashed border-navy/30 flex flex-col items-center justify-center text-navy/50 ${className}`}>
        <ImageIcon className="w-8 h-8 mb-1" />
        <span className="text-xs font-mono uppercase tracking-wider">{placeholderLabel ?? "Belum ada gambar"}</span>
      </div>
    );
  }
  return (
    <div className={`${aspect} ${rounded} overflow-hidden bg-navy/5 ${className}`}>
      <img src={slot.image_url} alt="" className={`w-full h-full ${fit}`} style={{ width: `${slot.size_percent}%`, height: `${slot.size_percent}%`, margin: "auto" }} />
    </div>
  );
}

export function SlotBackground({ slotKey, children, className = "" }: { slotKey: string; children?: React.ReactNode; className?: string }) {
  usePresentationStore();
  const slot = getSlot(slotKey);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {slot.image_url && (
        <>
          <img src={slot.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy" style={{ opacity: slot.overlay_opacity / 100 }} />
        </>
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
