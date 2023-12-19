import Image from "next/image";

import currencyFormat from "@/helpers/currencyFormat";

import ButtonAddToCart from "./Client-components/ButtonAddToCart";
import { ProductsData } from "@/interfaces/ProductsData";
import Link from "next/link";

import HalfRating from "@/lib/HalfRating";

interface CardProductsProps {
  product: ProductsData;
}

export default function CardProducts({ product }: CardProductsProps) {
  return (
    <div>
      {/* className="flex max-w-full w-[1092px] flex-wrap" */}
      <Link
        href={`/produtos/${product.id}`}
        className="flex flex-col flex-2 m-[1rem] "
      >
        <Image
          className="w-[9.375rem] h-[11.875rem] object-contain"
          src={`http://localhost:3333/tmp/uploads/${product.image}`}
          alt="Imagem do produto"
          quality={100}
          priority={true}
          width={250}
          height={250}
        />

        <div className="">
          {product.black_friday && (
            <p className="py-[0.375rem] px-2 bg-[#d93a1e] text-white font-semibold rounded-[4px] float-left mr-[6px]">
              -{product.discount}%
            </p>
          )}
          {product.black_friday && (
            <p className="bg-[#313131] text-base rounded-[4px] py-[0.375rem] px-2 text-white font-semibold float-left mr-[6px]">
              Black Friday
            </p>
          )}
        </div>
        <h4 className="text-[0.875rem] font-normal">{product.name}</h4>
        <HalfRating star={product.average_score} />

        {product.black_friday && (
          <p className="text-[0.75rem] line-through">
            {currencyFormat(product.price)}
          </p>
        )}

        {product.black_friday && (
          <section className="">
            <p className="font-semibold text-base">
              {currencyFormat((product.price * (100 - product.discount)) / 100)}
            </p>

            {/* <ButtonAddToCart products={products} /> */}
          </section>
        )}

        {!product.black_friday && (
          <section className="">
            <p className="font-semibold text-base">
              {currencyFormat(product.price)}
            </p>

            {/* <ButtonAddToCart products={products} /> */}
          </section>
        )}

        {!product.black_friday && (
          <p className="text-[0.75rem] text-black">
            Ou 12x de {currencyFormat(product.price / 12)}
          </p>
        )}

        {product.black_friday && (
          <p className="text-[0.75rem] text-black">
            Ou 12x de{" "}
            {currencyFormat(
              (product.price * (100 - product.discount)) / 100 / 12
            )}
          </p>
        )}
      </Link>
    </div>
  );
}
