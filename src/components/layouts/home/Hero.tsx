"use client";
import { LampContainer } from "@/components/ui/lamp";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
export default function Hero() {
  return (
    <section className="relative flex items-center justify-center">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: -80 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h1 className="from-foreground bg-gradient-to-b to-slate-700 bg-clip-text text-6xl font-bold text-transparent drop-shadow-2xl md:text-7xl">
            LinkGrid
          </h1>
        </motion.div>
      </LampContainer>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute bottom-20 scale-110"
      >
        <ArrowDown className="animate-bounce text-slate-800 duration-300 ease-in-out" />
      </motion.div>
    </section>
  );
}
