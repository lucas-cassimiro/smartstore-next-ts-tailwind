"use client";

import { Select, SelectItem } from "@nextui-org/react";

export default function SelectCategorie() {
  const order = ["Mais procurados", "Mais recentes", "Mais vendidos"];

  return (
    <>
      <Select label="Selecione uma categoria" className="w-[15.25rem] h-[2.375rem]">
        {order.map((order) => (
          <SelectItem key={order} value={order}>
            {order}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
