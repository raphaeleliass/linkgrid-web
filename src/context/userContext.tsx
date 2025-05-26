"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface UserData {
  name: string | null;
  username: string;
  links: {
    id: string;
    title: string;
    href: string;
    created_at: string;
    updated_at: string;
  }[];
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await fetch("/api/set-token", {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => data.token);

      const user: UserData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((res) => res.json());

      await fetch("/api/revalidate");

      setUser(user);
    } catch (err) {
      if (err instanceof Error) setError(err.message || "Erro desconhecido");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
};
