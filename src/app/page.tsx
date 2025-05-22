import Hero from "@/components/layouts/home/Hero";
import Presentation from "@/components/layouts/home/Presentation";
import HowItWorks from "@/components/layouts/home/HowItWorks";
import FaqSection from "@/components/layouts/home/FaqSection";
import Footer from "@/components/layouts/home/Footer";
import { app } from "@/services/axios/axios.config";
import React from "react";
import Cta from "@/components/layouts/home/Cta";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Presentation />
      <HowItWorks />
      <FaqSection />
      <Cta />
      <Footer />
    </main>
  );
}
