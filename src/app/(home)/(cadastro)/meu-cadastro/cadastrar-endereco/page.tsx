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

import { useState, useEffect, useCallback } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { MessageResponseData } from "@/interfaces/MessageResponseData";
import { useRouter } from "next/navigation";

const schemaForm = z.object({
  user_id: z.coerce.number(),
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
});

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
  const [messageResponse, setMessageResponse] =
    useState<MessageResponseData | null>(null);
  const [isCepFilled, setIsCepFilled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = useAuth();

  const router = useRouter();

  const {
    getValues,
    setValue,
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "onBlur",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      user_id: user?.id || 0,
      cep: "",
      street_address: "",
      number_address: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      recipient: "",
    },
  });

  const zipCode = watch("cep");

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue("city", data.localidade);
      setValue("street_address", data.logradouro);
      setValue("state", data.uf);
      setValue("neighborhood", data.bairro);
      setValue("complement", data.complemento);
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
    if (zipCode.length !== 8) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  const handleFormSubmit: SubmitHandler<FormProps> = async (
    data: FormProps
  ) => {
    try {
      data.user_id = user?.id || 0;

      const url = `https://smartshop-api-foy4.onrender.com/address/`;

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!request.ok) {
        const errorResponse = await request.json();
        setMessageResponse(errorResponse);
        setIsModalOpen(true);
        throw new Error(errorResponse.message);
      }

      const response = await request.json();

      setMessageResponse(response);

      setIsModalOpen(true);

      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const voltarRota = () => {
    router.push("/meu-cadastro");
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

  return (
    <AuthGuard>
      <div className="flex flex-col w-[983px] py-14">
        <div className="m-auto flex flex-col">
          <h1 className="text-3xl font-bold mb-12">Novo endereço</h1>
          <form
            className="flex flex-col w-[700px] mb-7"
            onSubmit={handleSubmit(handleFormSubmit, onError)}
          >
            <label htmlFor="postalcode" className="text-sm text-[#878787] mb-1">
              CEP*
            </label>
            <input
              id="postalcode"
              className={`${
                errors.cep ? "bg-[#FEE7EF]" : ""
              } max-w-[112px] border bg-[#EFEFEF4D] border-[#c0c0c0]  h-12 py-3 px-4 mb-3`}
              maxLength={8}
              {...register("cep")}
            />

            {errors?.cep && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.cep.message}
              </span>
            )}

            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              className="underline text-sm mb-5"
            >
              Não sei meu CEP
            </a>

            <label htmlFor="endereco" className="text-sm text-[#878787] mb-1">
              Endereço*
            </label>
            <input
              type="text"
              id="endereco"
              disabled={!isCepFilled}
              className={`${
                errors.street_address ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              {...register("street_address")}
            />

            {errors?.street_address && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.street_address.message}
              </span>
            )}

            <div className="flex gap-3">
              <div className="flex flex-col mb-3">
                <label htmlFor="number" className="text-sm text-[#878787] mb-1">
                  Número*
                </label>
                <input
                  type="number"
                  id="number"
                  disabled={!isCepFilled}
                  className={`${
                    errors.number_address ? "bg-[#FEE7EF]" : ""
                  } w-[80px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4`}
                  {...register("number_address")}
                />

                {errors?.number_address && (
                  <span className="text-[#F31260] text-sm mb-5 w-[70px]">
                    {errors?.number_address.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label
                  htmlFor="complement"
                  className="text-sm text-[#878787] mb-1"
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  disabled={!isCepFilled}
                  className={`${
                    errors.complement ? "bg-[#FEE7EF]" : ""
                  } w-[330px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4`}
                  {...register("complement")}
                />
              </div>

              {errors?.complement && (
                <span className="text-[#F31260] text-sm mb-5">
                  {errors?.complement.message}
                </span>
              )}
            </div>

            <label
              htmlFor="neighborhood"
              className="text-sm text-[#878787] mb-1"
            >
              Bairro*
            </label>
            <input
              type="text"
              id="neighborhood"
              className={`${
                errors.neighborhood ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              disabled
              {...register("neighborhood")}
            />

            {errors?.neighborhood && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.neighborhood.message}
              </span>
            )}

            <div className="flex gap-3">
              <div className="flex flex-col mb-3">
                <label htmlFor="city" className="text-sm text-[#878787] mb-1">
                  Cidade*
                </label>
                <input
                  type="text"
                  id="city"
                  disabled
                  className={`${
                    errors.city ? "bg-[#FEE7EF]" : ""
                  } w-[310px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4`}
                  {...register("city")}
                />

                {errors?.city && (
                  <span className="text-[#F31260] text-sm mb-5">
                    {errors?.city.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="state" className="text-sm text-[#878787] mb-1">
                  Estado*
                </label>
                <input
                  className={`${
                    errors.state ? "bg-[#FEE7EF]" : ""
                  } w-[100px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4`}
                  id="state"
                  disabled
                  {...register("state")}
                />
              </div>

              {errors?.state && (
                <span className="text-[#F31260] text-sm mb-5">
                  {errors?.state.message}
                </span>
              )}
            </div>

            <label htmlFor="recipient" className="text-sm text-[#878787] mb-1">
              Destinatário*
            </label>
            <input
              type="text"
              id="recipient"
              className={`${
                errors.recipient ? "bg-[#FEE7EF]" : ""
              } max-w-[26.5rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3`}
              {...register("recipient")}
            />

            {errors?.recipient && (
              <span className="text-[#F31260] text-sm mb-5">
                {errors?.recipient.message}
              </span>
            )}

            <div className="flex gap-2">
              <Button
                color="secondary"
                className="w-[13rem]"
                onClick={voltarRota}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                color="primary"
                className="w-[13rem]"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>

          <Modal
            isOpen={isModalOpen}
            onOpenChange={() => setIsModalOpen(false)}
            backdrop="blur"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 uppercase">
                    Cadastro de endereço
                  </ModalHeader>
                  <ModalBody>
                    <span className="text-black">
                      {messageResponse?.message}
                    </span>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onPress={onClose}
                      className="uppercase"
                    >
                      Ok
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </AuthGuard>
  );
}
