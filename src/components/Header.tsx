import { NavLink } from "@/app/layout";
import Navigation from "./Client-components/Navigation";
import Link from "next/link";

import Image from "next/image";

import { Lobster } from "next/font/google";

import IconCart from "../assets/icon-cart.png";
import IconLogin from "../assets/login.png";

import Location from "./Client-components/Location";

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
    <header className="flex flex-col items-center w-full">
      <div className="flex items-center flex-row-reverse relative w-full h-[2.125rem] bg-[#3877c9] py-0 px-[2.125rem]">
        <p className="m-auto text-[0.8rem]">
          A melhor franquia de smartphones do
          <span className="ml-1 text-[#FAFF00]">Brasil</span>
        </p>

        <a href="#" className="absolute text-[0.9rem] font-semibold">
          SEJA UM REVENDEDOR
        </a>
      </div>

      <div className="flex items-center relative w-full h-[3.5625rem] bg-[#313131] py-0 px-8">
        <Location />
        <h1 className="m-auto">
          <Link
            href="/"
            style={lobster.style}
            className={`flex justify-center stroke-[#074291] ${lobster.className} text-[2.5rem] ml-14`}
          >
            Smart Store
          </Link>
        </h1>

        <div className="flex gap-3">
          <Link href="/carrinho" className="relative flex items-center">
            <div className="flex flex-col items-center">
              <Image src={IconCart} alt="Ícone de carrinho" />
              <span>Cart</span>
            </div>
          </Link>
          <Link href="/login" className="relative flex items-center">
            <div className="flex flex-col items-center">
              <Image src={IconLogin} alt="Ícone de login" />
              <span>Login</span>
            </div>
          </Link>
        </div>
      </div>

      <Navigation navLinks={navLinks} />
    </header>
  );
}
