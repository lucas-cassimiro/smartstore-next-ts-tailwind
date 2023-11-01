import Image from "next/image";

import currencyFormat from "@/helpers/currencyFormat";

import ButtonAddToCart from "./Client-components/ButtonAddToCart";
import { ProductsData } from "@/interfaces/ProductsData";

interface CardProductsProps {
  products: ProductsData
}

export default function CardProducts({ products }: CardProductsProps) {
  return (
    <div className="flex flex-col items-center">
      <Image src={products.image} alt={products.name} />
      <div className="flex flex-col w-[90%] ml-4 g-[0.625rem]">
        <div className="flex gap-2 min-w-[14rem]">
          {products.black_friday && (
            <p className="py-[0.375rem] px-5 bg-[#d93a1e] text-white font-semibold rounded-[4px]">
              -{products.discount}%
            </p>
          )}
          {products.black_friday && (
            <p className="bg-[#313131] text-base rounded-[4px] py-[0.375rem] px-5 text-white font-semibold">
              Black Friday
            </p>
          )}
        </div>
        <h4 className="text-[0.875rem] font-normal min-w-[8.25rem]">
          {products.name}
        </h4>
        {/* <HalfRating star={products.average_score!} /> */}

        {products.black_friday && (
          <p className="text-[0.75rem] line-through">
            {currencyFormat(products.price)}
          </p>
        )}

        {products.black_friday && (
          <section className="flex justify-between items-center w-[12.5rem]">
            <p className="font-semibold text-base">
              {currencyFormat(
                (products.price * (100 - products.discount!)) / 100
              )}
            </p>

            <ButtonAddToCart products={products} />
          </section>
        )}

        {!products.black_friday && (
          <section className="flex justify-between items-center w-[12.5rem]">
            <p className="font-semibold text-base">
              {currencyFormat(products.price)}
            </p>

            <ButtonAddToCart products={products} />
          </section>
        )}

        {!products.black_friday && (
          <p className="text-[0.75rem] text-black min-w-[7.6875rem]">
            Ou 12x de {currencyFormat(products.price / 12)}
          </p>
        )}

        {products.black_friday && (
          <p className="text-[0.75rem] text-black min-w-[7.6875rem]">
            Ou 12x de{" "}
            {currencyFormat(
              (products.price * (100 - products.discount!)) / 100 / 12
            )}
          </p>
        )}
      </div>
    </div>
  );
}
