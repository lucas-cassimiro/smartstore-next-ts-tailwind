"use client";

import { NavLink } from "@/app/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  navLinks: NavLink[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#313131] border-t-[0.0625rem]">
      <ul className="flex justify-evenly h-12 items-center text-[1.1rem]">
        {navLinks.map((link) => {
          const isActive = pathname.endsWith(link.href);
          return (
            <li
              key={link.name}
              className={
                isActive ? "border-b-[3px] border-white" : "border-none"
              }
            >
              <Link href={link.href} className="text-white font-semibold">
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
