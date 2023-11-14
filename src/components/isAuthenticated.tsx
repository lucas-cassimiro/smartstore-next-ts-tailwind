"use client";

import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

import Logado from "./Logado";

export default function IsAuthenticated() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Link href="/login" className="relative flex items-center">
          <div className="flex flex-col items-center">
            <FaUserAlt className="text-white celular:w-4 celular:h-4 w-6 h-5" />
            <span className="text-white celular:text-sm text-sm">Login</span>
          </div>
        </Link>
      ) : (
        <>
          <Logado />
        </>
      )}
    </>
  );
}
