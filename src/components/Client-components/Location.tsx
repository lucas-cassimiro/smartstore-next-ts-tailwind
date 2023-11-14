"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { FaTimes } from "react-icons/fa";

import IconLocation from "../../assets/icon-location.png";

import localFont from "next/font/local";

import currencyFormat from "@/helpers/currencyFormat";
import { Button, Input } from "@nextui-org/react";

export interface CepData {
  bairro: string;
  cep: number;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  price: number;
}

const localStorageKey = "@SmartStore:location";

const freeSans = localFont({
  src: [
    {
      path: "../../fonts/free-sans.ttf",
      weight: "400 500 600 700 800 900",
      style: "normal",
    },
  ],
});

async function getAddress(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
}

export default function Location() {
  const [location, setLocation] = useState<boolean>(false);
  const showLocation = () => setLocation(!location);

  const [inputCep, setInputCep] = useState<string>("");
  const [cep, setCep] = useState<CepData>({} as CepData);

  const [error, setError] = useState<boolean>(false);

  async function handleCepChange(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    try {
      const cepInformado = inputCep;
      const cepRecebido = await getAddress(cepInformado);
      setCep(cepRecebido);
      setInputCep("");
      setError(false);
    } catch (error) {
      setInputCep("");
      setError(true);
    }
  }

  if (cep.uf === "SP" || cep.uf === "RJ") {
    cep.price = 25;
  }

  useEffect(() => {
    if (Object.keys(cep).length === 0) return;
    localStorage.setItem(localStorageKey, JSON.stringify(cep));
  }, [cep]);

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem(localStorageKey);

    const parsedCart =
      cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];

    setCep(parsedCart);
  }, []);

  return (
    <>
      <Image src={IconLocation} alt="Icone de localização" />

      <a onClick={showLocation} className="text-[#A0A0A0] cursor-pointer">
        Selecione uma localização
      </a>

      <div
        className={`${
          location ? "w-full opacity-100 visible bg-black/60" : "w-0 opacity-0"
        } flex flex-row-reverse h-full overflow-hidden transition-colors duration-300 ease-in-out fixed z-20 top-0 right-0`}
        onClick={showLocation}
      >
        <div
          className={`${
            location ? "w-[400px] h-full tablet:w-[300px]" : ""
          } w-0 transition-all duration-1000 ease-in-out py-6 bg-white overflow-hidden right-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 min-w-[400px] tablet:min-w-[300px]">
            <div className="flex justify-between items-center mb-10">
              <p className="text-[1.125rem] font-semibold">
                Qual a sua localização
              </p>

              <FaTimes
                onClick={showLocation}
                size="1.5rem"
                className="cursor-pointer"
              />
            </div>
            <form
              className={`${freeSans.className} mt-10 flex gap-2 min-w-full justify-center`}
              style={freeSans.style}
              onSubmit={handleCepChange}
              id="cep"
              name="cep"
            >
              <Input
                id="cep"
                name="cep"
                value={inputCep}
                onChange={(e) => setInputCep(e.target.value)}
                style={freeSans.style}
                className={`${freeSans.className}`}
                label="Insira um CEP"
              />

              {/* <button
                onClick={() => handleCepChange}
                style={freeSans.style}
                className={` ${freeSans.className} bg-[#4aa4ee] cursor-pointer rounded-[0.1875rem] h-[3.0625rem] py-[0.625rem] px-[1.75rem] font-medium text-xl hover:bg-[#3286ca] text-white tablet:text-lg`}
              >
                Buscar
              </button> */}

              <Button
                onClick={handleCepChange}
                style={freeSans.style}
                className={` ${freeSans.className} h-[3.6rem] w-[150px]`}
                color="primary"
              >
                Buscar
              </Button>
            </form>

            {Object.keys(cep).length > 0 && !error ? (
              <div className="flex flex-col items-center mt-8">
                <p
                  style={freeSans.style}
                  className={`${freeSans.className} mb-5 text-lg font-bold`}
                >
                  Seu endereço
                </p>
                <ul
                  style={freeSans.style}
                  className={`${freeSans.className} text-base`}
                >
                  <li>
                    <p>{cep.logradouro}</p>
                  </li>
                  <li>
                    <p>
                      {cep.bairro} - {cep.localidade}/{cep.uf}
                    </p>
                  </li>
                  <li>
                    <p>CEP - {cep.cep}</p>
                  </li>
                  <li>
                    <p>DDD - 0{cep.ddd}</p>
                  </li>
                  {cep.uf === "SP" || cep.uf === "RJ" ? (
                    <li className="mt-5">
                      <p>
                        O frete para {cep.uf} é{" "}
                        <strong>{currencyFormat(cep?.price)}</strong>
                      </p>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
            {error && (
              <span className="text-[#a94442]">
                Ocorreu um problema ao tentar localizar o CEP. Tente novamente
                mais tarde.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
