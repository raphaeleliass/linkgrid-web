import RedirectButton from "@/components/ui/redirectButton";

export default function NotFound() {
  return (
    <main className="min-h-dvh place-content-center justify-items-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="bg-gradient-to-r from-sky-500 to-rose-500 bg-clip-text text-5xl font-semibold text-transparent">
          Não Encontrado
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Este usuário não existe ou não foi encontrado
        </p>
        <RedirectButton href="/">Início</RedirectButton>
      </div>
    </main>
  );
}
