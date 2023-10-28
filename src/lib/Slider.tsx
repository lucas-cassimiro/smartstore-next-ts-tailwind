import React, { ReactNode } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.css";
import SliderButton from "./SliderButton";

export type SliderSettings = SwiperProps;

export type SliderProps = {
  children: ReactNode;
  settings: SliderSettings;
};

export default function Slider({ settings, children }: SliderProps) {
  return (
    <Swiper {...settings}>
      {children}
      <SliderButton />
    </Swiper>
  );
}
