"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react";

import { FormData } from "@/components/LoginFrame";

import { setCookie, parseCookies, destroyCookie } from "nookies";

import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  cpf: string;
  cellphone: string;
  date_birth: string;
  admin_auth: boolean;
};

type Address = {
  id: number;
  street_address: string;
  number_address: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  recipient: string;
  cep: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  address: Address[];
  setAddress: Dispatch<SetStateAction<Address[]>>;
  signIn: (data: FormData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

async function getAddress(userId: number) {
  const request = await fetch(
    `https://smartshop-api-foy4.onrender.com/address/${userId}`
  );
  return await request.json();
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log(user);

  const [address, setAddress] = useState<Address[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const router = useRouter();

  useEffect(() => {
    const { "smartstore.token": token } = parseCookies();

    if (token) {
      fetch("https://smartshop-api-foy4.onrender.com/users/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const addressData = await getAddress(user.id);
        setAddress(addressData);
      }
    }

    fetchData();
  }, [user]);

  async function signIn({ email, password_hash }: FormData) {
    try {
      const url = "https://smartshop-api-foy4.onrender.com/users/login";
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password_hash }),
      });

      if (!request.ok) {
        const errorResponse = await request.json();
        throw new Error(
          errorResponse.message || "Erro desconhecido no servidor"
        );
      }

      const response = await request.json();

      setCookie(response, "smartstore.token", response.token, {
        maxAge: 60 * 60 * 1,
      });

      setUser(response.user);

      window.location.reload();

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const signOut = useCallback(() => {
    destroyCookie(null, "smartstore.token");
    setUser(null);

    router.push("/");
    window.location.reload();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user,
        address,
        setAddress,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
