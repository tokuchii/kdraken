"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data";
import MobileDrawer from "./MobileDrawer";

function ThemeToggle() {
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
    const endRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

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
    if (!mounted) return <Sun size={14} />;
    return theme === "light" ? <Moon size={14} /> : <Sun size={14} />;
  };

  return (
    <button
      onClick={switchTheme}
      className="p-1.5 rounded-md text-text-2 hover:text-text-1 hover:bg-border/50 transition-colors"
      aria-label="Toggle theme"
    >
      <ThemeIcon />
    </button>
  );
}

function PresenceAvatars({ count, sessionId }: { count: number; sessionId: string }) {
  const MAX_VISIBLE = 3;
  const avatars = Array.from({ length: Math.min(count, MAX_VISIBLE) }, (_, i) => i);
  const overflow = count - MAX_VISIBLE;

  return (
    <div>
      <div className="flex items-center -space-x-2 mb-2.5">
        {avatars.map((i) => (
          <img
            key={i}
            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${sessionId.slice(0, 8)}-${i}&radius=50&backgroundColor=f1f1f1`}
            alt=""
            className="w-7 h-7 rounded-full border-2 border-surface"
          />
        ))}
        {overflow > 0 && (
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-full bg-border text-text-2 border-2 border-surface" style={{ fontSize: "10px", fontWeight: 600 }}>
            +{overflow}
          </span>
        )}
      </div>
      <span className="text-text-2" style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
        <span className="font-bold text-text-1">{count}</span>{" "}
        {count === 1 ? "person" : "people"} viewing now
      </span>
    </div>
  );
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [sessionId] = useState(() => crypto.randomUUID());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const hb = (action: string) =>
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, sessionId }),
      })
        .then((r) => r.json())
        .then((d) => {
          setCount(d.count);
          try { localStorage.setItem("visitor-count", JSON.stringify({ count: d.count, ts: Date.now() })); } catch {}
        })
        .catch(() => {});

    hb("heartbeat");
    intervalRef.current = setInterval(() => hb("heartbeat"), 15_000);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "visitor-count" && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          if (Date.now() - data.ts < 30_000) setCount(data.count);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("storage", onStorage);
      const blob = new Blob(
        [JSON.stringify({ action: "leave", sessionId })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/visitors", blob);
    };
  }, [sessionId]);

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

  return (
    <>
      {/* Desktop sidebar (lg+) */}
      <nav className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-border bg-surface px-5 py-6 lg:flex">
        <a href="#hero" className="font-mono text-sm font-medium text-text-1 hover:opacity-70 transition-opacity">
          kdraken_
        </a>

        <div className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-text-1 bg-border/40"
                    : "text-text-2 hover:text-text-1 hover:bg-border/30"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("shortcut:ask"))}
              className="inline-flex w-fit items-center gap-2 text-text-2 hover:text-text-1 transition-colors text-xs"
            >
              <span>Ask anything</span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-none text-text-2">Alt</kbd>
                <span className="font-mono text-[10px] text-text-2">+</span>
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-none text-text-2">K</kbd>
              </span>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("shortcut:typing"))}
              className="inline-flex w-fit items-center gap-2 text-text-2 hover:text-text-1 transition-colors text-xs"
            >
              <span>Typing test</span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-none text-text-2">Alt</kbd>
                <span className="font-mono text-[10px] text-text-2">+</span>
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-none text-text-2">J</kbd>
              </span>
            </button>
          </div>

          <div className="border-t border-border mt-4 pt-3">
            <PresenceAvatars count={count} sessionId={sessionId} />
          </div>
        </div>

        <div className="mt-auto">
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <a
                href="mailto:keisermacabos@gmail.com"
                className="text-text-2 hover:text-text-1 transition-colors"
                style={{ fontFamily: "monospace", fontSize: "0.65rem" }}
              >
                keisermacabos@gmail.com
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile top bar (below lg) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border lg:hidden">
        <div className="max-w-[720px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#hero" className="font-mono text-sm font-medium text-text-1">
            kdraken_
          </a>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 text-text-2 hover:text-text-1 transition-colors"
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
