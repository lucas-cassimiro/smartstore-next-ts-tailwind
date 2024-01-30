"use client";

//import Link from "next/link";
import Image from "next/image";

import React from "react";

import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Apple from "../assets/apple.png";

import { FaUserAlt } from "react-icons/fa";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { useState, useContext } from "react";

import { NavLink } from "@/Providers/LayoutProvider";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/contexts/AuthContext";

import { z } from "zod";

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

import { MailIcon } from "../svg/MailIcon";
import { LockIcon } from "../svg/LockIcon";
import RegisterFrame from "./RegisterFrame";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormData = {
  email: string;
  password_hash: string;
};

const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty("O endereço de e-mail é obrigatório.")
    .email(
      "Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, john@doe.com."
    ),
  password_hash: z.string().nonempty("A senha é obrigatória."),
});

type signInFormData = z.infer<typeof signInFormSchema>;

export default function LoginFrame() {
  const { signIn } = useContext(AuthContext);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [registerFrame, setRegisterFrame] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signInFormData>({
    defaultValues: {
      email: "",
      password_hash: "",
    },
    mode: "onBlur",
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSignIn(data: signInFormData) {
    try {
      await signIn(data);
      reset();
    } catch (error) {
      if (error.message === "Usuário ou senha incorretos.") {
        setError("password_hash", { type: "manual", message: error.message });
      } else {
        setError("email", { type: "manual", message: error.message });
      }
    }
  }

  const handleCloseModal = () => {
    setRegisterFrame(false);
    onClose();
  };

  return (
    <>
      <button onClick={onOpen} className="relative flex items-center">
        <div className="flex flex-col items-center">
          <FaUserAlt className="text-white celular:w-4 celular:h-4 w-6 h-5" />
          <span className="text-white celular:text-sm text-sm">Login</span>
        </div>
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        placement="center"
        backdrop="blur"
      >
        {!registerFrame && (
          <ModalContent
            style={{ backgroundColor: "hsl(240, 6%, 10%)" }}
            className="max-w-[500px]"
          >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-white">
                  ENTRAR
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className="flex flex-col gap-3"
                  >
                    <Input
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      isRequired
                      label="Email"
                      placeholder="nome@email.com"
                      variant="bordered"
                      className="bg-hsl(240 6% 10%)  text-white"
                      {...register("email")}
                      isInvalid={errors.email && true}
                      color={errors.email ? "danger" : "default"}
                      errorMessage={errors?.email && errors?.email?.message}
                    />

                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      isRequired
                      label="Senha"
                      placeholder="Digite sua senha"
                      type="password"
                      variant="bordered"
                      maxLength={255}
                      className="text-white"
                      autoComplete="given-password"
                      {...register("password_hash")}
                      isInvalid={errors.password_hash && true}
                      color={errors.password_hash ? "danger" : "default"}
                      errorMessage={
                        errors?.password_hash && errors?.password_hash?.message
                      }
                    />

                    <div className="flex py-2 px-1 justify-between">
                      <Switch
                        classNames={{
                          label: "text-small",
                        }}
                        className="text-white"
                        defaultSelected
                      >
                        <span className="text-white celularmedio:hidden">
                          Lembrar-me
                        </span>
                      </Switch>
                      <Link
                        color="primary"
                        href="#"
                        size="sm"
                        onClick={() => setRegisterFrame(!registerFrame)}
                        className="celularmedio:text-xs"
                      >
                        Não possui uma conta? Inscrever-se
                      </Link>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <Image
                          src={Google}
                          alt="Logo do Google"
                          className="w-10 h-10 celularpequeno:w-7 celularpequeno:h-7 cursor-pointer"
                        />
                        <Image
                          src={Facebook}
                          alt="Logo do Facebook"
                          className="w-10 h-10 celularpequeno:w-7 celularpequeno:h-7 cursor-pointer"
                        />
                        <Image
                          src={Apple}
                          alt="Logo da Apple"
                          className="w-10 h-10 celularpequeno:w-7 celularpequeno:h-7 cursor-pointer"
                        />
                      </div>
                      <ModalFooter className="px-0">
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={handleCloseModal}
                          className="celularpequeno:hidden"
                        >
                          Fechar
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          isLoading={isSubmitting}
                        >
                          Entrar
                        </Button>
                      </ModalFooter>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        )}

        {registerFrame && <RegisterFrame />}
      </Modal>
    </>
  );
}
