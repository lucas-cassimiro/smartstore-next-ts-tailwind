import React, { ReactNode } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

export type SliderSettings = SwiperProps;

export type SliderProps = {
  children: ReactNode;
  settings: SliderSettings;
};

export default function Slider({ settings, children }: SliderProps) {
  return (
    <Swiper modules={[Navigation, Pagination, A11y]} {...settings}>
      {children}
      {/* <SliderButton /> */}
    </Swiper>
  );
}
