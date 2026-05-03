import { Product } from "@/types/columbus";
import PriceTag from "../PriceTag/PriceTag";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <PriceTag price={product.price} promotion={product.promotion} />
      <AddToCartButton product={product} />
    </>
  );
}
