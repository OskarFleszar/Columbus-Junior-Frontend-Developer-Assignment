import Image from "next/image";
import CartIcon from "../CartIcon/CartIcon";
import styles from "./Header.module.css";

type HeaderProps = {
  title: string;
  logo: { url: string; altText: string };
};

export default function Header({ title, logo }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image
          src={logo.url}
          alt={logo.altText}
          width={160}
          height={60}
          priority
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <CartIcon />
    </header>
  );
}
