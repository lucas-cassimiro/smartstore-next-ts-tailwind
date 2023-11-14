"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

import { FaUserCircle, FaUserCheck } from "react-icons/fa";

// type UserProps = {

// }

export default function Logado() {
  const [isLog, setIsLog] = useState(false);
  const { signOut, user } = useAuth();

  const showIsLog = () => setIsLog(!isLog);

  return (
    <div>
      <div className="flex items-center flex-col" onClick={showIsLog}>
        <FaUserCircle className="text-white h-6 w-6 cursor-pointer" />
        <span className="text-white text-sm cursor-pointer">
          {user.length > 0 && user[0].first_name}
        </span>
      </div>
      <div
        className={`${
          isLog ? "w-full opacity-100 visible bg-black/60" : ""
        } flex flex-row-reverse  h-full w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 left-0 `}
        onClick={showIsLog}
      >
        <section
          className={`${
            isLog ? "w-[350px] h-full tablet:w-[250px]" : ""
          } w-0 transition-all duration-1000 ease-in-out bg-white overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-20 bg-black flex justify-between items-center px-6 min-w-[350px] tablet:min-w-[250px]">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-white h-7 w-7" />
              <span className="text-white text-xl font-semibold tablet:text-base">
                Olá, {user.length > 0 && user[0].first_name}
              </span>
            </div>
            <span
              className="text-white font-semibold leading-3 tablet:text-sm cursor-pointer"
              onClick={signOut}
            >
              Sair
            </span>
          </div>
          <div className="flex flex-col gap-3 p-6 max-w-[155px]">
            <Link href="/meu-cadastro" onClick={showIsLog}>
              Meu cadastro
            </Link>
            <Link href="/orderHistory" onClick={showIsLog}>
              Meus pedidos
            </Link>
            <Link href="/favoritos" onClick={showIsLog}>
              Favoritos
            </Link>
            {user.length > 0 && user[0].admin_auth && (
              <>
                <Link href="/admin/produto" onClick={showIsLog}>
                  Painel de Administrador
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
