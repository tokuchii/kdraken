"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import WebCorners from "../ui/WebCorners";

export default function Hero() {
  return (
    <div className="relative">
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0"
      >
        <div className="relative">
          <WebCorners />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-4"
          >
            Full-Stack Developer · Open to work
          </motion.p>

          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
              className="flex items-center gap-4"
            >
              <h1
                className="font-extrabold text-text-1 leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                }}
              >
                Hello, I'm
              </h1>

            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
              className="font-extrabold text-text-1 leading-tight mt-1 tracking-tight"
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
           I&apos;ve spent the last few years building web apps end-to-end — from database to UI. I care about performance, maintainability, and getting things done right.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.48 }}
            className="flex flex-col gap-3 mt-8 sm:flex-row"
          >
            <a
              href="#projects"
              className="btn-hover spider-tingle inline-flex items-center justify-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity min-h-[44px]"
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
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="text-text-2 hover:text-text-1 transition-colors animate-web-swing"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </section>

      {/* Spider overlay — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden hidden lg:block"
      >
        <img
          src="/files/spider.png"
          alt=""
          className="absolute bottom-5 right-[-22%] h-[70vh] xl:h-[90vh] w-auto object-contain object-bottom-right opacity-10 dark:invert dark:opacity-15"
        />
        <img
          src="/files/spider.png"
          alt=""
          className="absolute bottom-5 left-[-22%] h-[70vh] xl:h-[90vh] w-auto object-contain object-bottom-left opacity-10 dark:invert dark:opacity-15"
          style={{ transform: "scaleX(-1)" }}
        />
      </motion.div>
    </div>
  );
}
