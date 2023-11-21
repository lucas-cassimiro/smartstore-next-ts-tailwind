"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import moment from "moment";

type FormData = {
  password_hash: string;
  newPassword: string;
  repeatNewPassword: string;
  date_birth: string;
  cellphone: string;
};

type ErrorResponse = {
  message: string;
}

export default function AlterarDados() {
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const formattedDateOfBirth = moment(data.date_birth, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    const { date_birth, repeatNewPassword, ...postData } = data;

    try {
      const url = `http://localhost:3001/users/${user?.id}`;
      const request = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postData, date_birth: formattedDateOfBirth }),
      });
      if (!request.ok) {
        const errorResponse = await request.json();

        setErrorMessage(errorResponse);

        throw new Error(errorResponse.message);
      }

      const response = await request.json();
      setErrorMessage(response);
      console.log(response);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

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
              {...register("password_hash", {
                required: "A senha atual é obrigatória.",
                minLength: {
                  value: 6,
                  message:
                    "Verifique se a sua senha tem pelo menos 6 caracteres.",
                },
              })}
              className="max-w-[26.5rem]"
            />
            {errors?.password_hash && (
              <span className="text-[#a94442] text-sm">
                {errors?.password_hash.message}
              </span>
            )}
            {errorMessage?.message && (
              <span className="text-[#a94442] text-sm">{errorMessage.message}</span>
            )}

            <Input
              type="password"
              label="Nova senha"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              {...register("newPassword", {
                required: "A senha é obrigatória.",
                minLength: {
                  value: 6,
                  message:
                    "Verifique se a sua senha tem pelo menos 6 caracteres.",
                },
              })}
              className="max-w-[26.5rem]"
            />
            {errors?.newPassword && (
              <span className="text-[#a94442] text-sm">
                {errors?.newPassword.message}
              </span>
            )}

            <Input
              type="password"
              label="Confirmar nova senha"
              minLength={6}
              maxLength={255}
              autoComplete="given-password"
              {...register("repeatNewPassword", {
                required: "Informe a senha novamente.",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { newPassword } = getValues();
                    return (
                      newPassword === value ||
                      "As senhas informadas não correspondem. Tente novamente."
                    );
                  },
                },
              })}
              className="max-w-[26.5rem]"
            />
            {errors?.repeatNewPassword && (
              <span className="text-[#a94442] text-sm">
                {errors?.repeatNewPassword.message}
              </span>
            )}

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

            <Input
              type="string"
              label="Data de nascimento"
              defaultValue={user?.date_birth}
              {...register("date_birth", {
                required: "Campo obrigatório.",
              })}
              className="max-w-[26.5rem]"
            />
            {errors?.date_birth && (
              <span className="text-[#a94442] text-sm">
                {errors?.date_birth.message}
              </span>
            )}

            <Input
              type="tel"
              label="Celular"
              minLength={14}
              maxLength={14}
              {...register("cellphone", {
                required: "Campo obrigatório.",
                minLength: {
                  value: 14,
                  message: "O campo requer no mínimo 14 caracteres",
                },
              })}
              className="max-w-[26.5rem]"
            />
            {errors?.cellphone && (
              <span className="text-[#a94442] text-sm">
                {errors?.cellphone.message}
              </span>
            )}
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
