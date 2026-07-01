"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data";
import MobileDrawer from "./MobileDrawer";

function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const busy = useRef(false);

  useEffect(() => setMounted(true), []);

  const switchTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (busy.current || !mounted) return;

    const nextTheme = theme === "light" ? "dark" : "light";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    busy.current = true;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const endRadius = Math.hypot(
      Math.max(x, vw - x),
      Math.max(y, vh - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "cubic-bezier(.32,.08,.24,1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    transition.finished.then(() => {
      busy.current = false;
    });
  };

  const ThemeIcon = () => {
    if (!mounted) return <Sun size={16} />;
    return theme === "light" ? <Moon size={16} /> : <Sun size={16} />;
  };

  return (
    <button
      onClick={switchTheme}
      className={`kinetics-social p-2 text-text-2 hover:text-text-1 transition-transform ${className || ""}`}
      aria-label="Toggle theme"
    >
      <ThemeIcon />
    </button>
  );
}

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

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

  const updatePill = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(`a[href="#${activeSection}"]`) as HTMLElement;
    if (activeLink) {
      setPillStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0 h-16 flex items-center justify-between">
          <a href="#hero" className="font-mono text-sm font-medium text-text-1">
            kdraken_
          </a>

          <div className="hidden lg:flex items-center gap-6">
            <div ref={navRef} className="relative flex items-center gap-6">
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
                  </a>
                );
              })}
              <span
                className="kinetics-pill"
                style={{ left: pillStyle.left, width: pillStyle.width }}
              />
            </div>

            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="kinetics-social p-2 -mr-2 text-text-2 hover:text-text-1 transition-colors"
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
