"use client";

import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import Slider, { SliderSettings } from "./Slider";
import NewsProducts from "@/components/NewsProducts";

import { ProductsData } from "@/interfaces/ProductsData";

import "swiper/swiper-bundle.css";

async function getNewsProducts() {
  const request = await fetch("http://localhost:3333/news/");
  return await request.json();
}

export default function NewsCarousel() {
  const [data, setData] = useState<ProductsData[]>([]);

  const settings: SliderSettings = {
    spaceBetween: 50,
    slidesPerView: 3,
    speed: 1000,
    pagination: { clickable: true },
    breakpoints: {
      320: {
        spaceBetween: 15,
        slidesPerView: 2,
      },
      420: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      421: {
        spaceBetween: 40,
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 2,
        spaceBetween: 41,
      },
      990: {
        pagination: true,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
        pagination: false,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 41,
        pagination: false,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 50,
        pagination: true,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getNewsProducts();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <Slider settings={settings}>
      {data.map((data) => (
        <SwiperSlide key={data.id}>
          <NewsProducts product={data} />
        </SwiperSlide>
      ))}
    </Slider>
  );
}
