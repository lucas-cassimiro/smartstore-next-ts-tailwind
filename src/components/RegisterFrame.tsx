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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "@/svg/EyeIcon";
import { EyeFilledIcon } from "@/svg/EyeFilledIcon";

import { useHookFormMask } from "use-mask-input";

function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  return remainder === parseInt(cpf.substring(10, 11));
}

const isValidDate = (dateString: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split("/").map(Number);
  const isValidMonth = month >= 1 && month <= 12;
  const isValidDay = day >= 1 && day <= new Date(year, month, 0).getDate();
  const isValidYear = year >= 1900 && year <= new Date().getFullYear();

  return isValidMonth && isValidDay && isValidYear;
};

const is18OrOlder = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  return new Date(year, month - 1, day) <= eighteenYearsAgo;
};

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  const formatDate = `${year}-${month}-${day}`;
  return formatDate;
};

const createUserFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("Campo obrigatório.")
      .email("Informe um endereço de e-mail válido."),
    password_hash: z
      .string()
      .nonempty("A senha é obrigatória.")
      .min(6, "Verifique se a sua senha tem pelo menos 6 caracteres."),
    confirmPassword: z.string().nonempty("Informe a senha novamente."),
    cpf: z
      .string()
      .nonempty("Campo obrigatório.")
      .refine((cpf) => isValidCPF(cpf), {
        message: "CPF inválido.",
        path: ["cpf"],
      }),
    first_name: z
      .string()
      .nonempty("Campo obrigatório.")
      .regex(/^[A-Za-z]+$/i, "Somente letras são permitidas.")
      .transform((name) => {
        return name.trim().replace(/^\w/, (c) => c.toLocaleUpperCase());
      }),
    last_name: z
      .string()
      .nonempty("Campo obrigatório.")
      .regex(/^[A-Za-z]+$/i, "Somente letras são permitidas.")
      .transform((name) => {
        return name.trim().replace(/^\w/, (c) => c.toLocaleUpperCase());
      }),
    date_birth: z
      .string()
      .nonempty("Campo obrigatório.")
      .refine((dateString) => isValidDate(dateString), {
        message: "Data preenchida inválida.",
        path: ["date_birth"],
      })
      .refine((dateString) => is18OrOlder(dateString), {
        message:
          "Acesso permitido apenas para maiores de 18 anos. Por favor, entre em contato com a Central de Atendimento.",
        path: ["date_birth"],
      }),
    cellphone: z.string().nonempty("Campo obrigatório."),
  })
  .refine(
    ({ password_hash, confirmPassword }) => password_hash === confirmPassword,
    {
      message: "As senhas informadas não correspondem. Tente novamente.",
      path: ["confirmPassword"],
    }
  );

type createUserFormData = z.infer<typeof createUserFormSchema>;

type FormData = {
  email: string;
  password_hash: string;
  confirmPassword: string;
  cpf: string;
  cellphone: string;
  first_name: string;
  last_name: string;
  date_birth: string;
};

export default function RegisterFrame() {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisibility] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisibility(!isRepeatPasswordVisible);
  };

  const { signIn } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    reset,
  } = useForm<createUserFormData>({
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
    criteriaMode: "all",
    resolver: zodResolver(createUserFormSchema),
  });

  const registerWithMask = useHookFormMask(register);

  const onSubmit: SubmitHandler<createUserFormData> = async (
    data: createUserFormData
  ) => {
    console.log(data);

    try {
      const formattedDate = formatDate(data.date_birth);

      const { confirmPassword, ...postData } = data;

      const dataWithFormatDate = {
        ...postData,
        date_birth: formattedDate,
      };

      const url = "http://localhost:3333/users/";

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithFormatDate),
      });

      if (!request.ok) {
        const errorResponse = await request.json();

        setError("email", { type: "manual", message: errorResponse.message });
      }

      const response = await request.json();
      console.log(response);

      reset();

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
                className="text-white"
                {...register("email")}
                isClearable
                isInvalid={errors?.email && true}
                color={errors?.email ? "danger" : "default"}
                errorMessage={errors?.email && errors?.email?.message}
              />
              <Input
                isRequired
                label="Senha"
                type={isPasswordVisible ? "text" : "password"}
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                minLength={6}
                maxLength={255}
                autoComplete="given-password"
                className="text-white"
                {...register("password_hash")}
                isInvalid={errors.password_hash && true}
                color={errors.password_hash ? "danger" : "default"}
                errorMessage={
                  errors?.password_hash && errors?.password_hash?.message
                }
              />
              <Input
                type={isRepeatPasswordVisible ? "text" : "password"}
                label="Confirmar senha"
                variant="bordered"
                isRequired
                maxLength={255}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleRepeatPasswordVisibility}
                  >
                    {isRepeatPasswordVisible ? (
                      <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                autoComplete="given-confirmPassword"
                className="text-white"
                {...register("confirmPassword")}
                isInvalid={errors.confirmPassword && true}
                color={errors.confirmPassword ? "danger" : "default"}
                errorMessage={
                  errors?.confirmPassword && errors?.confirmPassword?.message
                }
              />

              <Input
                type="text"
                label="CPF"
                isRequired
                isClearable
                className="text-white"
                variant="bordered"
                {...registerWithMask("cpf", ["999.999.999-99"], {
                  required: true,
                })}
                isInvalid={errors.cpf && true}
                color={errors.cpf ? "danger" : "default"}
                errorMessage={errors?.cpf && errors?.cpf?.message}
              />

              <Input
                type="text"
                label="Nome"
                isRequired
                variant="bordered"
                maxLength={20}
                className="text-white"
                isClearable
                {...register("first_name")}
                isInvalid={errors.first_name && true}
                color={errors.first_name ? "danger" : "default"}
                errorMessage={errors?.first_name && errors?.first_name?.message}
              />

              <Input
                type="text"
                label="Sobrenome"
                isRequired
                variant="bordered"
                maxLength={30}
                className="text-white"
                isClearable
                {...register("last_name")}
                isInvalid={errors.last_name && true}
                color={errors.last_name ? "danger" : "default"}
                errorMessage={errors?.last_name && errors?.last_name?.message}
              />

              <Input
                type="text"
                label="Data de nascimento"
                variant="bordered"
                isRequired
                className="text-white"
                isClearable
                {...registerWithMask("date_birth", ["99/99/9999"], {
                  required: true,
                })}
                isInvalid={errors.date_birth && true}
                color={errors.date_birth ? "danger" : "default"}
                errorMessage={errors?.date_birth && errors?.date_birth?.message}
              />

              <Input
                type="tel"
                label="Celular"
                isRequired
                id="phone"
                variant="bordered"
                className="text-white hsl(240, 6%, 10%)"
                isClearable
                {...registerWithMask("cellphone", ["(99) 99999-9999"], {
                  required: true,
                })}
                isInvalid={errors.cellphone && true}
                color={errors.cellphone ? "danger" : "default"}
                errorMessage={errors?.cellphone && errors?.cellphone?.message}
              />

              <ModalFooter className="px-0">
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Continuar"}
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
