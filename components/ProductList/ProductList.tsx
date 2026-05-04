import { Product } from "@/types/columbus";
import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <section className={styles.section} aria-label="Products">
      <ul className={styles.grid}>
        {products.map((product, index) => (
          <li key={product.articleNumber} className={styles.item}>
            <ProductCard product={product} priority={index < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
