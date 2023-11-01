import { StaticImageData } from "next/image";

export type ProductsData = {
  id: number;
  name: string;
  price: number;
  image: string;
  black_friday: boolean;
  discount: number;
  average_score: number;
  description: string;
  color_id: number;
  storage_id: number;
  categorie_id: number;
  ean: string;
}
