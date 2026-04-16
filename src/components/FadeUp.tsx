"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

/**
 * Scroll-triggered fade-up wrapper.
 * Animates once when the element enters the viewport.
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  className,
  distance = 32,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quart
      }}
    >
      {children}
    </motion.div>
  );
}
