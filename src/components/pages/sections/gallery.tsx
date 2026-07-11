"use client";

import SectionHeading from "@/components/section-heading";
import CircularGallery from "@/components/ui/circular-flip-card-gallery";
import { motion } from "motion/react";
import { BackgroundGridAnimated } from "@/components/shared/backgrounds";

export default function Gallery() {
  return (
    <SectionHeading
      id="gallery"
      text="Gallery"
      className="px-4 py-12 md:px-8"
    >
      <div className="relative overflow-hidden">
        <BackgroundGridAnimated />

        <div className="relative z-10 px-4 pt-4 pb-6 md:pt-16 md:pb-10 md:px-8">
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-10 text-center"
          >
            <p className="text-muted-foreground max-w-xl mx-auto text-sm font-light leading-relaxed">
              A visual orbit of the best moments from my journey  — hover each card to explore the milestones that shaped my career.
            </p>
          </motion.div>

          {/* Circular Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <CircularGallery />
          </motion.div>

          {/* Decorative bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 md:mt-10 flex items-center justify-center gap-4"
          >
            {/* Hide lines on mobile, show on desktop */}
            <div className="hidden md:block h-px flex-1 max-w-24 bg-border" />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase text-center px-4">
              Some moments stay unforgettable forever ❤️
            </span>
            <div className="hidden md:block h-px flex-1 max-w-24 bg-border" />
          </motion.div>
        </div>
      </div>
    </SectionHeading>
  );
}