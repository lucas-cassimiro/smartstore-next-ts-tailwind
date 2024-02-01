"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

async function getOrder(id: number) {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/pedidos/${id}`
  );
  return await response.json();
}

export default function OrderHistory() {
  const [data, setData] = useState<any[]>([]);
  const { user } = useAuth();

  const id = user?.id;

  useEffect(() => {
    async function fetchData() {
      const data = await getOrder(id!);
      setData(data);
    }

    fetchData();
  }, [id]);

  return (
    <AuthGuard>
      <section className="w-[983px] flex flex-col py-14">
        <div className="m-auto flex flex-col w-[800px]  h-full">
          <span className="font-bold text-3xl mb-10">Histórico do pedido</span>
          <div className="flex w-full gap-32 border-b-[0.0625rem] border-black">
            <span className="mb-5">Número</span>
            <span>Data</span>
            <span>Total</span>
            <span>Status</span>
          </div>
          <span className="mt-5">Não há itens para exibição.</span>
        </div>
      </section>
    </AuthGuard>
  );
}
