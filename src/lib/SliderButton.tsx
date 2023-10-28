"use client";

import { useSwiper } from "swiper/react";

import Image from "next/image";

import ArrowLeft from "../assets/arrow-left.png";
import ArrowRight from "../assets/arrow-right.png";

export default function SliderButton() {
  const swiper = useSwiper();

  return (
    <>
      <button onClick={() => swiper.slidePrev()}>
        <Image
          src={ArrowLeft}
          alt="Seta de voltar"
          className="swiper-button-prev rotate-180"
        />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <Image
          src={ArrowRight}
          alt="Seta de avançar"
          className="swiper-button-next scale-x-[-1]"
          onClick={() => swiper.slideNext()}
        />
      </button>
    </>
  );
}
