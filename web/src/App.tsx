import { useState, useMemo } from "react";
import { MENU_DATA } from "./data";
import { useCart } from "./hooks/useCart";
import { useAntojos } from "./hooks/useAntojos";

// Components
import ModeSelector from "./components/ModeSelector";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import ReelsView from "./components/ReelsView";
import CartaView from "./components/CartaView";
import CartSheet from "./components/CartSheet";
import AntojosSheet from "./components/AntojosSheet";
import MenuOverlay from "./components/MenuOverlay";

export default function App() {
  // Modes: "start" (home screen mode selector), "real" (reels), "carta" (list)
  const [mode, setMode] = useState<"start" | "real" | "carta">("start");

  // Bottom Navigation categories tracking state (bocadillos, tapeo, platos, bebidas)
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("bocadillos");

  // Overlay sheets visibility toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAntojosOpen, setIsAntojosOpen] = useState(false);

  // Custom Hooks for Cart & Favorites
  const {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { antojos, toggleAntojo, isAntojo } = useAntojos();

  // Flattened active dishes in order of category sections
  const allActiveDishes = useMemo(() => {
    return [
      ...(MENU_DATA.bocadillos || []),
      ...(MENU_DATA.tapeo || []),
      ...(MENU_DATA.platos || []),
      ...(MENU_DATA.bebidas || []),
    ];
  }, []);

  // Category display label translator
  const activeCategoryLabel = useMemo(() => {
    switch (activeCategoryKey) {
      case "bocadillos":
        return "Bocadillos Selectos";
      case "tapeo":
        return "Tapeo y Vermut";
      case "platos":
        return "Platos Principales";
      case "bebidas":
        return "Bodega y Bebidas";
      default:
        return "Alma Ibérica";
    }
  }, [activeCategoryKey]);

  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Mobile Frame Container viewport-fit=cover */}
      <div className="app-viewport relative flex flex-col h-full w-full max-w-[430px] bg-black overflow-hidden shadow-black/80 shadow-2xl">
        
        {/* VIEW 1: START SCREEN (Selector de Modo) */}
        {mode === "start" && (
          <ModeSelector
            onSelectMode={(selectedMode) => {
              setMode(selectedMode);
              setActiveCategoryKey("bocadillos"); // Default start category
            }}
          />
        )}

        {/* ACTIVE VIEWS (Real or Carta list representation) */}
        {mode !== "start" && (
          <>
            {/* Top Fixed Header with Toggle & Indicator */}
            <TopBar
              currentMode={mode}
              onChangeMode={(newMode) => setMode(newMode)}
              activeCategoryLabel={activeCategoryLabel}
              cartCount={totalItems}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Core View Switcher */}
            <div className="flex-1 w-full h-full">
              {mode === "real" ? (
                <ReelsView
                  dishes={allActiveDishes}
                  cart={cart}
                  antojosKeys={antojos}
                  onToggleAntojo={toggleAntojo}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  onActiveCategoryChange={setActiveCategoryKey}
                  onOpenCart={() => setIsCartOpen(true)}
                  activeCategoryKey={activeCategoryKey}
                />
              ) : (
                <CartaView
                  dishes={allActiveDishes}
                  cart={cart}
                  antojosKeys={antojos}
                  onToggleAntojo={toggleAntojo}
                  onAddToCart={addToCart}
                  onActiveCategoryChange={setActiveCategoryKey}
                  activeCategoryKey={activeCategoryKey}
                />
              )}
            </div>

            {/* Bottom Nav fixed category tabs bar */}
            <BottomNav
              activeCategoryKey={activeCategoryKey}
              onSelectCategory={setActiveCategoryKey}
              onOpenMenu={() => setIsMenuOpen(true)}
            />

            {/* CART SHEET OVERLAY (Mi Comanda) */}
            <CartSheet
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onUpdateQty={updateQty}
              onClearCart={clearCart}
              totalPrice={totalPrice}
              totalItems={totalItems}
            />

            {/* ANTOJOS SHEET OVERLAY (Favoritos) */}
            <AntojosSheet
              isOpen={isAntojosOpen}
              onClose={() => setIsAntojosOpen(false)}
              antojosKeys={antojos}
              allDishes={allActiveDishes}
              onToggleAntojo={toggleAntojo}
              onAddToCart={addToCart}
              cart={cart}
            />

            {/* HAMBURGER MENU OVERLAY */}
            <MenuOverlay
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onOpenAntojos={() => setIsAntojosOpen(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
