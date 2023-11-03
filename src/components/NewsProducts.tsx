import localFont from "next/font/local";
import { Inter } from "next/font/google";

import Image from "next/image";

import { news } from "@/data/NewsProducts";

import currencyFormat from "@/helpers/currencyFormat";

const inter = Inter({ subsets: ["latin"] });

const jejugothic = localFont({
  src: [
    {
      path: "../fonts/jejugothic-regular.ttf",
      weight: "400 900",
      style: "regular",
    },
  ],
});

export default function NewsProducts({ product }: any) {
  return (
    <>
      <div
        style={jejugothic.style}
        className="flex flex-col items-center text-white h-[28.125rem] cursor-pointer  bg-black"
      >
        <div className="flex items-center justify-center w-[25rem] h-[21.875rem]">
          <Image
            className="w-[17.5rem] h-[15.625rem] object-contain"
            src={product.img}
            alt="aaaa"
          />
          {/* <span className="text-black">Imagem do produto</span> */}
        </div>
        <h2 className="text-[1.875rem] font-normal text-white">
          {product.name}
        </h2>
        <p className={`${inter.className} text-xl font-light text-white`}>
          A partir de{" "}
          <span className="text-[#93c1fd]">{currencyFormat(product.price)}</span>
        </p>
      </div>
    </>
  );
}
