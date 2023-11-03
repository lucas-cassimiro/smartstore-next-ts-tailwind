import { Checkbox } from "@nextui-org/react";

export default function ButtonFilterCapacity() {
  return (
    <>
      <label>
        <Checkbox type="checkbox" name="armazenamento" value="64" />
        64 GB
      </label>
      <label>
        <Checkbox type="checkbox" name="armazenamento" value="128" />
        128 GB
      </label>
      <label>
        <Checkbox type="checkbox" name="armazenamento" value="256" />
        256 GB
      </label>
      <label>
        <Checkbox type="checkbox" name="armazenamento" value="512" />
        512 GB
      </label>
      <label>
        <Checkbox
          type="checkbox"
          name="armazenamento"
          value="1024"
          //  onChange={handleChangeStorage}
          className="mb-3"
        />
        1 TB
      </label>
    </>
  );
}
