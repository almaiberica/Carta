import { Sandwich, UtensilsCrossed, Pizza, Beer, Menu } from "lucide-react";

interface BottomNavProps {
  activeCategoryKey: string;
  onSelectCategory: (categoryKey: string) => void;
  onOpenMenu: () => void;
}

export default function BottomNav({
  activeCategoryKey,
  onSelectCategory,
  onOpenMenu,
}: BottomNavProps) {
  const navItems = [
    {
      key: "bocadillos",
      label: "Bocadillos",
      icon: Sandwich,
    },
    {
      key: "tapeo",
      label: "Tapeo",
      icon: UtensilsCrossed,
    },
    {
      key: "platos",
      label: "Platos",
      icon: Pizza,
    },
    {
      key: "bebidas",
      label: "Bebidas",
      icon: Beer,
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-white/10 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeCategoryKey === item.key;
          return (
            <button
              key={item.key}
              id={`nav-item-${item.key}`}
              onClick={() => onSelectCategory(item.key)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 focus:outline-none transition-all cursor-pointer active:scale-95"
            >
              <IconComponent
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? "text-white scale-110" : "text-white/40"
                }`}
              />
              <span
                className={`text-[10px] font-display font-bold uppercase tracking-wider mt-1 transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/40"
                }`}
              >
                {item.label}
              </span>
              
              {/* Active Indicator Red Dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-[#EE2737] rounded-full shadow-md shadow-[#EE2737]/60" />
              )}
            </button>
          );
        })}

        {/* Menu Hamburguesa Button (Never has an active dot) */}
        <button
          id="nav-item-menu"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 focus:outline-none transition-all cursor-pointer active:scale-95 text-white/40 hover:text-white"
        >
          <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider mt-1 text-white/40">
            Menú
          </span>
        </button>
      </div>
    </div>
  );
}
