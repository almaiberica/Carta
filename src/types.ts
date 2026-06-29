export type MenuCategory = "Platos Principales" | "Tapeo Selecto" | "Bocadillos" | "Bebidas";

export interface MenuItem {
  id: number;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  allergens: string[];
  image: string;
  featured?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
