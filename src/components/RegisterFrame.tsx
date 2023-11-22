"use client";

import { useAuth } from "@/hooks/useAuth";
//import Link from "next/link";
import { useState } from "react";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

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
} from "@nextui-org/react";

import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";

type FormData = {
  email: string;
  password_hash: string;
  confirmPassword?: string;
  cpf: string;
  cellphone: string;
  first_name: string;
  last_name: string;
  date_birth: string;
};

type ErrorResponse = {
  message: string;
};

export default function RegisterFrame() {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null);

  const { signIn } = useAuth();

  console.log(errorMessage);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password_hash: "",
      cpf: "",
      cellphone: "",
      first_name: "",
      last_name: "",
      date_birth: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const { confirmPassword, ...postData } = data;

      const url = "http://localhost:3001/users";
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!request.ok) {
        const errorResponse = await request.json();

        setErrorMessage(errorResponse);

        throw new Error(errorResponse.message);
      }

      const response = await request.json();
      console.log(response);

      try {
        const {
          cpf,
          cellphone,
          date_birth,
          last_name,
          first_name,
          ...logData
        } = postData;

        await signIn(logData);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

  const handleEmailChange = () => {
    setErrorMessage(null);
  };
  
  return (
    <ModalContent
      style={{ backgroundColor: "hsl(240, 6%, 10%)" }}
      className="h-[700px] max-w-[550px]"
    >
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 text-white">
            CADASTRO
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-3"
            >
              <Input
                isRequired
                label="Email"
                variant="bordered"
                className="bg-hsl(240 6% 10%)"
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
                isRequired
                label="Senha"
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
              <Input
                type="password"
                label="Confirmar senha"
                variant="bordered"
                isRequired
                maxLength={255}
                autoComplete="given-confirmPassword"
                {...register("confirmPassword", {
                  required: "Informe a senha novamente.",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password_hash } = getValues();
                      return (
                        password_hash === value ||
                        "As senhas informadas não correspondem. Tente novamente."
                      );
                    },
                  },
                })}
              />
              {errors?.confirmPassword && (
                <span className="text-[#a94442] text-sm">
                  {errors?.confirmPassword.message}
                </span>
              )}

              <Input
                type="cpf"
                label="CPF"
                maxLength={14}
                isRequired
                variant="bordered"
                {...register("cpf", {
                  required: true,
                  pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                })}
              />
              {errors?.cpf && (
                <span className="text-[#a94442] text-sm">
                  Campo obrigatório.
                </span>
              )}

              <Input
                type="text"
                label="Nome"
                isRequired
                variant="bordered"
                maxLength={20}
                {...register("first_name", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors?.first_name && (
                <span className="text-[#a94442] text-sm">
                  Campo obrigatório.
                </span>
              )}

              <Input
                type="text"
                label="Sobrenome"
                isRequired
                variant="bordered"
                maxLength={30}
                {...register("last_name", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors?.last_name && (
                <span className="text-[#a94442] text-sm">
                  Campo obrigatório.
                </span>
              )}

              <Input
                type="string"
                label="Data de nascimento"
                variant="bordered"
                isRequired
                {...register("date_birth", {
                  required: "Campo obrigatório.",
                })}
              />
              {errors?.date_birth && (
                <span className="text-[#a94442] text-sm">
                  {errors?.date_birth.message}
                </span>
              )}

              <Input
                type="tel"
                label="Celular"
                variant="bordered"
                isRequired
                {...register("cellphone", {
                  required: "Campo obrigatório.",
                  minLength: {
                    value: 14,
                    message: "O campo requer no mínimo 14 caracteres",
                  },
                  maxLength: {
                    value: 14,
                    message: "O campo requer no máximo 14 caracteres",
                  },
                })}
              />
              {errors?.cellphone && (
                <span className="text-[#a94442] text-sm">
                  {errors?.cellphone.message}
                </span>
              )}

              <ModalFooter className="px-0">
                <Button type="submit" color="primary">
                  Continuar
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
