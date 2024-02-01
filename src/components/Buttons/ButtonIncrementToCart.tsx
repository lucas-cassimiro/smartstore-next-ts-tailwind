import { Products } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";

import { AiOutlinePlus } from "react-icons/ai";

interface ButtonProps {
  item: Products;
}

export default function ButtonIncrementToCart({ item }: ButtonProps) {
  const { productCartIncrement } = useCart();

  return (
    <button type="button" onClick={() => productCartIncrement(item)}>
      <AiOutlinePlus className="w-4 h-4" />
    </button>
  );
}
