import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Plus, Share2, Check } from "lucide-react";
import { Dish, CAT_ORDER, CAT_LABELS } from "../data";
import { Cart } from "../hooks/useCart";
import { shareDish } from "../lib/shareImage";

interface CartaViewProps {
  dishes: Dish[];
  cart: Cart;
  onAddToCart: (dish: Dish) => void;
  onActiveCategoryChange: (categoryKey: string) => void;
  activeCategoryKey: string;
}

export default function CartaView({
  dishes,
  cart,
  onAddToCart,
  onActiveCategoryChange,
  activeCategoryKey,
}: CartaViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 1. Smooth scroll to category when clicked in bottom-nav
  useEffect(() => {
    const targetSection = sectionRefs.current[activeCategoryKey];
    if (targetSection && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetScrollTop = targetSection.offsetTop - 76; // Offset topbar height
      
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  }, [activeCategoryKey]);

  // 2. Monitor scroll to update active category as the user scrolls
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerScrollTop = container.scrollTop;
    const offsetThreshold = 100; // Offset before activating next category

    let activeCat = CAT_ORDER[0];

    for (const key of CAT_ORDER) {
      const section = sectionRefs.current[key];
      if (section) {
        if (containerScrollTop >= section.offsetTop - offsetThreshold) {
          activeCat = key;
        }
      }
    }

    if (activeCat !== activeCategoryKey) {
      onActiveCategoryChange(activeCat);
    }
  };

  // 3. Stagger animate dishes on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = document.querySelectorAll(".carta-item-row");
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: 0.04,
              grid: "auto",
              from: "start",
            },
            ease: "power2.out",
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="w-full h-full bg-black overflow-y-auto pt-20 pb-24 px-4 no-scrollbar scroll-smooth"
    >
      {/* Category Sections */}
      {CAT_ORDER.map((catKey) => {
        const catDishes = dishes.filter((d) => d.bloque === catKey);
        if (catDishes.length === 0) return null;

        return (
          <div
            key={catKey}
            ref={(el) => { sectionRefs.current[catKey] = el; }}
            id={`section-${catKey}`}
            className="mb-8 scroll-mt-20"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4 sticky top-0 bg-black/95 py-2.5 z-20 backdrop-blur-sm border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#EE2737] shadow-sm shadow-[#EE2737]/60 shrink-0" />
              <h3 className="font-serif italic text-lg tracking-widest text-[#EE2737]">
                {CAT_LABELS[catKey]}
              </h3>
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-white/30 ml-auto">
                {catDishes.length} items
              </span>
            </div>

            {/* Dishes List */}
            <div className="flex flex-col gap-3">
              {catDishes.map((dish) => {
                const cartItem = cart[dish.key];
                const qty = cartItem ? cartItem.qty : 0;

                return (
                  <div
                    key={dish.key}
                    className="carta-item-row group flex items-center justify-between p-3.5 rounded-xl bg-[#080808]/80 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    {/* Left: Image & Description Info */}
                    <div className="flex items-center gap-3.5 max-w-[65%]">
                      {/* Thumbnail Image */}
                      <div className="w-[72px] h-[72px] rounded-lg bg-neutral-950 overflow-hidden border border-white/5 shrink-0 flex items-center justify-center relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1 bg-neutral-950 text-white/30">
                          <span className="text-[10px] font-display font-bold leading-none uppercase">ALMA</span>
                        </div>
                        {dish.img && (
                          <img
                            src={dish.img}
                            alt={dish.name}
                            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="overflow-hidden">
                        <h4 className="font-serif italic text-[16px] text-white tracking-wide truncate group-hover:text-[#EE2737] transition-colors">
                          {dish.name}
                        </h4>
                        
                        <p className="text-[11px] text-white/50 font-sans leading-relaxed mt-1 line-clamp-2 h-8 font-light">
                          {dish.desc || "Plato tradicional preparado al momento con ingredientes selectos."}
                        </p>

                        {/* Allergens label */}
                        {dish.alerg && (
                          <span className="text-[9px] text-[#EE2737]/80 font-sans italic block truncate mt-1.5">
                            Alergenos: {dish.alerg}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Inline Action Panel */}
                    <div className="flex flex-col items-end gap-2.5 shrink-0 pl-1.5">
                      {/* Price Display */}
                      <span className="font-display font-extrabold text-base text-white">
                        {dish.price.toFixed(2)}€
                      </span>

                      {/* Mini Round Action Buttons Panel */}
                      <div className="flex items-center gap-1.5">
                        {/* 1. Share Button */}
                        <button
                          onClick={() => shareDish(dish)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-[#EE2737]/30 text-white/50 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                          aria-label="Compartir"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>


                        {/* 3. Add to Cart Button */}
                        <button
                          onClick={() => onAddToCart(dish)}
                          className={`relative w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer active:scale-90 ${
                            qty > 0
                              ? "bg-[#EE2737] border-[#EE2737] text-white"
                              : "bg-white/5 border-white/5 text-white hover:border-[#EE2737]"
                          }`}
                          aria-label="Añadir a comanda"
                        >
                          {qty > 0 ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}

                          {qty > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-display font-extrabold text-black">
                              {qty}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
