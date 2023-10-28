"use client";

export default function ButtonFilter() {
  return (
    <div className="flex flex-col w-[11rem]">
      <h4>Preço</h4>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="0-1000"
          // onChange={handleChangePrice}
        />
        R$ 0 - R$1000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="1001 - 2000"
          // onChange={handleChangePrice}
        />
        R$ 1.001 - R$ 2.000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="2001 - 3000"
          // onChange={handleChangePrice}
        />
        R$ 2.001 - R$ 3.000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="3001-4000"
          //  onChange={handleChangePrice}
        />
        R$ 3.001 - R$ 4.000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="4001-5000"
          //  onChange={handleChangePrice}
        />
        R$ 4.001 - R$ 5.000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="5001-6000"
          // onChange={handleChangePrice}
        />
        R$ 5.001 - R$ 6.000
      </label>
      <label>
        <input
          type="checkbox"
          name="preco"
          value="6001-7000"
          //   onChange={handleChangePrice}
        />
        R$ 6.001 - R$ 7.000
      </label>
      <h4>Armazenamento</h4>
      <label>
        <input
          type="checkbox"
          name="armazenamento"
          value="64"
          //  onChange={handleChangeStorage}
        />
        64 GB
      </label>
      <label>
        <input
          type="checkbox"
          name="armazenamento"
          value="128"
          //  onChange={handleChangeStorage}
        />
        128 GB
      </label>
      <label>
        <input
          type="checkbox"
          name="armazenamento"
          value="256"
          //   onChange={handleChangeStorage}
        />
        256 GB
      </label>
      <label>
        <input
          type="checkbox"
          name="armazenamento"
          value="512"
          //  onChange={handleChangeStorage}
        />
        512 GB
      </label>
      <label>
        <input
          type="checkbox"
          name="armazenamento"
          value="1024"
          //  onChange={handleChangeStorage}
        />
        1 TB
      </label>

      <h4>Cor</h4>
      <label>
        <input
          type="checkbox"
          name="cor"
          value="azul"
          //  onChange={handleChangeColor}
        />
        Azul
      </label>
      <label>
        <input
          type="checkbox"
          name="cor"
          value="branco"
          // onChange={handleChangeColor}
        />
        Branco
      </label>
      <label>
        <input
          type="checkbox"
          name="cor"
          value="preto"
          // onChange={handleChangeColor}
        />
        Preto
      </label>
      <label>
        <input
          type="checkbox"
          name="cor"
          value="roxo"
          //  onChange={handleChangeColor}
        />
        Roxo
      </label>
      <label>
        <input
          type="checkbox"
          name="cor"
          value="dourado"
          //  onChange={handleChangeColor}
        />
        Dourado
      </label>
    </div>
  );
}
