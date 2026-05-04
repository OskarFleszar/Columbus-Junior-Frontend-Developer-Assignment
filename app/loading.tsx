import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.section} aria-label="Loading products">
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.image} />
            <div className={styles.content}>
              <div className={styles.brand} />
              <div className={styles.title} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.button} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
