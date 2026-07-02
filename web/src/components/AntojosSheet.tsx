import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Heart, Plus, ShoppingCart } from "lucide-react";
import { Dish } from "../data";
import { Cart } from "../hooks/useCart";

interface AntojosSheetProps {
  isOpen: boolean;
  onClose: () => void;
  antojosKeys: string[];
  allDishes: Dish[];
  onToggleAntojo: (key: string) => void;
  onAddToCart: (dish: Dish) => void;
  cart: Cart;
}

export default function AntojosSheet({
  isOpen,
  onClose,
  antojosKeys,
  allDishes,
  onToggleAntojo,
  onAddToCart,
  cart,
}: AntojosSheetProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
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

  // Filter out the liked dishes
  const likedDishes = allDishes.filter((d) => antojosKeys.includes(d.key));

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/85 opacity-0 transition-opacity duration-300 backdrop-blur-sm"
      />

      {/* Slide-up sheet */}
      <div
        ref={sheetRef}
        className="relative w-full max-h-[82dvh] bg-neutral-900 border-t border-white/10 rounded-t-[24px] flex flex-col z-10 overflow-hidden shadow-2xl"
      >
        {/* Drag handle decoration */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 fill-[#EE2737] text-[#EE2737]" />
            <h2 className="font-serif italic text-xl text-white tracking-widest">
              Mis Antojos
            </h2>
            <span className="px-2 py-0.5 rounded-md bg-[#EE2737]/20 border border-[#EE2737]/40 text-[10px] font-sans font-bold text-[#EE2737] uppercase">
              {likedDishes.length} items
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar antojos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
          {likedDishes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-white/40">
              <div className="p-4 rounded-full bg-white/5 text-[#EE2737]/30 mb-4 animate-pulse">
                <Heart className="w-12 h-12" />
              </div>
              <p className="font-serif italic text-lg text-white/80">
                ¿Aún sin antojos?
              </p>
              <p className="text-xs max-w-xs mt-1 leading-relaxed">
                Dale un toque al corazón o haz doble tap sobre los platos que más te llamen la atención para guardarlos aquí.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {likedDishes.map((dish) => {
                const isInCart = !!cart[dish.key];
                return (
                  <div
                    key={dish.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-3 max-w-[55%]">
                      <div className="w-14 h-14 rounded-lg bg-neutral-950 overflow-hidden border border-white/10 flex-shrink-0 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 text-white/30">
                          <span className="text-[9px] font-display font-bold">ALMA</span>
                        </div>
                        {dish.img && (
                          <img
                            src={dish.img}
                            alt={dish.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        )}
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif italic text-[15px] text-white tracking-wide truncate">
                          {dish.name}
                        </h4>
                        <p className="font-sans text-sm font-bold text-[#EE2737] mt-0.5">
                          {dish.price.toFixed(2)}€
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Delete from antojos */}
                      <button
                        onClick={() => onToggleAntojo(dish.key)}
                        className="p-2.5 rounded-lg text-white/50 hover:text-[#EE2737] hover:bg-white/5 transition-all cursor-pointer"
                        title="Quitar de favoritos"
                      >
                        <Heart className="w-4 h-4 fill-[#EE2737] text-[#EE2737] hover:fill-none hover:text-white/40 transition-all duration-300" />
                      </button>

                      {/* Add to cart */}
                      <button
                        onClick={() => onAddToCart(dish)}
                        className={`p-2.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                          isInCart
                            ? "bg-white/10 text-white"
                            : "bg-[#EE2737] text-white hover:bg-[#EE2737]/80"
                        }`}
                      >
                        {isInCart ? (
                          <ShoppingCart className="w-4 h-4 text-[#EE2737]" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider">
                          {isInCart ? "Llevas" : "Añadir"}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
