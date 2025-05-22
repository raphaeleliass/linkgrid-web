"use client";

export default function Footer() {
  return (
    <footer className="mt-12 border-t py-8 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row-reverse">
        <span className="mr-auto">
          &copy; {new Date().getFullYear()} LinkGrid. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
}
