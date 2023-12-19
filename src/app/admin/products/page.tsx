"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getCategories,
  getColors,
  getProducts,
  getStorages,
} from "@/services/api";
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

import useTable from "@/components/Logic/useFormTableLogic";
import currencyFormat from "@/helpers/currencyFormat";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { ZodObject, ZodRawShape, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductsData } from "@/interfaces/ProductsData";
import { ColorsData } from "@/interfaces/ColorsData";
import { StoragesData } from "@/interfaces/StoragesData";
import { CategoriesData } from "@/interfaces/CategoriesData";

import { MessageResponseData } from "@/interfaces/MessageResponseData";

type ProductSchema = {
  id?: number;
  name?: string;
  price?: number;
  black_friday: boolean;
  description?: string;
  discount?: number;
  ean?: string;
  file?: FileList | null;
  color_id?: number;
  storage_id?: number;
  categorie_id?: number;
  status?: string;
  quantity?: number;
  expiry_date?: string;
  purchase_price?: number;
  highlight: boolean;
  black_friday_offer: boolean;
};

const createOrUpdateProductSchema = (method: string) => {
  return z.object({
    id:
      method === "POST"
        ? z.coerce.number().optional()
        : z.coerce.number().min(1, "Campo obrigatório."),
    name:
      method === "POST" ? z.string().nonempty("Campo obrigatório") : z.string(),
    price:
      method === "POST"
        ? z.coerce.number().min(1, "Campo obrigatório.")
        : z.number(),
    black_friday: z.boolean(),
    highlight: z.boolean(),
    status:
      method === "POST" ? z.string().nonempty("Campo obrigatório") : z.string(),
    description:
      method === "POST"
        ? z.string().nonempty("Campo obrigatório.")
        : z.string(),
    quantity:
      method === "POST"
        ? z.coerce.number().min(1, "Campo obrigatório")
        : z.coerce.number(),
    discount: z.coerce.number(),
    ean:
      method === "POST" ? z.string().nonempty("Campo obrigatório") : z.string(),
    file: method === "POST" ? z.unknown() : z.unknown(),
    color_id:
      method === "POST"
        ? z.coerce.number().min(1, "Campo obrigatório.")
        : z.coerce.number(),
    storage_id: z.coerce.number(),
    categorie_id:
      method === "POST"
        ? z.coerce.number().min(1, "Campo obrigatório.")
        : z.coerce.number(),
    expiry_date: z.string(),
    purchase_price:
      method === "POST"
        ? z.coerce.number().min(1, "Campo obrigatório")
        : z.coerce.number(),
    black_friday_offer: z.boolean(),
  });
};

