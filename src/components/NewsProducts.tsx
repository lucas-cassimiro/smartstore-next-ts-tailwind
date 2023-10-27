import localFont from "next/font/local";
import { Inter } from "next/font/google";

import Image from "next/image";

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

export default function NewsProducts() {
  return (
    <div
      style={jejugothic.style}
      className="flex flex-col items-center text-white h-[28.125rem] cursor-pointer mr-[0.625rem]"
    >
      <div className="flex items-center justify-center w-[25rem] h-[21.875rem]">
        {/* <Image className="w-[17.5rem] h-[15.625rem] object-contain"/> */}
        <span className="text-black">Imagem do produto</span>
      </div>
      <h2 className="text-[1.875rem] font-normal text-black">
        Nome do produto
      </h2>
      <p className={`${inter.className} text-xl font-light text-black`}>
        A partir de <span className="text-[#93c1fd]">~ preço do produto ~</span>
      </p>
    </div>
  );
}
