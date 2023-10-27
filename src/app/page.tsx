import CarouselImages from "@/lib/CarouselImages";
import Image from "next/image";

import localFont from "next/font/local";

import Blackfriday from "../assets/banner-blackfriday.png";
import Whatsapp from "../assets/banner-whatsapp.png";
import NewsCarousel from "@/lib/NewsCarousel";

const jejugothic = localFont({ src: "../fonts/jejugothic-regular.ttf" });

export default function Home() {
  return (
    <>
      <CarouselImages />
      <span
        className="flex justify-center text-[2.1875rem] font-normal my-4"
        style={jejugothic.style}
      >
        Novidades
      </span>
      <NewsCarousel />
      <span
        className="flex justify-center text-[2.1875rem] font-normal my-4"
        style={jejugothic.style}
      >
        Black Friday
      </span>
      <Image src={Blackfriday} alt="Banner Black Friday" priority={true} />
      <Image src={Whatsapp} alt="Banner WhatsApp" priority={true} />
    </>
  );
}
