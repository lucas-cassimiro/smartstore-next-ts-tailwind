// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
// import "swiper/swiper-bundle.css";

// export default function CardsCarousel({ products }: CardsProps) {
//   const settings: SliderSettings = {
//     spaceBetween: 4,
//     speed: 1000,
//     slidesPerView: 4,
//     pagination: {
//       clickable: true,
//     },
//     breakpoints: {
//       320: {
//         spaceBetween: 1,
//         slidesPerView: 2,
//       },
//       420: {
//         spaceBetween: 1,
//         slidesPerView: 2,
//       },
//       430: {
//         spaceBetween: 1,
//         slidesPerView: 2,
//       },
//       768: {
//         spaceBetween: 1,
//         slidesPerView: 2,
//         modules: [Navigation, A11y],
//       },
//       800: {
//         spaceBetween: 50,
//         slidesPerView: 2,
//       },
//       990: {
//         pagination: false,
//         slidesPerView: 3,
//       },
//       1200: {
//         slidesPerView: 3,
//         pagination: false,
//         spaceBetween: 1,
//       },
//       1350: {
//         slidesPerView: 4,
//         spaceBetween: 10,
//         pagination: false,
//       },
//     },
//   };
//   return (
//     <Slider settings={settings}>
//       {products.map((product) => (
//         <SwiperSlide key={product.name}>
//           <CardProducts products={product} />
//         </SwiperSlide>
//       ))}
//     </Slider>
//   );
// }
