"use client";

import { motion } from "framer-motion";

export default function BubbleLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-2xl z-50">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Orbiting Bubbles */}
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-[#c8a165]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ originX: 2.5, originY: 2.5 }} // orbit path
        />
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-[#8b5a2b]"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          style={{ originX: -2.5, originY: -2.5 }}
        />
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-[#4a2f1b]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{ originX: -3, originY: 3 }}
        />

        {/* Pulsing Center */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-[#c8a165] shadow-lg"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
