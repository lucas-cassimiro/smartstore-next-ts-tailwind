import { Products } from "@/contexts/CartContext";

import { useCart } from "@/hooks/useCart";
import { AiOutlineMinus } from "react-icons/ai";

interface ButtonProps {
  item: Products;
}

export default function ButtonDecrementToCart({ item }: ButtonProps) {
  const { productCartDecrement } = useCart();

  return (
    <button type="button" onClick={() => productCartDecrement(item)}>
      <AiOutlineMinus className="w-4 h-4" />
    </button>
  );
}
