"use client";

import { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";

import { RadioGroup, Radio } from "@nextui-org/react";

import ButtonFilterPrice from "./ButtonFilter/ButtonFilterPrice";
import ButtonFilterCapacity from "./ButtonFilter/ButtonFilterCapacity";
import ButtonFilterColor from "./ButtonFilter/ButtonFilterColor";

export default function ButtonFilterMobile() {
  const [filter, setFilter] = useState(false);

  const [price, setPrice] = useState(false);
  const [armazenamento, setArmazenamento] = useState(false);
  const [cor, setCor] = useState(false);
  const [order, setOrder] = useState(false);

  const setFilterPrice = () => setPrice(!price);
  const setFilterArmazenamento = () => setArmazenamento(!armazenamento);
  const setFilterCor = () => setCor(!cor);
  const setFilterOrder = () => setOrder(!order);

  const setFilterOpen = () => setFilter(!filter);

  return (
    <>
      <button
        className="hidden  tabletgrande:flex rounded-sm border-2 w-40 py-2 px-[16px] border-black text-center "
        onClick={setFilterOpen}
      >
        Filtrar / ordenar
      </button>

      <div
        className={`${
          filter ? "w-[300px]" : ""
        } py-4 flex flex-col h-screen w-0 overflow-hidden bg-white transition-width duration-700 ease-in fixed z-20 top-0 bottom-0 left-0`}
      >
        <div className="px-6">
          <div className="flex items-center justify-between mb-10 min-w-[15.75rem]">
            <h3 className="text-lg font-bold">Filtrar / ordenar</h3>
            <FaTimes size="1.5rem" onClick={setFilterOpen} />
          </div>
          <div
            className="flex justify-between mb-10 items-center min-w-[15.75rem]"
            onClick={setFilterOrder}
          >
            <div className="text-[14px] text-[#878787]">Ordenar por</div>
            <span>Selecione uma opção</span>
            <GrFormNext size="1.5rem" />
          </div>

          <div
            className={`${
              order ? "w-[300px]" : ""
            } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 left-0`}
          >
            <div className="flex flex-col px-6">
              <div className="flex gap-2 items-center mb-8">
                <IoIosArrowBack size="1.5rem" onClick={setFilterOrder} />
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
              onClick={setFilterPrice}
            >
              <span className="">Preço</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                price ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 left-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack size="1.5rem" onClick={setFilterPrice} />
                  <h4 className="font-bold text-lg">Preço</h4>
                </div>

                <ButtonFilterPrice />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div
              className="flex justify-between items-center min-w-[15.75rem]"
              onClick={setFilterArmazenamento}
            >
              <span className="">Armazenamento</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                armazenamento ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 left-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack
                    size="1.5rem"
                    onClick={setFilterArmazenamento}
                  />
                  <h4 className="font-bold text-lg">Armazenamento</h4>
                </div>

                <ButtonFilterCapacity />
              </div>
            </div>
          </div>

          <div>
            <div
              className="flex justify-between items-center min-w-[15.75rem]"
              onClick={setFilterCor}
            >
              <span className="">Cor</span>
              <GrFormNext size="1.5rem" />
            </div>

            <div
              className={`${
                cor ? "w-[300px]" : ""
              } py-4 h-screen w-0 overflow-hidden bg-white fixed z-20 top-0 bottom-0 left-0`}
            >
              <div className="flex flex-col px-6">
                <div className="flex gap-2 items-center mb-8">
                  <IoIosArrowBack size="1.5rem" onClick={setFilterCor} />
                  <h4 className="font-bold text-lg">Cor</h4>
                </div>

                <ButtonFilterColor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
