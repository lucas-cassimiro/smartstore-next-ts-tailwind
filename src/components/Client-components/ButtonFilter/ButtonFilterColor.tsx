import { Checkbox } from "@nextui-org/react";

export default function ButtonFilterColor() {
  return (
    <>
      <label>
        <Checkbox
          type="checkbox"
          name="cor"
          value="azul"
          //  onChange={handleChangeColor}
        />
        Azul
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="cor"
          value="branco"
          // onChange={handleChangeColor}
        />
        Branco
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="cor"
          value="preto"
          // onChange={handleChangeColor}
        />
        Preto
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="cor"
          value="roxo"
          //  onChange={handleChangeColor}
        />
        Roxo
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="cor"
          value="dourado"
          //  onChange={handleChangeColor}
          className="mb-5"
        />
        Dourado
      </label>
    </>
  );
}
