"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

import Image from "next/image";

import IPhone from "../assets/banner-main-iphone.png";
import Androids from "../assets/banner-main-samsung.png";
import Airpods from "../assets/banner-main-airpods.png";
import AppleWatch from "../assets/banner-main-apple-watch.png";

export default function CarouselImages() {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={0}
      speed={1700}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <Image src={IPhone} alt="Imagem 1" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Androids} alt="Imagem 2" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Airpods} alt="Imagem 3" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={AppleWatch} alt="Imagem 4" className="w-full h-auto" />
      </SwiperSlide>
    </Swiper>
  );
}
