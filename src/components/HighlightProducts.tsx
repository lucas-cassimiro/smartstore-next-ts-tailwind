import localFont from "next/font/local";
import { Inter } from "next/font/google";

import Image from "next/image";

import currencyFormat from "@/helpers/currencyFormat";

import Link from "next/link";

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

export default function HighlightProducts({ product }: any) {
  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="flex flex-col flex-2 m-[1rem]"
    >
      <div
        style={jejugothic.style}
        className="flex flex-col items-center text-white h-[28.125rem] cursor-pointer bg-black tabletgrande:h-[23rem] celularmedio:h-[18rem]"
      >
        <div className="flex items-center justify-center h-[21.875rem] tabletgrande:h-[16rem] celularmedio:h-[14rem]">
          <Image
            className="w-[16.5rem] h-[14.625rem] celularmedio:w-[6rem] celularmedio:h-[6rem] desktopequeno:w-[12.5rem] desktopequeno:h-[10.625rem] tabletgrande:w-[10rem] tabletgrande:h-[8rem] object-contain"
            src={`https://smartshop-api-foy4.onrender.com/tmp/uploads/${product.image}`}
            alt="Imagem do produto"
            quality={80}
            priority={true}
            width={350}
            height={350}
          />
        </div>
        <h2 className="text-[1.875rem] font-normal text-white tabletgrande:text-[1.5rem] desktopequeno:text-[1.6rem] celularmedio:text-sm celularpequeno:text-[13px]">
          {product.name}
        </h2>
        <p
          className={`${inter.className} text-xl font-light text-white desktopequeno:text-lg celulargrande:text-base celularmedio:text-xs celularpequeno:text-[11px]`}
        >
          A partir de{" "}
          <span className="text-[#93c1fd]">
            {currencyFormat(product.price)}
          </span>
        </p>
      </div>
    </Link>
  );
}
