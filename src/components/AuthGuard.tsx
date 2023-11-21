"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

useEffect(() => {
  if (!isAuthenticated && !isLoading) {
    router.push("/");
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated, isLoading]);

  return <>{children}</>;
};
