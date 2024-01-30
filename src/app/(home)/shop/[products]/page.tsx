"use client";

import Image from "next/image";

import Filter from "../../../../assets/filter-ordered.png";

import CardProducts from "@/components/CardProducts";

import { Checkbox, CheckboxGroup, Spinner } from "@nextui-org/react";

import { ProductsData } from "@/interfaces/ProductsData";

import ButtonFilterMobile from "@/components/Client-components/ButtonFilterMobile";
import SelectCategorie from "@/components/Client-components/ButtonFilter/SelectCategorie";
import useFilterProducts from "@/hooks/useFilterProducts";

import { CiSearch } from "react-icons/ci";
import BreadcrumbsShop from "@/components/BreadcrumbsShop";
import { useEffect, useState } from "react";

async function getProducts(param: string): Promise<ProductsData[]> {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/products/${param}`
  );
  const data = await response.json();
  return data;
}

export default function Products({ params }: { params: { products: string } }) {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categorie = params.products;

  const { product, handleChangeColor, handleChangePrice, handleChangeStorage } =
    useFilterProducts(products);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProducts(categorie);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="max-w-[1450px] w-full m-auto">
      <div className="p-10 tabletgrande:p-5">
        <BreadcrumbsShop categorie={categorie} />
        <div className="w-full flex justify-between items-center tablet:mb-14">
          <div className="flex flex-col mb-3">
            <strong>
              Você está em:{" "}
              {categorie === "iphone" && (
                <span className="font-normal ml-1">iPhones</span>
              )}
              {categorie === "android" && (
                <span className="font-normal ml-1">Androids</span>
              )}
              {categorie === "smartwatch" && (
                <span className="font-normal ml-1">Smartwatchs</span>
              )}
              {categorie === "fone" && (
                <span className="font-normal ml-1">Fone Bluetooth</span>
              )}
              {categorie === "blackfriday" && (
                <span className="font-normal ml-1">Black Friday</span>
              )}
            </strong>
            <span className="text-sm text-[#7c7b7b] tabletgrande:hidden tablet:block">
              {/* {product.length} resultados */}
            </span>
          </div>

          <div className="hidden tablet:block">
            <ButtonFilterMobile />
          </div>
        </div>
        <div className="flex">
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
            <CheckboxGroup className="flex flex-col w-[12rem]" color="primary">
              <h4 className="font-bold mb-3">Preço</h4>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="0-1000"
                  onChange={handleChangePrice}
                />
                R$ 0 - R$1000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="1001 - 2000"
                  onChange={handleChangePrice}
                />
                R$ 1.001 - R$ 2.000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="2001 - 3000"
                  onChange={handleChangePrice}
                />
                R$ 2.001 - R$ 3.000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="3001-4000"
                  onChange={handleChangePrice}
                />
                R$ 3.001 - R$ 4.000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="4001-5000"
                  onChange={handleChangePrice}
                />
                R$ 4.001 - R$ 5.000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="5001-6000"
                  onChange={handleChangePrice}
                />
                R$ 5.001 - R$ 6.000
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="preco"
                  value="6001-7000"
                  onChange={handleChangePrice}
                  className="mb-3"
                />
                R$ 6.001 - R$ 7.000
              </label>
              {categorie !== "smartwatch" && categorie !== "fone" && (
                <>
                  <h4 className="font-bold mb-3">Armazenamento</h4>
                  <label className="cursor-pointer">
                    <Checkbox
                      type="checkbox"
                      name="armazenamento"
                      value="64"
                      onChange={handleChangeStorage}
                    />
                    64 GB
                  </label>
                  <label className="cursor-pointer">
                    <Checkbox
                      type="checkbox"
                      name="armazenamento"
                      value="128"
                      onChange={handleChangeStorage}
                    />
                    128 GB
                  </label>
                  <label className="cursor-pointer">
                    <Checkbox
                      type="checkbox"
                      name="armazenamento"
                      value="256"
                      onChange={handleChangeStorage}
                    />
                    256 GB
                  </label>
                  <label className="cursor-pointer">
                    <Checkbox
                      type="checkbox"
                      name="armazenamento"
                      value="512"
                      onChange={handleChangeStorage}
                    />
                    512 GB
                  </label>
                  <label className="cursor-pointer">
                    <Checkbox
                      type="checkbox"
                      name="armazenamento"
                      value="1024"
                      onChange={handleChangeStorage}
                      className="mb-3"
                    />
                    1 TB
                  </label>
                </>
              )}

              <h4 className="font-bold mb-3">Cor</h4>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="cor"
                  value="azul"
                  onChange={handleChangeColor}
                />
                Azul
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="cor"
                  value="branco"
                  onChange={handleChangeColor}
                />
                Branco
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="cor"
                  value="preto"
                  onChange={handleChangeColor}
                />
                Preto
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="cor"
                  value="roxo"
                  onChange={handleChangeColor}
                />
                Roxo
              </label>
              <label className="cursor-pointer">
                <Checkbox
                  type="checkbox"
                  name="cor"
                  value="dourado"
                  onChange={handleChangeColor}
                  className="mb-5"
                />
                Dourado
              </label>
            </CheckboxGroup>
          </div>

          <div className="flex flex-col w-full ml-14 tabletgrande:ml-0 tabletgrande:flex-row tablet:flex-col">
            <div className="tablet:hidden">
              <ButtonFilterMobile />
            </div>

            <div className="h-[2rem] flex items-center gap-3 w-full justify-end mb-20 tabletgrande:hidden">
              <SelectCategorie />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner-border text-primary" role="status">
                  <Spinner />
                </div>
              </div>
            ) : (
              <>
                {product.length === 0 ? (
                  <div className="flex justify-center items-center gap-2">
                    <CiSearch className="w-5 h-5" />
                    <span>Produto não encontrado</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 tabletgrande:grid-cols-2 flex-1">
                    {product.map((data) => (
                      <div key={data.id}>
                        <CardProducts product={data} imageSize={""} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
