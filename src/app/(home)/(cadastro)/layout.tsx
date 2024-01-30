import UserLayout from "@/components/UserLayout";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { NavLink } from "@/Providers/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const navLinks: NavLink[] = [
  {
    name: "Meu cadastro",
    href: "/meu-cadastro",
  },
  {
    name: "Meus pedidos",
    href: "/orderHistory",
  },
  {
    name: "Alterar dados",
    href: "/meu-cadastro/alterar-dados",
  },
  {
    name: "Novo endereço",
    href: "/meu-cadastro/cadastrar-endereco",
  },
];

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} flex m-auto max-w-[1450px] w-full py-5 justify-between px-10 tabletgrande:py-3 tabletgrande:px-3 tablet:flex-col`}
    >
      <UserLayout navLinks={navLinks} />
      {children}
    </div>
  );
}
