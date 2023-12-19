import { StaticImageData } from "next/image";

export interface ProductsData {
  id: number;
  name: string;
  image: StaticImageData;
  price: number;
  black_friday: boolean;
  discount: number;
  average_score: number;
  description: string;
  color_id: number;
  storage_id: number;
  categorie_id: number;
  ean: string;
  highlight: boolean;
}
