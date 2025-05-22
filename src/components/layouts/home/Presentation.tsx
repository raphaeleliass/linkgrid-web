"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Presentation() {
  const divRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!divRef.current) return;

    const mainDiv = divRef.current;

    gsap.fromTo(
      mainDiv.querySelectorAll("*"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: divRef.current,
          start: "top center",
          once: true,
        },
      },
    );
  }, []);

  return (
    <article className="min-h-dvh place-content-center justify-items-center bg-gradient-to-b from-slate-950 from-1% via-transparent to-transparent px-4 pt-12">
      <div
        className="mt-100 flex max-w-sm flex-col items-center justify-center gap-4 text-center md:max-w-3xl"
        ref={divRef}
      >
        <h2 className="text-5xl leading-tight font-bold text-slate-200 md:text-6xl">
          Sua presença digital em um único lugar
        </h2>
        <p className="text-muted-foreground max-w-xl">
          LinkGrid reúne suas redes sociais e portfolio em um cartão de visita
          digital elegante e impactante.
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-6 max-sm:max-w-xs md:flex-row">
          <Link href={"/cadastro"} className="w-full md:w-auto">
            <Button className="w-full">Crie seu LinkGrid grátis</Button>
          </Link>

          <a href="#faq" className="w-full md:w-auto">
            <Button variant={"ghost"} className="w-full border">
              Tire Suas Dúvidas <ArrowRight />
            </Button>
          </a>
        </div>
      </div>

      <div className="bg-secondary/60 mt-32 w-full max-w-5xl place-content-center justify-items-center rounded-3xl border p-4 max-sm:hidden">
        <div className="relative w-full overflow-hidden rounded-xl md:aspect-video">
          <Image
            className="object-cover object-center"
            src={"/aceternity-landing.webp"}
            alt="image"
            quality={100}
            sizes="max-w-2xl"
            fill
          />
        </div>
      </div>
    </article>
  );
}
