"use client";

import { ProductsData } from "@/interfaces/ProductsData";
import { getBlackfridayProducts } from "@/services/api";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function BlackFridayOffer() {
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlackfridayProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  async function updateStateAndId(productId: number, highlight: boolean) {
    await handleSubmit(productId, highlight);
  }

  async function handleSubmit(productId: number, highlight: boolean) {
    try {
      const url = `https://smartshop-api-foy4.onrender.com/products/${productId}`;

      const request = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ highlight }),
      });

      const response = await request.json();
      console.log(response);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-[1075px] m-auto">
      <span className="text-lg font-semibold">
        Selecione o(s) produto(s) que deseja colocar como Oferta Black Friday:
      </span>

      <div className="flex justify-between flex-wrap">
        {products.map((product) => (
          <Card
            key={product.id}
            className="py-4 w-60 h-64 flex flex-col justify-between mb-5"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Image
                src={`https://smartshop-api-foy4.onrender.com/tmp/uploads/${product.image}`}
                alt="Imagem do produto"
                width={50}
                height={50}
              />
              <h4 className="font-bold text-large">{product.name}</h4>
            </CardHeader>

            <div className="flex gap-5 self-center">
              <Button
                onClick={() => updateStateAndId(product.id, false)}
                color="secondary"
              >
                Remover
              </Button>
              <Button
                onClick={() => updateStateAndId(product.id, true)}
                color="primary"
              >
                Enviar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
