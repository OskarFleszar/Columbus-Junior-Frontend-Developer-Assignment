import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Columbus Recruitment Task",
  description: "Product listing page built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
