import CarouselImages from "@/lib/CarouselImages";
import Image from "next/image";

import localFont from "next/font/local";

import Blackfriday from "../../assets/banner-blackfriday.png";
import Whatsapp from "../../assets/banner-whatsapp.png";
import NewsCarousel from "@/lib/NewsCarousel";

const jejugothic = localFont({ src: "../../fonts/jejugothic-regular.ttf" });

import { news } from "@/data/NewsProducts";

export default function Home() {
  return (
    <>
      <CarouselImages />
      <div className="w-full">
        <span
          className="flex justify-center text-[2.1875rem] font-normal my-4 tablet:text-[1.675rem] celular:text-[1.2rem]"
          style={jejugothic.style}
        >
          Novidades
        </span>
        <NewsCarousel products={news} />
        <span
          className="flex justify-center text-[2.1875rem] font-normal my-4 tablet:text-[1.675rem] celular:text-[1.2rem]"
          style={jejugothic.style}
        >
          Black Friday
        </span>
        <div className="flex flex-col gap-8 justify-center w-full items-center">
          <Image src={Blackfriday} alt="Banner Black Friday" priority={true} />
          <Image src={Whatsapp} alt="Banner WhatsApp" priority={true} />
        </div>
      </div>
    </>
  );
}
