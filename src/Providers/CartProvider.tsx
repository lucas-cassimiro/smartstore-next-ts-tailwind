"use client";

import { CartProvider } from "@/contexts/CartContext";

export default function ProviderCart({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
