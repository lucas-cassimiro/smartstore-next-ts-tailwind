"use client";

import { useSwiper } from "swiper/react";

import Image from "next/image";

import ArrowLeft from "../assets/arrow-left.png";

export default function SliderButton() {
  const swiper = useSwiper();

  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        className="tabletgrande:hidden"
      >
        <Image
          src={ArrowLeft}
          alt="Seta de voltar"
          className="swiper-button-prev"
        />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="tabletgrande:hidden"
      >
        <Image
          src={ArrowLeft}
          alt="Seta de avançar"
          className="swiper-button-next rotate-180"
          onClick={() => swiper.slideNext()}
        />
      </button>
    </>
  );
}
