import type { Metadata } from "next";

import LayoutProvider from "@/Providers/LayoutProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: any;
}) {
  return (
    <LayoutProvider>
      {children} {modal}
    </LayoutProvider>
  );
}
