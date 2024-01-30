import ProviderCart from "@/Providers/CartProvider";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/globals.css";

import { Inter } from "next/font/google";

import NextUiProvider from "./NextUiProvider";

import ProviderAuth from "@/Providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export interface NavLink {
  name: string;
  href: string;
}

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks: NavLink[] = [
    {
      name: "iPhones",
      href: "/shop/iphone",
    },
    {
      name: "Androids",
      href: "/shop/android",
    },
    {
      name: "Smartwatchs",
      href: "/shop/smartwatch",
    },
    {
      name: "Fones Bluetooth",
      href: "/shop/fone",
    },
    {
      name: "Black Friday",
      href: "/shop/blackfriday",
    },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ProviderCart>
          <ProviderAuth>
            <Header navLinks={navLinks} />
            <NextUiProvider>{children}</NextUiProvider>
            <Footer />
          </ProviderAuth>
        </ProviderCart>
      </body>
    </html>
  );
}
