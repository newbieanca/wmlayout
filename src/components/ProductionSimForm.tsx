import { useState } from "react";
import { useContentValue } from "@/lib/presentation-store";
import { Plus, Trash2, ClipboardList } from "lucide-react";

type Entry = {
  id: string;
  date: string;
  output: { A: number; B: number; C: number; D: number; E: number };
  defect: { A: number; B: number; C: number; D: number; E: number };
};

const GROUPS = ["A", "B", "C", "D", "E"] as const;

const empty = () => ({ A: 0, B: 0, C: 0, D: 0, E: 0 });

export function ProductionSimForm() {
  const [raw, setRaw] = useContentValue("s13_simulation", "[]");
  let entries: Entry[] = [];
  try {
    const p = JSON.parse(raw);
    if (Array.isArray(p)) entries = p;
  } catch {}

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [output, setOutput] = useState(empty());
  const [defect, setDefect] = useState(empty());

  const save = (next: Entry[]) => setRaw(JSON.stringify(next));

  const add = () => {
    save([
      { id: crypto.randomUUID(), date, output: { ...output }, defect: { ...defect } },
      ...entries,
    ]);
    setOutput(empty());
    setDefect(empty());
  };

  const remove = (id: string) => save(entries.filter((e) => e.id !== id));

  const totalOutput = (e: Entry) => Object.values(e.output).reduce((a, b) => a + b, 0);
  const avgDefect = (e: Entry) => {
    const vals = Object.values(e.defect);
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
  };

  return (
    <div className="bg-white border border-navy/10 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-4 h-4 text-safety" />
        <h3 className="font-bold text-navy">Simulasi Produksi Harian</h3>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-3 items-start mb-3">
        <label className="text-xs font-mono uppercase text-steel self-center">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-navy/15 rounded px-2 py-1 text-sm w-full max-w-xs"
        />

        <label className="text-xs font-mono uppercase text-steel pt-2">Output</label>
        <div className="grid grid-cols-5 gap-2">
          {GROUPS.map((g) => (
            <label key={g} className="text-center">
              <div className="text-[10px] font-mono text-steel">Grup {g}</div>
              <input
                type="number"
                min={0}
                value={output[g]}
                onChange={(e) => setOutput({ ...output, [g]: parseInt(e.target.value) || 0 })}
                className="w-full border border-navy/15 rounded px-1 py-1 text-sm text-center"
              />
            </label>
          ))}
        </div>

        <label className="text-xs font-mono uppercase text-steel pt-2">Defect %</label>
        <div className="grid grid-cols-5 gap-2">
          {GROUPS.map((g) => (
            <label key={g} className="text-center">
              <div className="text-[10px] font-mono text-steel">Grup {g}</div>
              <input
                type="number"
                min={0}
                step={0.1}
                value={defect[g]}
                onChange={(e) => setDefect({ ...defect, [g]: parseFloat(e.target.value) || 0 })}
                className="w-full border border-navy/15 rounded px-1 py-1 text-sm text-center"
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={add}
        className="w-full bg-navy text-white rounded py-2 flex items-center justify-center gap-2 hover:bg-navy/90 text-sm font-semibold"
      >
        <Plus className="w-4 h-4" /> Simpan Simulasi
      </button>

      {entries.length > 0 && (
        <div className="mt-4 overflow-auto max-h-64">
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 bg-surface">
              <tr className="text-steel font-mono uppercase">
                <th className="p-2 text-left border-b border-navy/10">Tgl</th>
                {GROUPS.map((g) => (
                  <th key={`o${g}`} className="p-1 text-center border-b border-navy/10">O.{g}</th>
                ))}
                {GROUPS.map((g) => (
                  <th key={`d${g}`} className="p-1 text-center border-b border-navy/10 text-destructive">D.{g}</th>
                ))}
                <th className="p-1 text-center border-b border-navy/10 bg-safety/20">Total</th>
                <th className="p-1 text-center border-b border-navy/10 bg-safety/20">Avg%</th>
                <th className="border-b border-navy/10" />
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-surface">
                  <td className="p-2 font-mono">{e.date}</td>
                  {GROUPS.map((g) => (
                    <td key={`o${g}`} className="p-1 text-center">{e.output[g]}</td>
                  ))}
                  {GROUPS.map((g) => (
                    <td key={`d${g}`} className="p-1 text-center text-destructive">{e.defect[g]}</td>
                  ))}
                  <td className="p-1 text-center font-bold text-navy">{totalOutput(e)}</td>
                  <td className="p-1 text-center font-bold text-navy">{avgDefect(e)}</td>
                  <td className="p-1">
                    <button onClick={() => remove(e.id)} className="text-destructive hover:bg-destructive/10 rounded p-1">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
