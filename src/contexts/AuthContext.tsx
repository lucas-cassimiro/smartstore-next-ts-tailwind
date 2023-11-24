"use client";

import {
  createContext,
  useContext,
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
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  address: Address[];
  errorMessage: string | null;
  signIn: (data: FormData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

async function getAddress(userId: number) {
  const request = await fetch(`http://localhost:3001/endereco/${userId}`);
  return await request.json();
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const router = useRouter();

  useEffect(() => {
    const { "smartstore.token": token } = parseCookies();

    if (token) {
      fetch("http://localhost:3001/users/profile", {
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
          setErrorMessage("Erro ao buscar dados do usuário");
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function signIn({ email, password_hash }: FormData) {
    try {
      const url = "http://localhost:3001/users/login";
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password_hash }),
      });

      if (!request.ok) {
        const errorResponse = await request.json();

        throw new Error(errorResponse.message);
      }

      const response = await request.json();

      setCookie(response, "smartstore.token", response.token, {
        maxAge: 60 * 60 * 1, //1 hora
      });

      setUser(response.user);

      setErrorMessage(null);

      window.location.reload();
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("Usuário ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  const signOut = useCallback(() => {
    destroyCookie(null, "smartstore.token");
    setUser(null);
    setErrorMessage(null);

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
        errorMessage,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
