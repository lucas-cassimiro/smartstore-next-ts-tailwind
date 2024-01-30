import { NavLink } from "../Providers/LayoutProvider";
import Navigation from "./Client-components/Navigation";
import Link from "next/link";

import Image from "next/image";

import { Lobster } from "next/font/google";

import IconCart from "../assets/icon-cart.png";
import IconLogin from "../assets/login.png";

import Location from "./Client-components/Location";
import Cart from "./Client-components/Cart";
import Logado from "./Logado";

import { FaUserAlt } from "react-icons/fa";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "@/hooks/useAuth";

import IsAuthenticated from "./isAuthenticated";

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
    <>
      <div className="w-full bg-[#3877c9]">
        <div className="flex items-center flex-row-reverse relative w-full max-w-[1450px] h-[2.125rem] tablet:flex-row tablet:justify-around tablet:px-0 tablet:py-4 m-auto">
          <p className="m-auto text-[0.8rem] text-white tablet:m-0 celularmedio:text-[0.7rem] celularpequeno:text-[0.55rem]">
            A melhor franquia de smartphones do
            <span className="ml-1 text-[#FAFF00]">Brasil</span>
          </p>

          <a
            href="#"
            className="absolute text-[0.9rem] font-semibold text-white tablet:relative celular:text-[0.75rem] celularmedio:text-[0.7rem] celularpequeno:text-[0.55rem]"
          >
            SEJA UM REVENDEDOR
          </a>
        </div>
      </div>
      <header className="flex flex-col items-center w-full bg-[#313131]">
        <div className="w-full max-w-[1450px] px-[0.5rem]">
          <div className="flex items-center w-full justify-between  relative  h-[3.5625rem] celular:px-3">
            <div className="tablet:hidden flex items-center gap-2 absolute">
              <Location />
            </div>

            <h1 className="m-auto">
              <Link
                href="/"
                style={lobster.style}
                className={`flex justify-center text-stroke ${lobster.className} text-[2.5rem] ml-14 text-white tablet:text-[2rem] celular:text-[1.5rem]`}
              >
                Smart Store
              </Link>
            </h1>

            <div className="flex gap-3">
              <Cart />

              <IsAuthenticated />
            </div>
          </div>
        </div>
        <div className="w-full border-t-[0.0625rem] border-black">
          <nav className="w-full max-w-[1450px] m-auto">
            <ul className="flex justify-evenly h-12 items-center text-[1.1rem]">
              <Navigation navLinks={navLinks} />
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
