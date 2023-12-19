import { ProductsData } from "@/interfaces/ProductsData";

import ProductFrame from "@/components/ProductFrame";

async function getProductById(productId: number): Promise<ProductsData[]> {
  const request = await fetch(
    `http://localhost:3333/products/${productId}`
  );
  const data = await request.json();
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const product = await getProductById(params.id);
  return <ProductFrame products={product} />;
}
