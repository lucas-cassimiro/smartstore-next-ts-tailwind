"use client";

import Link from "next/link";
import Image from "next/image";

import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Apple from "../assets/apple.png";

import { Button, Checkbox, Input, Switch } from "@nextui-org/react";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { useState, useContext } from "react";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import Header from "./Header";

import { NavLink } from "@/Providers/LayoutProvider";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/contexts/AuthContext";

export type FormData = {
  email: string;
  password_hash: string;
};

// type ErrorResponse = {
//   message: string;
// };

export default function LoginFrame() {
  const { signIn, errorMessage } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password_hash: "",
    },
    mode: "onBlur",
  });

  async function handleSignIn(data: FormData) {
    try {
      await signIn(data);
    } catch (error) {
      console.log("Erro:", error);
    }
  }

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col bg-white h-[550px] w-[600px] justify-center p-5 rounded-md gap-4">
        <h3 className="text-center uppercase text-2xl font-semibold">Login</h3>
        <form onSubmit={handleSubmit(handleSignIn, onError)} className="flex flex-col gap-3">
          <Input
            type="text"
            isRequired
            label="Email"
            {...register("email", {
              required: "O endereço de e-mail é obrigatório.",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:
                  "Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, lucas@cassimiro.com.",
              },
            })}
            // onClick={() => {
            //   if (getValues("email").trim() && errorMessage) {
            //     setErrorMessage(null);
            //   }
            // }}
          />
          {errors?.email && (
            <span className="text-[#a94442] text-sm">
              {errors?.email.message}
            </span>
          )}
          <Input
            type="password"
            label="Senha"
            isRequired
            minLength={6}
            maxLength={255}
            autoComplete="given-password"
            {...register("password_hash", {
              required: "A senha é obrigatória.",
            })}
            // onInput={() => {
            //   if (errorMessage?.message) {
            //     setErrorMessage(null);
            //   }
            // }}
          />
          {errors?.password_hash && (
            <span className="text-[#a94442] text-sm">
              {errors?.password_hash.message}
            </span>
          )}
          {errorMessage && (
            <span className="text-[#a94442] text-sm">{errorMessage}</span>
          )}

          <div>
            <div className="flex justify-between items-center">
              <Switch defaultSelected>Lembrar-me</Switch>
              <Link
                href="/password"
                className="text-[#4aa4ee] hover:text-[#3286ca]"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          {/* <button className="bg-[#4aa4ee] text-white font-light cursor-pointer rounded-md hover:bg-[#3286ca] h-[50px] text-lg transition-all duration-700 ease-in-out">
            Entrar
          </button> */}
          <Button type="submit" color="primary" className="w-full text-base">Entrar</Button>
        </form>
        <div className="flex gap-1">
          <span>Não possui uma conta?</span>
          <Link
            href="/register"
            className="text-[#4aa4ee] hover:text-[#3286ca]"
          >
            Inscrever-se
          </Link>
        </div>
        <h4 className="text-center text-[#607d8b] font-medium text-[22px]">
          Logar com
        </h4>
        <div className="flex justify-center gap-2 items-center">
          <Image src={Facebook} alt="Ícone do Facebook" className="w-10 h-10" />
          <Image src={Google} alt="Ícone do Google" className="w-10 h-10" />
          <Image src={Apple} alt="Ícone da Apple" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}
