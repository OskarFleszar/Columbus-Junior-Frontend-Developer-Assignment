"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProductImage.module.css";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function ProductImage({
  src,
  alt,
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.fallback} role="img" aria-label={alt}>
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={styles.image}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}
