import Image from "next/image";
import Link from "next/link";

import CartEmpty from "../assets/carrinho-vazio.jpeg";

interface EmptyCartProps {
  title: string;
}

export function EmptyCart({ title }: EmptyCartProps) {
  return (
    <section>
      <h2>{title}</h2>
      <Link href="/">Ir para início</Link>
      <Image src={CartEmpty} alt="Boneco com carrinho vazio" priority={true} />
    </section>
  );
}
