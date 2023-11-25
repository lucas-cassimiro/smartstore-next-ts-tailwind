"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";

import { CepData } from "@/components/Client-components/Location";
import { getAddress } from "@/components/Client-components/Location";

type FormData = {
  user_id: number;
  street_address: string;
  number_address: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  recipient: string;
};

export default function CadastrarEndereco() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useAuth();

  const [inputCep, setInputCep] = useState<string>("");
  const [cep, setCep] = useState<CepData>({} as CepData);

  const [error, setError] = useState<boolean>(false)

  async function handleCepChange(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    try {
      const cepInformado = inputCep;
      const cepRecebido = await getAddress(cepInformado);

      setValue("street_address", cepRecebido.logradouro || "");
      setValue("number_address", cepRecebido.numero || "");
      setValue("complement", cepRecebido.complemento || "");
      setValue("neighborhood", cepRecebido.bairro || "");
      setValue("city", cepRecebido.localidade || "");
      setValue("state", cepRecebido.uf || "");
      setValue("recipient", "");

      setCep(cepRecebido);
      setInputCep("");
      setError(false);
    } catch (error) {
      setInputCep("");
      setError(true);
    }
  }

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const user_id = user?.id;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      data.user_id = user_id!;

      const url = `http://localhost:3001/endereco/`;
      const request = await fetch(url, {
        method: "POST",
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
          <form
            onSubmit={handleCepChange}
            id="cep"
            name="cep"
            className="flex gap-2"
          >
            <Input
              isRequired
              label="CEP"
              className="max-w-[112px]"
              id="cep"
              name="cep"
              value={inputCep}
              onChange={(e) => setInputCep(e.target.value)}
            />
            <Button
              className="max-w-[95.85px] h-[56px] text-white text-base"
              color="success"
              onClick={handleCepChange}
            >
              Cadastrar
            </Button>
          </form>

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
              disabled={!cep || Object.keys(cep).length === 0}
              {...register("street_address", {
                required: "Esse campo é obrigatório.",
              })}
            />

            {errors?.street_address && (
              <span className="text-[#a94442] text-sm">
                {errors?.street_address.message}
              </span>
            )}

            <div className="flex gap-3">
              <div className="flex flex-col">
                <Input
                  type="number"
                  label="Número"
                  isRequired
                  className="w-[80px]"
                  disabled={!cep || Object.keys(cep).length === 0}
                  {...register("number_address", {
                    required: "Esse campo é obrigatório.",
                  })}
                />
                {errors?.number_address && (
                  <span className="text-[#a94442] text-sm w-[60px]">
                    {errors?.number_address.message}
                  </span>
                )}
              </div>

              <Input
                type="text"
                label="Complemento"
                isRequired
                className="w-[330px]"
                disabled={!cep || Object.keys(cep).length === 0}
                {...register("complement", {
                  required: false,
                })}
              />
            </div>
            <Input
              type="text"
              label="Bairro"
              isRequired
              className="max-w-[26.5rem]"
              disabled
              {...register("neighborhood", {
                required: "O bairro é obrigatório.",
              })}
            />
            {errors?.neighborhood && (
              <span className="text-[#a94442] text-sm">
                {errors?.neighborhood.message}
              </span>
            )}

            <div className="flex gap-3">
              <Input
                type="text"
                isRequired
                label="Cidade"
                disabled
                className="w-[310px]"
                {...register("city", {
                  required: "A cidade é obrigatório",
                })}
              />
              {errors?.city && (
                <span className="text-[#a94442] text-sm">
                  {errors?.city.message}
                </span>
              )}

              <Select
                className="w-[100px]"
                label="Estado"
                isRequired
                defaultValue={cep.uf}
              >
                <SelectItem value={cep.uf} key={cep.cep} defaultValue={cep.uf}>
                  {cep.uf}
                </SelectItem>
              </Select>
            </div>
            <Input
              type="text"
              isRequired
              label="Destinatário"
              className="max-w-[26.5rem]"
              {...register("recipient", {
                required: "Esse campo é obrigatório.",
              })}
            />
            {errors?.recipient && (
              <span className="text-[#a94442] text-sm">
                {errors?.recipient.message}
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
