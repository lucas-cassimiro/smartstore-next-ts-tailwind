import { Products } from "@/contexts/CartContext";

import { useCart } from "@/hooks/useCart";

import { IoClose } from "react-icons/io5";

interface ButtonProps {
  item: Products;
}

export default function ButtonRemoveFromCart({ item }: ButtonProps) {
  const { removeProductFromCart } = useCart();
  return (
    <button type="button" onClick={() => removeProductFromCart(item)}>
      <IoClose className="text-gray-400 w-5 h-5"/>
    </button>
  );
}
