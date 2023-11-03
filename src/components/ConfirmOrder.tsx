import currencyFormat from "@/helpers/currencyFormat";

import { useCart } from "@/hooks/useCart";

export default function ConfirmOrder() {
  const { cart } = useCart();

  const totalAmount = cart.reduce((acc, item) => {
    if (item.black_friday) {
      return (
        acc + ((item.price * (100 - item.discount!)) / 100) * item.quantity
      );
    } else {
      return acc + item.price * item.quantity;
    }
  }, 0);

  return (
    <div className="pt-6 flex items-center justify-between">
      {/* <button
        type="button"
        className="bg-[#4aa4ee] w-full max-h-[16.5rem] min-h-[4rem] border-none rounded-lg cursor-pointer font-bold text-xl uppercase text-white"
      >
        Finalizar Pedido
      </button> */}
      <span className="font-medium uppercase">
        Total{" "}
        <strong className="ml-3 font-bold text-4xl text-black">
          {currencyFormat(totalAmount)}
        </strong>
      </span>
    </div>
  );
}
