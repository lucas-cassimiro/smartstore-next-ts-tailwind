import Image from "next/image";

import currencyFormat from "@/helpers/currencyFormat";
import { ProductsData } from "@/interfaces/ProductsData";
import Link from "next/link";

import HalfRating from "@/lib/HalfRating";

interface CardProductsProps {
  product: ProductsData;
  imageSize: string;
}

export default function CardProducts({
  product,
  imageSize,
}: CardProductsProps) {
  return (
    <div className="flex justify-center ml-[1.6rem] mb-12">
      <Link href={`/products/${product.id}`} className="flex flex-col gap-2">
        <Image
          className={`${
            imageSize === "large"
              ? "w-[8.375rem] h-[10.875rem] tabletgrande:w-[7.375rem] tabletgrande:h-[9.875rem] celularmedio:w-[6.375rem] celularmedio:h-[8.875rem]"
              : "w-[6.375rem] h-[8.875rem] celularmedio:w-[4rem] celularmedio:h-[7rem]"
          } object-contain`}
          src={`https://smartshop-api-foy4.onrender.com/tmp/uploads/${product.image}`}
          alt="Imagem do produto"
          quality={100}
          priority={true}
          width={250}
          height={250}
        />

        <div className="">
          {product.black_friday && (
            <p className="py-[0.375rem] px-2 bg-[#d93a1e] text-white font-semibold rounded-[4px] float-left mr-[6px] celularpequeno:text-xs">
              -{product.discount}%
            </p>
          )}
          {product.black_friday && (
            <p className="bg-[#313131] text-base rounded-[4px] py-[0.375rem] px-2 text-white font-semibold float-left mr-[6px] celularpequeno:text-xs">
              Black Friday
            </p>
          )}
        </div>
        <h4 className="text-sm font-normal">{product.name}</h4>
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
          </section>
        )}

        {!product.black_friday && (
          <section className="">
            <p className="font-semibold text-base">
              {currencyFormat(product.price)}
            </p>
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
