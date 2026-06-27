"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0"
    >
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-4"
        >
          Full-Stack Developer · Open to work
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            className="font-medium text-text-1 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Hello, I'm
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
            className="font-medium text-text-1 leading-tight mt-1"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Kenneth Kieser Macabos
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.36 }}
          className="text-text-2 max-w-lg mt-6 leading-relaxed"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
          }}
        >
         I've spent the last few years building web apps end-to-end — from database to UI. I care about performance, maintainability, and getting things done right.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.48 }}
          className="flex flex-col xs:flex-row gap-3 mt-8"
        >
          <a
            href="#projects"
            className="btn-hover inline-flex items-center justify-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity min-h-[44px]"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="btn-hover inline-flex items-center justify-center px-6 py-3 border border-border text-text-1 text-sm font-medium rounded-xl hover:border-text-2 transition-colors min-h-[44px]"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.72 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="text-text-2 hover:text-text-1 transition-colors animate-bounce-slow"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
}
