import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="relative min-h-dvh">
      {/* TODO NAVBAR DEVE SER FIXA NO TOPO, E TAMBÉM NA ROTA /CADASTRO */}
      <header className="flex flex-row items-center justify-between px-2 py-6">
        <h1 className="text-2xl font-bold">LinkGrid</h1>
        <Link href={"/"}>
          <button className="px-4 py-1 underline underline-offset-4">
            Início
          </button>
        </Link>
      </header>
      <div className="min-h-dvh place-content-center justify-items-center">
        <LoginForm />
      </div>
    </main>
  );
}
