import LoginForm from "@/components/forms/loginForm";
import Navbar from "@/components/ui/navbar";

export default function Entrar() {
  return (
    <main className="relative min-h-dvh">
      <Navbar />
      <div className="min-h-dvh place-content-center justify-items-center">
        <LoginForm />
      </div>
    </main>
  );
}
