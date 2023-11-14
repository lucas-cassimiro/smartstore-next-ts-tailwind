"use client";

import { NavLink } from "@/Providers/LayoutProvider";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { GrFormNext } from "react-icons/gr";

interface NavLinkProps {
  navLinks: NavLink[];
}

export default function LayoutAdmin({ navLinks }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="border-b-[1px] border-black">
        <span className="font-semibold text-xl mb-10">Painel de Administração</span>
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
  );
}
