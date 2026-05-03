"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import type { Product } from "@/types/columbus";
import { fakeAddToCart } from "@/lib/cart";

type CartItem = { product: Product; quantity: number };
type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(async (product: Product) => {
    await fakeAddToCart(product);

    setItems((prev) => {
      const exists = prev.some(
        (item) => item.product.articleNumber === product.articleNumber,
      );

      if (exists) {
        return prev.map((item) =>
          item.product.articleNumber === product.articleNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, totalItems, addToCart }),
    [items, totalItems, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
