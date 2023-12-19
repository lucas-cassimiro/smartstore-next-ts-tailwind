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
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);
  const showCartOpen = () => setCartOpen(!cartOpen);

  const { cart } = useCart();

  const productExistent = cart.find((product) => product);

  return (
    <>
      <button className="relative flex items-center" onClick={showCartOpen}>
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* <Image
              src={IconCart}
              alt="Ícone de carrinho"
              className="celular:w-4 celular:h-4"
            /> */}
            <FaShoppingCart className="celular:w-4 celular:h-4 w-6 h-5 text-white" />
            {productExistent && (
              <span className="absolute bg-[#D4D4D8] rounded-full border-[2px] border-white w-4 h-4 flex items-center justify-center top-[-1px] left-[16px]">
                {cart.length}
              </span>
            )}
          </div>
          <span className="text-white celular:text-sm text-sm">Cart</span>
        </div>
      </button>

      <div
        className={`${
          cartOpen ? "w-full opacity-100 visible bg-black/60" : ""
        } flex flex-row-reverse  h-full w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 left-0 `}
        onClick={showCartOpen}
      >
        <div
          className={`${
            cartOpen ? "w-[400px] h-full tablet:w-[300px]" : ""
          } w-0 transition-all duration-1000 ease-in-out py-6 bg-white overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 w-[400px] h-full tablet:w-[300px] relative">
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
                <div className="flex items-center gap-2 overflow-y-auto scrollbar scrollbar-medium relative flex-wrap">
                  {cart.map((cart) => (
                    <div
                      key={cart.id}
                      className="flex flex-wrap w-full items-center"
                    >
                      <Image
                        src={`http://localhost:3333/tmp/uploads/${cart.image}`}
                        alt="Imagem do produto"
                        quality={80}
                        priority={true}
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col mb-10 gap-[6px]">
                        {cart.black_friday ? (
                          <>
                            <span className="text-base tablet:text-xs">
                              {cart.name}
                            </span>
                            <div className="flex gap-2">
                              <p className="py-[0.3rem] px-3 bg-[#d93a1e] text-white font-semibold rounded-[4px] text-sm tablet:text-xs">
                                -{cart.discount}%
                              </p>
                              <p className="bg-[#313131] rounded-[4px] py-[0.3rem] px-3 text-white font-semibold text-sm tablet:text-xs">
                                Black Friday
                              </p>
                            </div>
                            <span className="text-sm">
                              Quantidade: {cart.quantity}
                            </span>
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
                            <div className="flex border-2 gap-3 w-[90px] h-[40px] p-2 items-center">
                              <ButtonDecrementToCart item={cart} />

                              <span className="font-medium text-sm">
                                {`${cart.quantity}`.padStart(2, "0")}
                              </span>

                              <ButtonIncrementToCart item={cart} />
                            </div>{" "}
                            <ButtonRemoveFromCart item={cart} />
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
                <div className="absolute bottom-0 flex flex-col w-[350px] tablet:w-[250px] bg-white">
                  <ConfirmOrder />
                  <Link
                    href="/checkout"
                    className="bg-[#4aa4ee] p-4 border-none rounded-lg cursor-pointer font-bold text-xl text-center uppercase text-white hover:bg-[#3286ca] w-full"
                  >
                    Finalizar Pedido
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
