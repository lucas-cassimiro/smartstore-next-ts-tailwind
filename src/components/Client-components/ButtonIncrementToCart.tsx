import { Products } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";

import Image from "next/image";

import { AiOutlinePlus } from "react-icons/ai";

import plusImg from "../../assets/circle-plus.svg";

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
