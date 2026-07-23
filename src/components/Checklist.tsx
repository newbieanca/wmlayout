import { useContentValue } from "@/lib/presentation-store";
import { Check } from "lucide-react";

export function Checklist({ storageKey, items }: { storageKey: string; items: string[] }) {
  const [raw, setRaw] = useContentValue(storageKey, "");
  const checked = new Set(raw.split(",").filter(Boolean));
  const toggle = (i: number) => {
    const s = i.toString();
    if (checked.has(s)) checked.delete(s); else checked.add(s);
    setRaw(Array.from(checked).join(","));
  };
  const progress = items.length ? Math.round((checked.size / items.length) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-widest text-steel">Progress</span>
        <span className="text-xs font-mono text-navy font-bold">{checked.size}/{items.length}</span>
      </div>
      <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-safety transition-all" style={{ width: `${progress}%` }} />
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => {
          const on = checked.has(i.toString());
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-start gap-3 text-left p-3 rounded-md border transition-all ${on ? "bg-navy text-white border-navy" : "bg-white border-navy/15 hover:border-safety"}`}
              >
                <span className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${on ? "border-safety bg-safety" : "border-navy/40"}`}>
                  {on && <Check className="w-3.5 h-3.5 text-navy" strokeWidth={3} />}
                </span>
                <span className={`text-sm ${on ? "line-through opacity-80" : ""}`}>{it}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
