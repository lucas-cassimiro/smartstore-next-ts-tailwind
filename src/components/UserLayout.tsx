"use client";

import { NavLink } from "../Providers/LayoutProvider";
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
        <div className="border-b-[1px] border-black">
          <span className="font-semibold text-lg mb-10">Minha conta</span>
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
              <div className="flex items-center justify-between">
                <Link href={link.href} className="text-black text-lg ">
                  {link.name}
                </Link>
                <GrFormNext />
              </div>
            </li>
          );
        })}
      </div>
    </section>
  );
}
