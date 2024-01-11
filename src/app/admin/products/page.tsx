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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";

import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import { DeleteIcon } from "@/svg/DeleteIcon";
import { EditIcon } from "@/svg/EditIcon";
import { SearchIcon } from "@/svg/SearchIcon";
import { ChevronDownIcon } from "@/svg/ChevronDownIcon";
import { PlusIcon } from "@/svg/PlusIcon";

import useTable from "@/hooks/useFormTableLogic";
import currencyFormat from "@/helpers/currencyFormat";

import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { ZodObject, ZodRawShape, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductsData } from "@/interfaces/ProductsData";
import { ColorsData } from "@/interfaces/ColorsData";
import { StoragesData } from "@/interfaces/StoragesData";
import { CategoriesData } from "@/interfaces/CategoriesData";

import { MessageResponseData } from "@/interfaces/MessageResponseData";

import { useHookFormMask } from "use-mask-input";

import { CameraIcon } from "@/svg/CameraIcon";
import moment from "moment";

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

  const [messageResponse, setMessageResponse] =
    useState<MessageResponseData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const registerWithMask = useHookFormMask(register);

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

      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== 0
        ) {
          if (
            key === "expiry_date" &&
            typeof value === "string" &&
            moment(value, "DD/MM/YYYY", true).isValid()
          ) {
            const formattedExpiryDate = moment(value, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );
            formData.append(key, formattedExpiryDate);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      const request = await fetch(url, {
        method: method,
        body: formData,
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

  const handleRemove = async (id: number) => {
    try {
      setProducts((prevData) => prevData.filter((item) => item.id !== id));

      const response = await fetch(`http://localhost:3333/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setMessageResponse(responseData);
      setIsModalOpen(true);
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
            label="Pesquisar"
            className="w-full sm:max-w-[44%]"
            placeholder="Procurar por nome..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 pointer-events-none flex-shrink-0" />
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
          <TableColumn>AÇÕES</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          //emptyContent={"Produto não encontrado"}
          items={items}
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
                  onClick={() => handleRemove(item.id)}
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
        <div className="flex gap-14 justify-center items-center mt-16">
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
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">R$</span>
                </div>
              }
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
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">%</span>
                </div>
              }
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
              className="w-[250px]"
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
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
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
                  placeholder="__/__/____"
                  className="w-[250px]"
                  {...registerWithMask("expiry_date", ["99/99/9999"], {
                    required: true,
                  })}
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
        <Button
          type="submit"
          isLoading={isSubmitting}
          color="primary"
          className="mt-10"
        >
          ENVIAR
        </Button>
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
                Cadastro de produto
              </ModalHeader>
              <ModalBody>
                <span>{messageResponse?.message}</span>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose} className="uppercase">
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
