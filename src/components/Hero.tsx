"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-gambia-river">
      <motion.div style={{ y, opacity }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2872&auto=format&fit=crop"
          alt="Gambia sunset"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gambia-river/90" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-6xl font-bold text-gambia-paper md:text-8xl lg:text-9xl"
        >
          Gambia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 max-w-lg text-lg font-light tracking-widest text-gambia-paper/90 md:text-xl"
        >
          THE SMILING COAST
        </motion.p>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-10"
        >
            <span className="text-gambia-paper/60 text-sm">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
