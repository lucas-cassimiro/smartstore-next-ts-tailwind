import React, { ReactNode } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, A11y } from "swiper/modules";

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
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      {...settings}
      className="swiper carousel2"
    >
      {children}
      <SliderButton />
    </Swiper>
  );
}
