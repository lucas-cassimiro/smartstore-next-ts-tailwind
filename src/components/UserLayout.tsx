"use client";

import { NavLink } from "../Providers/LayoutProvider";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { GrFormNext } from "react-icons/gr";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

interface NavLinkProps {
  navLinks: NavLink[];
}

export default function UserLayout({ navLinks }: NavLinkProps) {
  const menuNavLinks: NavLink[] = [
    {
      name: "Meu cadastro",
      href: "/meu-cadastro",
    },
    {
      name: "Meus pedidos",
      href: "/orderHistory",
    },
  ];

  const pathname = usePathname();

  return (
    <section>
      <div className="flex flex-col flex-wrap gap-4 mb-5 tabletgrande:hidden">
        <Breadcrumbs variant="solid">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <BreadcrumbItem
                href={link.href}
                key={link.name}
                className={`${
                  isActive ? "flex" : "hidden"
                } tablet:hidden list-none`}
              >
                {link.name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div>
      <div className="flex flex-col gap-6 w-[300px] min-w-[200px] mb-10">
        <div className="border-b-[1px] border-black flex tablet:border-b-0">
          <span className="font-semibold text-lg mb-5 tablet:mb-1">Minha conta</span>
        </div>
        {menuNavLinks.map((link) => {
          const isActive = pathname.endsWith(link.href);
          return (
            <li
              key={link.name}
              className={`${
                isActive ? "font-semibold" : "border-none"
              } list-none `}
            >
              <Link
                href={link.href}
                className="text-black text-lg flex items-center justify-between"
              >
                <span className="hover:border-b-2 border-black">
                  {link.name}
                </span>
                <GrFormNext className="tablet:hidden"/>
              </Link>
            </li>
          );
        })}
      </div>
    </section>
  );
}