export default function Products() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [colors, setColors] = useState<ColorsData[]>([]);
  const [storages, setStorages] = useState<StoragesData[]>([]);
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
  } = useForm<ProductSchema>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createOrUpdateProductSchema(method)),
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
    data
  } = useTable();

  useEffect(() => {
    async function fetchData() {
      const [productsData, colors, storages, categories] = await Promise.all([
        getProducts(),
        getColors(),
        getStorages(),
        getCategories(),
      ]);

      setProducts(productsData);
      setColors(colors);
      setStorages(storages);
      setCategories(categories);

      recebeDados(productsData);

      setIsLoading(false);
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<ProductSchema> = async (
    data: ProductSchema
  ) => {
    console.log(data);

    try {
      const url =
        method === "POST"
          ? "http://localhost:3333/products"
          : `http://localhost:3333/products/${data.id}`;

      const formData = new FormData();

      formData.append("name", data.name || "");
      formData.append("price", data.price ? data.price.toString() : "");
      formData.append(
        "black_friday",
        data.black_friday ? data.black_friday.toString() : ""
      );
      formData.append(
        "highlight",
        data.highlight ? data.highlight.toString() : ""
      );
      formData.append(
        "black_friday_offer",
        data.black_friday_offer ? data.black_friday_offer.toString() : ""
      );
      formData.append("status", data.status || "");
      formData.append("description", data.description || "");
      formData.append(
        "quantity",
        data.quantity ? data.quantity.toString() : ""
      );
      formData.append(
        "discount",
        data.discount ? data.discount.toString() : ""
      );
      formData.append("ean", data.ean || "");
      formData.append(
        "color_id",
        data.color_id ? data.color_id.toString() : ""
      );
      formData.append(
        "storage_id",
        data.storage_id ? data.storage_id.toString() : ""
      );
      formData.append(
        "categorie_id",
        data.categorie_id ? data.categorie_id.toString() : ""
      );
      formData.append("expiry_date", data.expiry_date || "");
      formData.append(
        "purchase_price",
        data.purchase_price ? data.purchase_price.toString() : ""
      );

      if (data.file) {
        formData.append("file", data.file[0]);
      }

      const request = await fetch(url, {
        method: method,
        body: formData,
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

  const onError: SubmitErrorHandler<ProductSchema> = (errors) =>
    console.log(errors);

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
            placeholder="Procurar por nome..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              ></DropdownMenu>
            </Dropdown>

            <Button
              color="primary"
              endContent={<PlusIcon />}
              onClick={() => setMethod("POST")}
            >
              Adicionar Novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {products.length} produtos
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    setStatusFilter,
    data.length,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de produtos
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
          <TableColumn>ID</TableColumn>
          <TableColumn>NOME</TableColumn>
          <TableColumn>PREÇO</TableColumn>
          <TableColumn>BLACK FRIDAY</TableColumn>
          <TableColumn>DESCONTO</TableColumn>
          <TableColumn>AVALIAÇÃO</TableColumn>
          <TableColumn>DESCRIÇÃO</TableColumn>
          <TableColumn>EAN</TableColumn>
          <TableColumn>DESTAQUE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          //emptyContent={"Produto não encontrado"}
          items={filteredItems}
        >
          {(item) => (
            <TableRow key="1">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{currencyFormat(item.price)}</TableCell>
              <TableCell>
                {item.black_friday ? (
                  <BsCheckCircleFill className="text-green-500 w-5 h-5" />
                ) : (
                  <BsXCircleFill className="text-red-500 w-5 h-5" />
                )}
              </TableCell>
              <TableCell>
                {item.discount ? (
                  <span>{item.discount}%</span>
                ) : (
                  <BsXCircleFill className="text-red-500 w-5 h-5" />
                )}
              </TableCell>
              <TableCell>{item.average_score}</TableCell>
              <TableCell title={item.description}>
                {item.description ? item.description.substring(0, 100) : ""}
              </TableCell>
              <TableCell>{item.ean}</TableCell>
              <TableCell>
                {item.highlight ? (
                  <BsCheckCircleFill className="text-green-500 w-5 h-5" />
                ) : (
                  <BsXCircleFill className="text-red-500 w-5 h-5" />
                )}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setMethod("PUT");
                    setValue("id", item.id);
                  }}
                >
                  <EditIcon />
                </span>
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setMethod("DELETE");
                    setValue("id", item.id);
                    handleSubmit(onSubmit)();
                  }}
                >
                  <DeleteIcon />
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <form
        method={method}
        action="http://localhost:3333/products/"
        onSubmit={handleSubmit(onSubmit, onError)}
        encType="multipart/form-data"
        className="flex flex-col items-center gap-2 py-5 px-10"
      >
        <div className="flex gap-14 justify-center items-center">
          <div className="flex flex-col gap-2">
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

            <Input
              type="text"
              label="Preço"
              isRequired={method === "POST" ? true : false}
              className="w-[250px]"
              {...register("price")}
              isInvalid={errors?.price && true}
              color={errors?.price ? "danger" : "default"}
              errorMessage={errors?.price && errors?.price?.message}
            />

            <input
              type="file"
              name="file"
              onChange={(e) => setValue("file", e.target.files)}
            />

            <label>
              <input
                id="black_friday"
                type="checkbox"
                {...register("black_friday")}
              />
              Black friday
            </label>

            <label>
              <input
                id="highlight"
                type="checkbox"
                {...register("highlight")}
              />
              Destaque
            </label>

            <label>
              <input
                id="black_friday_offer"
                type="checkbox"
                {...register("black_friday_offer")}
              />
              Oferta Black Friday
            </label>

            <Input
              id="discount"
              type="number"
              label="Desconto"
              className="w-[250px]"
              {...register("discount")}
              isInvalid={errors?.discount && true}
              color={errors?.discount ? "danger" : "default"}
              errorMessage={errors?.discount && errors?.discount?.message}
            />

            <Input
              id="description"
              type="text"
              label="Descrição"
              isRequired={method === "POST" ? true : false}
              className="w-[250px]"
              {...register("description")}
              isInvalid={errors?.description && true}
              color={errors?.description ? "danger" : "default"}
              errorMessage={errors?.description && errors?.description?.message}
            />

            <Select
              label="Cor"
              isRequired={method === "POST" ? true : false}
              {...register("color_id")}
            >
              {colors.map((color) => (
                <SelectItem
                  key={color.id}
                  value={color.id}
                  {...register("color_id")}
                >
                  {color.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Select label="Armazenamento" {...register("storage_id")}>
              {storages.map((storage) => (
                <SelectItem
                  key={storage.id}
                  value={storage.id}
                  {...register("storage_id")}
                >
                  {storage.capacity}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Categoria"
              isRequired={method === "POST" ? true : false}
              {...register("categorie_id")}
            >
              {categories.map((categorie) => (
                <SelectItem
                  key={categorie.id}
                  value={categorie.id}
                  {...register("categorie_id")}
                >
                  {categorie.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              id="ean"
              type="text"
              label="EAN"
              maxLength={13}
              isRequired={method === "POST" ? true : false}
              className="w-[250px]"
              {...register("ean")}
              isInvalid={errors?.ean && true}
              color={errors?.ean ? "danger" : "default"}
              errorMessage={errors?.ean && errors?.ean?.message}
            />

            <Select
              label="Status do produto"
              isRequired={method === "POST" ? true : false}
              {...register("status")}
            >
              {estoque.map((estoque) => (
                <SelectItem key={estoque} value={estoque}>
                  {estoque}
                </SelectItem>
              ))}
            </Select>

            {method === "POST" && (
              <>
                <Input
                  id="purchase_price"
                  type="number"
                  label="Preço de compra"
                  className="w-[250px]"
                  {...register("purchase_price")}
                  isRequired={method === "POST" ? true : false}
                  isInvalid={errors.purchase_price && true}
                  color={errors?.purchase_price ? "danger" : "default"}
                  errorMessage={
                    errors?.purchase_price && errors?.purchase_price?.message
                  }
                />
              </>
            )}

            {method === "POST" && (
              <>
                <Input
                  id="expiry_date"
                  type="text"
                  label="Data de expiração"
                  className="w-[250px]"
                  {...register("expiry_date")}
                  isInvalid={errors?.expiry_date && true}
                  color={errors?.expiry_date ? "danger" : "default"}
                  errorMessage={
                    errors?.expiry_date && errors?.expiry_date?.message
                  }
                />
              </>
            )}

            {method === "POST" && (
              <>
                <Input
                  type="number"
                  label="Quantidade"
                  className="w-[250px]"
                  isRequired={method === "POST" ? true : false}
                  {...register("quantity")}
                  isInvalid={errors?.quantity && true}
                  color={errors?.quantity ? "danger" : "default"}
                  errorMessage={errors?.quantity && errors?.quantity?.message}
                />
              </>
            )}
          </div>
        </div>
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
