import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a]/80 backdrop-blur-md p-4 rounded-lg border border-[#4a2f1b]/30 shadow-lg">
        <button
          onClick={() => setActiveSection("about")}
          className={`group relative px-6 py-3 text-[#c8a165] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white ${activeSection === "about" ? "text-white border-white" : ""}`}
        >
          <span className="relative z-10 transition-colors duration-300">About Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={`group relative px-6 py-3 text-[#c8a165] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white ${activeSection === "projects" ? "text-white border-white" : ""}`}
        >
          <span className="relative z-10 transition-colors duration-300">Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
        </button>

        <button
          onClick={() => setActiveSection("contact")}
          className={`group relative px-6 py-3 text-[#c8a165] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white ${activeSection === "contact" ? "text-white border-white" : ""}`}
        >
          <span className="relative z-10 transition-colors duration-300">Contact</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
} 