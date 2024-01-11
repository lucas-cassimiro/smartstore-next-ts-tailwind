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
  Button,
} from "@nextui-org/react";

import { MessageResponseData } from "@/interfaces/MessageResponseData";

import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ColorsData } from "@/interfaces/ColorsData";
import { EditIcon } from "@/svg/EditIcon";
import { DeleteIcon } from "@/svg/DeleteIcon";

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
          ? `https://smartshop-api-foy4.onrender.com/colors`
          : `https://smartshop-api-foy4.onrender.com/colors/${data.id}`;

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

  const handleRemove = async (id: number) => {
    try {
      //setProducts((prevData) => prevData.filter((item) => item.id !== id));

      const response = await fetch(`http://localhost:3333/colors/${id}`, {
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
          <TableColumn>AÇÕES</TableColumn>
        </TableHeader>

        <TableBody
          //isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {colors.map((color) => (
            <TableRow key={color.id}>
              <TableCell>{color.id}</TableCell>
              <TableCell>{color.name}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setMethod("PUT");
                    setValue("id", color.id);
                  }}
                >
                  <EditIcon />
                </span>

                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleRemove(color.id)}
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
