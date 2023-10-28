import { StaticImageData } from "next/image";

export interface ProductsData {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
  black_friday: boolean;
  discount: number;
  average_score: number;
  description: string;
  created_at: number;
  color_id: number;
  storage_id: number;
  categorie_id: number;
}
