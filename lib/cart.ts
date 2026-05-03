import { Product } from "@/types/columbus";

export function fakeAddToCart(product: Product): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 500));
}
