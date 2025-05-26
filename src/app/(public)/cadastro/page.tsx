import RegisterForm from "@/components/forms/registerForm";
import Navbar from "@/components/ui/navbar";
import React from "react";

export default function Cadastro() {
  return (
    <main className="relative min-h-dvh">
      <Navbar />

      <div className="min-h-dvh place-content-center justify-items-center">
        <RegisterForm />
      </div>
    </main>
  );
}
