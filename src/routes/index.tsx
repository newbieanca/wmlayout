import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { SLIDES } from "@/components/slides/slide-data";
import { SLIDE_COMPONENTS } from "@/components/slides/Slides";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Lightbox } from "@/components/Lightbox";
import { Toaster } from "sonner";
import { ChevronLeft, ChevronRight, Settings, Factory, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  component: PresentationApp,
});

function PresentationApp() {
  const [current, setCurrent] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const total = SLIDES.length;
  const goto = useCallback((n: number) => setCurrent(Math.max(0, Math.min(total - 1, n))), [total]);
  const Slide = SLIDE_COMPONENTS[current];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") goto(current + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") goto(current - 1);
      else if (e.key === "Home") goto(0);
      else if (e.key === "End") goto(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goto, total]);

  return (
    <div className="h-screen w-screen flex flex-col bg-surface overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="h-14 bg-navy text-white flex items-center px-4 gap-4 border-b-2 border-safety shrink-0 z-30">
        <button onClick={() => setSidebarOpen((v) => !v)} className="w-9 h-9 rounded hover:bg-white/10 flex items-center justify-center">
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-safety flex items-center justify-center">
            <Factory className="w-4 h-4 text-navy" />
          </div>
          <div className="hidden md:block">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 leading-none">WM Production</div>
            <div className="font-display font-semibold text-sm leading-tight">Production Flow &amp; Layout</div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="font-mono text-sm">
          <span className="text-safety font-bold">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-white/40"> / {String(total).padStart(2, "0")}</span>
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-safety hover:text-navy transition-colors px-3 py-1.5 rounded text-sm"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-14"} shrink-0 bg-white border-r border-navy/10 transition-all overflow-y-auto`}>
          <ul className="p-2 space-y-1">
            {SLIDES.map((s, i) => {
              const Icon = s.icon;
              const active = i === current;
              return (
                <li key={s.number}>
                  <button
                    onClick={() => goto(i)}
                    title={s.title}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all ${
                      active ? "bg-navy text-white" : "text-navy hover:bg-navy/5"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded shrink-0 flex items-center justify-center ${active ? "bg-safety text-navy" : "bg-surface text-navy"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {sidebarOpen && (
                      <div className="min-w-0 flex-1">
                        <div className={`text-[10px] font-mono ${active ? "text-safety" : "text-steel"}`}>
                          {String(s.number).padStart(2, "0")}
                        </div>
                        <div className="text-sm font-semibold truncate">{s.title}</div>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Slide viewport */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div key={current} className="flex-1 min-h-0 animate-in fade-in slide-in-from-right-4 duration-300 overflow-hidden">
            <Slide />
          </div>

          {/* Conveyor progress bar */}
          <div className="shrink-0 bg-white border-t border-navy/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => goto(current - 1)} disabled={current === 0}
                className="w-9 h-9 rounded bg-navy text-white flex items-center justify-center disabled:opacity-30 hover:bg-steel">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="relative flex-1 h-10 conveyor-track rounded overflow-hidden border border-navy/20">
                <div className="absolute inset-y-0 left-0 flex items-stretch w-full">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goto(i)}
                      className="flex-1 border-r border-black/20 hover:bg-white/10 relative group"
                      title={`Slide ${i + 1}`}
                    >
                      <span className={`absolute inset-x-1 top-1 h-1 rounded-full ${i <= current ? "bg-safety" : "bg-white/10"}`} />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono ${i === current ? "text-safety" : "text-white/40"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Moving box indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-6 bg-safety border-2 border-navy rounded shadow-lg transition-all duration-500 pointer-events-none"
                  style={{ left: `calc(${(current / Math.max(1, total - 1)) * 100}% - 16px)` }}
                >
                  <div className="w-full h-full flex items-center justify-center text-navy font-mono text-[9px] font-bold">
                    {String(current + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <button onClick={() => goto(current + 1)} disabled={current === total - 1}
                className="w-9 h-9 rounded bg-navy text-white flex items-center justify-center disabled:opacity-30 hover:bg-steel">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1.5 text-[10px] font-mono text-steel text-center uppercase tracking-widest">
              ← → Navigate  ·  Home/End Jump  ·  Klik conveyor untuk lompat
            </div>
          </div>
        </main>
      </div>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} jumpToSlide={(n) => goto(n - 1)} />
    </div>
  );
}
