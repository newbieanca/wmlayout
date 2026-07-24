import { useState } from "react";
import { SlotImage, SlotBackground } from "@/components/SlotImage";
import { EditableText } from "@/components/EditableText";
import { Checklist } from "@/components/Checklist";
import { CustomLayer } from "@/components/CustomLayer";
import { ProductionSimForm } from "@/components/ProductionSimForm";
import { ChevronRight, Play, Target, Users, ClipboardList, ShieldCheck, BarChart3, ChevronDown, Boxes, Truck, Factory, Package, Wrench, ClipboardCheck, Map as MapIcon, AlertTriangle, CircleDot, ArrowRight, CheckCircle2, ArrowDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

/* ---------- Shared shells ---------- */
export function SlideShell({ children, kicker, title, className = "", slideKey, titleKey }: { children: React.ReactNode; kicker?: string; title?: string; className?: string; slideKey?: string; titleKey?: string }) {
  return (
    <div className={`relative h-full w-full flex flex-col p-8 md:p-12 overflow-auto ${className}`}>
      {kicker && <div className="chip w-fit mb-4">{kicker}</div>}
      {title && (
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
          {titleKey ? <EditableText contentKey={titleKey} defaultValue={title} /> : title}
        </h1>
      )}
      <div className="flex-1 min-h-0">{children}</div>
      {slideKey && <CustomLayer slideKey={slideKey} />}
    </div>
  );
}

const Chip = ({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "safety" | "steel" }) => {
  const tones = { navy: "bg-navy text-white", safety: "bg-safety text-navy", steel: "bg-steel text-white" };
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold ${tones[tone]}`}>{children}</span>;
};

/* ---------- Slide 1 — Cover ---------- */
export function Slide1() {
  return (
    <SlotBackground slotKey="s1_cover" className="h-full w-full bg-blueprint text-white">
      <div className="h-full flex flex-col justify-between p-10 md:p-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-safety flex items-center justify-center">
            <Factory className="w-5 h-5 text-navy" />
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-white/70">
            <EditableText contentKey="s1_company" defaultValue="PT Sharp Electronics Indonesia" />
            {" · "}
            <EditableText contentKey="s1_dept" defaultValue="Washing Machine Division" />
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="font-mono text-safety text-sm uppercase tracking-widest mb-4">01 / 15 — Cover</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            Production Flow<br />&amp; Layout Process
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-8">
            Washing Machine Production Line
          </p>
          <div className="font-mono text-sm text-white/60">
            <EditableText contentKey="s1_date" defaultValue="Tanggal: __ / __ / ____" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="safety-stripe h-2 w-40 rounded" />
          <div className="text-xs font-mono uppercase tracking-widest text-white/60">
            Internal Training — Leader &amp; Operator
          </div>
        </div>
      </div>
    </SlotBackground>
  );
}

/* ---------- Slide 2 — Tujuan & Ruang Lingkup ---------- */
export function Slide2() {
  const scope = [
    "Gambaran umum line produksi",
    "Production flow dari material hingga produk selesai",
    "Layout area produksi",
    "Material flow",
    "Quality control point",
    "Peran setiap personel dalam proses produksi",
    "Safety point dan standard working",
  ];
  return (
    <SlideShell kicker="02 / 14  ·  Tujuan" title="Tujuan & Ruang Lingkup" slideKey="s2" titleKey="s2_title">
      <div className="grid md:grid-cols-3 gap-6 h-full">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-navy text-white rounded-xl p-6 border-l-4 border-safety">
            <div className="flex items-center gap-2 mb-2 text-safety">
              <Target className="w-4 h-4" /><span className="font-mono text-xs uppercase tracking-widest">Tujuan</span>
            </div>
            <p className="text-lg leading-relaxed">
              Memberikan pemahaman mengenai <strong className="text-safety">alur proses produksi</strong> dan <strong className="text-safety">tata letak area kerja</strong> pada Washing Machine Production.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-navy/10 p-6">
            <div className="flex items-center gap-2 mb-4 text-navy">
              <ClipboardList className="w-4 h-4" /><span className="font-mono text-xs uppercase tracking-widest">Scope</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {scope.map((s, i) => (
                <li key={i} className="flex gap-2 items-start text-sm">
                  <span className="font-mono text-safety font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-navy/10 p-6">
          <div className="flex items-center gap-2 mb-4 text-navy">
            <Users className="w-4 h-4" /><span className="font-mono text-xs uppercase tracking-widest">Audience</span>
          </div>
          <div className="space-y-3">
            {["Operator Baru", "Leader", "Staff Produksi"].map((a) => (
              <div key={a} className="flex items-center gap-3 p-3 bg-surface rounded-lg border-l-4 border-steel">
                <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-mono text-xs">
                  {a.charAt(0)}
                </span>
                <span className="font-semibold text-navy">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 3 — Overview ---------- */
export function Slide3() {
  const objectives = ["Safety", "Quality", "Delivery", "Cost", "Productivity"];
  return (
    <SlideShell kicker="03 / 14  ·  Overview" title="Overview Line Produksi WM" slideKey="s3" titleKey="s3_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-navy/10 overflow-hidden">
              <SlotImage slotKey="s3_twin" aspect="aspect-[4/3]" rounded="rounded-none" placeholderLabel="Foto Twin Tub" />
              <div className="p-3">
                <div className="text-xs font-mono text-steel uppercase">Product</div>
                <div className="font-bold text-navy">Twin Tub WM</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-navy/10 overflow-hidden">
              <SlotImage slotKey="s3_fullauto" aspect="aspect-[4/3]" rounded="rounded-none" placeholderLabel="Foto Full Auto" />
              <div className="p-3">
                <div className="text-xs font-mono text-steel uppercase">Product</div>
                <div className="font-bold text-navy">Full Automatic WM</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy text-white rounded-xl p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-safety mb-2">Production Line</div>
              <div className="flex gap-3">
                <div className="flex-1 border border-white/20 rounded-lg p-3 text-center">
                  <div className="font-display text-3xl font-bold">A</div><div className="text-xs text-white/60">Line</div>
                </div>
                <div className="flex-1 border border-white/20 rounded-lg p-3 text-center">
                  <div className="font-display text-3xl font-bold">B</div><div className="text-xs text-white/60">Line</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-navy/10 rounded-xl p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-steel mb-2">Production System</div>
              <ul className="space-y-1 text-sm">
                <li>• Flow Line Assembly</li>
                <li>• One Piece Flow (beberapa proses)</li>
                <li>• Continuous Production</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-navy to-steel rounded-xl p-6 text-white">
            <div className="text-xs font-mono uppercase tracking-widest text-safety mb-3">Main Objective</div>
            <div className="flex flex-wrap gap-2">
              {objectives.map((o) => <Chip key={o} tone="safety">{o}</Chip>)}
            </div>
          </div>
          <div className="bg-white border border-navy/10 rounded-xl p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-steel mb-3">Target</div>
            <ul className="space-y-3">
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-safety text-navy font-mono text-xs font-bold flex items-center justify-center shrink-0">1</span><span className="text-sm">Mencapai target output harian sesuai Production Plan.</span></li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-safety text-navy font-mono text-xs font-bold flex items-center justify-center shrink-0">2</span><span className="text-sm">Menjaga kualitas produk sesuai standar perusahaan.</span></li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-safety text-navy font-mono text-xs font-bold flex items-center justify-center shrink-0">3</span><span className="text-sm">Meminimalkan defect dan downtime.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 4 — Flow Overview ---------- */
export function Slide4() {
  const stages = [
    { name: "Incoming Material", desc: "Material dari supplier diterima dan diverifikasi." },
    { name: "CMC", desc: "Material dikelola CMC sebelum didistribusikan ke line." },
    { name: "Part Preparation", desc: "Persiapan part sesuai kebutuhan proses berikutnya." },
    { name: "Sub Assembly", desc: "Perakitan komponen menjadi sub-unit." },
    { name: "Main Assembly Line", desc: "Sub assembly dirakit menjadi unit lengkap." },
    { name: "Functional Testing", desc: "Pengujian fungsi unit." },
    { name: "Appearance Inspection", desc: "Pemeriksaan visual." },
    { name: "Packing", desc: "Cleaning, accessory check, carton packing." },
    { name: "Finished Goods", desc: "Produk jadi disimpan." },
    { name: "Shipping", desc: "Produk dikirim ke customer/distributor." },
  ];
  const [active, setActive] = useState(0);
  return (
    <SlideShell kicker="04 / 14  ·  Flow" title="Alur Proses Produksi — Overview" slideKey="s4" titleKey="s4_title">
      <div className="grid md:grid-cols-12 gap-6 h-full">
        <div className="md:col-span-7 grid grid-cols-2 gap-2 content-start">
          {stages.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3 ${active === i ? "bg-navy text-white border-safety" : "bg-white border-navy/10 hover:border-steel text-navy"}`}>
              <span className={`font-mono text-xs font-bold ${active === i ? "text-safety" : "text-steel"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="md:col-span-5 bg-navy text-white rounded-xl p-6 border-l-4 border-safety">
          <div className="text-xs font-mono uppercase tracking-widest text-safety mb-2">
            Tahap {String(active + 1).padStart(2, "0")}
          </div>
          <h3 className="text-2xl font-bold mb-4">{stages[active].name}</h3>
          <p className="text-white/80 leading-relaxed">{stages[active].desc}</p>
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50">
            <CircleDot className="w-3 h-3 text-safety" />
            Klik tahap lain untuk melihat detail
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 5 — Sub Assembly ---------- */
export function Slide5() {
  return (
    <SlideShell kicker="05 / 14  ·  Sub Assembly" title="Sub Assembly Process (Full Automatic WM)" slideKey="s5" titleKey="s5_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <SlotImage slotKey="s5_subassy" aspect="aspect-[4/3]" placeholderLabel="Foto Sub Assembly" />
          <div className="mt-4 bg-navy text-white p-5 rounded-xl">
            <div className="flex items-center gap-2 text-safety text-xs font-mono uppercase tracking-widest mb-1"><Wrench className="w-3.5 h-3.5" />Tujuan</div>
            <p className="text-sm">Merakit komponen menjadi sub-unit sebelum dipasang ke unit produk.</p>
          </div>
        </div>
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white border border-navy/10 rounded-xl p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-steel mb-4">Sub Assy Assembly</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Cabinet", "Rangka utama unit"],
                ["Potting", "PWB in-house TV Factory"],
                ["Innertub", "Tabung dalam"],
                ["Balancer", "In-house AC Factory"],
              ].map(([n, d]) => (
                <div key={n} className="p-4 bg-surface rounded-lg border-l-4 border-safety">
                  <div className="font-bold text-navy">{n}</div>
                  <div className="text-xs text-steel">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-safety/15 border border-safety rounded-xl p-5 flex items-center gap-4">
            <ArrowRight className="w-6 h-6 text-navy shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase text-navy tracking-widest">Output</div>
              <div className="font-bold text-navy">Sub Assembly siap dikirim ke Main Assembly Line.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 6 — Main Assembly ---------- */
export function Slide6() {
  return (
    <SlideShell kicker="06 / 14  ·  Main Line" title="Main Assembly Line" slideKey="s6" titleKey="s6_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <SlotImage slotKey="s6_main" aspect="aspect-[16/8]" placeholderLabel="Foto Main Assembly" />
          <div className="bg-navy text-white rounded-xl p-5 border-l-4 border-safety">
            <div className="text-xs font-mono uppercase tracking-widest text-safety mb-1">Tujuan</div>
            <p>Merakit seluruh sub assembly menjadi produk washing machine lengkap.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-navy/10 rounded-xl p-4">
              <Chip tone="navy">Twin Tub</Chip>
              <div className="mt-3 text-xs font-mono text-steel uppercase">Input</div>
              <div className="text-sm text-navy font-semibold">Tub &amp; Base Line</div>
            </div>
            <div className="bg-white border border-navy/10 rounded-xl p-4">
              <Chip tone="steel">Full Auto</Chip>
              <div className="mt-3 text-xs font-mono text-steel uppercase">Input</div>
              <div className="text-sm text-navy font-semibold">Cabinet</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 bg-white border border-navy/10 rounded-xl p-6">
          <div className="flex items-center gap-2 text-navy mb-3">
            <AlertTriangle className="w-4 h-4 text-safety" />
            <span className="font-mono text-xs uppercase tracking-widest">Critical Point — Centang bila sudah dicek</span>
          </div>
          <Checklist storageKey="s6_critical"
            items={[
              "Kesalahan pemasangan part",
              "Wiring salah",
              "Torque tidak sesuai",
              "Missing part",
            ]} />
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 7 — Inspection ---------- */
export function Slide7() {
  return (
    <SlideShell kicker="07 / 14  ·  QC" title="Inspection Process" slideKey="s7" titleKey="s7_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <SlotImage slotKey="s7_inspection" aspect="aspect-square" placeholderLabel="Foto Inspection" />
        </div>
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white border border-navy/10 rounded-xl p-5">
            <p className="text-navy">Pemeriksaan fungsi dan visual akhir sebelum unit masuk ke tahap finishing dan packing.</p>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-steel mb-2">Quality Criteria</div>
            <div className="grid grid-cols-3 gap-3">
              {["Visual Appearance", "Functional Check", "Label Verification"].map((c) => (
                <div key={c} className="bg-navy text-white p-4 rounded-lg text-center">
                  <ClipboardCheck className="w-6 h-6 text-safety mx-auto mb-2" />
                  <div className="text-sm font-semibold">{c}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="safety-stripe rounded-xl p-1">
            <div className="bg-navy text-white rounded-lg p-6 text-center">
              <div className="text-xs font-mono uppercase tracking-widest text-safety mb-1">Target</div>
              <div className="font-display text-4xl font-bold">ZERO DEFECT</div>
              <div className="text-sm text-white/70 mt-1">kepada Customer</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 8 — Packing ---------- */
export function Slide8() {
  const steps = ["Cleaning Product", "Accessory Check", "Carton Packing", "Labeling", "Barcode Verification"];
  return (
    <SlideShell kicker="08 / 14  ·  Packing" title="Packing Process" slideKey="s8" titleKey="s8_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-white border border-navy/10 rounded-xl p-4 hover:border-safety transition-colors">
                <div className="w-12 h-12 rounded bg-navy text-safety flex items-center justify-center font-display text-xl font-bold shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-navy flex-1">{s}</div>
                <ArrowRight className="w-5 h-5 text-steel" />
              </div>
            ))}
          </div>
          <div className="mt-5 bg-safety/15 border border-safety rounded-xl p-4 flex items-center gap-3">
            <Package className="w-5 h-5 text-navy" />
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-navy">Output</div>
              <div className="font-bold text-navy">Finished Product siap disimpan di Finished Goods.</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <SlotImage slotKey="s8_packing" aspect="aspect-[3/4]" placeholderLabel="Foto Packing" />
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 9 — Layout Pabrik ---------- */
export function Slide9() {
  const stations = [
    { name: "Part Preparation", desc: "Persiapan part sesuai kebutuhan proses berikutnya." },
    { name: "Sub Assembly", desc: "Perakitan komponen menjadi sub-unit." },
    { name: "Main Assembly", desc: "Sub assembly dirakit menjadi unit lengkap." },
    { name: "Inspection", desc: "Pemeriksaan fungsi & visual." },
    { name: "Packing", desc: "Cleaning, accessory, carton, labeling." },
    { name: "FG Warehouse", desc: "Penyimpanan produk jadi sebelum shipping." },
  ];
  return (
    <SlideShell kicker="09 / 14  ·  Layout" title="Layout Pabrik / Line" slideKey="s9" titleKey="s9_title">
      <div className="grid md:grid-cols-12 gap-6 h-full">
        <div className="md:col-span-8">
          <SlotImage slotKey="s9_layout" aspect="aspect-[16/9]" placeholderLabel="Upload denah layout line di Settings" />
          <div className="mt-3 text-xs font-mono text-steel">
            <MapIcon className="inline w-3 h-3 mr-1" />
            Denah aktual line — upload di Settings › Slide 9
          </div>
          <div className="mt-4">
            <EditableText contentKey="s9_notes" defaultValue="Klik dua kali untuk menambahkan catatan denah — misalnya area line A, area line B, lokasi mesin, dll."
              className="block text-sm text-navy bg-white border border-navy/10 rounded-lg p-4" multiline as="div" />
          </div>
        </div>
        <div className="md:col-span-4 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-steel mb-2">Alur Stasiun (hover untuk detail)</div>
          {stations.map((s, i) => (
            <div key={i} className="group relative bg-white border border-navy/10 rounded-lg p-3 hover:border-safety hover:shadow-md transition-all cursor-help">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-navy text-safety font-mono text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-sm font-semibold text-navy">{s.name}</span>
                {i < stations.length - 1 && <ChevronDown className="w-3 h-3 text-steel ml-auto" />}
              </div>
              <div className="absolute left-full ml-2 top-0 z-20 w-56 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-navy text-white text-xs p-3 rounded-lg shadow-lg">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 10 — Titik Kritis ---------- */
export function Slide10() {
  const items = [
    { key: "s10_bottleneck", title: "Area Bottleneck", desc: "Identifikasi titik proses dengan cycle time terpanjang atau antrian material.", tone: "bg-destructive/10 border-destructive" },
    { key: "s10_qc", title: "Titik QC / Inspeksi", desc: "Lokasi pemeriksaan kualitas di sepanjang line.", tone: "bg-safety/10 border-safety" },
    { key: "s10_storage", title: "Area Penyimpanan Part", desc: "Buffer stock part untuk kelancaran supply line.", tone: "bg-steel/10 border-steel" },
    { key: "s10_safety", title: "Jalur Evakuasi / Safety", desc: "Jalur evakuasi darurat & titik kumpul.", tone: "bg-navy/10 border-navy" },
  ];
  return (
    <SlideShell kicker="10 / 15  ·  Critical" title="Titik Kritis dalam Layout">
      <div className="grid md:grid-cols-2 gap-4 h-full">
        {items.map((it) => (
          <div key={it.key} className={`rounded-xl border-l-4 ${it.tone} bg-white overflow-hidden flex flex-col`}>
            <SlotImage slotKey={it.key} aspect="aspect-[16/9]" rounded="rounded-none" placeholderLabel={it.title} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-safety" />
                <h3 className="font-bold text-navy">{it.title}</h3>
              </div>
              <p className="text-sm text-ink/80">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 11 — Material Flow ---------- */
export function Slide11() {
  const flow = ["Supplier", "Warehouse", "Part Preparation", "Sub Assembly", "Main Assembly", "Inspection", "Packing", "Finished Goods"];
  return (
    <SlideShell kicker="10 / 14  ·  Material Flow" title="Alur Material (Material Flow)" slideKey="s11" titleKey="s11_title">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {flow.map((f, i) => (
              <div key={f} className="relative">
                <div className={`p-3 rounded-lg text-center text-sm font-semibold border-2 ${i === 3 ? "bg-safety text-navy border-safety" : "bg-white border-navy/15 text-navy"}`}>
                  <div className="font-mono text-[10px] text-steel">{String(i + 1).padStart(2, "0")}</div>
                  {f}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-navy text-white rounded-xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-safety mb-3">Detail Sub Assembly</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Chip tone="safety">FA</Chip>
                <div className="mt-2 text-sm">Cabinet · Potting · Innertub</div>
              </div>
              <div>
                <Chip tone="safety">TWT</Chip>
                <div className="mt-2 text-sm">Top Cover · Control Panel</div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="bg-white border border-navy/10 rounded-xl p-5 h-full">
            <div className="text-xs font-mono uppercase tracking-widest text-steel mb-3">Objective — 4 Right</div>
            <div className="flex flex-wrap gap-2">
              {["Right Part", "Right Quantity", "Right Time", "Right Location"].map((r) => (
                <Chip key={r} tone="navy">{r}</Chip>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-ink/80">
              <div className="flex items-start gap-2"><Truck className="w-4 h-4 text-safety mt-0.5 shrink-0" /> Material handler bertanggung jawab memastikan 4 Right terpenuhi di setiap stasiun.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 12 — Peran ---------- */
export function Slide12() {
  const roles = [
    { key: "s12_leader", title: "Production Leader", items: ["Mengontrol target produksi", "Menyelesaikan masalah produksi", "Monitoring kualitas", "Relasi cross-department"] },
    { key: "s12_operator", title: "Operator", items: ["Melaksanakan Work Instruction", "Menjaga kualitas proses", "Self inspection terhadap part terkait", "Menjaga area kerja tetap bersih"] },
    { key: "s12_qi", title: "Quality Inspector", items: ["Melakukan inspeksi", "Mencatat defect", "Mengontrol kualitas produk"] },
    { key: "s12_mh", title: "Material Handler", items: ["Menyediakan material", "Menjaga kelancaran supply line", "Mengontrol stok line"] },
  ];
  return (
    <SlideShell kicker="11 / 14  ·  Roles" title="Peran Leader & Operator dalam Flow" slideKey="s12" titleKey="s12_title">
      <div className="grid md:grid-cols-2 gap-4 h-full">
        {roles.map((r) => (
          <div key={r.key} className="bg-white border border-navy/10 rounded-xl overflow-hidden flex">
            <div className="w-28 shrink-0">
              <SlotImage slotKey={r.key} aspect="aspect-auto" rounded="rounded-none" className="h-full" placeholderLabel={r.title} />
            </div>
            <div className="p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-safety" />
                <h3 className="font-bold text-navy">{r.title}</h3>
              </div>
              <ul className="space-y-1">
                {r.items.map((it) => (
                  <li key={it} className="text-xs text-ink/80 flex gap-2"><span className="text-safety">›</span>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 13 — Standar & Safety ---------- */
export function Slide13() {
  return (
    <SlideShell kicker="12 / 14  ·  Safety" title="Standar Kerja & Safety Point" slideKey="s13" titleKey="s13_title">
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-navy/10 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><ClipboardCheck className="w-4 h-4 text-safety" /><h3 className="font-bold text-navy">Standard Work</h3></div>
            <Checklist storageKey="s13_std" items={["Mengikuti SOP", "Mengikuti Work Instruction", "Mengikuti Standard Cycle Time", "Menggunakan alat sesuai standar"]} />
          </div>
          <div className="bg-white border border-navy/10 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-safety" /><h3 className="font-bold text-navy">Safety Point</h3></div>
            <Checklist storageKey="s13_safe" items={["Menggunakan APD", "Memastikan area kerja aman", "Menjaga implementasi 5S"]} />
          </div>
          <div className="bg-navy text-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><Boxes className="w-4 h-4 text-safety" /><h3 className="font-bold text-white">5S</h3></div>
            <Checklist storageKey="s13_5s" items={["Seiri (Ringkas)", "Seiton (Rapi)", "Seiso (Resik)", "Seiketsu (Rawat)", "Shitsuke (Rajin)"]} />
          </div>
        </div>
        <ProductionSimForm />
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 14 — Data ---------- */
export function Slide14() {
  const [tab, setTab] = useState<"output" | "defect">("output");
  const output = [
    { name: "Shift 1", unit: 420 },
    { name: "Shift 2", unit: 405 },
    { name: "Shift 3", unit: 380 },
  ];
  const defect = [
    { name: "Wk1", rate: 1.8 },
    { name: "Wk2", rate: 1.5 },
    { name: "Wk3", rate: 1.2 },
    { name: "Wk4", rate: 0.9 },
  ];
  return (
    <SlideShell kicker="13 / 14  ·  Data" title="Data Pendukung (Contoh)" slideKey="s14" titleKey="s14_title">
      <div className="grid md:grid-cols-12 gap-6 h-full">
        <div className="md:col-span-8 bg-white border border-navy/10 rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button onClick={() => setTab("output")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "output" ? "bg-navy text-white" : "bg-surface text-navy"}`}>
                Output per Shift
              </button>
              <button onClick={() => setTab("defect")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "defect" ? "bg-navy text-white" : "bg-surface text-navy"}`}>
                NG / Defect Rate
              </button>
            </div>
            <BarChart3 className="w-5 h-5 text-steel" />
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              {tab === "output" ? (
                <BarChart data={output}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DBE2" />
                  <XAxis dataKey="name" stroke="#16324A" />
                  <YAxis stroke="#16324A" />
                  <Tooltip />
                  <Bar dataKey="unit" fill="#F2A93C" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={defect}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DBE2" />
                  <XAxis dataKey="name" stroke="#16324A" />
                  <YAxis stroke="#16324A" />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#16324A" strokeWidth={3} dot={{ fill: "#F2A93C", r: 5 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-xs font-mono text-steel">Catatan: contoh data — ganti dengan data aktual di lapangan.</div>
        </div>
        <div className="md:col-span-4 space-y-3">
          <SlotImage slotKey="s14_data" aspect="aspect-[4/3]" placeholderLabel="Foto pendukung data" />
          <div className="bg-navy text-white rounded-xl p-4">
            <div className="text-xs font-mono uppercase tracking-widest text-safety mb-1">Insight</div>
            <p className="text-sm">Defect rate menurun tiap minggu — hasil implementasi standard work &amp; self-inspection.</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Slide 15 — Kesimpulan ---------- */
export function Slide15() {
  const summary = [
    "Production Flow dimulai dari material hingga Finished Goods.",
    "Layout dirancang untuk mendukung efisiensi dan keselamatan kerja.",
    "Quality Control dilakukan di setiap tahap proses.",
    "Material Flow harus lancar untuk menjaga target produksi.",
    "Standard Work dan Safety menjadi kunci keberhasilan proses produksi.",
  ];
  return (
    <SlideShell kicker="14 / 14  ·  Summary" title="Kesimpulan" slideKey="s15" titleKey="s15_title">
      <div className="grid md:grid-cols-12 gap-6 h-full">
        <div className="md:col-span-8 space-y-3">
          {summary.map((s, i) => (
            <div key={i} className="flex items-start gap-4 bg-white border border-navy/10 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-safety text-navy flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-steel">POIN {String(i + 1).padStart(2, "0")}</div>
                <div className="text-navy font-semibold">{s}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-4 bg-blueprint text-white rounded-xl p-8 flex flex-col justify-between">
          <div>
            <div className="chip w-fit mb-4">Q&amp;A</div>
            <h2 className="font-display text-4xl font-bold leading-tight">Terima Kasih</h2>
            <p className="text-white/70 mt-2">Silakan diskusi &amp; tanya jawab.</p>
          </div>
          <div className="safety-stripe h-2 w-32 rounded" />
        </div>
      </div>
    </SlideShell>
  );
}

export const SLIDE_COMPONENTS = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15];
