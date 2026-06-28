"use client";

import { motion } from "framer-motion";

export default function WebCorners() {
  return (
    <>
      {/* Top-left corner */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-20 sm:h-20 web-glow pointer-events-none"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M0 40 L0 0 L40 0" stroke="var(--color-accent)" strokeWidth="0.5" />
        <path d="M0 30 L0 0 L30 0" stroke="var(--color-accent)" strokeWidth="0.5" />
        <path d="M0 20 L0 0 L20 0" stroke="var(--color-accent)" strokeWidth="0.5" />
        {/* Web strands */}
        <path d="M0 0 Q20 10 40 0" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.5" />
        <path d="M0 0 Q10 20 0 40" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.5" />
        <path d="M0 0 Q15 15 30 0" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3" />
        <circle cx="0" cy="0" r="2" fill="var(--color-accent)" opacity="0.4" />
      </motion.svg>

      {/* Bottom-right corner */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-12 h-12 sm:w-20 sm:h-20 web-glow pointer-events-none"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M80 40 L80 80 L40 80" stroke="var(--color-accent)" strokeWidth="0.5" />
        <path d="M80 50 L80 80 L50 80" stroke="var(--color-accent)" strokeWidth="0.5" />
        <path d="M80 60 L80 80 L60 80" stroke="var(--color-accent)" strokeWidth="0.5" />
        {/* Web strands */}
        <path d="M80 80 Q60 70 40 80" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.5" />
        <path d="M80 80 Q70 60 80 40" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.5" />
        <path d="M80 80 Q65 65 50 80" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3" />
        <circle cx="80" cy="80" r="2" fill="var(--color-accent)" opacity="0.4" />
      </motion.svg>
    </>
  );
}
