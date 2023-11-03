"use client";

import Image from "next/image";

import IconCart from "../../assets/icon-cart.png";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

import currencyFormat from "@/helpers/currencyFormat";

import { FaTimes } from "react-icons/fa";
import ButtonDecrementToCart from "./ButtonDecrementToCart";
import ButtonIncrementToCart from "./ButtonIncrementToCart";
import ConfirmOrder from "../ConfirmOrder";

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

  const showCartOpen = () => setCartOpen(!cartOpen);

  return (
    <>
      <button className="relative flex items-center" onClick={showCartOpen}>
        <div className="flex flex-col items-center">
          <Image
            src={IconCart}
            alt="Ícone de carrinho"
            className="celular:w-4 celular:h-4"
          />
          <span className="text-white celular:text-sm">Cart</span>
        </div>
      </button>

      <div
        className={`${
          cartOpen ? "w-[350px]" : ""
        } py-6 flex flex-col  h-screen w-0 overflow-hidden bg-white transition-all duration-1000 ease-in-out fixed z-20 top-0 bottom-0 right-0`}
      >
        <div className="flex justify-between">
          <FaTimes size="1.5rem" onClick={showCartOpen} />
          <span>Carrinho</span>
        </div>

        {cart.map((cart) => (
          <>
            {/* <div>
                <Image src={cart.img} alt="Foto do produto"/>
            </div> */}
            <div className="flex flex-col">
              <span>{cart.name}</span>
              <span>Quantidade: {cart.quantity}</span>
              <span>{currencyFormat(cart.price)}</span>
              <div className="flex">
                <ButtonDecrementToCart item={cart} />

                <span>{`${cart.quantity}`.padStart(2, "0")}</span>

                <ButtonIncrementToCart item={cart} />
              </div>
            </div>
          </>
        ))}
        <div>
          <ConfirmOrder />
        </div>
      </div>
    </>
  );
}
