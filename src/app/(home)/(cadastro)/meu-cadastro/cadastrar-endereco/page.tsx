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
    //setValue("address.cep", cepMask);

    if (zipCode.length !== 8) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  const handleFormSubmit: SubmitHandler<FormProps> = async (
    data: FormProps
  ) => {
    try {
      data.user_id = user?.id || 0;

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

        setMessageResponse(errorResponse);

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
            className="flex flex-col gap-5 w-[700px] mb-7"
            onSubmit={handleSubmit(handleFormSubmit, onError)}
          >
            <Input
              isRequired
              label="CEP"
              className="max-w-[112px]"
              maxLength={9}
              {...register("cep")}
              isClearable
              isInvalid={errors?.cep && true}
              color={errors?.cep ? "danger" : "default"}
              errorMessage={errors?.cep && errors?.cep.message}
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
              {...register("street_address")}
              isClearable
              isInvalid={errors?.street_address && true}
              color={errors?.street_address ? "danger" : "default"}
              errorMessage={
                errors?.street_address && errors?.street_address.message
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
                  {...register("number_address")}
                  isClearable
                  isInvalid={errors?.number_address && true}
                  color={errors?.number_address ? "danger" : "default"}
                  errorMessage={
                    errors?.number_address && errors?.number_address.message
                  }
                />
              </div>

              <Input
                type="text"
                label="Complemento"
                disabled={!isCepFilled}
                className="w-[330px]"
                {...register("complement")}
              />
            </div>
            <Input
              type="text"
              label="Bairro"
              isRequired
              className="max-w-[26.5rem]"
              disabled
              {...register("neighborhood")}
              isClearable
              isInvalid={errors?.neighborhood && true}
              color={errors?.neighborhood ? "danger" : "default"}
              errorMessage={
                errors?.neighborhood && errors?.neighborhood.message
              }
            />

            <div className="flex gap-3">
              <Input
                type="text"
                isRequired
                label="Cidade"
                disabled
                className="w-[310px]"
                {...register("city")}
                isClearable
                isInvalid={errors?.city && true}
                color={errors?.city ? "danger" : "default"}
                errorMessage={errors?.city && errors?.city.message}
              />

              <Input
                className="w-[100px]"
                label="Estado"
                isRequired
                disabled
                {...register("state")}
              />
            </div>
            <Input
              type="text"
              isRequired
              label="Destinatário"
              className="max-w-[26.5rem]"
              {...register("recipient")}
              isClearable
              isInvalid={errors?.recipient && true}
              color={errors?.recipient ? "danger" : "default"}
              errorMessage={errors?.recipient && errors?.recipient.message}
            />

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
