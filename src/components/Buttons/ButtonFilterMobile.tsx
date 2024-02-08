"use client";

import { ChangeEvent, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";

import { RadioGroup, Radio, Checkbox } from "@nextui-org/react";

interface ButtonFilterMobileProps {
  categorie: string;
  handleChangePrice: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeStorage: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonFilterMobile({
  categorie,
  handleChangePrice,
  handleChangeStorage,
  handleChangeColor,
}: ButtonFilterMobileProps) {
  const [filter, setFilter] = useState<boolean>(false);

  const [price, setPrice] = useState<boolean>(false);
  const [armazenamento, setArmazenamento] = useState<boolean>(false);
  const [cor, setCor] = useState<boolean>(false);
  const [order, setOrder] = useState<boolean>(false);

  const showFilterPrice = () => setPrice(!price);
  const showFilterArmazenamento = () => setArmazenamento(!armazenamento);
  const showFilterCor = () => setCor(!cor);
  const showFilterOrder = () => setOrder(!order);

  const showFilterOpen = () => setFilter(!filter);

  return (
    <>
      <button
        className="hidden tabletgrande:flex rounded-sm border-[1px]  border-[#c0c0c0] py-2 px-5 h-[37.6px] w-[125.6px] text-xs"
        onClick={showFilterOpen}
      >
        Filtrar / ordenar
      </button>

      <div
        className={`${
          filter ? "w-full opacity-100 visible bg-black/60" : ""
        } flex flex-row-reverse h-screen w-0 overflow-hidden opacity-0 transition-colors duration-300 ease-in-out fixed z-20 top-0 bottom-0 left-0`}
        onClick={showFilterOpen}
      >
        <div
          className={`${
            filter ? "w-[300px] h-full" : ""
          } bg-white flex flex-col w-0 p-6 transition-all duration-500 ease-out overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-10 min-w-[15.75rem]">
            <h3 className="text-lg font-bold">Filtrar / ordenar</h3>
            <FaTimes size="1.5rem" onClick={showFilterOpen} />
          </div>
          <div
            className="flex justify-between mb-10 items-center min-w-[15.75rem]"
            onClick={showFilterOrder}
          >
            <div className="text-[14px] text-[#878787]">Ordenar por</div>
            <span>Selecione uma opção</span>
            <GrFormNext size="1.5rem" />
          </div>

          <div
            className={`${
              order ? "w-[300px]" : ""
            } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 right-0`}
          >
            <div className="flex flex-col px-6">
              <div className="flex gap-2 items-center mb-8">
                <IoIosArrowBack size="1.5rem" onClick={showFilterOrder} />
                <h4 className="font-bold text-lg">Ordenar por</h4>
              </div>
              <RadioGroup color="primary">
                <Radio value="">Selecione uma opção</Radio>
                <Radio value="procurados">Mais procurados</Radio>
                <Radio value="recentes">Mais recentes</Radio>
                <Radio value="vendidos">Mais vendidos</Radio>
              </RadioGroup>
            </div>
          </div>

          <div className="flex flex-col gap-5 mb-5">
            <div
              className="flex justify-between items-center min-w-[15.75rem]"
              onClick={showFilterPrice}
            >
              <span className="">Preço</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                price ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 right-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack size="1.5rem" onClick={showFilterPrice} />
                  <h4 className="font-bold text-lg">Preço</h4>
                </div>

                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="0-1000"
                    onChange={handleChangePrice}
                  />
                  R$ 0 - R$1000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="1001 - 2000"
                    onChange={handleChangePrice}
                  />
                  R$ 1.001 - R$ 2.000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="2001 - 3000"
                    onChange={handleChangePrice}
                  />
                  R$ 2.001 - R$ 3.000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="3001-4000"
                    onChange={handleChangePrice}
                  />
                  R$ 3.001 - R$ 4.000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="4001-5000"
                    onChange={handleChangePrice}
                  />
                  R$ 4.001 - R$ 5.000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="5001-6000"
                    onChange={handleChangePrice}
                  />
                  R$ 5.001 - R$ 6.000
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="preco"
                    value="6001-7000"
                    onChange={handleChangePrice}
                    className="mb-3"
                  />
                  R$ 6.001 - R$ 7.000
                </label>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div
              className="flex justify-between items-center min-w-[15.75rem]"
              onClick={showFilterArmazenamento}
            >
              <span className="">Armazenamento</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                armazenamento ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 right-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack
                    size="1.5rem"
                    onClick={showFilterArmazenamento}
                  />
                  <h4 className="font-bold text-lg">Armazenamento</h4>
                </div>

                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="armazenamento"
                    value="64"
                    onChange={handleChangeStorage}
                  />
                  64 GB
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="armazenamento"
                    value="128"
                    onChange={handleChangeStorage}
                  />
                  128 GB
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="armazenamento"
                    value="256"
                    onChange={handleChangeStorage}
                  />
                  256 GB
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="armazenamento"
                    value="512"
                    onChange={handleChangeStorage}
                  />
                  512 GB
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="armazenamento"
                    value="1024"
                    onChange={handleChangeStorage}
                    className="mb-3"
                  />
                  1 TB
                </label>
              </div>
            </div>
          </div>

          <div>
            <div
              className="flex justify-between items-center min-w-[15.75rem]"
              onClick={showFilterCor}
            >
              <span className="">Cor</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                cor ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 right-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack size="1.5rem" onClick={showFilterCor} />
                  <h4 className="font-bold text-lg">Cor</h4>
                </div>

                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="cor"
                    value="azul"
                    onChange={handleChangeColor}
                  />
                  Azul
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="cor"
                    value="branco"
                    onChange={handleChangeColor}
                  />
                  Branco
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="cor"
                    value="preto"
                    onChange={handleChangeColor}
                  />
                  Preto
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="cor"
                    value="roxo"
                    onChange={handleChangeColor}
                  />
                  Roxo
                </label>
                <label className="cursor-pointer">
                  <Checkbox
                    type="checkbox"
                    name="cor"
                    value="dourado"
                    onChange={handleChangeColor}
                    className="mb-5"
                  />
                  Dourado
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
