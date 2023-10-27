import { NavLink } from "@/app/layout";
import Navigation from "./Client-components/Navigation";
import Link from "next/link";

import Image from "next/image";

import { Lobster } from "next/font/google";

interface NavLinkProps {
  navLinks: NavLink[];
}

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  style: "normal",
});

interface NavLinkProps {
  navLinks: NavLink[];
}

export default function Header({ navLinks }: NavLinkProps) {
  return (
    <header>
      <div>
        <p>
          A melhor franquia de smartphones do
          <span className="ml-1 text-[#FAFF00]">Brasil</span>
        </p>

        <a href="#">SEJA UM REVENDEDOR</a>
      </div>

      <div>
        <h1>
          <Link href="/" style={lobster.style} className={lobster.className}>
            Smart Store
          </Link>
        </h1>

        <Link href="/carrinho">
          <div>{/* <Image src={IconCart} alt="Ícone de carrinho" /> */}</div>
        </Link>
      </div>

      <nav>
        <Navigation navLinks={navLinks} />
      </nav>
    </header>
  );
}
