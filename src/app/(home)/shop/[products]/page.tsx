import Image from "next/image";

import Filter from "../../../../assets/filter-ordered.png";
import ButtonFilter from "@/components/Client-components/ButtonFilter";
import CardProducts from "@/components/CardProducts";

import { Select, SelectItem } from "@nextui-org/react";

import { ProductsData } from "@/interfaces/ProductsData";
import { useState } from "react";
import ButtonFilterMobile from "@/components/Client-components/ButtonFilterMobile";
import SelectCategorie from "@/components/Client-components/ButtonFilter/SelectCategorie";

async function getProducts(param: string): Promise<ProductsData[]> {
  const response = await fetch(`http://localhost:3333/products/${param}`);
  const data = await response.json();
  return data;
}

export default async function Products({
  params,
}: {
  params: { products: string };
}) {
  const categorie = params.products;

  const data: ProductsData[] = await getProducts(categorie);

  return (
    <section className="max-w-[1450px] w-full m-auto">
      <div className="p-10">
        <p className="w-full">
          <strong>Você está em: </strong>
          {categorie === "iphone" && <span>iPhones</span>}
          {categorie === "android" && <span>Androids</span>}
          {categorie === "smartwatch" && <span>Smartwatchs</span>}
          {categorie === "fone" && <span>Fone Bluetooth</span>}
          {categorie === "blackfriday" && <span>Black Friday</span>}
        </p>
        <div className="flex  ">
          <div className="mt-14 min-w-[13.9375rem] tabletgrande:hidden">
            <h3 className="mb-6 font-bold text-lg">Categorias relacionadas</h3>
            <div className="flex flex-col gap-2 mb-5">
              <p>Androids</p>
              <p>Smartwatchs</p>
              <p>Fones bluetooth</p>
              <p>Acessórios</p>
            </div>
            <div className="flex gap-2 mb-6 items-center">
              <Image src={Filter} alt="Ícone filtrar" />
              <h3 className="font-semibold text-lg">Filtrar por:</h3>
            </div>
            <ButtonFilter categorie={categorie} />
          </div>

          <div className="flex flex-col w-full ml-14 tabletgrande:ml-0">
            <ButtonFilterMobile />

            <div className="h-[2rem] flex items-center gap-3 w-full justify-end mb-20 tabletgrande:hidden">
              <SelectCategorie />
            </div>

            <div className="flex flex-wrap">
              {data.map((data) => (
                <CardProducts product={data} key={data.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
