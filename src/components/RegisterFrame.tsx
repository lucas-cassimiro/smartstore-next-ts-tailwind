"use client";

import { useAuth } from "@/hooks/useAuth";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

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

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   try {
  //     e.preventDefault();

  //     const url = "http://localhost:3001/users";

  //     const request = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!request.ok) {
  //       throw new Error(`HTTP error! Status: ${request.status}`);
  //     }

  //     const response = await request.json();

  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error during fetch:", error);
  //   }
  // };

  return (
    <div className="w-full h-full flex justify-center items-center mt-40">
      <div className="flex flex-col bg-white w-[600px] justify-center p-6 rounded-md gap-4">
        <h3 className="text-center uppercase text-2xl font-semibold">
          Criar uma conta
        </h3>
        <form
          // method="POST"
          // action="http://localhost:3001/users"
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
          onClick={() => {
            if (getValues("email").trim() && errorMessage) {
              setErrorMessage(null);
            }
          }}
        >
          <Input
            type="text"
            label="Email"
            isRequired
            maxLength={255}
            autoComplete="given-email"
            placeholder="nome@email.com"
            {...register("email", {
              required: "Campo obrigatório.",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Digite um endereço de e-mail válido.",
              },
            })}
            onInput={() => {
              if (errorMessage?.message) {
                setErrorMessage(null);
              }
            }}
          />
          {errors?.email && (
            <span className="text-[#a94442] text-sm">
              {errors?.email.message}
            </span>
          )}
          {errorMessage?.message && (
            <>
              <span className="text-[#a94442] text-sm">
                {errorMessage.message}
              </span>
            </>
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
              minLength: {
                value: 6,
                message:
                  "Verifique se a sua senha tem pelo menos 6 caracteres.",
              },
            })}
          />
          {errors?.password_hash && (
            <span className="text-[#a94442] text-sm">
              {errors?.password_hash.message}
            </span>
          )}

          <Input
            type="password"
            label="Confirmar senha"
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
            {...register("cpf", {
              required: true,
              pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            })}
          />
          {errors?.cpf && (
            <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
          )}

          <Input
            type="text"
            label="Nome"
            isRequired
            maxLength={20}
            {...register("first_name", {
              required: true,
              maxLength: 20,
            })}
          />
          {errors?.first_name && (
            <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
          )}

          <Input
            type="text"
            label="Sobrenome"
            isRequired
            maxLength={30}
            {...register("last_name", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors?.last_name && (
            <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
          )}

          <Input
            type="string"
            label="Data de nascimento"
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
          {/* <button
            type="submit"
            className="bg-[#4aa4ee] text-white font-light cursor-pointer rounded-md hover:bg-[#3286ca] h-[50px] text-lg transition-all duration-700 ease-in-out"
          >
            Continuar
          </button> */}
          <Button
            className="text-white text-base"
            color="primary"
            type="submit"
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
}
