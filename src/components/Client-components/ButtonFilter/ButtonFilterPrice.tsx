import { Checkbox } from "@nextui-org/react";

export default function ButtonFilterPrice() {
  return (
    <>
      <label>
        <Checkbox type="checkbox" name="preco" value="0-1000" />
        R$ 0 - R$1000
      </label>
      <label>
        <Checkbox type="checkbox" name="preco" value="1001 - 2000" />
        R$ 1.001 - R$ 2.000
      </label>
      <label>
        <Checkbox type="checkbox" name="preco" value="2001 - 3000" />
        R$ 2.001 - R$ 3.000
      </label>
      <label>
        <Checkbox type="checkbox" name="preco" value="3001-4000" />
        R$ 3.001 - R$ 4.000
      </label>
      <label>
        <Checkbox type="checkbox" name="preco" value="4001-5000" />
        R$ 4.001 - R$ 5.000
      </label>
      <label>
        <Checkbox type="checkbox" name="preco" value="5001-6000" />
        R$ 5.001 - R$ 6.000
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="preco"
          value="6001-7000"
          //   onChange={handleChangePrice}
          className="mb-3"
        />
        R$ 6.001 - R$ 7.000
      </label>
    </>
  );
}
