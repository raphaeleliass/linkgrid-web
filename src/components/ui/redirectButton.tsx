import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "./button";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

export default function RedirectButton({ href, children }: ButtonProps) {
  return (
    <Link href={href}>
      <Button className="cursor-pointer rounded-full">{children}</Button>
    </Link>
  );
}
