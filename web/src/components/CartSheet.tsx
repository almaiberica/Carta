import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Cart } from "../hooks/useCart";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQty: (key: string, qty: number) => void;
  onClearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

export default function CartSheet({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
  totalPrice,
  totalItems,
}: CartSheetProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Setup entrance animation
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        sheetRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(sheetRef.current, {
      y: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  const cartArray = Object.values(cart);

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 backdrop-blur-sm"
      />

      {/* Slide-Up Sheet */}
      <div
        ref={sheetRef}
        className="relative w-full max-h-[82dvh] bg-neutral-900 border-t border-white/10 rounded-t-[24px] flex flex-col z-10 overflow-hidden shadow-2xl"
      >
        {/* Drag handle decoration */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛒</span>
            <h2 className="font-serif italic text-xl text-white tracking-widest">
              Mi Comanda
            </h2>
            <span className="px-2 py-0.5 rounded-md bg-[#5E1914] text-[10px] font-sans font-bold text-white uppercase">
              {totalItems} items
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar comanda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
          {cartArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-white/40">
              <div className="p-4 rounded-full bg-white/5 text-white/20 mb-4 animate-bounce">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <p className="font-display font-bold text-lg text-white/80">
                TU COMANDA ESTÁ VACÍA
              </p>
              <p className="text-xs max-w-xs mt-1 leading-relaxed">
                Navega por la carta y añade platos para enseñarle tu lista de deseos al camarero al pedir.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartArray.map((item) => (
                <div
                  key={item.dish.key}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  {/* Left: Thumbnail & Name */}
                  <div className="flex items-center gap-3 max-w-[60%]">
                    <div className="w-14 h-14 rounded-lg bg-neutral-950 overflow-hidden border border-white/10 flex-shrink-0 relative">
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-white/30 p-1">
                        <span className="text-[9px] font-display font-bold text-center leading-none">ALMA</span>
                      </div>
                      {item.dish.img && (
                        <img
                          src={item.dish.img}
                          alt={item.dish.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif italic text-[15px] text-white tracking-wide truncate">
                        {item.dish.name}
                      </h4>
                      <p className="font-sans text-sm font-bold text-[#5E1914] mt-0.5">
                        {item.dish.price.toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Adjusters */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.dish.key, item.qty - 1)}
                      className="p-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-display font-extrabold text-sm text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.dish.key, item.qty + 1)}
                      className="p-1.5 rounded-lg bg-[#5E1914] text-white hover:bg-[#5E1914]/80 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Sum & Clean triggers (only if cart not empty) */}
        {cartArray.length > 0 && (
          <div className="p-6 bg-neutral-950 border-t border-white/10">
            {/* Summary */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-xs text-white/50 uppercase tracking-widest font-semibold">
                Estimación de comanda
              </span>
              <span className="font-display font-extrabold text-2xl text-white">
                {totalPrice.toFixed(2)}€
              </span>
            </div>

            {/* Explanatory text */}
            <p className="text-[10px] text-white/40 font-sans text-center mb-5 leading-normal italic">
              *Enseña esta pantalla a tu camarero para agilizar tu comanda en mesa.
            </p>

            {/* Clear Button */}
            <button
              onClick={() => {
                if (confirm("¿Quieres vaciar toda la comanda actual?")) {
                  onClearCart();
                }
              }}
              className="w-full py-3.5 rounded-xl border border-white/10 hover:border-[#5E1914]/40 text-white/70 hover:text-[#5E1914] bg-white/5 hover:bg-[#5E1914]/5 font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer duration-300"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar Comanda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
