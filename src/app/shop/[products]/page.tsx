import Image from "next/image";

import Filter from "../../../assets/filter-ordered.png";
import ButtonFilter from "@/components/Client-components/ButtonFilter";
import CardProducts from "@/components/CardProducts";

import { Select, SelectItem } from "@nextui-org/react";

export async function getProducts(param: string): Promise<any[]> {
  const response = await fetch(`http://localhost:3001/products/${param}`, {
    next: {
      revalidate: 60,
    },
  });
  
  const data = await response.json();
  return data;
}

export default async function Products({
  params,
}: {
  params: { products: string };
}) {
  const categorie = params.products;
  const data = await getProducts(categorie);

  return (
    <div>
      <p className="w-full py-8 px-[6.25rem]">
        <strong>Você está em: </strong>
        {categorie}
      </p>
      <div className="flex py-0 px-[6.25rem]">
        <div className="mt-14 min-w-[13.9375rem]">
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
          <ButtonFilter />
        </div>

        <div className="flex flex-col w-full">
          <div className="h-[2rem] flex items-center gap-3 w-full justify-end">
            <label htmlFor="ordenar" className="text-base font-semibold">
              Ordenar por:
            </label>
            <select
              name="ordenar"
              id="ordenar"
              //   onChange={(e) => setOrder(e.target.value)}
              className="w-[15.25rem] h-[2.375rem] cursor-pointer text-base font-normal text-[#313131] py-0 px-[0.625rem] border-[rgba(158, 158, 158, 0.87)] border-2 rounded-lg"
            >
              <option value="">Selecione uma categoria</option>
              <option value="procurados">Mais procurados</option>
              <option value="recentes">Mais recentes</option>
              <option value="vendidos">Mais vendidos</option>
            </select>
          </div>
          <div className="mt-20 flex flex-wrap gap-20 justify-center">
            {data.map((data) => (
              <CardProducts products={data} key={data.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
