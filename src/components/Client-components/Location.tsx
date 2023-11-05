"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { FaTimes } from "react-icons/fa";

import IconLocation from "../../assets/icon-location.png";

import localFont from "next/font/local";
import useSWR from "swr";

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

export default function Location() {
  const [location, setLocation] = useState<boolean>(false);
  const showLocation = () => setLocation(!location);

  const [cep, setCep] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const URL =
    cep.length >= 8
      ? `http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`
      : null;
  const { data } = useSWR(URL, fetcher);

  console.log(data);

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
        } flex flex-row-reverse h-screen overflow-hidden transition-colors duration-300 ease-in-out fixed z-20 top-0 right-0`}
        onClick={showLocation}
      >
        <div
          className={`${
            location ? "w-[400px] h-full" : ""
          } w-0 transition-all duration-1000 ease-in-out py-6 bg-white overflow-hidden right-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 min-w-[400px]">
            <div className="flex justify-between items-center mb-10">
              <p className="text-[1.125rem] font-extrabold">
                Qual a sua localização
              </p>

              <FaTimes
                onClick={showLocation}
                size="1.5rem"
                className="cursor-pointer"
              />
            </div>

            <div className="mt-10 flex gap-2 min-w-full">
              <input
                id="cep"
                name="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Insira um CEP"
                className="min-w-2/3 border-[#e5e5e5] text-center border-2"
              />

              <button
                // onClick={() => handleCepChange}
                style={freeSans.style}
                className={` ${freeSans.className} bg-[#4aa4ee] cursor-pointer rounded-[0.1875rem] h-[3.0625rem] py-[0.625rem] px-[1.75rem] font-medium text-xl min-w-1/3 hover:bg-[#3286ca] text-white`}
              >
                Buscar
              </button>
            </div>

            <ul className="flex flex-col mt-10 w-full border-2 p-4 min-w-[302px]">
              {/* <li>
            <span>{cep}</span>
          </li> */}
              <li>
                <span>{data?.logradouro}</span>
              </li>
              <li>
                <span>
                  {data?.cidade}, {data?.uf}
                </span>
              </li>
              <li>
                <span>{data?.bairro}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
