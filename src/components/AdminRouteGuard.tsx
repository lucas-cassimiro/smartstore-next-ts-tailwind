import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const AdminRouteGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.admin_auth)) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  return <>{children}</>;
};
