export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  allergens: string[];
  image: string; // Will hold relative paths like "images/burrata_iberica.webp"
  featured: boolean;
  blockMenu?: string;
  priceWithLeche?: number;
  priceCortado?: number;
  priceWithRefresco?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Reservation {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export type MenuCategory = 
  | "Desayuno y Merienda Selecta"
  | "Ibéricos y Embutidos"
  | "Tapeo Selecto"
  | "Bocadillos, Burgers y Pizzas"
  | "Bebidas y Vermuts";
