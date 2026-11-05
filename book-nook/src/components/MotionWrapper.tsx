
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  delay?: number;
};

// Reusable viewport animation wrapper keeps section entrance effects consistent.
export default function MotionWrapper({ children, delay = 0 }: MotionWrapperProps) {
  return (
    // (Fade In + Slide Up)
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
