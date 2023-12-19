import { StaticImageData } from "next/image";

export interface OrdersData {
  id: number;
  name: string;
  unit_price: number;
  discount: number;
  total_price: number;
  quantity: number;
  products: {
    id: number;
    name: string;
    price: number;
    black_friday: boolean;
    discount: number;
    average_score?: number;
    description: string;
    color_id: number;
    storage_id: number;
    categorie_id: number;
    ean: string;
    highlight: boolean;
    image: StaticImageData;
    black_friday_offer: boolean;
  };
  orders: {
    id: number;
    user_id: number;
    order_date: Date;
    total_amount: number;
  };
}
