import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Target, Factory, GitBranch, Wrench, Boxes,
  ClipboardCheck, Package, Map, AlertTriangle, Truck, Users,
  ShieldCheck, BarChart3, CheckCircle2,
} from "lucide-react";

export type SlideMeta = {
  number: number;
  title: string;
  icon: LucideIcon;
};

export const SLIDES: SlideMeta[] = [
  { number: 1, title: "Cover", icon: LayoutDashboard },
  { number: 2, title: "Tujuan & Ruang Lingkup", icon: Target },
  { number: 3, title: "Overview Line Produksi", icon: Factory },
  { number: 4, title: "Alur Proses — Overview", icon: GitBranch },
  { number: 5, title: "Sub Assembly", icon: Wrench },
  { number: 6, title: "Main Assembly Line", icon: Boxes },
  { number: 7, title: "Inspection Process", icon: ClipboardCheck },
  { number: 8, title: "Packing Process", icon: Package },
  { number: 9, title: "Layout Pabrik / Line", icon: Map },
  { number: 10, title: "Titik Kritis dalam Layout", icon: AlertTriangle },
  { number: 11, title: "Alur Material", icon: Truck },
  { number: 12, title: "Peran Leader & Operator", icon: Users },
  { number: 13, title: "Standar Kerja & Safety", icon: ShieldCheck },
  { number: 14, title: "Data Pendukung", icon: BarChart3 },
  { number: 15, title: "Kesimpulan", icon: CheckCircle2 },
];
