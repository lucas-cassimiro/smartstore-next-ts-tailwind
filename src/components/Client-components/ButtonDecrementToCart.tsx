import { Products } from "@/contexts/CartContext";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";

import { AiOutlineMinus } from "react-icons/ai";

import minusImg from "../../assets/circle-minus.svg";

interface ButtonProps {
  item: Products;
}

export default function ButtonDecrementToCart({ item }: ButtonProps) {
  const { productCartDecrement } = useCart();

  return (
    <button type="button" onClick={() => productCartDecrement(item)}>
      <AiOutlineMinus className="w-6 h-6" />
    </button>
  );
}
