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

      <aside
        className={`w-0 ${
          location
            ? "flex flex-col w-[350px] h-screen top-0 left-0 bottom-0 fixed bg-[#ffffff] z-[9999] opacity-[100] p-12 transition-all duration-500"
            : "w-0"
        }`}
      >
        <div
          style={freeSans.style}
          className={`${location ? "w-64" : "hidden w-0"} ${
            freeSans.className
          }`}
        >
          <div className="flex justify-between">
            <p className="text-[1.125rem] font-extrabold">
              Qual a sua localização
            </p>
            <button>
              <FaTimes onClick={showLocation} size="1.5rem" />
            </button>
          </div>

          <div className="mt-10 flex justify-between">
            <input
              id="cep"
              name="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Insira um CEP"
              className="w-36 border-[#e5e5e5] text-center border-4"
            />

            <button
              // onClick={() => handleCepChange}
              style={freeSans.style}
              className={`text-base ${freeSans.className} bg-[#3877c9] cursor-pointer rounded-[0.1875rem] h-[3.0625rem] py-[0.625rem] px-[1.75rem] font-extrabold`}
            >
              Buscar
            </button>
          </div>
        </div>

        <ul
          className={`${location ? "flex flex-col mt-10 w-60" : "hidden w-0"} border-4 p-4`}
        >
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
      </aside>
    </>
  );
}
