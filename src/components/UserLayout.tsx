"use client";

import { NavLink } from "../providers/LayoutProvider";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { GrFormNext } from "react-icons/gr";

interface NavLinkProps {
  navLinks: NavLink[];
}

export default function UserLayout({ navLinks }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <section className="">
      <div className="flex gap-2 mb-8 w-full text-[13px]">
        <Link href="/" className="text-[#333]">
          Home /
        </Link>
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <li
              key={link.name}
              className={`${isActive ? "block" : "hidden"} list-none`}
            >
              <Link href={link.href} className="text-[#333333] text-[13px]">
                {" "}
                {link.name}
              </Link>
            </li>
          );
        })}
      </div>
      <div className="flex flex-col gap-6 w-[300px]">
        <div className="border-b-[1px] border-black flex">
          <span className="font-semibold text-lg mb-5">Minha conta</span>
        </div>
        {navLinks.map((link) => {
          const isActive = pathname.endsWith(link.href);
          return (
            <li
              key={link.name}
              className={`${
                isActive ? "font-semibold" : "border-none"
              } tablet:hidden list-none `}
            >
              <Link
                href={link.href}
                className="text-black text-lg flex items-center justify-between"
              >
                <span className="hover:border-b-2 border-black">
                  {link.name}
                </span>
                <GrFormNext />
              </Link>
            </li>
          );
        })}
      </div>
    </section>
  );
}
