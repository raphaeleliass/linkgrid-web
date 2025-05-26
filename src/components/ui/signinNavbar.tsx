import { cookies } from "next/headers";
import RedirectButton from "./redirectButton";

export default async function SigninNavbar() {
  const cookieStore = cookies();

  const token = (await cookieStore).get("token")?.value;

  return (
    <header className="fixed top-4 z-50 w-full place-content-center justify-items-center">
      <nav className="bg-secondary/40 border-muted-foreground flex w-full flex-row items-center justify-between rounded-full px-4 py-3 drop-shadow-2xl backdrop-blur-xl md:max-w-2xl">
        <h2 className="text-2xl font-semibold">LinkGrid</h2>

        <div>
          {token ? (
            <RedirectButton href="/dashboard">Dashboard</RedirectButton>
          ) : (
            <RedirectButton href={"/entrar"}>Entre</RedirectButton>
          )}
        </div>
      </nav>
    </header>
  );
}
