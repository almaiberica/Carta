import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Flame, 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Calendar, 
  ChevronRight, 
  Check, 
  Trash2, 
  Info,
  MessageCircle,
  Menu,
  Sparkles,
  Award
} from "lucide-react";
import { MENU_ITEMS, INFO_EMPRESA } from "./data";
import { MenuItem, CartItem, Reservation, MenuCategory } from "./types";

export default function App() {
  // State variables
  const [viewMode, setViewMode] = useState<"reels" | "carta">("reels");
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allergenFilters, setAllergenFilters] = useState<string[]>([]);
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});
  const [copiedItemId, setCopiedItemId] = useState<number | null>(null);
  
  // Reservation Form State
  const [reservation, setReservation] = useState<Reservation>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    notes: ""
  });
  const [reservationStatus, setReservationStatus] = useState<"idle" | "success">("idle");

  // Reels view active index (for vertical scrolling)
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  // Filter menu items based on search, category, and allergens
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "Todos" && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      // Allergen exclusion filters
      if (allergenFilters.length > 0) {
        // If an item contains any of the selected allergen filters, exclude it
        const hasExcludedAllergen = item.allergens.some((allergen) => 
          allergenFilters.some((filter) => allergen.toLowerCase().includes(filter.toLowerCase()))
        );
        if (hasExcludedAllergen) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, allergenFilters]);

  // Reels list (only items in selected category, prioritizing those with images)
  const reelsItems = useMemo(() => {
    const list = selectedCategory === "Todos" 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === selectedCategory);
    
    // Put items with images first in Reels view for high visual impact, followed by the rest
    return [...list].sort((a, b) => {
      if (a.image && !b.image) return -1;
      if (!a.image && b.image) return 1;
      return 0;
    });
  }, [selectedCategory]);

  // Total items and price in cart
  const cartTotalItems = useMemo(() => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }, [cart]);

  const cartTotalPrice = useMemo(() => {
    return cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }, [cart]);

  // Handle Cart Operations
  const addToCart = (item: MenuItem, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === item.id);
      if (existing) {
        return prevCart.map((c) => 
          c.item.id === item.id 
            ? { ...c, quantity: c.quantity + quantity } 
            : c
        );
      }
      return [...prevCart, { item, quantity }];
    });

    // Elegant toast or visual confirmation
    const floatingIndicator = document.createElement("div");
    floatingIndicator.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#EE2737] text-white px-6 py-3 rounded-full font-display tracking-wider text-sm shadow-xl z-50 animate-bounce flex items-center gap-2 border border-white/20";
    floatingIndicator.innerHTML = `<span>🛒 ¡Añadido al carrito!</span>`;
    document.body.appendChild(floatingIndicator);
    setTimeout(() => {
      floatingIndicator.remove();
    }, 1500);
  };

  const updateCartQuantity = (itemId: number, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((c) => {
        if (c.item.id === itemId) {
          const newQty = c.quantity + change;
          return newQty > 0 ? { ...c, quantity: newQty } : null;
        }
        return c;
      }).filter((c): c is CartItem => c !== null);
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  // Toggle Like for dishes
  const toggleLike = (itemId: number) => {
    setLikedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Share dish link placeholder
  const handleShare = (item: MenuItem) => {
    // Copy fake relative share link to clipboard
    const shareText = `¡Mira este delicioso plato en Alma Ibérica! 🤤 ${item.name} (${item.price.toFixed(2)}€). ${item.description}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedItemId(item.id);
      setTimeout(() => setCopiedItemId(null), 2000);
    });
  };

  // Format and send order to WhatsApp
  const handleSendOrder = (kitchenNotes: string) => {
    if (cart.length === 0) return;

    let message = `*¡Hola Alma Ibérica! 🙋‍♂️ Quiero realizar el siguiente pedido:*\n\n`;
    message += `--------------------------------------\n`;
    
    cart.forEach((cartItem) => {
      message += `• *${cartItem.quantity}x* ${cartItem.item.name} (_${cartItem.item.price.toFixed(2)}€/ud_) -> *${(cartItem.item.price * cartItem.quantity).toFixed(2)}€*\n`;
      if (cartItem.item.allergens.length > 0) {
        message += `   _Alérgenos: ${cartItem.item.allergens.join(", ")}_\n`;
      }
    });

    message += `--------------------------------------\n`;
    message += `💰 *Subtotal:* ${cartTotalPrice.toFixed(2)}€\n`;
    
    if (kitchenNotes.trim()) {
      message += `📝 *Notas para la cocina:* ${kitchenNotes}\n`;
    }
    
    message += `\n📍 _Pedido para consumir en local / recoger_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/34${INFO_EMPRESA.telefono.replace(/\s+/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Format and send Reservation request over WhatsApp
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.name || !reservation.phone || !reservation.date || !reservation.time) {
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    let message = `*¡Hola Alma Ibérica! 🍷 Me gustaría solicitar una reserva de mesa:*\n\n`;
    message += `👤 *Nombre:* ${reservation.name}\n`;
    message += `📞 *Teléfono:* ${reservation.phone}\n`;
    message += `📅 *Fecha:* ${reservation.date}\n`;
    message += `⏰ *Hora:* ${reservation.time}\n`;
    message += `👥 *Comensales:* ${reservation.guests} personas\n`;
    
    if (reservation.notes?.trim()) {
      message += `📝 *Comentarios adicionales:* ${reservation.notes}\n`;
    }

    message += `\n_Agradecería que me confirmen la disponibilidad de la mesa. ¡Muchas gracias!_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/34${INFO_EMPRESA.telefono.replace(/\s+/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setReservationStatus("success");
    setTimeout(() => {
      setReservationStatus("idle");
    }, 5000);
  };

  // Monitor vertical scrolling in Reels view to update the active index
  const handleReelsScroll = () => {
    if (!reelsContainerRef.current) return;
    const container = reelsContainerRef.current;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    const index = Math.round(scrollPosition / itemHeight);
    if (index !== activeReelIndex && index >= 0 && index < reelsItems.length) {
      setActiveReelIndex(index);
    }
  };

  // Helper to check if an item is currently in the cart
  const getItemQuantityInCart = (itemId: number) => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  // Toggle allergen filter
  const toggleAllergenFilter = (allergen: string) => {
    setAllergenFilters((prev) => 
      prev.includes(allergen) 
        ? prev.filter((a) => a !== allergen) 
        : [...prev, allergen]
    );
  };

  const allergenList = ["Gluten", "Lácteos", "Huevos", "Pescado", "Soja", "Sulfitos"];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#EE2737] selection:text-white flex flex-col">
      
      {/* Upper Brand Promo Bar */}
      <div className="bg-[#000000] border-b border-[#222] py-2 px-4 text-center text-xs text-neutral-400 font-sans tracking-wide z-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
        <span className="flex items-center gap-1.5 justify-center">
          <MapPin className="w-3.5 h-3.5 text-[#EE2737]" /> {INFO_EMPRESA.direccion}
        </span>
        <span className="hidden sm:inline-block text-neutral-600">|</span>
        <span className="flex items-center gap-1.5 justify-center font-semibold text-white">
          <Phone className="w-3.5 h-3.5 text-[#EE2737]" /> {INFO_EMPRESA.telefono}
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 bg-[#000000]/95 backdrop-blur-md border-b border-[#222] px-3 py-3 sm:px-4 sm:py-3.5 z-30 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EE2737] flex items-center justify-center font-display text-lg sm:text-xl font-bold text-white border border-[#222] shadow-inner shrink-0">
              AI
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white flex flex-wrap items-center gap-1.5 leading-none">
                ALMA IBÉRICA
                <span className="text-[9px] sm:text-[10px] bg-[#EE2737] text-white font-sans px-1.5 py-0.5 rounded font-bold uppercase tracking-wider scale-95 origin-left">
                  Sant Boi
                </span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-neutral-400 font-sans tracking-wide mt-0.5 uppercase font-light truncate">
                Tapeo Selecto & Embutidos de Bellota
              </p>
            </div>
          </div>

          {/* Toggle Views Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden sm:flex bg-[#121212] border border-[#222] rounded-full p-1">
              <button 
                onClick={() => setViewMode("reels")}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-display tracking-wider text-[10px] sm:text-xs uppercase transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  viewMode === "reels" 
                    ? "bg-[#EE2737] text-white shadow-md font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
                id="btn-view-reels"
              >
                🎬 Reels
              </button>
              <button 
                onClick={() => setViewMode("carta")}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-display tracking-wider text-[10px] sm:text-xs uppercase transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  viewMode === "carta" 
                    ? "bg-[#EE2737] text-white shadow-md font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
                id="btn-view-carta"
              >
                📋 Carta
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="sm:hidden p-2.5 rounded-full bg-[#121212] hover:bg-neutral-900 border border-[#222] text-white transition-all"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:p-2.5 rounded-full bg-[#121212] hover:bg-neutral-900 border border-[#222] text-white transition-all group shrink-0"
              id="btn-header-cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EE2737] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border border-black shadow-lg">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="sm:hidden border border-[#222] rounded-2xl bg-[#121212] p-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setViewMode("reels");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-display uppercase tracking-wider transition-all ${
                  viewMode === "reels" ? "bg-[#EE2737] text-white" : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                🎬 Reels
              </button>
              <button
                onClick={() => {
                  setViewMode("carta");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-display uppercase tracking-wider transition-all ${
                  viewMode === "carta" ? "bg-[#EE2737] text-white" : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                📋 Carta
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-display uppercase tracking-wider text-neutral-300 hover:bg-neutral-800 transition-all"
              >
                🛒 Ver pedido
              </button>
            </div>
          )}

        </div>
      </header>

      {/* Categories Horizontal Selector */}
      <nav className="bg-[#000000] border-b border-[#222] py-3 px-3 sm:py-3.5 sm:px-4 overflow-x-auto scrollbar-none z-10 sticky top-[63px] sm:top-[65px]">
        <div className="max-w-6xl mx-auto flex items-center gap-2 whitespace-nowrap pb-1">
          <button
            onClick={() => setSelectedCategory("Todos")}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full font-display tracking-wider text-[10px] sm:text-xs uppercase border transition-all duration-200 ${
              selectedCategory === "Todos"
                ? "bg-white text-black border-white font-bold"
                : "bg-[#121212] text-neutral-400 border-[#222] hover:border-[#EE2737] hover:text-white"
            }`}
          >
            🌟 Todo
          </button>
          {(["Desayuno y Merienda Selecta", "Ibéricos y Embutidos", "Tapeo Selecto", "Bocadillos, Burgers y Pizzas", "Bebidas y Vermuts"] as MenuCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-display tracking-wider text-[10px] sm:text-xs uppercase border transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#EE2737] text-white border-[#EE2737] font-bold shadow-md"
                  : "bg-[#121212] text-neutral-400 border-[#222] hover:border-[#EE2737] hover:text-white"
              }`}
            >
              {cat === "Desayuno y Merienda Selecta" && "☕ "}
              {cat === "Ibéricos y Embutidos" && "🥓 "}
              {cat === "Tapeo Selecto" && "🍟 "}
              {cat === "Bocadillos, Burgers y Pizzas" && "🍔 "}
              {cat === "Bebidas y Vermuts" && "🍷 "}
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Dynamic Main Workspace Content */}
      <main className="flex-grow flex flex-col">

        {/* 1. VIEW MODE: REELS (IMMERSIVE SWIPE SNAP) */}
        {viewMode === "reels" && (
          <div className="relative bg-[#000000] flex-grow h-[calc(100dvh-165px)] sm:h-[calc(100vh-165px)] flex flex-col justify-center">
            {reelsItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
                <SlidersHorizontal className="w-12 h-12 text-[#EE2737] mb-4 animate-pulse" />
                <h3 className="font-display text-xl font-semibold text-neutral-300">No hay platos disponibles</h3>
                <p className="text-neutral-500 text-sm mt-1">No se han encontrado platos en esta sección que coincidan con la categoría seleccionada.</p>
                <button
                  onClick={() => setSelectedCategory("Todos")}
                  className="mt-6 px-5 py-2 rounded-full bg-[#121212] border border-[#222] text-xs font-display tracking-wider uppercase hover:bg-neutral-800 text-white"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div 
                ref={reelsContainerRef}
                onScroll={handleReelsScroll}
                className="scroll-snap-container w-full h-full max-w-lg mx-auto border-x border-[#222] relative bg-[#050505] overflow-y-auto"
              >
                {reelsItems.map((item, index) => {
                  const isLiked = likedItems[item.id] || false;
                  const qtyInCart = getItemQuantityInCart(item.id);
                  const isCurrentActive = index === activeReelIndex;

                  return (
                    <div 
                      key={item.id}
                      className="scroll-snap-item relative w-full h-full flex flex-col justify-between bg-black text-white overflow-hidden"
                      style={{ height: "calc(100dvh - 165px)" }}
                    >
                      {/* Media Display Area */}
                      <div className="absolute inset-0 w-full h-full z-0 bg-[#050505] flex items-center justify-center">
                        {item.image ? (
                          <>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover transition-transform duration-1000 origin-center ${
                                isCurrentActive ? "opacity-70 scale-105" : "opacity-50 scale-100"
                              }`}
                            />
                            {/* Overlay Gradient for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                          </>
                        ) : (
                          // --- Foto Próximamente Over Dark Background (Rule 1 & Rule 3) ---
                          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0c0c0c] via-[#000000] to-[#120505] text-center">
                            
                            {/* Abstract Ambient Glow Blob */}
                            <div className="absolute w-60 h-60 rounded-full bg-[#EE2737]/5 blur-[80px] -top-10 -left-10 animate-pulse" />
                            <div className="absolute w-60 h-60 rounded-full bg-amber-500/[0.03] blur-[80px] -bottom-10 -right-10 animate-pulse" />

                            <div className="relative z-10 flex flex-col items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-[#121212] border border-[#222] flex items-center justify-center text-neutral-500 shadow-xl">
                                <Sparkles className="w-8 h-8 text-neutral-600" />
                              </div>
                              <span className="font-display tracking-widest text-xs uppercase text-[#EE2737] font-semibold">
                                Alma Ibérica
                              </span>
                              <div className="w-16 h-[2px] bg-[#EE2737]/60" />
                              <p className="font-display text-2xl font-bold tracking-wider text-neutral-300 uppercase px-4 max-w-xs">
                                {item.name}
                              </p>
                              <div className="mt-2 bg-[#121212]/85 border border-[#222] text-neutral-400 font-sans px-4 py-2.5 rounded text-xs flex items-center gap-2 shadow-lg backdrop-blur-sm">
                                <Info className="w-3.5 h-3.5 text-[#EE2737]" />
                                Foto próximamente
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Top Ribbon inside Reel (Dish Category) */}
                      <div className="relative z-10 p-4 pt-5 flex justify-between items-start">
                        <span className="bg-[#121212] border border-[#222] px-3.5 py-1.5 rounded text-[10px] font-display font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#EE2737] rounded-full animate-ping" />
                          {item.category}
                        </span>
                        {item.featured && (
                          <span className="badge-elegant oswald flex items-center gap-1 shadow-lg">
                            <Flame className="w-3.5 h-3.5 fill-current" /> DESTACADO
                          </span>
                        )}
                      </div>

                      {/* Right Action Widgets (Like, Share, Quick Add) */}
                      <div className="absolute right-3 sm:right-4 bottom-28 sm:bottom-32 z-20 flex flex-col items-center gap-3 sm:gap-5">
                        
                        {/* Like Button */}
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => toggleLike(item.id)}
                            className={`p-2.5 sm:p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
                              isLiked 
                                ? "bg-[#EE2737] border-[#EE2737] text-white scale-110" 
                                : "bg-[#121212] border-[#222] text-white hover:bg-black/80"
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                          </button>
                          <span className="text-[10px] text-neutral-300 font-sans mt-1 bg-black/40 px-1.5 py-0.5 rounded">
                            {isLiked ? 13 : 12}
                          </span>
                        </div>

                        {/* Share Button */}
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => handleShare(item)}
                            className="p-2.5 sm:p-3 rounded-full bg-[#121212] backdrop-blur-md border border-[#222] text-white hover:bg-black/80 transition-all shadow-lg relative"
                          >
                            {copiedItemId === item.id ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <Share2 className="w-5 h-5" />
                            )}
                          </button>
                          <span className="text-[10px] text-neutral-300 font-sans mt-1 bg-black/40 px-1.5 py-0.5 rounded">
                            {copiedItemId === item.id ? "¡Copiado!" : "Compartir"}
                          </span>
                        </div>

                        {/* Quick Cart Actions */}
                        <div className="flex flex-col items-center">
                          {qtyInCart > 0 ? (
                            <div className="bg-[#121212]/95 backdrop-blur-md border border-[#EE2737]/30 rounded-full flex flex-col items-center p-1 gap-1.5 shadow-2xl">
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="p-1.5 rounded-full hover:bg-neutral-800 text-white transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-display font-bold text-white px-2">
                                {qtyInCart}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="p-1.5 rounded-full hover:bg-neutral-800 text-white transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="p-3.5 sm:p-4 rounded-full bg-[#EE2737] text-white hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-[#EE2737]/30 border border-white/10 animate-pulse"
                            >
                              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                          )}
                          <span className="text-[10px] text-[#EE2737] font-display font-bold uppercase tracking-wider mt-1 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                            Añadir
                          </span>
                        </div>

                      </div>

                      {/* Bottom Info Details Area */}
                      <div className="relative z-10 p-4 pb-6 sm:p-5 sm:pb-8 bg-gradient-to-t from-black via-black/95 to-transparent pt-16 sm:pt-20">
                        <div className="max-w-md pr-14 sm:pr-16">
                          
                          {/* Dish Name & Price */}
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide uppercase text-white drop-shadow">
                              {item.name}
                            </h2>
                            <span className="price-tag-elegant font-display tracking-tight drop-shadow">
                              {item.price.toFixed(2)}€
                            </span>
                          </div>

                          {/* Description */}
                          {item.description && (
                            <p className="text-neutral-300 text-[11px] sm:text-xs mt-2.5 leading-relaxed font-sans font-light line-clamp-3">
                              {item.description}
                            </p>
                          )}

                          {/* Allergens Row */}
                          {item.allergens.length > 0 ? (
                            <div className="flex items-center gap-1.5 flex-wrap mt-3.5">
                              <span className="text-[9px] font-sans font-semibold tracking-wider text-neutral-400 uppercase">
                                Alérgenos:
                              </span>
                              {item.allergens.map((allergen, aIdx) => (
                                <span 
                                  key={aIdx} 
                                  className="bg-[#121212] border border-[#222] text-neutral-300 text-[9px] px-2.5 py-0.5 rounded font-sans flex items-center gap-1"
                                >
                                  ⚠️ {allergen}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[9px] text-neutral-500 font-sans mt-3.5 flex items-center gap-1">
                              🌿 Sin alérgenos declarados
                            </div>
                          )}

                        </div>

                        {/* Tiny Reels indicator dot guide */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {reelsItems.slice(0, Math.min(reelsItems.length, 8)).map((_, dotIdx) => (
                            <span 
                              key={dotIdx}
                              className={`dot-elegant ${dotIdx === activeReelIndex ? "active" : ""}`}
                            />
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Reels Vertical Scrolling Instruction Bubble */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none hidden md:flex flex-col items-center gap-2 text-neutral-500 bg-black/40 p-3 rounded-full border border-white/5">
              <span className="text-[10px] uppercase font-display tracking-widest text-neutral-400 -rotate-90 origin-center my-6">
                Deslizar
              </span>
              <ChevronRight className="w-4 h-4 rotate-90 text-[#EE2737] animate-bounce" />
            </div>
          </div>
        )}


        {/* 2. VIEW MODE: TRADITIONAL GRID CARTA */}
        {viewMode === "carta" && (
          <div className="max-w-6xl w-full mx-auto p-3 sm:p-4 flex-grow flex flex-col md:flex-row gap-4 sm:gap-6">
            
            {/* Sidebar / Left Column: Controls and Info */}
            <div className="w-full md:w-80 shrink-0 flex flex-col gap-4 sm:gap-5">
              
              {/* Search Box */}
              <div className="bg-[#121212] border border-[#222] p-4 rounded-xl shadow-md">
                <h3 className="font-display text-sm font-bold tracking-wider uppercase text-[#EE2737] mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Buscar Plato
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Escriba aquí (ej. croquetas, bravas)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#000000] border border-[#222] focus:border-[#EE2737]/60 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none placeholder:text-neutral-500"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Allergen Filters Toggle Box */}
              <div className="bg-[#121212] border border-[#222] p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm font-bold tracking-wider uppercase text-[#EE2737] flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filtros Exclusión
                  </h3>
                  {allergenFilters.length > 0 && (
                    <button
                      onClick={() => setAllergenFilters([])}
                      className="text-[10px] font-sans text-neutral-400 hover:text-[#EE2737] underline"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 mb-3 font-sans leading-relaxed">
                  Haz clic para ocultar platos que contengan el alérgeno seleccionado:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {allergenList.map((allergen) => {
                    const isActive = allergenFilters.includes(allergen);
                    return (
                      <button
                        key={allergen}
                        onClick={() => toggleAllergenFilter(allergen)}
                        className={`text-[10px] font-sans px-2.5 py-1 rounded border transition-all ${
                          isActive
                            ? "bg-[#EE2737]/15 border-[#EE2737] text-[#EE2737] font-semibold"
                            : "bg-[#000000]/60 border-[#222] text-neutral-300 hover:border-white/15"
                        }`}
                      >
                        🚫 {allergen}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Information Bento Widget */}
              <div className="bg-[#121212] border border-[#222] p-3 sm:p-4 rounded-xl shadow-md flex flex-col gap-4">
                <h3 className="font-display text-sm font-bold tracking-wider uppercase text-[#EE2737] flex items-center gap-2 border-b border-[#222] pb-2">
                  📍 Sobre Nosotros
                </h3>
                
                <div className="flex gap-2 text-xs">
                  <MapPin className="w-5 h-5 text-[#EE2737] shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Ubicación</span>
                    <span className="text-neutral-400 font-light block mt-0.5 leading-relaxed">{INFO_EMPRESA.direccion}</span>
                  </div>
                </div>

                <div className="flex gap-2 text-xs">
                  <Clock className="w-5 h-5 text-[#EE2737] shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Horarios</span>
                    <span className="text-neutral-400 font-light block mt-0.5 leading-relaxed">
                      {INFO_EMPRESA.horarios.semana}
                    </span>
                    <span className="text-neutral-400 font-light block mt-1.5 leading-relaxed">
                      {INFO_EMPRESA.horarios.finDeSemana}
                    </span>
                  </div>
                </div>

                {/* Follow on Instagram button */}
                <a 
                  href={`https://instagram.com/${INFO_EMPRESA.instagram}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 hover:from-purple-800/40 hover:to-pink-800/40 border border-[#222] rounded-xl p-3 text-center text-xs text-white flex items-center justify-center gap-2 transition-all font-display tracking-wider uppercase"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  @{INFO_EMPRESA.instagram}
                </a>
              </div>

            </div>

            {/* Right Column: Menu Dishes Catalog */}
            <div className="flex-grow flex flex-col">
              
              {/* Active Section Info Tag */}
              <div className="mb-4 flex items-center justify-between border-b border-[#222] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#EE2737] text-white px-2.5 py-1 rounded font-display tracking-widest uppercase">
                    {selectedCategory === "Todos" ? "Todos los platos" : selectedCategory}
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    ({filteredItems.length} platos disponibles)
                  </span>
                </div>
                {allergenFilters.length > 0 && (
                  <span className="text-[10px] text-[#EE2737] bg-[#EE2737]/10 px-2 py-0.5 rounded border border-[#EE2737]/20 font-sans">
                    ⚠️ Ocultando alérgenos
                  </span>
                )}
              </div>

              {/* Bento Grid */}
              {filteredItems.length === 0 ? (
                <div className="bg-[#121212] border border-dashed border-[#222] rounded-xl p-12 text-center flex flex-col items-center justify-center">
                  <Search className="w-10 h-10 text-neutral-600 mb-3 animate-pulse" />
                  <p className="font-display text-lg text-neutral-300 font-medium">No se han encontrado platos</p>
                  <p className="text-neutral-500 text-xs max-w-xs mt-1">Pruebe a cambiar el término de búsqueda o desactivar las exclusiones de alérgenos.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => {
                    const isLiked = likedItems[item.id] || false;
                    const qtyInCart = getItemQuantityInCart(item.id);

                    return (
                      <div 
                        key={item.id}
                        className={`border rounded overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                          qtyInCart > 0 
                            ? "border-[#EE2737] bg-[rgba(238,39,55,0.05)]" 
                            : "border-[#222] bg-[#121212] hover:border-[#EE2737]"
                        }`}
                      >
                        {/* Top Cover / Media Block */}
                        <div className="relative h-40 sm:h-44 w-full bg-[#111] overflow-hidden flex items-center justify-center shrink-0">
                          {item.image ? (
                            <>
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                            </>
                          ) : (
                            // --- Custom Glow Plate for "Foto próximamente" (Rule 1 & Rule 3) ---
                            <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-4">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] to-neutral-950" />
                              <div className="absolute w-24 h-24 rounded-full bg-[#EE2737]/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                              <Sparkles className="w-5 h-5 text-neutral-600 relative z-10 mb-1.5" />
                              <span className="font-display text-xs text-neutral-400 font-bold uppercase tracking-wider relative z-10">
                                {item.name}
                              </span>
                              <p className="text-[9px] text-neutral-500 font-sans mt-1 bg-black/40 px-2 py-0.5 rounded border border-[#222] relative z-10">
                                Foto próximamente
                              </p>
                            </div>
                          )}

                          {/* Float Tags */}
                          <div className="absolute top-2 left-2 z-10 flex gap-1">
                            {item.featured && (
                              <span className="bg-[#EE2737] text-white text-[9px] font-display font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow flex items-center gap-0.5">
                                <Flame className="w-3 h-3 fill-current" /> Top
                              </span>
                            )}
                          </div>

                          {/* Quick Like Action inside card overlay */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(item.id);
                            }}
                            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#222] text-white hover:bg-[#EE2737] hover:text-white transition-all shadow-md"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current text-[#EE2737]" : ""}`} />
                          </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
                          <div>
                            {/* Title & Price */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4 className="font-display text-base font-bold text-white uppercase tracking-wide group-hover:text-[#EE2737] transition-colors leading-snug">
                                {item.name}
                              </h4>
                              <span className="font-display font-bold text-sm text-[#EE2737] shrink-0 bg-[#EE2737]/10 px-2 py-0.5 rounded">
                                {item.price.toFixed(2)}€
                              </span>
                            </div>

                            {/* Description */}
                            {item.description && (
                              <p className="text-neutral-400 text-xs font-sans font-light leading-relaxed mb-3 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Bottom Segment: Allergens & Add Button */}
                          <div className="border-t border-[#222] pt-3 mt-1.5">
                            
                            {/* Allergens list */}
                            <div className="flex items-center gap-1 flex-wrap mb-3.5 min-h-[16px]">
                              {item.allergens.length > 0 ? (
                                item.allergens.slice(0, 3).map((al, alIdx) => (
                                  <span 
                                    key={alIdx} 
                                    className="bg-[#000000] border border-[#222] text-[8px] text-neutral-400 font-sans px-1.5 py-0.5 rounded uppercase"
                                    title={`Contiene ${al}`}
                                  >
                                    ⚠️ {al.split(" ")[0]}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[8px] text-neutral-600 font-sans">
                                  🌿 Sin alérgenos declarados
                                </span>
                              )}
                            </div>

                            {/* Cart Action Trigger */}
                            {qtyInCart > 0 ? (
                              <div className="flex items-center justify-between bg-[#000000]/80 rounded-lg p-1 border border-[#EE2737]/30">
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="p-1.5 rounded bg-[#121212] hover:bg-neutral-700 text-white transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-display font-bold text-white px-3">
                                  {qtyInCart} en cesta
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="p-1.5 rounded bg-[#121212] hover:bg-neutral-700 text-white transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="w-full bg-white text-black hover:bg-[#EE2737] hover:text-white font-display text-xs font-bold tracking-wider uppercase py-2 px-3 rounded transition-all flex items-center justify-center gap-1.5 shadow"
                              >
                                <Plus className="w-3.5 h-3.5" /> Añadir a Pedido
                              </button>
                            )}

                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

              {/* Section Divider: Reservations inside traditional view */}
              <div className="mt-12 bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                
                {/* Background ambient red glow */}
                <div className="absolute w-80 h-80 rounded-full bg-[#EE2737]/5 blur-3xl -bottom-40 -left-40 pointer-events-none" />
                
                <div className="relative z-10 max-w-2xl mx-auto">
                   <div className="text-center mb-6">
                    <span className="text-xs font-display tracking-widest text-[#EE2737] uppercase bg-[#EE2737]/10 px-3 py-1 rounded font-bold">
                      Reservas Online
                    </span>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase mt-2.5 flex items-center justify-center gap-2">
                      🍷 RESERVAR UNA MESA
                    </h2>
                    <p className="text-neutral-400 text-xs font-sans max-w-sm mx-auto mt-1">
                      Reserva de forma automática enviando los detalles de tu mesa por WhatsApp a nuestro equipo.
                    </p>
                  </div>

                  {reservationStatus === "success" ? (
                    <div className="bg-green-950/40 border border-green-500/20 text-green-300 p-6 rounded-2xl text-center flex flex-col items-center gap-2 animate-pulse">
                      <Check className="w-8 h-8 text-green-400" />
                      <p className="font-display text-lg font-bold uppercase">¡Solicitud de Reserva Enviada!</p>
                      <p className="text-xs font-sans">Se ha abierto WhatsApp para enviar los detalles de la mesa a nuestro equipo. Te responderemos a la brevedad.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReservationSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1">
                          Tu Nombre *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Introduce tu nombre completo..."
                          value={reservation.name}
                          onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1">
                          Teléfono de Contacto *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Introduce tu teléfono..."
                          value={reservation.phone}
                          onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Fecha de Reserva *
                        </label>
                        <input
                          type="date"
                          required
                          value={reservation.date}
                          onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Hora de Reserva *
                        </label>
                        <select
                          required
                          value={reservation.time}
                          onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        >
                          <option value="">Selecciona hora...</option>
                          <option value="13:00">13:00 (Almuerzo)</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                          <option value="14:30">14:30</option>
                          <option value="15:00">15:00</option>
                          <option value="20:00">20:00 (Cena)</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                          <option value="22:00">22:00</option>
                          <option value="22:30">22:30</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1">
                          Comensales *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={30}
                          value={reservation.guests}
                          onChange={(e) => setReservation({ ...reservation, guests: parseInt(e.target.value) || 2 })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1">
                          Notas o Alergias Especiales
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Carrito de bebé, intolerancia al gluten..."
                          value={reservation.notes}
                          onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
                          className="w-full bg-[#000000] border border-[#222] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#EE2737] text-white"
                        />
                      </div>

                      <div className="sm:col-span-2 mt-2">
                        <button
                          type="submit"
                          className="w-full bg-[#EE2737] hover:bg-[#d61b2a] text-white font-display text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" /> Confirmar Solicitud vía WhatsApp
                        </button>
                      </div>

                    </form>
                  )}
                </div>

              </div>

            </div>
          )}

      </main>


      {/* Floating Sticky Cart Indicator Bar (Standard on mobile menus) */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#EE2737] text-white rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl hover:bg-[#d61b2a] transition-colors border border-white/20"
            id="btn-floating-cart"
          >
            <div className="flex items-center gap-3">
              <span className="bg-black/40 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {cartTotalItems}
              </span>
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                Ver Pedido
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-sm">
                {cartTotalPrice.toFixed(2)}€
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}


      {/* SLIDE-OUT SHOPPING CART DRAWER PANEL */}
      <div 
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="cart-drawer-backdrop"
      >
        {/* Backdrop overlay */}
        <div 
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm" 
        />

        {/* Drawer container body */}
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0d0d0d] border-l border-[#222] shadow-2xl flex flex-col justify-between transition-transform duration-300 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#222] flex items-center justify-between bg-black">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#EE2737]" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">Tu Pedido</h2>
              <span className="bg-[#121212] border border-[#222] text-neutral-400 text-xs px-2.5 py-1 rounded">
                {cartTotalItems} uds
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded hover:bg-neutral-950 text-neutral-400 hover:text-white border border-[#222] transition-colors"
              id="btn-close-cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Items Content list */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar bg-[#050505]">
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-neutral-500 gap-3">
                <ShoppingBag className="w-12 h-12 text-neutral-700 animate-pulse" />
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-400">Su carrito está vacío</p>
                <p className="text-xs font-sans max-w-xs leading-relaxed">
                  Visita nuestra carta tradicional o navega por los Reels para añadir tus tapas, ibéricos y bebidas preferidas.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setViewMode("carta");
                  }}
                  className="mt-2 px-5 py-2.5 bg-white text-black font-display font-bold text-xs uppercase tracking-wider shadow hover:bg-[#EE2737] hover:text-white transition-all rounded"
                >
                  Explorar la Carta
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[#121212] border border-[#222] rounded p-3 text-center text-neutral-400 text-[10px] font-sans">
                  💡 Puedes añadir notas para cocina o especificar intolerancias en cada artículo.
                </div>

                {cart.map((cartItem) => (
                  <div 
                    key={cartItem.item.id}
                    className="bg-[#000000] border border-[#222] rounded p-3.5 flex flex-col gap-3 hover:border-[#EE2737] transition-all"
                  >
                    <div className="flex gap-3 justify-between items-start">
                      <div className="flex-grow">
                        <span className="text-[9px] text-[#EE2737] font-display uppercase font-bold block mb-0.5">
                          {cartItem.item.category}
                        </span>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white leading-tight">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs text-neutral-400 font-sans block mt-0.5">
                          {cartItem.item.price.toFixed(2)}€ por unidad
                        </span>
                      </div>
                      <span className="font-display font-bold text-sm text-[#EE2737] shrink-0 bg-[#EE2737]/10 px-2 py-0.5 rounded">
                        {(cartItem.item.price * cartItem.quantity).toFixed(2)}€
                      </span>
                    </div>

                    {/* Custom Notes Field per Item */}
                    <input
                      type="text"
                      placeholder="Instrucciones especiales (ej. sin cebolla)..."
                      value={cartItem.notes || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCart(prev => prev.map(c => 
                          c.item.id === cartItem.item.id ? { ...c, notes: val } : c
                        ));
                      }}
                      className="w-full bg-[#121212] border border-[#222] rounded px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-[#EE2737] placeholder:text-neutral-500"
                    />

                    {/* Quantities Adjustment inside Drawer */}
                    <div className="flex items-center justify-between border-t border-[#222] pt-2.5">
                      <button
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="text-neutral-500 hover:text-[#EE2737] text-xs flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-sans">Eliminar</span>
                      </button>

                      <div className="flex items-center bg-[#121212] border border-[#222] rounded p-0.5">
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, -1)}
                          className="p-1 rounded hover:bg-neutral-800 text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-display font-bold text-white px-3.5">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, 1)}
                          className="p-1 rounded hover:bg-neutral-800 text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </>
            )}
          </div>

          {/* Drawer Footer summary and checkout button */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#222] bg-black flex flex-col gap-4">
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline text-xs text-neutral-400">
                  <span>Suma de Artículos</span>
                  <span>{cartTotalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-neutral-400">
                  <span>Gastos de Servicio</span>
                  <span className="text-green-400 font-sans font-medium">Gratis</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-[#222] pt-2 mt-1">
                  <span className="font-display text-sm font-bold uppercase tracking-wider text-white">TOTAL DEL PEDIDO</span>
                  <span className="font-display text-xl font-bold text-[#EE2737]">
                    {cartTotalPrice.toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* Kitchen Instructions Textbox */}
              <div>
                <label className="block text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase mb-1">
                  Notas de Pedido o Mesa asignada
                </label>
                <textarea
                  id="cart-general-notes"
                  placeholder="Ej. Mesa 4, recoger a las 14:15, alérgico a los frutos secos..."
                  className="w-full bg-[#121212] border border-[#222] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#EE2737] resize-none h-14"
                />
              </div>

              <button
                onClick={clearCart}
                className="w-full bg-[#121212] hover:bg-[#222] text-white font-display text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded transition-all shadow-lg flex items-center justify-center gap-2 border border-[#222]"
                id="btn-cart-checkout"
              >
                <Trash2 className="w-4 h-4" />
                Vaciar carrito
              </button>

            </div>
          )}

        </div>
      </div>


      {/* Page Footer */}
      <footer className="bg-[#000000] border-t border-[#222] py-8 px-4 text-center text-xs text-neutral-500 font-sans tracking-wide">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#121212] border border-[#222] flex items-center justify-center font-display text-sm font-bold text-neutral-300">
              AI
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-neutral-300 tracking-wider">ALMA IBÉRICA</h4>
              <p className="text-[10px] text-neutral-500 font-light mt-0.5">Tradición y Sabor en Sant Boi</p>
            </div>
          </div>

          <div className="flex gap-6 text-[10px] uppercase font-display tracking-widest text-neutral-400">
            <button onClick={() => { setViewMode("carta"); setSelectedCategory("Todos"); }} className="hover:text-white transition-colors cursor-pointer">Carta Completa</button>
            <button onClick={() => { setViewMode("carta"); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Reservas</button>
            <span className="text-neutral-700">|</span>
            <a href={`https://instagram.com/${INFO_EMPRESA.instagram}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5 text-neutral-500" /> Instagram
            </a>
          </div>

          <div className="text-neutral-500 text-[10px] font-sans md:text-right">
            <span>© 2026 {INFO_EMPRESA.nombre}. Todos los derechos reservados.</span>
            <span className="block text-neutral-600 text-[9px] mt-0.5">Diseño Premium de una sola página</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
