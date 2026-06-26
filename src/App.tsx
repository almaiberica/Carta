import { useEffect, useMemo, useRef, useState } from "react";
import { MENU_ITEMS } from "./data";
import type { CartItem, MenuCategory, MenuItem } from "./types";

const CATEGORY_ORDER: MenuCategory[] = ["Platos Principales", "Tapeo Selecto", "Bocadillos", "Bebidas"];

function App() {
  const [view, setView] = useState<"home" | "reels">("home");
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("Platos Principales");
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  const reelItems = useMemo(() => {
    const ordered = CATEGORY_ORDER.flatMap((category) =>
      MENU_ITEMS.filter((item) => item.category === category)
    );
    return [...ordered, ...ordered.slice(0, 4)];
  }, []);

  const categoryStartIndex = useMemo(() => {
    return CATEGORY_ORDER.reduce<Record<MenuCategory, number>>((acc, category, index) => {
      acc[category] = index * 3;
      return acc;
    }, {} as Record<MenuCategory, number>);
  }, []);

  useEffect(() => {
    if (view !== "reels" || !reelsRef.current) return;
    const container = reelsRef.current;
    const target = activeIndex * container.clientHeight;
    requestAnimationFrame(() => {
      container.scrollTo({ top: target, behavior: "smooth" });
    });
  }, [activeIndex, view]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const cartTotalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0), [cart]);

  const openCategory = (category: MenuCategory) => {
    setSelectedCategory(category);
    setActiveIndex(categoryStartIndex[category]);
    setView("reels");
    setIsMenuOpen(false);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) => (entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry));
      }
      return [...prev, { item, quantity: 1 }];
    });
    setToast(`${item.name} añadida`);
    navigator.vibrate?.(18);
  };

  const updateCartQuantity = (itemId: number, change: number) => {
    setCart((prev) => prev.flatMap((entry) => {
      if (entry.item.id !== itemId) return [entry];
      const nextQty = entry.quantity + change;
      return nextQty > 0 ? [{ ...entry, quantity: nextQty }] : [];
    }));
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const handleReelsScroll = () => {
    if (!reelsRef.current) return;
    const container = reelsRef.current;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (index >= reelItems.length - 2) {
      setActiveIndex(0);
      container.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const progress = Math.min(100, (activeIndex / Math.max(1, reelItems.length - 1)) * 100);

  return (
    <div className="app-shell">
      <style>{""}</style>

      {toast && <div className="toast">{toast}</div>}

      {view === "home" ? (
        <main className="home-screen">
          <div className="brand-mark">
            <div className="brand-mark__dot" />
            <div>
              <p className="eyebrow">Tapeo Selecto · Sant Boi de Llobregat</p>
              <h1>Alma Ibérica</h1>
            </div>
          </div>

          <section className="hero">
            <p className="hero__label">La Carta</p>
            <h2>Descubre nuestra selección en modo reels</h2>
            <p className="hero__copy">Embutidos de bellota, tapas de autor y bebidas para compartir en un ambiente íntimo y contemporáneo.</p>
          </section>

          <section className="category-grid">
            {CATEGORY_ORDER.map((category) => (
              <button key={category} className="category-card" onClick={() => openCategory(category)}>
                <div className="category-card__icon">
                  {category === "Platos Principales" && <ForkKnifeIcon />}
                  {category === "Tapeo Selecto" && <TapasIcon />}
                  {category === "Bocadillos" && <SandwichIcon />}
                  {category === "Bebidas" && <WineIcon />}
                </div>
                <div className="category-card__content">
                  <h3>{category}</h3>
                  <p>
                    {category === "Platos Principales" && "Platos de autor para compartir y disfrutar."}
                    {category === "Tapeo Selecto" && "Pinchos, bravas y aperitivos de la casa."}
                    {category === "Bocadillos" && "Clásicos de siempre con productos de calidad."}
                    {category === "Bebidas" && "Vermuts, vinos y refrescos para acompañar."}
                  </p>
                </div>
              </button>
            ))}
          </section>

          <section id="reservas" className="info-card">
            <div>
              <p className="eyebrow">Reservar mesa</p>
              <h3>¿Quieres venir a comer o tomar algo?</h3>
            </div>
            <a href="tel:+34635343819" className="info-card__cta">Llamar ahora</a>
          </section>
        </main>
      ) : (
        <main className="reels-screen">
          <div className="reels-topbar">
            <button className="ghost-button" onClick={() => setView("home")}>← Carta</button>
            <button className="ghost-button ghost-button--cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingBagIcon />
              {cartTotalItems > 0 && <span className="pill-badge">{cartTotalItems}</span>}
            </button>
          </div>

          <div className="progress-track" aria-hidden="true">
            <div className="progress-track__bar" style={{ width: `${progress}%` }} />
          </div>

          <div ref={reelsRef} className="reels-container" onScroll={handleReelsScroll}>
            {reelItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <article key={`${item.id}-${index}`} className="reel-slide">
                  <img src={item.image} alt={item.name} className="reel-slide__image" />
                  <div className="reel-slide__overlay" />
                  <div className="reel-slide__content">
                    <div className="reel-slide__meta">
                      <span>{item.category}</span>
                      {item.featured && <span className="featured-pill">Destacado</span>}
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="reel-slide__footer">
                      <div>
                        <div className="price-tag">{item.price.toFixed(2)}€</div>
                        <div className="allergen-row">{item.allergens.length ? item.allergens.join(" • ") : "Sin alérgenos declarados"}</div>
                      </div>
                      <button className={`add-button ${isActive ? "add-button--active" : ""}`} onClick={() => addToCart(item)}>
                        <ShoppingBagIcon />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      )}

      <nav className="bottom-nav" aria-label="Navegación inferior">
        <button className={`bottom-nav__item ${selectedCategory === "Platos Principales" ? "active" : ""}`} onClick={() => openCategory("Platos Principales")}>
          <ForkKnifeIcon />
          {selectedCategory === "Platos Principales" && <span className="bottom-nav__dot" />}
        </button>
        <button className={`bottom-nav__item ${selectedCategory === "Tapeo Selecto" ? "active" : ""}`} onClick={() => openCategory("Tapeo Selecto")}>
          <TapasIcon />
          {selectedCategory === "Tapeo Selecto" && <span className="bottom-nav__dot" />}
        </button>
        <button className={`bottom-nav__item ${selectedCategory === "Bocadillos" ? "active" : ""}`} onClick={() => openCategory("Bocadillos")}>
          <SandwichIcon />
          {selectedCategory === "Bocadillos" && <span className="bottom-nav__dot" />}
        </button>
        <button className={`bottom-nav__item ${selectedCategory === "Bebidas" ? "active" : ""}`} onClick={() => openCategory("Bebidas")}>
          <WineIcon />
          {selectedCategory === "Bebidas" && <span className="bottom-nav__dot" />}
        </button>
        <button className="bottom-nav__item bottom-nav__item--menu" onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </button>
      </nav>

      <div className={`menu-overlay ${isMenuOpen ? "open" : ""}`} onClick={() => setIsMenuOpen(false)}>
        <div className="menu-sheet" onClick={(event) => event.stopPropagation()}>
          <div className="menu-sheet__handle" />
          <div className="menu-sheet__header">
            <div>
              <p className="eyebrow">Alma Ibérica</p>
              <h3>Todo lo que necesitas</h3>
            </div>
            <button className="menu-sheet__close" onClick={() => setIsMenuOpen(false)}>
              ✕
            </button>
          </div>

          <div className="menu-sheet__links">
            <button onClick={() => { setView("home"); setIsMenuOpen(false); }}>Inicio</button>
            <button onClick={() => { setView("home"); setIsMenuOpen(false); document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" }); }}>Reservar Mesa</button>
            <a href="https://www.instagram.com/alma_iberica_stb/" target="_blank" rel="noreferrer">Redes Sociales</a>
          </div>

          <div className="menu-sheet__info">
            <p>Carrer Lluís Pascual Roca, 38 · 08830 Sant Boi de Llobregat</p>
            <a href="tel:+34635343819">635 343 819</a>
            <a href="mailto:almaibericastb@gmail.com">almaibericastb@gmail.com</a>
            <a href="https://www.instagram.com/alma_iberica_stb/" target="_blank" rel="noreferrer">@alma_iberica_stb</a>
          </div>
        </div>
      </div>

      <div className={`cart-sheet ${isCartOpen ? "open" : ""}`}>
        <div className="cart-sheet__backdrop" onClick={() => setIsCartOpen(false)} />
        <div className="cart-sheet__panel">
          <div className="cart-sheet__header">
            <div>
              <p className="eyebrow">Mi comanda</p>
              <h3>Tu pedido</h3>
            </div>
            <button className="menu-sheet__close" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-sheet__empty">
              <p>Aún no has añadido nada.</p>
              <span>Elige un plato desde la carta y aparecerá aquí.</span>
            </div>
          ) : (
            <div className="cart-sheet__items">
              {cart.map((entry) => (
                <div key={entry.item.id} className="cart-item">
                  <div>
                    <strong>{entry.item.name}</strong>
                    <p>{entry.item.price.toFixed(2)}€ · {entry.item.category}</p>
                  </div>
                  <div className="cart-item__actions">
                    <button onClick={() => updateCartQuantity(entry.item.id, -1)}>-</button>
                    <span>{entry.quantity}</span>
                    <button onClick={() => updateCartQuantity(entry.item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-sheet__footer">
            <div className="cart-sheet__total">
              <span>Total</span>
              <strong>{cartTotalPrice.toFixed(2)}€</strong>
            </div>
            <button className="cart-sheet__call" onClick={() => { setIsCartOpen(false); window.alert("Se ha avisado al camarero."); }}>
              Llamar al camarero
            </button>
            <button className="cart-sheet__clear" onClick={clearCart}>Vaciar comanda</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForkKnifeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v8" />
      <path d="M5 3v8" />
      <path d="M11 3v8" />
      <path d="M8 11c0 2.2 1.8 4 4 4h1v6" />
      <path d="M16 3v18" />
    </svg>
  );
}

function TapasIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6h14" />
      <path d="M7 6v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
    </svg>
  );
}

function SandwichIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M4 7a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
      <path d="M6 13v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function WineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8" />
      <path d="M10 3v5a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V3" />
      <path d="M10 12h4" />
      <path d="M8 18h8" />
      <path d="M8 21h8" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export default App;
