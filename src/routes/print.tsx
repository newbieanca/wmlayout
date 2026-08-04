import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SLIDES } from "@/components/slides/slide-data";
import { SLIDE_COMPONENTS } from "@/components/slides/Slides";

export const Route = createFileRoute("/print")({
  component: PrintView,
  head: () => ({
    meta: [
      { title: "Cetak PDF — Production Flow & Layout WM Line" },
      { name: "description", content: "Versi cetak seluruh slide Production Flow & Layout Process untuk washing machine production line." },
      { property: "og:title", content: "Cetak PDF — Production Flow & Layout WM Line" },
      { property: "og:description", content: "Versi cetak seluruh slide Production Flow & Layout Process untuk washing machine production line." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PrintView() {
  useEffect(() => {
    document.body.classList.add("print-mode");
    const t = setTimeout(() => {
      if (new URLSearchParams(window.location.search).get("auto") !== "0") window.print();
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("print-mode");
    };
  }, []);

  return (
    <div className="print-root bg-surface">
      <div className="no-print sticky top-0 z-50 bg-navy text-white px-4 py-3 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest">Mode Cetak — {SLIDES.length} slide</span>
        <div className="flex-1" />
        <button onClick={() => window.print()} className="bg-safety text-navy px-3 py-1.5 rounded text-sm font-semibold">
          Cetak / Simpan PDF
        </button>
        <a href="/" className="bg-white/10 px-3 py-1.5 rounded text-sm">Kembali</a>
      </div>

      {SLIDE_COMPONENTS.map((Slide, i) => (
        <section key={i} className="print-slide">
          <Slide />
        </section>
      ))}
    </div>
  );
}
