"use client";

import currencyFormat from "@/helpers/currencyFormat";
import { useEffect, useState } from "react";

import {
  BsCheckCircleFill,
  BsFillCameraFill,
  BsXCircleFill,
} from "react-icons/bs";

import { Input, Checkbox, Button, RadioGroup, Radio } from "@nextui-org/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import moment from "moment";

type FormData = {
  id?: number;
  name?: string;
  price?: number;
  black_friday?: boolean;
  discount?: number;
  average_score?: number;
  description?: string;
  color_id?: number;
  storage_id?: number;
  categorie_id?: number;
  ean?: string;
  capacity?: number;
  status?: string;
  purchase_price?: number;
  expiry_date?: string;
  created_at?: string;
  updated_at?: string;
  quantity?: number;
};

type MessageResponse = {
  message: string;
};

async function getData(param: string): Promise<any> {
  const response = await fetch(`http://localhost:3001/${param}`);

  const data = await response.json();
  return data;
}

export default function Admin({ params }: { params: { control: string } }) {
  const control: string = params.control;

  const [method, setMethod] = useState<string>("");

  const [data, setData] = useState<any>([]);

  const [errorMessage, setErrorMessage] = useState<MessageResponse | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<MessageResponse | null>(
    null
  );

  const [blackFridayChecked, setBlackFridayChecked] = useState<boolean>(false);

  console.log(data);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const changeMethod = (method: string) => {
    reset();

    setSuccessMessage(null);
    setErrorMessage(null);

    setMethod(method);
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data);

    try {
      // data.preventDefault();

      const url =
        method === "POST"
          ? `http://localhost:3001/${control}`
          : `http://localhost:3001/${control}/${data.id}`;

      const request = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        const errorResponse = await request.json();

        setErrorMessage(errorResponse);

        throw new Error(errorResponse.message);
      }

      const response = await request.json();

      setSuccessMessage(response);

      console.log(response);

      setErrorMessage(null);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

  const isIdRequired =
    ["cor", "armazenamento", "categoria", "estoque", "produto"].includes(
      control
    ) &&
    (method === "PUT" || method === "DELETE");

  const isNameRequired =
    ["produto", "cor", "categoria"].includes(control) &&
    (method === "POST" || method === "PUT");

  const isRequired =
    ["produto"].includes(control) && (method === "POST" || method === "PUT");

  const isCapacityRequired =
    ["armazenamento"].includes(control) &&
    (method === "POST" || method === "PUT");

  const isStatusPurchasePriceExpiryDateQuantityRequired =
    (["produto"].includes(control) && method === "POST") ||
    (["estoque"].includes(control) && method === "PUT");

  const isCreatedAtRequired =
    ["produto"].includes(control) && method === "POST";

  const isUpdatedAtRequired = ["estoque"].includes(control) && method === "PUT";

  const post: string = "POST";
  const put: string = "PUT";
  const del: string = "DELETE";

  useEffect(() => {
    async function fetchData() {
      const data = await getData(control);
      setData(data);

      if (control === "estoque") {
        setMethod("PUT");
      } else {
        setMethod("POST");
      }
    }
    fetchData();
  }, [control]);

  const name = (
    <>
      <Input
        type="text"
        label="Nome"
        maxLength={100}
        isRequired
        //name="name"
        // value={formData.name}
        // onChange={handleChange}
        // placeholder="Name"
        className="w-[250px]"
        {...register("name", {
          required: isNameRequired,
        })}
      />

      {errors?.name && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputId = (
    <>
      <Input
        type="number"
        label="ID"
        isRequired
        className="w-[250px]"
        {...register("id", {
          required: isIdRequired,
        })}
      />
      {errors?.id && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputStatus = (
    <>
      <Input
        id="status"
        type="text"
        label="Status do pedido"
        maxLength={100}
        isRequired
        // name="status"
        // value={formData.status}
        // onChange={handleChange}
        className=" w-[250px]"
        {...register("status", {
          required: isStatusPurchasePriceExpiryDateQuantityRequired,
        })}
      />
      {errors?.status && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputPurchasePrice = (
    <>
      <Input
        id="purchase_price"
        type="number"
        label="Preço de compra"
        isRequired
        // name="purchase_price"
        // value={formData.purchase_price}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("purchase_price", {
          required: isStatusPurchasePriceExpiryDateQuantityRequired,
        })}
      />
      {errors?.purchase_price && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputExpiryDate = (
    <>
      <Input
        id="expiry_date"
        type="text"
        label="Data de expiração"
        isRequired
        // name="expiry_date"
        // value={formData.expiry_date}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("expiry_date", {
          required: isStatusPurchasePriceExpiryDateQuantityRequired,
        })}
      />
      {errors?.expiry_date && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputCreatedAt = (
    <>
      <Input
        id="created_at"
        type="text"
        label="Data do cadastro"
        isRequired
        // name="created_at"
        // value={formData.created_at}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("created_at", {
          required: isCreatedAtRequired,
        })}
      />
      {errors?.created_at && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputQuantity = (
    <>
      <Input
        type="number"
        label="Quantidade"
        isRequired
        // name="quantity"
        // value={formData.quantity}
        // onChange={handleChange}
        // placeholder="Quantity"
        className="w-[250px]"
        {...register("quantity", {
          required: isStatusPurchasePriceExpiryDateQuantityRequired,
        })}
      />
      {errors?.quantity && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputEan = (
    <>
      <Input
        id="ean"
        type="number"
        label="EAN"
        maxLength={13}
        isRequired
        // name="ean"
        // value={formData.ean}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("ean", {
          required: isRequired,
        })}
      />
      {errors?.ean && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputDescription = (
    <>
      <Input
        id="description"
        type="text"
        label="Descrição"
        isRequired
        // name="description"
        // value={formData.description}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("description", {
          required: isRequired,
        })}
      />
      {errors?.description && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputDiscount = (
    <>
      <Input
        id="discount"
        type="number"
        label="Desconto"
        isRequired
        // name="discount"
        // value={formData.discount}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("discount", {
          required: isRequired,
        })}
      />
      {errors?.discount && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  const inputPrice = (
    <>
      <Input
        type="number"
        label="Preço"
        isRequired
        // name="price"
        // value={formData.price}
        // onChange={handleChange}
        className="w-[250px]"
        {...register("price", {
          required: isRequired,
        })}
      />
      {errors?.price && (
        <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
      )}
    </>
  );

  return (
    <section className="px-10 w-[70%]">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Tabela de {control}
      </h1>
      <table className="max-h-[600px] scrollbar w-full border-spacing-0 border-collapse text-white text-center">
        <thead>
          <tr className="bg-yellow-500">
            {control === "produto" && (
              <>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ID
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  NOME
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  PREÇO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  BLACK FRIDAY
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  DESCONTO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  AVALIAÇÃO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  DESCRIÇÃO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  EAN
                </th>
              </>
            )}
            {control === "estoque" && (
              <>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ID do produto
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  STATUS
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  PREÇO DE COMPRA
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  DATA DE EXPIRAÇÃO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  CRIADO EM
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ATUALIZADO EM
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  QUANTIDADE
                </th>
              </>
            )}
            {(control === "cor" || control === "categoria") && (
              <>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ID
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  NAME
                </th>
              </>
            )}
            {control === "armazenamento" && (
              <>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ID
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  CAPACIDADE
                </th>
              </>
            )}
            {control === "pedidos" && (
              <>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  ID
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  CLIENTE
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  PRODUTO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  PREÇO UNITÁRIO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  DESCONTO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  PREÇO TOTAL
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  QUANTIDADE DO PRODUTO
                </th>
                <th className="bg-green-500 pt-0 pr-4 pb-2 pl-4 text-lg uppercase text-left">
                  VALOR TOTAL DA COMPRA
                </th>
              </>
            )}
          </tr>
        </thead>

        <tbody className="max-h-[600px] bg-[#313131]">
          {data.map((data: any) => (
            <tr key={data.id}>
              {control === "produto" && (
                <>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.id}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.name}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {currencyFormat(data.price)}
                  </td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {data.black_friday ? (
                      <BsCheckCircleFill className="text-green-500 w-5 h-5" />
                    ) : (
                      <BsXCircleFill className="text-red-500 w-5 h-5" />
                    )}
                  </td>
                  <td className="py-2 px-16 border-b border-r text-sm">
                    {data.discount ? (
                      <span>{data.discount}%</span>
                    ) : (
                      <BsXCircleFill className="text-red-500 w-5 h-5" />
                    )}
                  </td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {data.average_score}
                  </td>
                  <td
                    className="py-2 px-4 border-b border-r text-xs"
                    title={data.description}
                  >
                    {data.description ? data.description.substring(0, 100) : ""}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.ean}
                  </td>
                </>
              )}
              {control === "estoque" && (
                <>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.product_id}
                  </td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {data.status}
                  </td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {currencyFormat(data.purchase_price)}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-xs">
                    {moment(data.expiry_date)
                      .add(1, "days")
                      .format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {moment(data.created_at)
                      .add(1, "days")
                      .format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {moment(data.updated_at)
                      .add(1, "days")
                      .format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.quantity}
                  </td>
                </>
              )}
              {(control === "cor" || control === "categoria") && (
                <>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.id}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.name}
                  </td>
                </>
              )}
              {control === "armazenamento" && (
                <>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.id}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.capacity}
                  </td>
                </>
              )}
              {control === "pedidos" && (
                <>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data.id}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {/* {data.name} */}
                    {}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm"></td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {currencyFormat(data.unit_price)}
                  </td>
                  <td className="py-2 px-16 border-b border-r text-sm">
                    {data.discount ? (
                      <span>{data.discount}%</span>
                    ) : (
                      <BsXCircleFill className="text-red-500 w-5 h-5" />
                    )}
                  </td>
                  <td className="py-2 px-10 border-b border-r text-sm">
                    {currencyFormat(data.total_price)}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-xs">
                    {data.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-sm">
                    {data[data.length - 3]}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {control === "produto" && (
        <>
          <RadioGroup
            className="flex gap-3 mt-6 flex-col"
            defaultValue="POST"
            label="Selecione o método que você deseja"
          >
            <Radio value="POST" onClick={() => changeMethod(post)}>
              Cadastrar
            </Radio>
            <Radio value="PUT" onClick={() => changeMethod(put)}>
              Atualizar
            </Radio>
            <Radio value="DELETE" onClick={() => changeMethod(del)}>
              Deletar
            </Radio>
          </RadioGroup>
        </>
      )}

      {control === "estoque" && (
        <>
          <RadioGroup
            className="flex gap-3 mt-6 flex-col"
            defaultValue="PUT"
            label="Selecione o método que você deseja"
          >
            <Radio value="PUT" onClick={() => changeMethod(put)}>
              Atualizar
            </Radio>
          </RadioGroup>
        </>
      )}

      {["cor", "armazenamento", "categoria"].includes(control) && (
        <RadioGroup
          className="flex gap-3 mt-6 flex-col"
          defaultValue="POST"
          label="Selecione o método que você deseja"
        >
          <Radio value="POST" onClick={() => changeMethod(post)}>
            Cadastrar
          </Radio>
          <Radio value="PUT" onClick={() => changeMethod(put)}>
            Atualizar
          </Radio>
        </RadioGroup>
      )}

      <form
        method={method}
        action={`http://localhost:3001/${control}/${data.id}`}
        //action="/public/upload/images/product"
        onSubmit={handleSubmit(onSubmit, onError)}
        encType="multipart/form-data"
        className="flex flex-col items-center gap-2 py-5 px-10"
      >
        {method === "POST" && control === "produto" && (
          <>
            <div className="flex gap-14 justify-center items-center">
              <div className="flex flex-col gap-2">
                {name}

                {inputPrice}

                <span>Foto do produto</span>

                <input type="file" name="file" />

                <label>
                  <Checkbox
                    id="black_friday"
                    type="checkbox"
                    checked={blackFridayChecked}
                    {...register("black_friday", {
                      setValueAs: (value) => value.target.checked,
                    })}
                  />
                  Black friday
                </label>

                {inputDiscount}

                {inputDescription}

                <Input
                  id="color_id"
                  type="number"
                  label="ID da COR"
                  isRequired
                  // name="color_id"
                  // value={formData.color_id}
                  // onChange={handleChange}
                  className="w-[250px]"
                  {...register("color_id", {
                    required: true,
                  })}
                />
                {errors?.color_id && (
                  <span className="text-[#a94442] text-sm">
                    Campo obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span>ID Armazenamento</span>
                <Input
                  id="storage_id"
                  type="number"
                  // name="storage_id"
                  // value={formData.storage_id}
                  // onChange={handleChange}
                  className="w-[250px]"
                  {...register("storage_id", {
                    required: true,
                  })}
                />

                <span>ID Categoria</span>
                <Input
                  id="categorie_id"
                  type="number"
                  // name="categorie_id"
                  // value={formData.categorie_id}
                  // onChange={handleChange}
                  className="w-[250px]"
                  {...register("categorie_id", {
                    required: true,
                  })}
                />

                {inputEan}

                {inputStatus}

                {inputPurchasePrice}

                {inputExpiryDate}

                {inputCreatedAt}

                {inputQuantity}
              </div>
            </div>
          </>
        )}

        {method === "PUT" && control === "produto" && (
          <div className="flex gap-14 justify-center items-center">
            <div className="flex flex-col gap-2">
              {inputId}

              {name}

              {inputPrice}

              <span>Imagem</span>
              <Button endContent={<BsFillCameraFill />}>
                <input type="file" name="file" />
              </Button>

              <label>
                <Checkbox
                  id="black_friday"
                  type="checkbox"
                  {...register("black_friday")}
                />
                Black friday
              </label>

              {inputDiscount}

              {inputDescription}

              {/* <span>ID Cor</span>
              <Input
                id="color_id"
                type="number"
                name="color_id"
                value={formData.color_id}
                onChange={handleChange}
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>ID Armazenamento</span>
              <Input
                id="storage_id"
                type="number"
                name="storage_id"
                value={formData.storage_id}
                onChange={handleChange}
                className="w-[250px]"
              />

              <span>ID Categoria</span>
              <Input
                id="categorie_id"
                type="number"
                name="categorie_id"
                value={formData.categorie_id}
                onChange={handleChange}
                className="w-[250px]"
              /> */}

              {inputEan}
            </div>
          </div>
        )}

        {method === "DELETE" && control === "produto" && <span>{inputId}</span>}

        {method === "PUT" && control === "estoque" && (
          <>
            <div className="flex gap-14">
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  label="ID do Produto"
                  isRequired
                  className="w-[250px]"
                  {...register("id", {
                    required: isIdRequired,
                  })}
                />
                {errors?.id && (
                  <span className="text-[#a94442] text-sm">
                    Campo obrigatório.
                  </span>
                )}

                {inputStatus}

                {inputPurchasePrice}
              </div>
              <div className="flex flex-col gap-2">
                {inputExpiryDate}

                <Input
                  type="text"
                  label="Data da atualização"
                  isRequired
                  className="w-[250px]"
                  {...register("updated_at", {
                    required: isUpdatedAtRequired,
                  })}
                />
                {errors?.updated_at && (
                  <span className="text-[#a94442] text-sm">
                    Campo obrigatório.
                  </span>
                )}

                {inputQuantity}
              </div>
            </div>
          </>
        )}

        {method === "PUT" && control === "armazenamento" && (
          <>
            <div className="flex flex-col gap-5">
              {inputId}

              <Input
                type="number"
                label="Capacidade de armazenamento"
                isRequired
                className="w-[250px]"
                {...register("capacity", {
                  required: isCapacityRequired,
                })}
              />
              {errors?.capacity && (
                <span className="text-[#a94442] text-sm">
                  Campo obrigatório.
                </span>
              )}
            </div>
          </>
        )}

        {method === "POST" && control === "armazenamento" && (
          <>
            <Input
              type="number"
              label="Capacidade de armazenamento"
              isRequired
              className="w-[250px]"
              {...register("capacity", {
                required: isCapacityRequired,
              })}
            />
            {errors?.capacity && (
              <span className="text-[#a94442] text-sm">Campo obrigatório.</span>
            )}
          </>
        )}

        {((method === "POST" && control === "cor") ||
          (method === "POST" && control === "categoria")) && <>{name}</>}

        {((method === "PUT" && control === "cor") ||
          (method === "PUT" && control === "categoria")) && (
          <>
            <div className="flex flex-col gap-5">
              {inputId}
              {name}
            </div>
          </>
        )}

        {errorMessage?.message && (
          <>
            <span className="text-[#a94442] text-sm">
              {errorMessage.message}
            </span>
          </>
        )}

        {successMessage?.message && (
          <>
            <span className="text-green-500 text-sm">
              {successMessage.message}
            </span>
          </>
        )}

        {control === "pedidos" ? (
          ""
        ) : (
          <>
            <button
              type="submit"
              className="bg-[#4aa4ee] hover:bg-[#3286ca] transition-all duration-700 ease-in-out p-2 text-white font-medium cursor-pointer rounded-md text-base uppercase"
            >
              ENVIAR
            </button>
          </>
        )}
      </form>
    </section>
  );
}
