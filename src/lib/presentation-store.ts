import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ImageSlot = {
  slot_key: string;
  image_url: string | null;
  storage_path: string | null;
  position: "left" | "right" | "center" | "background";
  object_fit: "cover" | "contain" | "stretch";
  size_percent: number;
  overlay_opacity: number;
};

export type SlotConfig = {
  key: string;
  slide: number;
  label: string;
  defaultPosition?: ImageSlot["position"];
};

export const IMAGE_SLOTS: SlotConfig[] = [
  { key: "s1_cover", slide: 1, label: "Slide 1 — Background Cover", defaultPosition: "background" },
  { key: "s3_twin", slide: 3, label: "Slide 3 — Foto Twin Tub" },
  { key: "s3_fullauto", slide: 3, label: "Slide 3 — Foto Full Auto" },
  { key: "s5_subassy", slide: 5, label: "Slide 5 — Sub Assembly" },
  { key: "s6_main", slide: 6, label: "Slide 6 — Main Assembly" },
  { key: "s7_inspection", slide: 7, label: "Slide 7 — Inspection" },
  { key: "s8_packing", slide: 8, label: "Slide 8 — Packing" },
  { key: "s9_layout", slide: 9, label: "Slide 9 — Denah Layout Pabrik (PENTING)", defaultPosition: "center" },
  { key: "s10_bottleneck", slide: 10, label: "Slide 10 — Area Bottleneck" },
  { key: "s10_qc", slide: 10, label: "Slide 10 — Titik QC" },
  { key: "s10_storage", slide: 10, label: "Slide 10 — Area Storage Part" },
  { key: "s10_safety", slide: 10, label: "Slide 10 — Jalur Evakuasi" },
  { key: "s12_leader", slide: 12, label: "Slide 12 — Production Leader" },
  { key: "s12_operator", slide: 12, label: "Slide 12 — Operator" },
  { key: "s12_qi", slide: 12, label: "Slide 12 — Quality Inspector" },
  { key: "s12_mh", slide: 12, label: "Slide 12 — Material Handler" },
  { key: "s14_data", slide: 14, label: "Slide 14 — Foto Pendukung Data" },
];

const DEFAULT_SLOT: Omit<ImageSlot, "slot_key"> = {
  image_url: null,
  storage_path: null,
  position: "center",
  object_fit: "cover",
  size_percent: 100,
  overlay_opacity: 0,
};

type Store = {
  slots: Record<string, ImageSlot>;
  content: Record<string, string>;
  loading: boolean;
};

let cache: Store = { slots: {}, content: {}, loading: true };
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

async function loadAll() {
  const [slotsRes, contentRes] = await Promise.all([
    supabase.from("slide_image_slots").select("*"),
    supabase.from("slide_content").select("*"),
  ]);
  const slots: Record<string, ImageSlot> = {};
  (slotsRes.data ?? []).forEach((s: any) => {
    slots[s.slot_key] = s as ImageSlot;
  });
  const content: Record<string, string> = {};
  (contentRes.data ?? []).forEach((c: any) => {
    content[c.content_key] = c.value;
  });
  cache = { slots, content, loading: false };
  emit();
}

let loaded = false;
export function usePresentationStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const l = () => setTick((n) => n + 1);
    listeners.add(l);
    if (!loaded) {
      loaded = true;
      loadAll();
    }
    return () => { listeners.delete(l); };
  }, []);
  return cache;
}

export function getSlot(key: string): ImageSlot {
  return cache.slots[key] ?? { slot_key: key, ...DEFAULT_SLOT };
}

export async function saveSlot(slot: ImageSlot) {
  cache.slots[slot.slot_key] = slot;
  emit();
  await supabase.from("slide_image_slots").upsert({
    slot_key: slot.slot_key,
    image_url: slot.image_url,
    storage_path: slot.storage_path,
    position: slot.position,
    object_fit: slot.object_fit,
    size_percent: slot.size_percent,
    overlay_opacity: slot.overlay_opacity,
    updated_at: new Date().toISOString(),
  });
}

export async function resetSlot(key: string) {
  const existing = cache.slots[key];
  if (existing?.storage_path) {
    await supabase.storage.from("slide-images").remove([existing.storage_path]);
  }
  delete cache.slots[key];
  emit();
  await supabase.from("slide_image_slots").delete().eq("slot_key", key);
}

export async function uploadSlotImage(key: string, file: File): Promise<{ url: string; path: string }> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${key}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("slide-images").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw error;
  // Create long-lived signed URL (10 years)
  const { data, error: signErr } = await supabase.storage
    .from("slide-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signErr) throw signErr;
  return { url: data.signedUrl, path };
}

export function useContentValue(key: string, defaultValue: string): [string, (v: string) => void] {
  const store = usePresentationStore();
  const value = store.content[key] ?? defaultValue;
  const setValue = useCallback((v: string) => {
    cache.content[key] = v;
    emit();
    supabase.from("slide_content").upsert({
      content_key: key,
      value: v,
      updated_at: new Date().toISOString(),
    }).then();
  }, [key]);
  return [value, setValue];
}
