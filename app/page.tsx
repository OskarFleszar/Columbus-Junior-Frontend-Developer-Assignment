import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getColumbusData } from "@/lib/api";

export default async function HomePage() {
  const data = await getColumbusData();
  return (
    <>
      <Header title={data.title} logo={data.logo} />
      <main>
        {data.products.slice(0, 3).map((product) => (
          <ProductCard key={product.articleNumber} product={product} />
        ))}
      </main>
    </>
  );
}
