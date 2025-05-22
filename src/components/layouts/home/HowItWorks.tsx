"use client";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoundPlus, Paintbrush2, Share2, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cards = [
  {
    icon: UserRoundPlus,
    title: "Cadastre-se",
    description: "Crie sua conta gratuitamente em poucos segundos.",
  },
  {
    icon: Paintbrush2,
    title: "Personalize",
    description:
      "Adicione seus links, redes sociais e informações do seu jeito.",
  },
  {
    icon: Share2,
    title: "Compartilhe",
    description: "Divulgue seu LinkGrid e centralize sua presença digital.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-32 flex min-h-dvh flex-col items-center justify-center gap-4 pb-12">
      <div className="container flex flex-col items-start justify-evenly gap-4 px-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-semibold text-balance md:text-5xl">
          Organize seus links facilmente e os compartilhe.
        </h2>
        <p className="text-muted-foreground text-base text-balance">
          Conecte-se com seu público de forma simples e profissional.
          Compartilhe suas redes sociais, portfólio, projetos e muito mais em
          uma única página personalizada.
        </p>
        <Link href={"/cadastro"} className="mt-2">
          <Button variant={"link"}>
            Comece agora <ChevronRight />
          </Button>
        </Link>
      </div>

      <Carousel className="from-background via-secondary/40 container w-full max-sm:bg-gradient-to-b">
        <CarouselContent className="mr-4 pr-8 pl-4 md:hidden">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <CarouselItem key={index} className="basis-6/7">
                <Card className="bg-background aspect-square shadow-2xl">
                  <CardHeader>
                    <div className="ml-auto rounded-full border p-2">
                      <Icon className="text-muted-foreground" />
                    </div>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <CardTitle className="text-muted-foreground text-xl md:text-3xl">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm text-balance">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="from-background via-secondary/10 to-background w-full place-content-center justify-items-center bg-gradient-to-b px-4 py-12">
        <div className="container flex w-full flex-row items-center justify-center gap-7 max-sm:hidden">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                className="bg-background aspect-square w-full shadow-xl"
                key={index}
              >
                <CardHeader>
                  <div className="ml-auto rounded-full border p-2">
                    <Icon className="text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <CardTitle className="text-muted-foreground text-xl lg:text-3xl">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-balance">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
