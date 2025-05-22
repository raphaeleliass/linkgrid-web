import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const accordionContent = [
  {
    trigger: "Posso personalizar meu card?",
    content:
      "Sim! Você pode adicionar quantos links desejar ao seu card. Em breve, lançaremos mais opções de personalização, incluindo temas, cores e layouts personalizados.",
  },
  {
    trigger: "É gratuito para usar?",
    content:
      "Sim, o serviço básico é totalmente gratuito. Você pode criar seu card de links e compartilhar com seu público sem nenhum custo.",
  },
  {
    trigger: "Preciso criar uma conta para usar?",
    content:
      "Sim, é necessário criar uma conta para gerenciar seus links. O processo é rápido e simples, podendo ser feito com seu e-mail.",
  },
  {
    trigger: "Como compartilho meu card de links?",
    content:
      "Após criar seu card, você receberá um link personalizado que pode ser compartilhado em qualquer lugar: redes sociais, e-mail, ou até mesmo em seu currículo.",
  },
  {
    trigger: "Posso alterar meus links depois?",
    content:
      "Sim! Você pode editar, adicionar ou remover links a qualquer momento através do seu painel de controle.",
  },
];

export default function FaqSection() {
  return (
    <section className="place-content-center justify-items-center px-4 pb-12">
      <h2 className="text-center text-4xl font-semibold">
        Perguntas frequentes
      </h2>

      <Accordion type="multiple" className="mx-auto mt-20 max-w-xl">
        {accordionContent.map((item, index) => (
          <AccordionItem value={item.trigger} key={index}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>

            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
