import SigninNavbar from "@/components/ui/signinNavbar";
import { ReactNode } from "react";

export default function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SigninNavbar />
      {children}
    </>
  );
}
