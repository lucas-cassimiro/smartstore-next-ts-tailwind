import { ProductsData } from "@/interfaces/ProductsData";

import ProductFrame from "@/components/ProductFrame";

async function getProductById(productId: number): Promise<ProductsData[]> {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/${productId}`
  );
  return await response.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const product = await getProductById(params.id);
  return <ProductFrame products={product} />;
}
