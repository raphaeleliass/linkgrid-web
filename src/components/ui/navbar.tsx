import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="fixed flex w-full flex-row items-center justify-between border-b px-2 py-6">
      <h1 className="text-2xl font-bold">LinkGrid</h1>
      <Link href={"/"}>
        <button className="px-4 py-1 underline underline-offset-4">
          Início
        </button>
      </Link>
    </header>
  );
}
