"use client";

import { NavLink } from "@/app/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";

import Location from "./Location";

interface NavigationProps {
  navLinks: NavLink[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const showMenu = () => setMenuOpen(!menuOpen);

  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.endsWith(link.href);
        return (
          <li
            key={link.name}
            className={`${
              isActive ? "border-b-[3px] border-white" : "border-none"
            } tablet:hidden`}
          >
            <Link href={link.href} className="text-white font-semibold">
              {link.name}
            </Link>
          </li>
        );
      })}
      <div className="hidden tablet:flex justify-between w-full items-center py-0 px-8 celular:px-3">
        <div className="hidden tablet:flex items-center gap-2 text-base celular:text-sm">
          <Location />
        </div>
        <div className="hidden tablet:flex text-white">
          <FaBars size="1.5rem" onClick={showMenu} />
          <div
            className={`${
              menuOpen ? "w-[300px]" : ""
            } py-6 flex flex-col h-screen w-0 overflow-hidden bg-[#313131] transition-width duration-700 ease-in fixed z-20 top-0 bottom-0 right-0`}
          >
            <button className="w-[20px] ml-10">
              <FaTimes size="1.5rem" onClick={showMenu} />
            </button>

            <ul className="flex flex-col my-auto gap-10 items-center min-w-[8.5rem]">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={showMenu}>
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
