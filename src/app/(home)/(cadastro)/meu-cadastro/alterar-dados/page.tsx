"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import moment from "moment";

import InputMask from "react-input-mask";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    setValue,
    formState: { errors },
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

  const onSubmit: SubmitHandler<updateUserFormData> = async (
    data: updateUserFormData
  ) => {
    const formattedDateOfBirth = moment(data.date_birth, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    const { date_birth, repeatNewPassword, ...postData } = data;

    try {
      const url = `http://localhost:3333/usuarios/${user?.id}`;
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

      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<updateUserFormData> = (errors) =>
    console.log(errors);

  useEffect(() => {
    setValue(
      "date_birth",
      moment(user?.date_birth).add(1, "days").format("DD/MM/YYYY") || ""
    );
    setValue("cellphone", user?.cellphone || "");
  }, [user, setValue]);

  return (
    <AuthGuard>
      <div className="flex flex-col w-[983px] py-14">
        <div className="m-auto flex flex-col">
          <h1 className="text-3xl font-bold mb-12">Alterar dados</h1>
          <form
            className="flex flex-col gap-5 w-[700px] mb-7"
            onSubmit={handleSubmit(onSubmit, onError)}
            method="PUT"
          >
            <Input
              type="text"
              isRequired
              label="Email"
              disabled
              defaultValue={user?.email}
              className="max-w-[26.5rem]"
            />
            <Input
              type="password"
              label="Senha atual"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className="max-w-[26.5rem]"
              isClearable
              {...register("password_hash")}
              isInvalid={errors?.password_hash && true}
              color={errors?.password_hash ? "danger" : "default"}
              errorMessage={
                errors?.password_hash && errors?.password_hash?.message
              }
            />

            <Input
              type="password"
              label="Nova senha"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className="max-w-[26.5rem]"
              isClearable
              {...register("newPassword")}
              isInvalid={errors?.newPassword && true}
              color={errors?.newPassword ? "danger" : "default"}
              errorMessage={errors?.newPassword && errors?.newPassword?.message}
            />

            <Input
              type="password"
              label="Confirmar nova senha"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              className="max-w-[26.5rem]"
              {...register("repeatNewPassword")}
              isClearable
              isInvalid={errors?.repeatNewPassword && true}
              color={errors?.repeatNewPassword ? "danger" : "default"}
              errorMessage={
                errors?.repeatNewPassword && errors?.repeatNewPassword?.message
              }
            />

            <Input
              type="cpf"
              isRequired
              label="CPF"
              disabled
              defaultValue={user?.cpf}
              className="max-w-[26.5rem]"
            />

            <Input
              type="text"
              isRequired
              label="Nome"
              disabled
              defaultValue={user?.first_name}
              className="max-w-[26.5rem]"
            />

            <Input
              type="text"
              isRequired
              label="Sobrenome"
              disabled
              defaultValue={user?.last_name}
              className="max-w-[26.5rem]"
            />
            <InputMask
              mask="99/99/9999"
              maskChar={null}
              {...register("date_birth")}
            >
              <Input
                type="text"
                label="Data de nascimento"
                defaultValue={user?.date_birth}
                isClearable
                {...register("date_birth")}
                isInvalid={errors?.date_birth && true}
                className="max-w-[26.5rem]"
                color={errors?.date_birth ? "danger" : "default"}
                errorMessage={errors?.date_birth && errors?.date_birth?.message}
              />
            </InputMask>

            <InputMask
              mask="(99) 99999-9999"
              maskChar={null}
              {...register("cellphone")}
            >
              <Input
                type="tel"
                label="Celular"
                className="max-w-[26.5rem]"
                isClearable
                {...register("cellphone")}
                isInvalid={errors?.cellphone && true}
                color={errors?.cellphone ? "danger" : "default"}
                errorMessage={errors?.cellphone && errors?.cellphone?.message}
              />
            </InputMask>

            <div className="flex gap-2">
              <Button color="secondary" className="w-[13rem]">
                Voltar
              </Button>
              <Button type="submit" color="primary" className="w-[13rem]">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
