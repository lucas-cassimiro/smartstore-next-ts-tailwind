"use client";

import { getCategories } from "@/services/api";
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

import { useEffect, useState } from "react";
import { CategoriesData } from "@/interfaces/CategoriesData";

import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageResponseData } from "@/interfaces/MessageResponseData";

const createOrUpdateCategorieSchema = (method: string) => {
  return z.object({
    id:
      method === "POST"
        ? z.coerce.number().optional()
        : z.coerce.number().min(1, "Campo obrigatório."),
    name: z.string().nonempty("Campo obrigatório"),
  });
};

interface CategorieSchema {
  id?: number;
  name?: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesData[]>([]);

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
  } = useForm<CategorieSchema>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createOrUpdateCategorieSchema(method)),
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getCategories();
      setCategories(data);
      //setIsLoading(false);
    }

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<CategorieSchema> = async (
    data: CategorieSchema
  ) => {
    try {
      const url =
        method === "POST"
          ? `http://localhost:3333/categories`
          : `http://localhost:3333/categories/${data.id}`;

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

  const onError: SubmitErrorHandler<CategorieSchema> = (errors) =>
    console.log(errors);

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de categorias
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
          {categories.map((categorie) => (
            <TableRow key={categorie.id}>
              <TableCell>{categorie.id}</TableCell>
              <TableCell>{categorie.name}</TableCell>
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
