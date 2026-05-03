import Image from "next/image";
import { Product } from "@/types/columbus";
import PriceTag from "../PriceTag/PriceTag";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductImage from "../ProductImage/ProductImage";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <ProductImage
          src={product.image.url}
          alt={product.image.altText}
          priority={priority}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>
          <Image
            src={product.brandLogo}
            alt={product.brandName}
            width={80}
            height={24}
          />
        </div>

        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <PriceTag price={product.price} promotion={product.promotion} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
