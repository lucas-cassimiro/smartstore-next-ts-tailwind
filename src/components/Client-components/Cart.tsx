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
import ButtonRemoveFromCart from "./ButtonRemoveFromCart";
import { EmptyCart } from "../EmptyCart";

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);

  const showCartOpen = () => setCartOpen(!cartOpen);

  const { cart } = useCart();

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
          cartOpen ? "w-full opacity-100 visible bg-black/60" : ""
        } flex flex-row-reverse  h-screen w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 left-0 `}
        onClick={showCartOpen}
      >
        <div
          className={`${
            cartOpen ? "w-[500px] h-full" : ""
          } w-0 transition-all duration-1000 ease-in-out py-6 bg-white overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 min-w-[500px] h-full">
            <div className="flex justify-between mb-10 items-center">
              <FaTimes
                size="1.5rem"
                onClick={showCartOpen}
                className="cursor-pointer"
              />
              <span className="text-2xl font-bold">
                Carrinho ({cart.length})
              </span>
            </div>
            {cart.length === 0 ? (
              <EmptyCart title="Ops! Seu carrinho está vazio" />
            ) : (
              <>
                <div className="flex flex-col items-center gap-8 overflow-y-auto max-h-[550px] scrollbar h-[800px] scrollbar-medium">
                  {cart.map((cart) => (
                    <div key={cart.id} className="flex items-center gap-5">
                      <span className="text-xs min-w-[140px]">
                        AQUI VAI SER A IMAGEM
                      </span>
                      <div className="flex flex-col mb-10 gap-[6px] min-w-[267px]">
                        {cart.black_friday ? (
                          <>
                            <span className="text-lg">{cart.name}</span>
                            <div className="flex gap-2">
                              <p className="py-[0.375rem] px-5 bg-[#d93a1e] text-white font-semibold rounded-[4px]">
                                -{cart.discount}%
                              </p>
                              <p className="bg-[#313131] text-base rounded-[4px] py-[0.375rem] px-5 text-white font-semibold">
                                Black Friday
                              </p>
                            </div>
                            <span>Quantidade: {cart.quantity}</span>
                            <span className="line-through text-xs">
                              {currencyFormat(cart.price)}
                            </span>
                            <span className="text-base">
                              <strong className="mr-1">
                                {currencyFormat(
                                  (cart.price * (100 - cart.discount)) / 100
                                )}
                              </strong>
                              à vista
                            </span>
                            <div className="flex border-2 gap-3 w-[110px] h-[40px] p-2 items-center">
                              <ButtonDecrementToCart item={cart} />

                              <span className="font-medium text-lg">
                                {`${cart.quantity}`.padStart(2, "0")}
                              </span>

                              <ButtonIncrementToCart item={cart} />
                              <ButtonRemoveFromCart item={cart} />
                            </div>{" "}
                          </>
                        ) : (
                          <>
                            <span>{cart.name}</span>
                            <span>Quantidade: {cart.quantity}</span>
                            <span>{currencyFormat(cart.price)} à vista</span>
                            <div className="flex">
                              <ButtonDecrementToCart item={cart} />

                              <span>{`${cart.quantity}`.padStart(2, "0")}</span>

                              <ButtonIncrementToCart item={cart} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <ConfirmOrder />
                <button
                  type="button"
                  className="bg-[#4aa4ee] w-full max-h-[16.5rem] min-h-[4rem] border-none rounded-lg cursor-pointer font-bold text-xl uppercase text-white hover:bg-[#3286ca]"
                >
                  Finalizar Pedido
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
