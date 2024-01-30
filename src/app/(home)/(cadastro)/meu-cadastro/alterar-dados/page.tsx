"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import moment from "moment";

import Router, { useRouter } from "next/navigation";

import InputMask from "react-input-mask";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useHookFormMask } from "use-mask-input";

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

const updateUserFromSchema = z
  .object({
    password_hash: z.string().nonempty("A senha atual é obrigatória."),
    newPassword: z
      .string()
      .nonempty("A senha é obrigatória.")
      .min(6, "Verifique se a sua senha tem pelo menos 6 caracteres.")
      .max(150, "O máximo é 150 caracteres."),
    repeatNewPassword: z.string().nonempty("Informe a senha novamente."),
    date_birth: z
      .string()
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
    ({ newPassword, repeatNewPassword }) => newPassword === repeatNewPassword,
    {
      message: "As senhas informadas não correspondem. Tente novamente.",
      path: ["repeatNewPassword"],
    }
  );

type updateUserFormData = z.infer<typeof updateUserFromSchema>;

export default function AlterarDados() {
  const { user } = useAuth();

  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<updateUserFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(updateUserFromSchema),
    defaultValues: {
      password_hash: "",
      cellphone: "",
      date_birth: "",
    },
  });

  const updateWithMask = useHookFormMask(register);

  const onSubmit: SubmitHandler<updateUserFormData> = async (
    data: updateUserFormData
  ) => {
    const formattedDateOfBirth = moment(data.date_birth, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    const { date_birth, repeatNewPassword, ...postData } = data;

    try {
      const url = `http://https://smartshop-api-foy4.onrender.com/usuarios/${user?.id}`;
      const request = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postData, date_birth: formattedDateOfBirth }),
      });
      if (!request.ok) {
        const errorResponse = await request.json();

        setError("password_hash", {
          type: "manual",
          message: errorResponse.message,
        });
      }

      const response = await request.json();
      console.log(response);

      setIsModalOpen(true);

      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<updateUserFormData> = (errors) =>
    console.log(errors);

  useEffect(() => {
    setValue("date_birth", moment(user?.date_birth).format("DD/MM/YYYY"));
    setValue("cellphone", user?.cellphone || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const voltarRota = () => {
    router.push("/meu-cadastro");
  };

  return (
    <AuthGuard>
      <div className="flex flex-col w-full py-14 tabletgrande:py-5">
        <div className="m-auto flex flex-col max-w-[764px] min-w-[200px] tablet:m-0">
          <h1 className="text-3xl font-bold mb-12 tabletgrande:text-lg">
            Alterar dados
          </h1>
          <form
            className="flex flex-col w-full mb-7"
            onSubmit={handleSubmit(onSubmit, onError)}
            method="PUT"
          >
            <label htmlFor="email" className="text-sm text-[#878787] mb-1">
              E-mail*
            </label>
            <input
              type="text"
              id="email"
              disabled
              defaultValue={user?.email}
              className="max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3"
            />

            <label htmlFor="password" className="text-sm text-[#878787] mb-1">
              Senha atual
            </label>
            <input
              type="password"
              id="password"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className={`${
                errors.password_hash ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              {...register("password_hash")}
            />

            {errors?.password_hash && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.password_hash?.message}
              </span>
            )}

            <label
              htmlFor="newPassword"
              className="text-sm text-[#878787] mb-1"
            >
              Nova senha
            </label>
            <input
              type="password"
              id="newPassword"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className={`${
                errors.newPassword ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              {...register("newPassword")}
            />

            {errors?.newPassword && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.newPassword?.message}
              </span>
            )}

            <label
              htmlFor="confirmPassword"
              className="text-sm text-[#878787] mb-1"
            >
              Confirmar nova senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className={`${
                errors.repeatNewPassword ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              {...register("repeatNewPassword")}
            />

            {errors?.repeatNewPassword && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.repeatNewPassword?.message}
              </span>
            )}

            <label htmlFor="cpf" className="text-sm text-[#878787] mb-1">
              CPF*
            </label>
            <input
              type="cpf"
              id="cpf"
              disabled
              defaultValue={user?.cpf}
              className="max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3"
            />

            <label htmlFor="name" className="text-sm text-[#878787] mb-1">
              Nome*
            </label>
            <input
              type="text"
              id="name"
              disabled
              defaultValue={user?.first_name}
              className="max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3"
            />

            <label htmlFor="sobrenome" className="text-sm text-[#878787] mb-1">
              Sobrenome*
            </label>
            <input
              type="text"
              id="sobrenome"
              disabled
              defaultValue={user?.last_name}
              className="max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3"
            />

            <label htmlFor="dateBirth" className="text-sm text-[#878787] mb-1">
              Data de nascimento
            </label>
            <input
              type="text"
              id="dateBirth"
              defaultValue={user?.date_birth}
              {...updateWithMask("date_birth", ["99/99/9999"], {
                required: true,
              })}
              className={`${
                errors.date_birth ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
            />

            {errors?.date_birth && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.date_birth?.message}
              </span>
            )}

            <label htmlFor="cellphone" className="text-sm text-[#878787] mb-1">
              Celular
            </label>
            <input
              type="tel"
              id="cellphone"
              className={`${
                errors.cellphone ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              defaultValue={user?.cellphone}
              {...updateWithMask("cellphone", ["(99) 99999-9999"], {
                required: true,
              })}
            />

            {errors?.cellphone && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.cellphone?.message}
              </span>
            )}

            <div className="flex gap-2 tablet:block">
              <Button
                color="secondary"
                className="w-[13rem] tablet:w-full tablet:mb-2"
                onClick={voltarRota}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                color="primary"
                className="w-[13rem] tablet:w-full"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 uppercase">
                Alterar dados
              </ModalHeader>
              <ModalBody>
                <span>
                  Depois de alterar sua senha, pediremos que você faça login
                  novamente.
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose} className="uppercase">
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </AuthGuard>
  );
}
