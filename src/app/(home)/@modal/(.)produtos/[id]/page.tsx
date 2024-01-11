import ProductFrame from "@/components/ProductFrame";
import { ProductsData } from "@/interfaces/ProductsData";

import Modal from "@/components/Modal";

async function getProductById(productId: number): Promise<ProductsData[]> {
  const request = await fetch(
    `https://smartshop-api-foy4.onrender.com/products/${productId}`
  );
  const data = await request.json();
  return data;
}

export default async function ProductModal({
  params,
}: {
  params: { id: number };
}) {
  const product = await getProductById(params.id);

  return (
    <Modal>
      <ProductFrame products={product} />
    </Modal>
  );
}
