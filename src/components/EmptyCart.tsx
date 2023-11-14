import Image from "next/image";

import CartEmpty from "../assets/carrinho-vazio.jpeg";

interface EmptyCartProps {
  title: string;
}

export function EmptyCart({ title }: EmptyCartProps) {
  return (
    <section className="flex flex-col items-center text-center py-5 px-2 gap-8">
      <h2 className="max-w-[500px] text-2xl font-bold">{title}</h2>
      <Image
        src={CartEmpty}
        alt="Boneco com carrinho vazio"
        priority={true}
        className="w-full max-w-[32rem] h-auto"
      />
    </section>
  );
}
