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

type AuthContextType = {
  isAuthenticated: boolean;
  user: User[];
  errorMessage: string | null;
  signIn: (data: FormData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAuthenticated = user.length >= 1;

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
          setUser(Array.isArray(userData) ? userData : [userData]);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Erro ao buscar dados do usuário");
        });
    }
  }, []);

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

      router.push("/meu-cadastro");
      window.location.reload();
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("Usuário ou senha inválidos.");
    }

  }

  const signOut = useCallback(() => {
    destroyCookie(null, "smartstore.token");
    setUser([]);
    setErrorMessage(null);
    router.push("/");
    window.location.reload();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signOut, user, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
