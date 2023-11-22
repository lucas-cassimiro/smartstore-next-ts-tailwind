"use client";

import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

import Logado from "./Logado";
import LoginFrame from "./LoginFrame";

export default function IsAuthenticated() {
  const { isAuthenticated } = useAuth();

  return <>{!isAuthenticated ? <LoginFrame /> : <Logado />}</>;
}
