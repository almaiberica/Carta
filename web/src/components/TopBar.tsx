import { ShoppingCart } from "lucide-react";

interface TopBarProps {
  currentMode: "real" | "carta";
  onChangeMode: (mode: "real" | "carta") => void;
  activeCategoryLabel: string;
  cartCount: number;
  onOpenCart: () => void;
}

export default function TopBar({
  currentMode,
  onChangeMode,
  activeCategoryLabel,
  cartCount,
  onOpenCart,
}: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
      {/* 1. Mode Switcher (Left) */}
      <div className="flex items-center bg-black/60 backdrop-blur-md p-0.5 rounded-full border border-white/10 shadow-lg">
        <button
          id="toggle-mode-real"
          onClick={() => onChangeMode("real")}
          className={`px-3.5 py-2 text-[11px] font-display font-bold tracking-wider rounded-full transition-all duration-300 ${
            currentMode === "real"
              ? "bg-[#EE2737] text-white shadow-sm shadow-[#EE2737]/20"
              : "text-white/40 hover:text-white"
          }`}
        >
          REELS
        </button>
        <button
          id="toggle-mode-carta"
          onClick={() => onChangeMode("carta")}
          className={`px-3.5 py-2 text-[11px] font-display font-bold tracking-wider rounded-full transition-all duration-300 ${
            currentMode === "carta"
              ? "bg-white text-black font-extrabold"
              : "text-white/40 hover:text-white"
          }`}
        >
          CARTA
        </button>
      </div>

      {/* 2. Active Category Badge (Center) */}
      <div className="flex items-center max-w-[45%]">
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#EE2737]/40 text-center shadow-lg truncate">
          <span className="text-[11px] font-sans font-semibold tracking-[0.15em] text-[#EE2737] uppercase leading-none block truncate">
            {activeCategoryLabel}
          </span>
        </div>
      </div>

      {/* 3. Shopping Cart Button (Right) */}
      <button
        id="btn-topbar-cart"
        onClick={onOpenCart}
        className="relative p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:border-[#EE2737]/40 hover:text-[#EE2737] transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
        aria-label="Ver comanda"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span id="topbar-cart-badge" className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EE2737] text-[10px] font-display font-extrabold text-white animate-scale">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
