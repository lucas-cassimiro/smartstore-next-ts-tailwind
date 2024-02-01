"use client";

import { useAuth } from "@/hooks/useAuth";

import Logged from "./Logged";
import LoginFrame from "./LoginFrame";

export default function Authenticated() {
  const { isAuthenticated } = useAuth();

  return <>{!isAuthenticated ? <LoginFrame /> : <Logged />}</>;
}
