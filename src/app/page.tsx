"use client";

import Image from "next/image";
import { useState } from "react";
import About from "./components/About";
import Projects from "./components/Projects";
import SpiralIcon from "./components/SpiralIcon";
import { SiGmail, SiLinkedin } from "react-icons/si";
import { HiMenu, HiX } from "react-icons/hi";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      default:
        return (
          <>
            {/* Floating logo bubbles */}
            <div className="fixed inset-0 pointer-events-none z-0">
              {/* Top left */}
              <div className="absolute top-[15%] left-[10%] w-8 h-8 opacity-10 animate-float-slow">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>

              {/* Top right */}
              <div className="absolute top-[20%] right-[15%] w-6 h-6 opacity-10 animate-float-medium">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>

              {/* Middle left */}
              <div className="absolute top-[45%] left-[5%] w-10 h-10 opacity-10 animate-float-fast">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>

              {/* Middle right */}
              <div className="absolute top-[50%] right-[8%] w-7 h-7 opacity-10 animate-float-slow">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>

              {/* Bottom left */}
              <div className="absolute bottom-[20%] left-[12%] w-9 h-9 opacity-10 animate-float-medium">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>

              {/* Bottom right */}
              <div className="absolute bottom-[15%] right-[10%] w-8 h-8 opacity-10 animate-float-fast">
                <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="animate-spin-slow rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Profile image with hover effect */}
            <div className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#4a2f1b] shadow-lg mb-2 md:mb-4 transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[#8b5a2b]/50">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Image
                src="/images/1.JPG"
                alt="Kenneth Kieser T. Macabos"
                width={300}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>

            {/* Animated text with gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#c8a165] to-[#8b5a2b] animate-gradient-x drop-shadow-lg tracking-tight text-center px-4">
              Kenneth Kieser T. Macabos
            </h1>

            {/* Animated description */}
            <p className="text-sm sm:text-lg md:text-xl text-[#c8a165] text-center max-w-xl animate-fade-in-delay px-4">
              I'm an aspiring Software Engineer from Laguna, Philippines. <br />
              I may not be naturally gifted like some, but I have a genuine passion for programming.
              I enjoy building applications, websites, and systems, and I'm always working to improve my skills 
              and grow as a developer.
            </p>

            {/* Social links with hover effects */}
            <div className="flex gap-4 md:gap-6 mt-2 md:mt-4">
              <a href="https://www.facebook.com/kenneth.kieser.macabos" target="_blank" rel="noopener noreferrer" className="text-[#c8a165] hover:text-white transition-colors duration-300 transform hover:scale-105">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com/tokuchii" target="_blank" rel="noopener noreferrer" className="text-[#c8a165] hover:text-white transition-colors duration-300 transform hover:scale-105">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:keisermacabos@gmail.com" className="text-[#c8a165] hover:text-white transition-colors duration-300 transform hover:scale-105">
                <SiGmail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.linkedin.com/in/kenneth-kieser-macabos-026867367/" target="_blank" rel="noopener noreferrer" className="text-[#c8a165] hover:text-white transition-colors duration-300 transform hover:scale-105">
                <SiLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#0a0a0a] animate-gradient-move">
      {/* Animated techy background shapes with floating animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-64 md:w-96 h-64 md:h-96 bg-[#4a2f1b] opacity-20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-[#2c4a1b] opacity-20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-[#1b2f4a] opacity-10 rounded-full blur-2xl animate-float-fast" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-8 p-4 md:p-8 mx-4 md:mx-8 rounded-xl shadow-2xl bg-[#1a1a1a]/80 backdrop-blur-md border border-[#4a2f1b]/30 animate-fade-in w-full max-w-4xl">
        {/* Header with Logo and Navigation */}
        <div className="w-full flex items-center justify-between mb-8">
          <SpiralIcon />
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-4">
            <button
              onClick={() => handleNavigation("about")}
              className={`group relative px-6 py-3 text-[#c8a165] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white ${activeSection === "about" ? "text-white border-white" : ""}`}
            >
              <span className="relative z-10 transition-colors duration-300">About Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
            </button>

            <button
              onClick={() => handleNavigation("projects")}
              className={`group relative px-6 py-3 text-[#c8a165] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white ${activeSection === "projects" ? "text-white border-white" : ""}`}
            >
              <span className="relative z-10 transition-colors duration-300">Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#c8a165] hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="w-8"></div> {/* Spacer to balance the layout */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-md border border-[#4a2f1b]/30 rounded-lg shadow-lg z-50 mx-4">
            <div className="flex flex-col p-4 gap-2">
              <button
                onClick={() => handleNavigation("about")}
                className={`w-full text-left px-4 py-3 text-[#c8a165] font-medium rounded-lg transition-all duration-300 hover:text-white hover:bg-[#4a2f1b]/30 ${activeSection === "about" ? "text-white bg-[#4a2f1b]/30" : ""}`}
              >
                About Me
              </button>
              <button
                onClick={() => handleNavigation("projects")}
                className={`w-full text-left px-4 py-3 text-[#c8a165] font-medium rounded-lg transition-all duration-300 hover:text-white hover:bg-[#4a2f1b]/30 ${activeSection === "projects" ? "text-white bg-[#4a2f1b]/30" : ""}`}
              >
                Projects
              </button>
            </div>
          </div>
        )}

        {renderSection()}
      </main>
    </div>
  );
}

// Add this to your globals.css for the animated gradient background:
// @keyframes gradient-move {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
// .animate-gradient-move {
//   background-size: 200% 200%;
//   animation: gradient-move 8s ease-in-out infinite;
// }
