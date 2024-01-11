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
  Button,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { CategoriesData } from "@/interfaces/CategoriesData";

import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageResponseData } from "@/interfaces/MessageResponseData";
import { EditIcon } from "@/svg/EditIcon";
import { DeleteIcon } from "@/svg/DeleteIcon";

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
          ? `https://smartshop-api-foy4.onrender.com/categories`
          : `https://smartshop-api-foy4.onrender.com/${data.id}`;

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

  const handleRemove = async (id: number) => {
    try {
      //setProducts((prevData) => prevData.filter((item) => item.id !== id));

      const response = await fetch(`http://localhost:3333/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      //setMessageResponse(responseData);
      //setIsModalOpen(true);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

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
          <TableColumn>AÇÕES</TableColumn>
        </TableHeader>

        <TableBody
          //isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {categories.map((categorie) => (
            <TableRow key={categorie.id}>
              <TableCell>{categorie.id}</TableCell>
              <TableCell>{categorie.name}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setMethod("PUT");
                    setValue("id", categorie.id);
                  }}
                >
                  <EditIcon />
                </span>

                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleRemove(categorie.id)}
                >
                  <DeleteIcon />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center gap-5 mt-16"
      >
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

        <Button type="submit" color="primary" isLoading={isSubmitting}>
          ENVIAR
        </Button>
      </form>
    </section>
  );
}
