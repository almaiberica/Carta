import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flame, List } from "lucide-react";

interface ModeSelectorProps {
  onSelectMode: (mode: "real" | "carta") => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3-step staggered entry
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.6,
            stagger: 0.15,
            ease: "back.out(1.2)",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="mode-selector-screen" className="flex flex-col justify-between items-center w-full h-full bg-[#050505] px-6 py-12 text-center select-none">
      {/* Decorative Top Accent */}
      <div className="w-12 h-[2px] bg-[#5E1914] mt-4" />

      {/* Main Branding Section */}
      <div className="my-auto flex flex-col items-center">
        <div ref={logoRef} className="flex flex-col items-center mb-3">
          <h1 className="font-serif italic text-[clamp(34px,10vw,48px)] tracking-[0.1em] uppercase leading-none text-white">
            Alma <span className="text-[#5E1914] font-serif not-italic font-bold tracking-widest">Ibérica</span>
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium font-sans px-4 py-2 border-y border-white/5"
        >
          Tapeo Selecto • Sant Boi de Llobregat
        </p>
      </div>

      {/* Mode Cards Grid */}
      <div ref={cardsRef} className="w-full flex flex-col gap-4 max-w-sm mb-8">
        {/* MODO REAL Card */}
        <button
          id="btn-select-real"
          onClick={() => onSelectMode("real")}
          className="group relative flex flex-col items-start p-6 rounded-xl bg-[#080808] border border-white/5 hover:border-[#5E1914]/50 text-left transition-all duration-300 overflow-hidden active:scale-[0.98] cursor-pointer"
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-[#5E1914]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#5E1914] text-white">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
            <span className="font-serif italic text-lg tracking-wider text-white">
              Modo Real
            </span>
          </div>
          
          <p className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#5E1914] mb-1">
            DESCUBRE LA CARTA ESTILO REELS
          </p>
          <p className="text-xs text-white/50 font-sans leading-relaxed">
            Scroll vertical inmersivo con fotos a pantalla completa, platos estrella y detalles de ingredientes.
          </p>
        </button>

        {/* MODO CARTA Card */}
        <button
          id="btn-select-carta"
          onClick={() => onSelectMode("carta")}
          className="group relative flex flex-col items-start p-6 rounded-xl bg-[#080808] border border-white/5 hover:border-white/20 text-left transition-all duration-300 overflow-hidden active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/5 text-white/60">
              <List className="w-4 h-4" />
            </div>
            <span className="font-serif italic text-lg tracking-wider text-white">
              Modo Carta
            </span>
          </div>
          
          <p className="text-[11px] uppercase tracking-wider font-sans font-bold text-white/70 mb-1">
            VISTA LISTA CLÁSICA
          </p>
          <p className="text-xs text-white/40 font-sans leading-relaxed">
            Navegación tradicional ágil y clara por secciones. Ideal para ver todos los precios rápidamente.
          </p>
        </button>
      </div>

      {/* Decorative Bottom Slogan */}
      <div className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-medium font-sans">
        Barra de Cortes • Tradición • Producto Gourmet
      </div>
    </div>
  );
}
