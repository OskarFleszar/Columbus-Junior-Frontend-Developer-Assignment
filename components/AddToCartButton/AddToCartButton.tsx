"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/columbus";
import { useState } from "react";
import styles from "./AddToCartButton.module.css";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  async function handleClick() {
    setIsAdding(true);
    try {
      await addToCart(product);
    } catch (e) {
      console.error("An error occured while adding item to cart", e);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={isAdding}
      aria-busy={isAdding}
    >
      {isAdding ? "Adding.." : "Add to cart"}
    </button>
  );
}
