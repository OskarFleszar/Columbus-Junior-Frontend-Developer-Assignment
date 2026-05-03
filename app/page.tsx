import Header from "@/components/Header/Header";
import ProductList from "@/components/ProductList/ProductList";
import { getColumbusData } from "@/lib/api";

export default async function HomePage() {
  const data = await getColumbusData();
  return (
    <>
      <Header title={data.title} logo={data.logo} />
      <main>
        <ProductList products={data.products} />
      </main>
    </>
  );
}
