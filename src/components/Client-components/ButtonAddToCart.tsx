"use client";

import { ProductsData } from "@/interfaces/ProductsData";
import { BsFillCartPlusFill } from "react-icons/bs";

import { useCart } from "@/hooks/useCart";

interface ProductProps {
  products: ProductsData;
}

export default function ButtonAddToCart({ products }: ProductProps) {
  const { addProductIntoCart } = useCart();

  return (
    <button
      type="button"
      className="bg-[#4aa4ee] hover:bg-[#3286ca] p-4 rounded-[4px] font-medium"
      onClick={() => addProductIntoCart(products)}
    >
      Adicionar ao carrinho
    </button>
  );
}
