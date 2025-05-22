import { ReactNode } from "react";

export const metadata = {
  title: "LinkGrid - Entrar",
  description:
    "Acesse sua conta e aproveite uma experiência exclusiva ao gerenciar seus links com segurança e praticidade.",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
