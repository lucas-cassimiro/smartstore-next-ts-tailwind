"use client";

import { getColors } from "@/services/api";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
} from "@nextui-org/react";

import { MessageResponseData } from "@/interfaces/MessageResponseData";

import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ColorsData } from "@/interfaces/ColorsData";

const createOrUpdateColorSchema = (method: string) => {
  return z.object({
    id:
      method === "POST"
        ? z.number().optional()
        : z.number().min(1, "Campo obrigatório."),
    name:
      method === "POST" ? z.string().nonempty("Campo obrigatório") : z.string(),
  });
};

interface ColorSchema {
  id?: number;
  name?: string;
}

export default function Colors() {
  const [colors, setColors] = useState<ColorsData[]>([]);

  const [method, setMethod] = useState<string>("POST");

  const [errorMessage, setErrorMessage] = useState<MessageResponseData | null>(
    null
  );
  const [successMessage, setSuccessMessage] =
    useState<MessageResponseData | null>(null);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColorSchema>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createOrUpdateColorSchema(method)),
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getColors();
      setColors(data);
      //setIsLoading(false);
    }

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<ColorSchema> = async (data: ColorSchema) => {
    try {
      const url =
        method === "POST"
          ? `http://localhost:3333/colors`
          : `http://localhost:3333/colors/${data.id}`;

      const { id, ...requestData } = data;

      const request = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!request.ok) {
        const errorResponse = await request.json();
        setErrorMessage(errorResponse);
        throw new Error(errorResponse.message);
      }

      const response = await request.json();
      setSuccessMessage(response);

      setErrorMessage(null);

      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<ColorSchema> = (errors) =>
    console.log(errors);

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de cores
      </h1>

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        classNames={{
          wrapper: "max-h-[382px]",
        }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NOME</TableColumn>
        </TableHeader>

        <TableBody
          //isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {colors.map((color) => (
            <TableRow key={color.id}>
              <TableCell>{color.id}</TableCell>
              <TableCell>{color.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {method === "PUT" && (
          <>
            <Input
              type="number"
              label="ID"
              isRequired
              className="w-[250px]"
              {...register("id")}
              isInvalid={errors?.id && true}
              color={errors?.id ? "danger" : "default"}
              errorMessage={errors?.id && errors?.id.message}
            />
          </>
        )}

        <Input
          type="text"
          label="Nome"
          maxLength={100}
          isRequired={method === "POST" ? true : false}
          isClearable
          className="w-[250px]"
          {...register("name")}
          isInvalid={errors?.name && true}
          color={errors?.name ? "danger" : "default"}
          errorMessage={errors?.name && errors.name.message}
        />

        <button
          type="submit"
          className="bg-[#4aa4ee] hover:bg-[#3286ca] transition-all duration-700 ease-in-out p-2 text-white font-medium cursor-pointer rounded-md text-base uppercase"
        >
          ENVIAR
        </button>
      </form>
    </section>
  );
}
