"use client";

import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import Slider, { SliderSettings } from "./Slider";

import CardProducts from "@/components/CardProducts";

import { ProductsData } from "@/interfaces/ProductsData";

import "swiper/swiper-bundle.css";

async function getBlackFridayOfferProducts() {
  const request = await fetch("http://localhost:3333/blackfriday");
  return await request.json();
}

export default function BlackFridayCarousel() {
  const [data, setData] = useState<ProductsData[]>([]);

  const settings: SliderSettings = {
    spaceBetween: 4,
    speed: 1000,
    slidesPerView: 4,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 1,
        slidesPerView: 2,
      },
      420: {
        spaceBetween: 1,
        slidesPerView: 2,
      },
      430: {
        spaceBetween: 1,
        slidesPerView: 2,
      },
      768: {
        spaceBetween: 1,
        slidesPerView: 2,
        modules: [Navigation, A11y],
      },
      800: {
        spaceBetween: 50,
        slidesPerView: 3,
      },
      990: {
        pagination: false,
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
        pagination: false,
        spaceBetween: 10,
      },
      1350: {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: false,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getBlackFridayOfferProducts();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <Slider settings={settings}>
      {data.map((data) => (
        <SwiperSlide key={data.name}>
          <CardProducts product={data} />
        </SwiperSlide>
      ))}
    </Slider>
  );
}
