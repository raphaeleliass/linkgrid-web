import { ReactNode } from "react";

export const metadata = {
  title: "LinkGrid - Cadastre-se",
  description: "Crie sua conta na LinkGrid e comece a organizar seus links de forma simples e eficiente. Cadastro rápido e gratuito.",
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
