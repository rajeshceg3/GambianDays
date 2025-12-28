"use client";

import { SectionData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ChapterProps {
  data: SectionData;
  index: number;
}

export default function Chapter({ data, index }: ChapterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Parallax for image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const isEven = index % 2 === 0;

  // Theme based styles
  const themeStyles = {
    light: "bg-gambia-paper text-gambia-dark",
    river: "bg-gambia-river text-gambia-paper",
    green: "bg-gambia-green text-gambia-paper",
    dark: "bg-gambia-dark text-gambia-paper",
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-24 md:py-32",
        themeStyles[data.theme]
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className={cn(
            "flex flex-col items-center gap-12 md:gap-24",
            isEven ? "md:flex-row" : "md:flex-row-reverse"
        )}>
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="mb-4 block font-sans text-sm font-semibold tracking-[0.2em] opacity-80 uppercase">
                {data.subtitle}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                {data.title}
              </h2>
            </motion.div>

            <div className="space-y-6 font-sans text-lg font-light leading-relaxed opacity-90 md:text-xl">
              {data.text.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-2xl md:aspect-[4/5]">
               <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                 <Image
                    src={data.image}
                    alt={data.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
