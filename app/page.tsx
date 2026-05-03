import { getColumbusData } from "@/lib/api";

export default async function HomePage() {
  const data = await getColumbusData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
