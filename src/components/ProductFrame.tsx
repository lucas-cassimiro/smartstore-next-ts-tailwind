import { ProductsData } from "@/interfaces/ProductsData";

import currencyFormat from "@/helpers/currencyFormat";

import Image from "next/image";
import ButtonAddToCart from "./Client-components/ButtonAddToCart";
import HalfRating from "@/lib/HalfRating";

import { FaLocationDot } from "react-icons/fa6";

interface CardProductsProps {
  products: ProductsData[];
}

export default function ProductFrame({ products }: CardProductsProps) {
  return (
    <div className="w-full h-full flex justify-center items-center mt-40">
      {products.map((product) => (
        <section
          className="flex flex-col bg-white h-[800px] w-[800px] p-6 rounded-md gap-4"
          key={product.id}
        >
          <div className="flex justify-around">
            <Image
              className="w-[17.5rem] h-[17rem] object-contain"
              src={`http://localhost:3333/tmp/uploads/${product.image}`}
              alt="Imagem do produto"
              quality={80}
              priority={true}
              width={350}
              height={350}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex gap-2 items-center">
                {product.black_friday && (
                  <p className="py-[0.375rem] px-5 bg-[#d93a1e] text-white font-semibold rounded-[4px]">
                    -{product.discount}%
                  </p>
                )}
                {product.black_friday && (
                  <p className="bg-[#313131] text-base rounded-[4px] py-[0.375rem] px-5 text-white font-semibold">
                    Black Friday
                  </p>
                )}
                <HalfRating star={product.average_score} />
              </div>
              {product.black_friday && (
                <p className="text-[0.75rem] line-through">
                  {currencyFormat(product.price)}
                </p>
              )}
              {product.black_friday && (
                <section className="flex items-end gap-2">
                  <p className="font-semibold text-2xl">
                    {currencyFormat(
                      (product.price * (100 - product.discount)) / 100
                    )}
                  </p>
                  <span>no PIX</span>
                </section>
              )}
              <span className="text-[#878787] text-[13px]">Você economiza (-10%)</span>
              {!product.black_friday && (
                <section className="flex items-end gap-2">
                  <p className="font-semibold text-2xl gap-2">
                    {currencyFormat(product.price)}
                  </p>

                  <span>no PIX</span>
                </section>
              )}
              {!product.black_friday && (
                <p className="text-[0.9rem] text-black min-w-[7.6875rem]">
                  Ou <strong>12x</strong> de{" "}
                  <strong>{currencyFormat(product.price / 12)}</strong>
                </p>
              )}

              {product.black_friday && (
                <p className="text-[0.9rem] text-black min-w-[7.6875rem]">
                  Ou <strong>12x</strong> de{" "}
                  <strong>
                    {currencyFormat(
                      (product.price * (100 - product.discount)) / 100 / 12
                    )}
                  </strong>
                </p>
              )}
              <span className="bg-[#efefef] py-2 px-3 text-sm">
                Ou em <strong>21x</strong> de{" "}
                <strong>
                  {currencyFormat(
                    (product.price * (100 - product.discount)) / 100 / 21
                  )}{" "}
                  no cartão Bradesco
                </strong>
              </span>
              <span className="bg-[#efefef] py-2 px-3 text-sm">
                Ou em <strong>21x</strong> de{" "}
                <strong>
                  {currencyFormat(
                    (product.price * (100 - product.discount)) / 100 / 21
                  )}{" "}
                  no cartão Itaú
                </strong>
              </span>
              <span className="text-sm">Calcular o prazo de entrega</span>
              <div className="flex gap-2">
                <input
                  placeholder="Insira seu CEP"
                  className="w-32 border border-[#c0c0c0] text-center"
                />
                <button className="p-4 bg-black text-white text-sm rounded-[3px]">
                  Calcular
                </button>
              </div>
              <div className="flex items-center gap-1 cursor-pointer w-[172px]">
                <FaLocationDot />
                <span className="text-sm">Use minha localização</span>
              </div>
              <ButtonAddToCart products={product} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
