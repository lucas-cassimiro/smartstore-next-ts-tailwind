"use client";

import { NavLink } from "@/Providers/LayoutProvider";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { GrFormNext } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

import { useState } from "react";

interface NavLinkProps {
  navLinks: NavLink[];
}

export default function LayoutAdmin({ navLinks }: NavLinkProps) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button onClick={toggleMenu} className="h-0 ml-5 mt-5">
        <GiHamburgerMenu className="w-7 h-7" />
      </button>

      <div
        className={`${
          menuOpen ? "w-full opacity-100 visible bg-black/80" : ""
        } flex h-full w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 right-0 `}
        onClick={toggleMenu}
      >
        <div
          className={`${
            menuOpen ? "w-[300px] h-full tablet:w-[300px]" : ""
          } w-0 transition-all duration-1000 ease-in-out pt-6 bg-white overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl text-center font-medium min-w-[300px]">
            Painel administrativo
          </h1>
          <div className="h-full flex flex-col justify-center">
            {navLinks.map((navLink) => {
              const isActive = pathname.endsWith(navLink.href);
              return (
                <ul
                  key={navLink.name}
                  className="w-2/3 min-w-[200px] mx-auto mb-5 flex items-center justify-between hover:underline cursor-pointer"
                >
                  <Link
                    href={navLink.href}
                    className={`${
                      isActive ? "font-semibold" : "border-none"
                    } text-lg text-black min-w-[77px]`}
                  >
                    {navLink.name}
                  </Link>
                  <GrFormNext className="text-[#878787]" />
                </ul>
              );
            })}
          </div>
        </div>
        <IoCloseOutline
          className="text-white w-9 h-9 cursor-pointer mt-4 ml-5"
          onClick={toggleMenu}
        />
      </div>
    </>
  );
}
