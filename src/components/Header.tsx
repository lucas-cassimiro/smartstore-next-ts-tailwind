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
      <div className="flex items-center flex-row-reverse relative w-full h-[2.125rem] bg-[#3877c9] py-0 px-[2.125rem] tablet:flex-row tablet:justify-around tablet:px-0 tablet:py-4">
        <p className="m-auto text-[0.8rem] text-white tablet:m-0 celular:text-[0.65rem] celularpequeno:text-[0.5rem]">
          A melhor franquia de smartphones do
          <span className="ml-1 text-[#FAFF00]">Brasil</span>
        </p>

        <a
          href="#"
          className="absolute text-[0.9rem] font-semibold text-white tablet:relative celular:text-[0.75rem] celularpequeno:text-[0.5rem]"
        >
          SEJA UM REVENDEDOR
        </a>
      </div>

      <div className="flex items-center relative w-full h-[3.5625rem] bg-[#313131] py-0 px-8 celular:px-3">
        <div className="tablet:hidden flex items-center gap-2 absolute">
          <Location />
        </div>

        <h1 className="m-auto">
          <Link
            href="/"
            style={lobster.style}
            className={`flex justify-center stroke-[#074291] ${lobster.className} text-[2.5rem] ml-14 text-white tablet:text-[2rem] celular:text-[1.5rem]`}
          >
            Smart Store
          </Link>
        </h1>

        <div className="flex gap-3">
          <Link href="/carrinho" className="relative flex items-center">
            <div className="flex flex-col items-center">
              <Image
                src={IconCart}
                alt="Ícone de carrinho"
                className="celular:w-4 celular:h-4"
              />
              <span className="text-white celular:text-sm">Cart</span>
            </div>
          </Link>
          <Link href="/login" className="relative flex items-center">
            <div className="flex flex-col items-center">
              <Image
                src={IconLogin}
                alt="Ícone de login"
                className="celular:w-4 celular:h-4"
              />
              <span className="text-white celular:text-sm">Login</span>
            </div>
          </Link>
        </div>
      </div>
      <nav className="w-full bg-[#313131] border-t-[0.0625rem] border-black">
        <ul className="flex justify-evenly h-12 items-center text-[1.1rem]">
          <Navigation navLinks={navLinks} />
        </ul>
      </nav>
    </header>
  );
}
