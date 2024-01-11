"use client";

import { getStocks } from "@/services/api";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { DeleteIcon } from "@/svg/DeleteIcon";
import { EditIcon } from "@/svg/EditIcon";
import { SearchIcon } from "@/svg/SearchIcon";
import { ChevronDownIcon } from "@/svg/ChevronDownIcon";
import { PlusIcon } from "@/svg/PlusIcon";

import useTable from "@/hooks/useFormTableLogic";
import currencyFormat from "@/helpers/currencyFormat";
import moment from "moment";

import { StocksData } from "@/interfaces/StocksData";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const updateStockSchema = z.object({
  product_id: z.coerce.number().min(1, "Campo obrigatório."),
  status: z.string(),
  purchase_price: z.coerce.number(),
  expiry_date: z.string(),
  quantity: z.coerce.number(),
});

type updateStockFormData = z.infer<typeof updateStockSchema>;

type MessageResponse = {
  message: string;
};

export default function Stocks() {
  const [stocks, setStocks] = useState<StocksData[]>([]);

  const [errorMessage, setErrorMessage] = useState<MessageResponse | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<MessageResponse | null>(
    null
  );

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateStockFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(updateStockSchema),
  });

  const {
    items,
    onSearchChange,
    onPreviousPage,
    onNextPage,
    pages,
    onClear,
    filteredItems,
    hasSearchFilter,
    onRowsPerPageChange,
    recebeDados,
    page,
    statusFilter,
    //statusOptions,
    setStatusFilter,
    setFilterValue,
    isLoading,
    setIsLoading,
    filterValue,
    setPage,
    data,
    onStatusSelectionChange,
  } = useTable();

  useEffect(() => {
    async function fetchData() {
      const data = await getStocks();
      setStocks(data);
      setIsLoading(false);
      recebeDados(data);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<updateStockFormData> = async (
    data: updateStockFormData
  ) => {
    try {
      const url = `http://localhost:3333/stocks/${data.product_id}`;

      const requestData: Record<string, any> = {};

      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== 0
        ) {
          requestData[key] = value;
        }
      });

      const { product_id, ...requestStock } = requestData;

      const request = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestStock),
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

  const estoque = [
    "Disponível",
    "Indisponível",
    "Estoque mínimo",
    "Pedido em Andamento",
    "Aguardando Inspeção",
    "Reservado",
    "Devolução em Processo",
    "Vencido",
    "Devolução Autorizada",
    "Aguardando Atualização",
    "Em manutenção",
    "Em Pré-venda",
  ];

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              color="primary"
              endContent={<PlusIcon />}
              //onClick={() => changeMethod(post)}
            >
              Adicionar Novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {stocks.length} produtos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Produtos por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    stocks.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, setPage, onPreviousPage, onNextPage]);

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de estoque
      </h1>

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>ID DO PRODUTO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PREÇO DE COMPRA</TableColumn>
          <TableColumn>DATA DE EXPIRAÇÃO</TableColumn>
          <TableColumn>CRIADO EM</TableColumn>
          <TableColumn>ATUALIZADO EM</TableColumn>
          <TableColumn>QUANTIDADE</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          //emptyContent={"Produto não encontrado"}
          items={items}
        >
          {(item) => (
            <TableRow key="1">
              <TableCell>{item.product_id}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{currencyFormat(item.purchase_price)}</TableCell>
              <TableCell>
                {moment(item.expiry_date).add(1, "days").format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {moment(item.created_at).add(1, "days").format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {" "}
                {moment(item.updated_at).add(1, "days").format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-3 mt-16"
      >
        <Input
          type="number"
          label="ID do Produto"
          isRequired
          className="w-[250px]"
          {...register("product_id")}
          isInvalid={errors?.product_id && true}
          color={errors?.product_id ? "danger" : "default"}
          errorMessage={errors?.product_id && errors?.product_id.message}
        />

        <Select
          label="Status do produto"
          {...register("status")}
          className="w-[250px]"
        >
          {estoque.map((estoque: any) => (
            <SelectItem key={estoque} value={estoque} {...register("status")}>
              {estoque}
            </SelectItem>
          ))}
        </Select>

        <Input
          id="purchase_price"
          type="number"
          label="Preço de compra"
          className="w-[250px]"
          {...register("purchase_price")}
        />

        <Input
          id="expiry_date"
          type="text"
          label="Data de expiração"
          className="w-[250px]"
          {...register("expiry_date")}
        />

        <Input
          type="number"
          label="Quantidade"
          className="w-[250px]"
          {...register("quantity")}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          color="primary"
          className="self-center mt-5"
        >
          ENVIAR
        </Button>
      </form>
    </section>
  );
}
