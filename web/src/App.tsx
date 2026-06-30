import { useState, useMemo } from "react";
import { MENU_DATA } from "./data";
import { useCart } from "./hooks/useCart";

// Components
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import ReelsView from "./components/ReelsView";
import CartaView from "./components/CartaView";
import CartSheet from "./components/CartSheet";
import MenuOverlay from "./components/MenuOverlay";

export default function App() {
  const [mode, setMode] = useState<"real" | "carta">("real");

  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("bocadillos");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const allActiveDishes = useMemo(() => {
    return [
      ...(MENU_DATA.bocadillos || []),
      ...(MENU_DATA.tapeo || []),
      ...(MENU_DATA.platos || []),
      ...(MENU_DATA.bebidas || []),
    ];
  }, []);

  const activeCategoryLabel = useMemo(() => {
    switch (activeCategoryKey) {
      case "bocadillos": return "Bocadillos Selectos";
      case "tapeo": return "Tapeo y Vermut";
      case "platos": return "Platos Principales";
      case "bebidas": return "Bodega y Bebidas";
      default: return "Alma Ibérica";
    }
  }, [activeCategoryKey]);

  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
      <div className="app-viewport relative flex flex-col h-full w-full max-w-[430px] bg-black overflow-hidden shadow-black/80 shadow-2xl">

        <TopBar
          currentMode={mode}
          onChangeMode={(newMode) => setMode(newMode)}
          activeCategoryLabel={activeCategoryLabel}
          cartCount={totalItems}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <div className="flex-1 w-full h-full">
          {mode === "real" ? (
            <ReelsView
              dishes={allActiveDishes}
              cart={cart}
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
              onAddToCart={addToCart}
              onActiveCategoryChange={setActiveCategoryKey}
              activeCategoryKey={activeCategoryKey}
            />
          )}
        </div>

        <BottomNav
          activeCategoryKey={activeCategoryKey}
          onSelectCategory={setActiveCategoryKey}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={updateQty}
          onClearCart={clearCart}
          totalPrice={totalPrice}
          totalItems={totalItems}
        />

        <MenuOverlay
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpenAntojos={() => setIsCartOpen(true)}
        />
      </div>
    </div>
  );
}
