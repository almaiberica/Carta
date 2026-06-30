import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, Calendar, Heart, Instagram, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAntojos: () => void;
}

const RESERVAS_ACTION = {
  type: "link",
  value: "https://calendly.com/almaibericastb/30",
};

export default function MenuOverlay({
  isOpen,
  onClose,
  onOpenAntojos,
}: MenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Entry Animation
      gsap.fromTo(
        containerRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.45, ease: "power3.out" }
      );
      if (optionsRef.current) {
        gsap.fromTo(
          optionsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.25, stagger: 0.08, ease: "power2.out" }
        );
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      y: "100%",
      duration: 0.38,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  const handleReservar = () => {
    if (RESERVAS_ACTION.type === "whatsapp") {
      window.open(RESERVAS_ACTION.value, "_blank");
    } else if (RESERVAS_ACTION.type === "tel") {
      window.location.href = `tel:${RESERVAS_ACTION.value}`;
    } else {
      window.open(RESERVAS_ACTION.value, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-y-auto no-scrollbar select-none"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between p-4">
        {/* Top-Left Red Square Close Button */}
        <button
          onClick={handleClose}
          className="w-12 h-12 bg-[#5E1914] hover:bg-[#5E1914]/80 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer rounded-xl"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Small branding text */}
        <span className="font-sans font-bold text-[10px] tracking-[0.25em] text-white/30 uppercase">
          SANT BOI DE LLOBREGAT
        </span>
      </div>

      {/* Main Container */}
      <div className="my-auto px-6 py-8 flex flex-col items-center">
        {/* Logo and Tagline */}
        <div className="text-center mb-10">
          <h2 className="font-serif italic text-3xl tracking-wide uppercase leading-none text-white font-normal">
            Alma <span className="text-[#5E1914] font-serif not-italic font-bold tracking-widest">Ibérica</span>
          </h2>
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#5E1914] mt-2">
            TAPEO SELECTO DESDE 2026
          </p>
        </div>

        {/* Options List */}
        <div ref={optionsRef} className="w-full flex flex-col max-w-sm">
          {/* 1. RESERVAR MESA */}
          <button
            onClick={handleReservar}
            className="w-full py-4 px-4 text-left border-b border-white/5 flex items-center justify-between group cursor-pointer animate-fadeIn"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-[#5E1914]/10 text-[#5E1914] rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-serif italic text-lg tracking-wide group-hover:text-[#5E1914] transition-colors">
                Reservar Mesa
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#5E1914] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* 2. MIS ANTOJOS */}
          <button
            onClick={() => {
              handleClose();
              setTimeout(onOpenAntojos, 390); // Allow slide down first
            }}
            className="w-full py-4 px-4 text-left border-b border-white/5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-white/5 text-white/70 rounded-lg">
                <Heart className="w-5 h-5 fill-white/40 text-white/40" />
              </div>
              <span className="font-serif italic text-lg tracking-wide group-hover:text-[#5E1914] transition-colors">
                Mis Antojos
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#5E1914] transition-colors" />
          </button>

          {/* 3. INSTAGRAM */}
          <button
            onClick={() => window.open("https://www.instagram.com/almaibericaa/", "_blank")}
            className="w-full py-4 px-4 text-left border-b border-white/5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-white/5 text-white/70 rounded-lg">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-serif italic text-lg tracking-wide group-hover:text-[#5E1914] transition-colors">
                Instagram Oficial
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#5E1914] transition-colors" />
          </button>

          {/* 4. LLAMAR */}
          <button
            onClick={() => (window.location.href = "tel:+34625617176")}
            className="w-full py-4 px-4 text-left border-b border-white/5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-white/5 text-white/70 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-serif italic text-lg tracking-wide group-hover:text-[#5E1914] transition-colors">
                Llamar al Local
              </span>
            </div>
            <span className="text-xs font-sans font-semibold text-white/30">
              625 617 176
            </span>
          </button>

          {/* 5. UBICACIÓN Y HORARIOS (Collapsible toggle) */}
          <button
            onClick={() => setShowLocation(!showLocation)}
            className="w-full py-4 px-4 text-left border-b border-white/5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-white/5 text-white/70 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-serif italic text-lg tracking-wide group-hover:text-[#5E1914] transition-colors">
                Ubicación y Horario
              </span>
            </div>
            <span className="text-xs font-sans font-bold text-[#5E1914]">
              {showLocation ? "CERRAR" : "VER"}
            </span>
          </button>

          {/* Location details card */}
          {showLocation && (
            <div className="p-4 mx-4 mt-2 rounded-xl bg-white/5 border border-white/5 text-xs font-sans text-white/70 animate-fadeIn">
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#5E1914] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Dirección:</p>
                  <p>Carrer Lluís Pascual Roca, 38, 08830 Sant Boi de Llobregat, Barcelona</p>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#5E1914] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Horarios:</p>
                  <p>• Lun – Mié: 08:00 – 20:00</p>
                  <p>• Jue – Vie: 08:00 – 23:30</p>
                  <p>• Sáb: 09:00 – 23:30</p>
                  <p>• Dom: 09:00 – 16:00</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open("https://share.google/nwD6QzDf4QYuVVWLo", "_blank")
                }
                className="w-full py-2.5 rounded-lg bg-white/10 text-white hover:bg-[#5E1914] hover:text-white transition-all text-center font-sans font-bold uppercase tracking-wider block cursor-pointer"
              >
                ¿Cómo llegar?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding Slogan */}
      <div className="p-6 text-center border-t border-white/5">
        <p className="font-display font-semibold text-[11px] tracking-[0.25em] text-white/30 uppercase">
          ALMA IBÉRICA • TAPEO DE TRADICIÓN
        </p>
      </div>
    </div>
  );
}
