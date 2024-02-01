"use client";

import { NavLink } from "@/Providers/LayoutProvider";
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
      <div className="hidden tablet:flex justify-between w-full items-center py-0 px-[0.5rem] celularmedio:px-[0.5rem]">
        <div className="hidden tablet:flex items-center gap-2 text-base celular:text-sm">
          <Location />
        </div>
        <div className="hidden tablet:flex text-white">
          <FaBars onClick={showMenu} className="w-5 h-5" />
          <div
            className={`${
              menuOpen ? "w-full opacity-100 visible bg-black/60" : ""
            } flex flex-row-reverse h-full w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 right-0 `}
            onClick={showMenu}
          >
            <div
              className={`${
                menuOpen ? "w-[230px] h-full" : ""
              } w-0 transition-all duration-1000 ease-in-out py-6 bg-[#313131] overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="min-w-[20px] ml-10">
                <FaTimes onClick={showMenu} className="w-5 h-5" />
              </button>

              <ul className="flex flex-col my-auto gap-10 items-center min-w-[8.5rem] justify-center h-full">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={showMenu}>
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
