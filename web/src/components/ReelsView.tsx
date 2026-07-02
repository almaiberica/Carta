import { useEffect, useRef, useState, MouseEvent } from "react";
import { gsap } from "gsap";
import { Share2, ShoppingBag, ChevronDown, Check, Heart } from "lucide-react";
import { Dish } from "../data";
import { Cart } from "../hooks/useCart";
import { shareDish } from "../lib/shareImage";

interface ReelsViewProps {
  dishes: Dish[];
  cart: Cart;
  onAddToCart: (dish: Dish) => void;
  onActiveCategoryChange: (categoryKey: string) => void;
  onOpenCart: () => void;
  activeCategoryKey: string;
  antojosKeys: string[];
  onToggleAntojo: (key: string) => void;
}

export default function ReelsView({
  dishes,
  cart,
  onAddToCart,
  onActiveCategoryChange,
  onOpenCart,
  activeCategoryKey,
  antojosKeys,
  onToggleAntojo,
}: ReelsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Hint of scroll state
  const [showHint, setShowHint] = useState(true);

  // Spawning overlay hearts on double tap
  const [doubleTapHearts, setDoubleTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextHeartId = useRef(0);

  // We triplicate the flat dishes list for a seamless loop
  const triplicatedDishes = [...dishes, ...dishes, ...dishes];
  const singleCount = dishes.length;

  // Track the current mapped index
  const [activeIndex, setActiveIndex] = useState(singleCount);

  // On mount, scroll immediately to the middle third (first item)
  useEffect(() => {
    if (containerRef.current && singleCount > 0) {
      const firstMiddleItem = containerRef.current.children[singleCount] as HTMLDivElement;
      if (firstMiddleItem) {
        containerRef.current.scrollTop = firstMiddleItem.offsetTop;
      }
    }
  }, [singleCount]);

  // Handle continuous infinite wrap-around on scroll
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || singleCount === 0) return;

    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const currentIdx = Math.round(scrollTop / clientHeight);

    // Hide scroll hint after any real scrolling
    if (scrollTop > 50 && showHint) {
      setShowHint(false);
    }

    // Silent jumps when crossing boundary thresholds
    // First third boundary (index < singleCount)
    if (currentIdx < singleCount - 1) {
      // Jump to middle third
      const targetIdx = currentIdx + singleCount;
      const targetElement = container.children[targetIdx] as HTMLDivElement;
      if (targetElement) {
        container.scrollTop = targetElement.offsetTop;
        setActiveIndex(targetIdx);
        return;
      }
    }
    // Third third boundary (index >= singleCount * 2)
    else if (currentIdx >= singleCount * 2) {
      // Jump back to middle third
      const targetIdx = currentIdx - singleCount;
      const targetElement = container.children[targetIdx] as HTMLDivElement;
      if (targetElement) {
        container.scrollTop = targetElement.offsetTop;
        setActiveIndex(targetIdx);
        return;
      }
    } else {
      setActiveIndex(currentIdx);
    }

    // Debounce active category update to prevent state stuttering
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const activeItem = triplicatedDishes[currentIdx];
      if (activeItem) {
        onActiveCategoryChange(activeItem.bloque);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Triggered when clicking bottom navigation tabs
  useEffect(() => {
    const container = containerRef.current;
    if (!container || singleCount === 0) return;

    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const currentIdx = Math.round(scrollTop / clientHeight);
    const activeItem = triplicatedDishes[currentIdx];

    // If the active category changed externally (e.g. from bottom nav tab click),
    // scroll to the first dish of that category in the middle third
    if (activeItem && activeItem.bloque !== activeCategoryKey) {
      // Find index in original dishes list
      const targetLocalIdx = dishes.findIndex((d) => d.bloque === activeCategoryKey);
      if (targetLocalIdx !== -1) {
        const targetIdx = singleCount + targetLocalIdx;
        const targetElement = container.children[targetIdx] as HTMLDivElement;
        if (targetElement) {
          container.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeCategoryKey]);

  // Double tap handler on image: adds to Antojos (favoritos) and pops a heart
  const handleDoubleTap = (e: MouseEvent<HTMLDivElement>, dish: Dish) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;

    // Double-tap only adds to favorites, never removes (Instagram-style)
    if (!antojosKeys.includes(dish.key)) {
      onToggleAntojo(dish.key);
    }

    // Show heart pop-up on screen
    const newId = nextHeartId.current++;
    setDoubleTapHearts((prev) => [...prev, { id: newId, x: touchX, y: touchY }]);

    // Clean up heart after animation ends
    setTimeout(() => {
      setDoubleTapHearts((prev) => prev.filter((h) => h.id !== newId));
    }, 800);
  };

  // Progress Bar for current category
  const activeDish = triplicatedDishes[activeIndex];
  const currentCategoryDishes = dishes.filter((d) => d.bloque === activeDish?.bloque);
  const currentCategoryActiveIndex = currentCategoryDishes.findIndex((d) => d.key === activeDish?.key);
  const progressPercent =
    currentCategoryDishes.length > 0
      ? ((currentCategoryActiveIndex + 1) / currentCategoryDishes.length) * 100
      : 0;

  return (
    <div className="relative w-full h-full bg-black select-none overflow-hidden">
      {/* Dynamic Category Progress Indicator (Topbar Progress Line) */}
      <div className="absolute top-16 left-0 right-0 z-40 px-4">
        <div className="h-[3px] w-full bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Reels Snap Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="reels-container no-scrollbar"
      >
        {triplicatedDishes.map((dish, idx) => {
          const cartItem = cart[dish.key];
          const qty = cartItem ? cartItem.qty : 0;

          // Detect active to slide-up animation
          const isActive = idx === activeIndex;

          return (
            <div
              key={`${dish.key}-${idx}`}
              className="reel-item flex flex-col justify-end"
            >
              {/* Fullbleed Cover Photo */}
              <div
                className="absolute inset-0 w-full h-full bg-neutral-950 overflow-hidden cursor-pointer"
                onDoubleClick={(e) => handleDoubleTap(e, dish)}
              >
                {/* Placeholder always visible behind the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-[#0a0303] to-neutral-950 flex flex-col items-center justify-center p-8 text-center select-none">
                  <span className="font-serif italic text-2xl text-[#EE2737] tracking-[0.1em] mb-2 uppercase">
                    Alma Ibérica
                  </span>
                  <span className="font-sans text-[10px] text-white/20 uppercase tracking-[0.2em] leading-none">
                    Foto próximamente
                  </span>
                </div>

                {/* Photo overlaid on top; hides itself on 404 */}
                {dish.img && (
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}

                {/* Cover Gradient Scrim (Legibility backdrop) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/35" />
              </div>

              {/* Floating Large Double Tap Hearts */}
              {doubleTapHearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute pointer-events-none text-white flex items-center justify-center animate-heartPop"
                  style={{ left: heart.x - 40, top: heart.y - 40 }}
                >
                  <Heart className="w-20 h-20 fill-[#EE2737] text-[#EE2737] filter drop-shadow-lg" />
                </div>
              ))}

              {/* Information Row & Right actions */}
              <div className="relative z-10 w-full flex items-end justify-between px-4 pb-20 pt-16">
                
                {/* Info Text (Left Column) */}
                <div
                  className={`max-w-[76%] transition-all duration-700 delay-100 transform ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Category Label */}
                  <span className="font-sans font-bold text-[10px] tracking-[0.22em] text-[#EE2737] uppercase mb-1.5 block">
                    {dish.cat}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif italic text-[clamp(22px,6vw,28px)] tracking-wide text-white leading-tight mb-2 font-normal">
                    {dish.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/70 font-sans leading-relaxed line-clamp-2 pr-1 mb-4 h-9 font-light">
                    {dish.desc || "Tradición culinaria de cortes ibéricos elaborados en el momento con ingredientes gourmet."}
                  </p>

                  {/* Bottom details row */}
                  <div className="flex items-center gap-4">
                    {/* Price Tag with background */}
                    <div className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-xl flex items-center shadow-md">
                      <span className="font-display font-extrabold text-lg text-white">
                        {dish.price.toFixed(2)}€
                      </span>
                    </div>

                    {/* Allergens icon tags if any */}
                    {dish.alerg && (
                      <div className="truncate max-w-[120px]">
                        <span className="text-[10px] text-white/50 font-sans italic block truncate">
                          ⚠️ {dish.alerg}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Column (Right Column) */}
                <div className="flex flex-col items-center gap-5 shrink-0 pl-2">
                  
                  {/* Action 1: Add To Cart */}
                  <div className="flex flex-col items-center">
                    <button
                      id={`add-cart-reels-${dish.key}`}
                      onClick={() => onAddToCart(dish)}
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-xl active:scale-90 cursor-pointer ${
                        qty > 0
                          ? "bg-[#EE2737] border-[#EE2737] text-white"
                          : "bg-black/60 border-white/10 text-white hover:border-[#EE2737]/60"
                      }`}
                      aria-label="Añadir a comanda"
                    >
                      {qty > 0 ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <ShoppingBag className="w-5 h-5" />
                      )}
                      
                      {qty > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-display font-extrabold text-black">
                          {qty}
                        </span>
                      )}
                    </button>
                    <span className="text-[9px] font-sans font-bold uppercase text-white/50 tracking-wider mt-1.5">
                      {qty > 0 ? "Llevas" : "Pedir"}
                    </span>
                  </div>

                  {/* Action 2: Like / Antojos */}
                  <div className="flex flex-col items-center">
                    <button
                      id={`like-reels-${dish.key}`}
                      onClick={() => onToggleAntojo(dish.key)}
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-xl active:scale-90 cursor-pointer ${
                        antojosKeys.includes(dish.key)
                          ? "bg-[#EE2737] border-[#EE2737] text-white"
                          : "bg-black/60 border-white/10 text-white hover:border-[#EE2737]/60"
                      }`}
                      aria-label="Añadir a antojos"
                    >
                      <Heart
                        className={`w-5 h-5 ${antojosKeys.includes(dish.key) ? "fill-white" : ""}`}
                      />
                    </button>
                    <span className="text-[9px] font-sans font-bold uppercase text-white/50 tracking-wider mt-1.5">
                      Antojo
                    </span>
                  </div>

                  {/* Action 3: Compartir */}
                  <div className="flex flex-col items-center">
                    <button
                      id={`share-reels-${dish.key}`}
                      onClick={async () => {
                        await shareDish(dish);
                      }}
                      className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all duration-300 shadow-xl active:scale-90 cursor-pointer"
                      aria-label="Compartir plato"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <span className="text-[9px] font-sans font-bold uppercase text-white/50 tracking-wider mt-1.5">
                      Compartir
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe Hint Arrow (fades out on scroll) */}
      {showHint && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 pointer-events-none animate-bounce">
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          <span className="font-display font-bold text-[10px] tracking-[0.25em] uppercase">
            Desliza para ver más
          </span>
        </div>
      )}
    </div>
  );
}
