import Image from "next/image";
import Link from "next/link";

import CartEmpty from "../assets/carrinho-vazio.jpeg";

interface EmptyCartProps {
  title: string;
}

export function EmptyCart({ title }: EmptyCartProps) {
  return (
    <section className="flex flex-col items-center text-center py-5 px-2">
      <h2 className="max-w-[500px] text-2xl font-bold">{title}</h2>
      <Link
        href="/"
        className="block bg-[#4aa4ee] w-full max-w-[13rem] h-12 cursor-pointer rounded-lg font-medium text-xl leading-[3rem] text-white hover:bg-[#3286ca]"
      >
        Ir para início
      </Link>
      <Image
        src={CartEmpty}
        alt="Boneco com carrinho vazio"
        priority={true}
        className="w-full max-w-[32rem] h-auto"
      />
    </section>
  );
}
