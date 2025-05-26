import Hero from "@/components/layouts/home/Hero";
import Presentation from "@/components/layouts/home/Presentation";
import HowItWorks from "@/components/layouts/home/HowItWorks";
import FaqSection from "@/components/layouts/home/FaqSection";
import Footer from "@/components/layouts/home/Footer";
import React from "react";
import Cta from "@/components/layouts/home/Cta";
import SigninNavbar from "@/components/ui/signinNavbar";

export default async function Home() {
  return (
    <main>
      <SigninNavbar />
      <Hero />
      <Presentation />
      <HowItWorks />
      <FaqSection />
      <Cta />
      <Footer />
    </main>
  );
}
