"use client";

//import Link from "next/link";
import Image from "next/image";

import React from "react";

import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Apple from "../assets/apple.png";

//import { Button, Checkbox, Input, Switch } from "@nextui-org/react";

import { FaUserAlt } from "react-icons/fa";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { useState, useContext } from "react";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import Header from "./Header";

import { NavLink } from "@/providers/LayoutProvider";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/contexts/AuthContext";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Switch,
} from "@nextui-org/react";

import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";
import RegisterFrame from "./RegisterFrame";

export type FormData = {
  email: string;
  password_hash: string;
};

// type ErrorResponse = {
//   message: string;
// };

export default function LoginFrame() {
  const { signIn, errorMessage } = useContext(AuthContext);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [registered, setRegistered] = useState<boolean>(false);

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

    const handleCloseModal = () => {
      setRegistered(false);
      onClose();
    };

  return (
    <>
      <button
        onClick={onOpen}
        className="relative flex items-center"
      >
        <div className="flex flex-col items-center">
          <FaUserAlt className="text-white celular:w-4 celular:h-4 w-6 h-5" />
          <span className="text-white celular:text-sm text-sm">Login</span>
        </div>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        placement="center"
        //backdrop="blur"
      >
        <ModalContent style={{ backgroundColor: "hsl(240, 6%, 10%)" }} className="max-w-[500px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                ENTRAR
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(handleSignIn, onError)}
                  className="flex flex-col gap-3"
                >
                  <Input
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isRequired
                    label="Email"
                    placeholder="Digite seu e-mail"
                    variant="bordered"
                    className="bg-hsl(240 6% 10%) "
                    {...register("email", {
                      required: "O endereço de e-mail é obrigatório.",
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:
                          "Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, john@doe.com.",
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
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isRequired
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    variant="bordered"
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
                    <span className="text-[#a94442] text-sm">
                      {errorMessage}
                    </span>
                  )}

                  <div className="flex py-2 px-1 justify-between">
                    <Switch
                      classNames={{
                        label: "text-small",
                      }}
                      className="text-white"
                      defaultSelected
                    >
                      <span className="text-white">Lembrar-me</span>
                    </Switch>
                    <Link
                      color="primary"
                      href="#"
                      size="sm"
                      onClick={() => setRegistered(!registered)}
                    >
                      Não possui uma conta? Inscrever-se
                    </Link>
                  </div>
                  <ModalFooter className="px-0">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleCloseModal}
                    >
                      Fechar
                    </Button>
                    <Button type="submit" color="primary">
                      Entrar
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
        {registered && (
         <RegisterFrame />
        )}
      </Modal>
    </>
  );
}
