"use client";

import { ProductsData } from "@/interfaces/ProductsData";

import { useCart } from "@/hooks/useCart";
import useModal from "@/hooks/useModal";

interface ProductProps {
  products: ProductsData;
}

export default function ButtonAddToCart({ products }: ProductProps) {
  const { addProductIntoCart } = useCart();
  const { onDismiss } = useModal();

  return (
    <button
      type="button"
      className="bg-[#4aa4ee] transition-all hover:bg-[#3286ca] p-4 rounded-[2px] font-medium tabletgrande:text-sm tablet:text-xs tablet:font-medium"
      onClick={() => {
        addProductIntoCart(products), onDismiss();
      }}
    >
      Adicionar ao carrinho
    </button>
  );
}
