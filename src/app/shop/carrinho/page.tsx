"use client";

import ConfirmOrder from "@/components/ConfirmOrder";
import { useCart } from "@/hooks/useCart";

import currencyFormat from "@/helpers/currencyFormat";

import ButtonDecrementToCart from "@/components/Client-components/ButtonDecrementToCart";
import ButtonRemoveFromCart from "@/components/Client-components/ButtonRemoveFromCart";
import ButtonIncrementToCart from "@/components/Client-components/ButtonIncrementToCart";

import Image from "next/image";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="">
      <h1 className="w-full py-6 px-6">
        <strong>Você está em:</strong> carrinho
      </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Produto</th>
              <th>QTD</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={`${item.name}`}>
                <td>
                  {/* <Image src={item.image} alt="Imagem do produto" /> */}
                </td>
                <td>
                  <h4>{item.name}</h4>
                  <span>{currencyFormat(item.price)}</span>
                </td>
                <td>
                  <div>
                    <ButtonDecrementToCart item={item} />
                    <span>{`${item.quantity}`.padStart(2, "0")}</span>
                    <ButtonIncrementToCart item={item} />
                  </div>
                </td>
                <td>
                  {!item.black_friday && (
                    <h5>{currencyFormat(item.price * item.quantity)}</h5>
                  )}
                  {item.black_friday && (
                    <h5>
                      {currencyFormat(
                        ((item.price * (100 - item.discount!)) / 100) *
                          item.quantity
                      )}
                    </h5>
                  )}
                </td>
                <td><ButtonRemoveFromCart item={item} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmOrder />
      </div>
    </div>
  );
}
