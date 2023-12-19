"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";

const schemaForm = z
  .object({
    address: z.object({
      user_id: z.coerce.number().min(1, "Campo obrigatório."),
      cep: z
        .string()
        .nonempty("Campo obrigatório.")
        .min(8, "Por favor, informe um CEP válido."),
      street_address: z.string().nonempty("Campo obrigatório."),
      number_address: z.string().nonempty("Campo obrigatório."),
      complement: z.string(),
      neighborhood: z
        .string()
        .nonempty("Campo obrigatório.")
        .regex(/^[\p{L}\s]+$/u, "Somente letras são permitidos."),
      city: z
        .string()
        .nonempty("Campo obrigatório.")
        .regex(/^[\p{L}\s]+$/u, "Somente letras são permitidos."),
      state: z
        .string()
        .nonempty("Campo obrigatório.")
        .regex(/^[\p{L}\s]+$/u, "Somente letras são permitidos."),
      recipient: z
        .string()
        .min(1, "Campo obrigatório.")
        .regex(/^[\p{L}\s]+$/u, "Somente letras são permitidos.")
        .refine(
          (data) => {
            const names = data.split(" ");
            return names.length === 2;
          },
          {
            message: "Por favor, digite o nome completo.",
          }
        ),
    }),
  })
  .transform((field) => ({
    address: {
      user_id: field.address.user_id,
      cep: field.address.cep,
      street_address: field.address.street_address,
      number_address: field.address.number_address,
      complement: field.address.complement,
      neighborhood: field.address.neighborhood,
      city: field.address.city,
      state: field.address.state,
      recipient: field.address.recipient,
    },
  }));

type FormProps = z.infer<typeof schemaForm>;

interface AddressProps {
  cep: string;
  bairro: string;
  complemento: string;
  uf: string;
  logradouro: string;
  localidade: string;
}

export default function CadastrarEndereco() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isCepFilled, setIsCepFilled] = useState<boolean>(false);

  const { user } = useAuth();

  const {
    getValues,
    setValue,
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "onBlur",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      address: {
        cep: "",
        street_address: "",
        number_address: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        recipient: "",
      },
    },
  });

  const zipCode = watch("address.cep");

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue("address.city", data.localidade);
      setValue("address.street_address", data.logradouro);
      setValue("address.state", data.uf);
      setValue("address.neighborhood", data.bairro);
      setValue("address.complement", data.complemento);
    },
    [setValue]
  );

  const handleFetchAddress = useCallback(
    async (cep: string) => {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      handleSetData(data);
      setIsCepFilled(true);
      return data;
    },
    [handleSetData]
  );

  useEffect(() => {
    //setValue("address.cep", cepMask);

    if (zipCode.length !== 8) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  const handleFormSubmit: SubmitHandler<FormProps> = async (
    data: FormProps
  ) => {
    try {
      data.address.user_id = user!.id;

      const url = `http://localhost:3333/address/`;
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

      reset()
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
            className="flex flex-col gap-5 w-[700px] mb-7"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Input
              isRequired
              label="CEP"
              className="max-w-[112px]"
              maxLength={9}
              {...register("address.cep")}
              isClearable
              isInvalid={errors?.address?.cep && true}
              color={errors?.address?.cep ? "danger" : "default"}
              errorMessage={errors?.address?.cep && errors?.address.cep.message}
            />
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              className="underline text-xs"
            >
              Não sei meu CEP
            </a>

            <Input
              type="text"
              isRequired
              label="Endereço"
              disabled={!isCepFilled}
              className="max-w-[26.5rem]"
              {...register("address.street_address")}
              isClearable
              isInvalid={errors?.address?.street_address && true}
              color={errors?.address?.street_address ? "danger" : "default"}
              errorMessage={
                errors?.address?.street_address &&
                errors?.address.street_address.message
              }
            />

            <div className="flex gap-3">
              <div className="flex flex-col">
                <Input
                  type="number"
                  label="Número"
                  isRequired
                  disabled={!isCepFilled}
                  className="w-[80px]"
                  {...register("address.number_address")}
                  isClearable
                  isInvalid={errors?.address?.number_address && true}
                  color={errors?.address?.number_address ? "danger" : "default"}
                  errorMessage={
                    errors?.address?.number_address &&
                    errors?.address.number_address.message
                  }
                />
              </div>

              <Input
                type="text"
                label="Complemento"
                disabled={!isCepFilled}
                className="w-[330px]"
                {...register("address.complement")}
              />
            </div>
            <Input
              type="text"
              label="Bairro"
              isRequired
              className="max-w-[26.5rem]"
              disabled
              {...register("address.neighborhood")}
              isClearable
              isInvalid={errors?.address?.neighborhood && true}
              color={errors?.address?.neighborhood ? "danger" : "default"}
              errorMessage={
                errors?.address?.neighborhood &&
                errors?.address.neighborhood.message
              }
            />

            <div className="flex gap-3">
              <Input
                type="text"
                isRequired
                label="Cidade"
                disabled
                className="w-[310px]"
                {...register("address.city")}
                isClearable
                isInvalid={errors?.address?.city && true}
                color={errors?.address?.city ? "danger" : "default"}
                errorMessage={
                  errors?.address?.city && errors?.address.city.message
                }
              />

              <Input
                className="w-[100px]"
                label="Estado"
                isRequired
                disabled
                {...register("address.state")}
              />
            </div>
            <Input
              type="text"
              isRequired
              label="Destinatário"
              className="max-w-[26.5rem]"
              {...register("address.recipient")}
              isClearable
              isInvalid={errors?.address?.recipient && true}
              color={errors?.address?.recipient ? "danger" : "default"}
              errorMessage={
                errors?.address?.recipient && errors?.address.recipient.message
              }
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
