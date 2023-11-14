import { Checkbox } from "@nextui-org/react";

import { ProductsData } from "@/interfaces/ProductsData";

interface ButtonFilterCapacityProps {
  categorie: string;
}

export default function ButtonFilterCapacity({
  categorie,
}: ButtonFilterCapacityProps) {
  return (
    <>
      {categorie === "fone" || categorie === "smartwatch" ? (
        <>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="64"
              disabled
            />
            64 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="128"
              disabled
            />
            128 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="256"
              disabled
            />
            256 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="512"
              disabled
            />
            512 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="1024"
              //  onChange={handleChangeStorage}
              className="mb-3"
              disabled
            />
            1 TB
          </label>
        </>
      ) : (
        <>
          <label className="cursor-pointer">
            <Checkbox type="checkbox" name="armazenamento" value="64" />
            64 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox type="checkbox" name="armazenamento" value="128" />
            128 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox type="checkbox" name="armazenamento" value="256" />
            256 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox type="checkbox" name="armazenamento" value="512" />
            512 GB
          </label>
          <label className="cursor-pointer">
            <Checkbox
              type="checkbox"
              name="armazenamento"
              value="1024"
              //  onChange={handleChangeStorage}
              className="mb-3"
            />
            1 TB
          </label>{" "}
        </>
      )}
    </>
  );
}
