import { StaticImageData } from "next/image";

export interface ProductsData {
  order: string;
  id: number;
  name: string;
  image: StaticImageData;
  price: number;
  black_friday: boolean;
  discount: number;
  average_score: number;
  description: string;
  color_id: number;
  colors: {
    id: number;
    name: string;
  };
  storage_id: number;
  storages: {
    id: number;
    capacity: string;
  };
  categorie_id: number;
  categories: {
    id: number;
    name: string;
  };
  ean: string;
  highlight: boolean;
}
