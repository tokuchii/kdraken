"use client";

import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data";
import MobileDrawer from "./MobileDrawer";

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const ThemeIcon = () => {
    if (!mounted) return <Sun size={16} />;
    return theme === "light" ? <Moon size={16} /> : <Sun size={16} />;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0 h-16 flex items-center justify-between">
          <a href="#hero" className="font-mono text-sm font-medium text-text-1">
            kdraken_
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 relative ${
                    isActive ? "text-text-1" : "text-text-2 hover:text-text-1"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent" />
                  )}
                </a>
              );
            })}

            <button
              onClick={cycleTheme}
              className="p-2 text-text-2 hover:text-text-1 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={cycleTheme}
              className="p-2 text-text-2 hover:text-text-1 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
            <button
              className="p-2 -mr-2 text-text-2 hover:text-text-1 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
