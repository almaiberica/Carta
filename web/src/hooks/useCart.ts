import { useState, useEffect } from "react";
import { Dish } from "../data";

export type CartItem = {
  dish: Dish;
  qty: number;
};

export type Cart = Record<string, CartItem>;

export function useCart() {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const saved = localStorage.getItem("alma_comanda");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("alma_comanda", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const current = prev[dish.key];
      return {
        ...prev,
        [dish.key]: {
          dish,
          qty: current ? current.qty + 1 : 1,
        },
      };
    });
  };

  const updateQty = (key: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          qty,
        },
      };
    });
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalItems = (Object.values(cart) as CartItem[]).reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = (Object.values(cart) as CartItem[]).reduce((acc, item) => acc + item.dish.price * item.qty, 0);

  return {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };
}
