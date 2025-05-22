import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="relative min-h-dvh">
      <header className="flex items-center flex-row justify-between px-2 py-6">
        <h1 className="text-2xl font-bold">LinkGrid</h1>
        <Link href={"/"}>
          <button className="px-4 py-1 underline underline-offset-4">
            Início
          </button>
        </Link>
      </header>

      <div className="min-h-dvh place-content-center justify-items-center">
        <RegisterForm />
      </div>
    </main>
  );
}
