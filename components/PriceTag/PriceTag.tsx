import { calculateDiscountedPrice } from "@/lib/price";
import styles from "./PriceTag.module.css";

type PriceTagProps = {
  price: number;
  promotion?: { name: string; percentage: number } | null;
};

export default function PriceTag({ price, promotion }: PriceTagProps) {
  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
  });

  return promotion ? (
    <div className={styles.wrapper}>
      <s className={styles.originalPrice}>{formatter.format(price)}</s>
      <span className={styles.discountedPrice}>
        {formatter.format(
          calculateDiscountedPrice(price, promotion.percentage),
        )}
      </span>
      <span className={styles.badge}>-{promotion.percentage}%</span>
    </div>
  ) : (
    <span className={styles.price}>{formatter.format(price)}</span>
  );
}
