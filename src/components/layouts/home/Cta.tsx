"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Cta() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputValue.includes("@")) return;

    sessionStorage.setItem("email", inputValue);
    router.push("/cadastro");
  }

  return (
    <section className="w-full place-content-center justify-items-center px-4 py-64">
      <div className="container flex w-full flex-col items-center justify-center gap-12 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-5xl font-semibold text-balance">
            Comece agora mesmo
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Dê o primeiro passo para deixar seus contatos mais acessíveis e
            profissionais com a LinkGrid
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleForm}
            id="formData"
            className="mt-8 flex max-w-lg flex-row gap-4"
          >
            <Input
              placeholder="Digite seu melhor email"
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">
              <ChevronRight />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
