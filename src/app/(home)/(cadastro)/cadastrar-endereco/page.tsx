"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";

type FormData = {
  id: number;
  address: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  recipient: string;
};

export default function CadastrarEndereco() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cep, setCep] = useState();

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
    try {
      const url = `http://localhost:3001/users/${data.id}`; // o endereço da API não é esse --> ainda falta criar a tabela ADDRESS
      const request = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!request.ok) {
        const errorResponse = await request.json();

        setErrorMessage(errorResponse);

        throw new Error(errorResponse.message);
      }

      const response = await request.json();
      console.log(response);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

  return (
    <AuthGuard>
      <div className="flex flex-col w-[983px] py-14">
        <div className="m-auto flex flex-col">
          <h1 className="text-3xl font-bold mb-12">Novo endereço</h1>
          <div className="flex gap-2">
            <Input isRequired label="CEP" className="max-w-[112px]" />
            <Button
              className="max-w-[95.85px] h-[56px] text-white text-base"
              color="success"
            >
              Cadastrar
            </Button>
          </div>
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            className="underline text-[13px] my-4"
          >
            Não sei meu CEP
          </a>
          <form
            className="flex flex-col gap-5 w-[700px] mb-7"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Input
              type="text"
              isRequired
              label="Endereço"
              className="max-w-[26.5rem]"
              disabled
            />
            <div className="flex gap-3">
              <Input
                type="number"
                label="Número"
                isRequired
                className="w-[80px]"
                disabled
              />
              <Input
                type="text"
                label="Complemento"
                isRequired
                className="w-[330px]"
                disabled
              />
            </div>
            <Input
              type="text"
              label="Bairro"
              isRequired
              className="max-w-[26.5rem]"
              disabled
            />
            <div className="flex gap-3">
              <Input
                type="text"
                isRequired
                label="Cidade"
                disabled
                className="w-[330px]"
              />
              <Input
                type="text"
                isRequired
                label="Estado"
                className="w-[80px]"
                disabled
              />
            </div>
            <Input
              type="text"
              isRequired
              label="Destinatário"
              className="max-w-[26.5rem]"
            />
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
