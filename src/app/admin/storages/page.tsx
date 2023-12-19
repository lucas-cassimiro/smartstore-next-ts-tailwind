"use client";

import { getStorages } from "@/services/api";

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

import { StoragesData } from "@/interfaces/StoragesData";

import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageResponseData } from "@/interfaces/MessageResponseData";

const createOrUpdateStorageSchema = (method: string) => {
  return z.object({
    id:
      method === "POST"
        ? z.coerce.number().optional()
        : z.coerce.number().min(1, "Campo obrigatório."),
    capacity: z.coerce.number().min(1, "Campo obrigatório"),
  });
};

interface StorageSchema {
  id?: number;
  capacity?: number;
}

export default function Storages() {
  const [storages, setStorages] = useState<StoragesData[]>([]);

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
  } = useForm<StorageSchema>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createOrUpdateStorageSchema(method)),
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getStorages();
      setStorages(data);
      //setIsLoading(false);
    }

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<StorageSchema> = async (
    data: StorageSchema
  ) => {
    try {
      const url =
        method === "POST"
          ? `http://localhost:3333/storages`
          : `http://localhost:3333/storages/${data.id}`;

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

  const onError: SubmitErrorHandler<StorageSchema> = (errors) =>
    console.log(errors);

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de armazenamento
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
          <TableColumn>CAPACIDADE</TableColumn>
        </TableHeader>

        <TableBody
          //isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {storages.map((storage) => (
            <TableRow key={storage.id}>
              <TableCell>{storage.id}</TableCell>
              <TableCell>{storage.capacity}</TableCell>
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
              isClearable
              className="w-[250px]"
              {...register("id")}
              isInvalid={errors?.id && true}
              color={errors?.id ? "danger" : "default"}
              errorMessage={errors?.id && errors?.id.message}
            />
          </>
        )}

        <Input
          type="number"
          label="Capacidade"
          maxLength={100}
          isRequired
          isClearable
          className="w-[250px]"
          {...register("capacity")}
          isInvalid={errors?.capacity && true}
          color={errors?.capacity ? "danger" : "default"}
          errorMessage={errors?.capacity && errors.capacity.message}
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
