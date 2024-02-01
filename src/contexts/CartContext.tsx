"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ProductsData } from "../interfaces/ProductsData";

export interface Products extends ProductsData {
  quantity: number;
}

interface CartContextProps {
  cart: Products[];
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  addProductIntoCart: (product: ProductsData) => void;
  removeProductFromCart: (product: Products) => void;
  productCartIncrement: (product: Products) => void;
  productCartDecrement: (product: Products) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

const localStorageKey = "@SmartStore:cart";

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Products[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cart.length === 0) return;
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem(localStorageKey);

    const parsedCart =
      cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];

    setCart(parsedCart);
  }, []);

  function ClearCart() {
    localStorage.removeItem(localStorageKey);
  }

  function addProductIntoCart(product: ProductsData): void {
    const productExistentInCart = cart.find(
      (item) => item.name === product.name && item.id === product.id
    );

    if (productExistentInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          const quantity = item.quantity + 1;

          return { ...item, quantity };
        }

        return item;
      });

      setCart(newCart);
      setCartOpen(true);

      return;
    }

    const newProduct = { ...product, quantity: 1 };
    const newCart = [...cart, newProduct];

    setCart(newCart);
    setCartOpen(true);
  }

  function removeProductFromCart(product: Products) {
    const newCart = cart.filter(
      (item) => !(item.id === product.id && item.name === product.name)
    );

    setCart(newCart);

    ClearCart();
  }

  function updateProductQuantity(product: Products, newQuantity: number) {
    if (newQuantity <= 0) return;

    const productExistentInCart = cart.find(
      (item) => item.id === product.id && item.name === product.name
    );

    if (!productExistentInCart) return;

    const newCart = cart.map((item) => {
      if (
        item.id === productExistentInCart.id &&
        item.name === productExistentInCart.name
      ) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    setCart(newCart);
  }

  function productCartIncrement(product: Products) {
    updateProductQuantity(product, product.quantity + 1);
  }

  function productCartDecrement(product: Products) {
    updateProductQuantity(product, product.quantity - 1);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addProductIntoCart,
        removeProductFromCart,
        productCartIncrement,
        productCartDecrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
