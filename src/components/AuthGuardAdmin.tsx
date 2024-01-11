"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const AuthGuardAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isAuthenticated, isLoading, user } = useAuth();

  console.log(user);

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !user?.admin_auth) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  return <>{children}</>;
};
