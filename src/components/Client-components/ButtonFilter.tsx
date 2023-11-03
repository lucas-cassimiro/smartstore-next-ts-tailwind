"use client";

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import ButtonFilterPrice from "./ButtonFilter/ButtonFilterPrice";
import ButtonFilterCapacity from "./ButtonFilter/ButtonFilterCapacity";
import ButtonFilterColor from "./ButtonFilter/ButtonFilterColor";

export default function ButtonFilter() {
  return (
    <CheckboxGroup className="flex flex-col w-[12rem]" color="primary">
      <h4 className="font-bold mb-3">Preço</h4>
      <ButtonFilterPrice />
      <h4 className="font-bold mb-3">Armazenamento</h4>
      <ButtonFilterCapacity />
      <h4 className="font-bold mb-3">Cor</h4>
      <ButtonFilterColor />
    </CheckboxGroup>
  );
}
