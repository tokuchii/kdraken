"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";

type Phase = "web" | "reveal" | "done";

export default function LoaderOverlay() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("web");
  const [fading, setFading] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);
  const [pct, setPct] = useState(0);
  const [hud, setHud] = useState({
    threads: 0,
    integrity: 0,
    signal: "ACQUIRING…",
    sequence: "INIT",
  });
  const [hudVisible, setHudVisible] = useState(false);
  const webRef = useRef<HTMLCanvasElement>(null);
  const prtRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(false);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";
  }, []);

  const unlockScroll = useCallback(() => {
    const top = document.body.style.top;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    if (top) window.scrollTo(0, parseInt(top || "0") * -1);
  }, []);

  useEffect(() => {
    setMounted(true);
    lockScroll();
  }, [lockScroll]);

  useEffect(() => {
    if (mounted) {
      darkRef.current = resolvedTheme === "dark";
    }
  }, [mounted, resolvedTheme]);

  const isDark = mounted && resolvedTheme === "dark";

  const dismiss = useCallback(() => {
    if (phase === "done" || sliding) return;
    setSliding(true);
    setTimeout(() => {
      setPhase("done");
      unlockScroll();
      setTimeout(() => setShowCoffee(true), 10000);
    }, 800);
  }, [phase, sliding, unlockScroll]);

  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, dismiss]);

  useEffect(() => {
    if (!webRef.current || !prtRef.current) return;
    const webC = webRef.current;
    const prtC = prtRef.current;
    const webX = webC.getContext("2d")!;
    const prtX = prtC.getContext("2d")!;
    let W: number, H: number, CX: number, CY: number;
    let particles: any[] = [];
    let pulseRings: any[] = [];
    let glints: any[] = [];
    let raf: number;
    let lastSpawn = 0;
    let lastPulse = 0;
    let lastGlint = 0;
    let frameCount = 0;

    function resize() {
      const parent = webC.parentElement!;
      W = parent.clientWidth;
      H = parent.clientHeight;
      webC.width = prtC.width = W;
      webC.height = prtC.height = H;
      CX = W / 2;
      CY = H / 2;
    }

    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function ease3(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function drawWeb(prog: number, elapsed: number) {
      const dark = darkRef.current;
      const bg = dark ? "#09090B" : "#ffffff";
      const strand = dark ? "255,255,255" : "0,0,0";

      // Web breath: subtle scale pulse after build completes
      const breathScale = prog >= 1 ? 1 + Math.sin(elapsed * 0.003) * 0.008 : 1;

      webX.clearRect(0, 0, W, H);
      webX.fillStyle = bg;
      webX.fillRect(0, 0, W, H);

      webX.save();
      webX.translate(CX, CY);
      webX.scale(breathScale, breathScale);
      webX.translate(-CX, -CY);

      const SPOKES = 16, RINGS = 12;
      const maxR = Math.hypot(CX, CY) * 1.18;
      const innerR = 4;

      for (let s = 0; s < SPOKES; s++) {
        const angle = (s / SPOKES) * Math.PI * 2;
        const sp = Math.max(0, Math.min(1, (prog * SPOKES * 1.1 - s) / 1.8));
        if (sp <= 0) continue;
        const ep = ease(sp);
        const x1 = CX + Math.cos(angle) * innerR;
        const y1 = CY + Math.sin(angle) * innerR;
        const x2 = CX + Math.cos(angle) * maxR * ep;
        const y2 = CY + Math.sin(angle) * maxR * ep;

        const grd = webX.createLinearGradient(x1, y1, x2, y2);
        grd.addColorStop(0, `rgba(${strand},0.55)`);
        grd.addColorStop(0.15, `rgba(${strand},${0.28 + ep * 0.18})`);
        grd.addColorStop(0.6, `rgba(${strand},${0.14 + ep * 0.1})`);
        grd.addColorStop(1, `rgba(${strand},0.04)`);

        webX.beginPath();
        webX.moveTo(x1, y1);
        webX.lineTo(x2, y2);
        webX.strokeStyle = grd;
        webX.lineWidth = 0.6 + ep * 0.5;
        webX.stroke();

        if (ep > 0.5) {
          const shimmerX = CX + Math.cos(angle) * maxR * ep * 0.55;
          const shimmerY = CY + Math.sin(angle) * maxR * ep * 0.55;
          const shimmerGrd = webX.createRadialGradient(shimmerX, shimmerY, 0, shimmerX, shimmerY, 12);
          shimmerGrd.addColorStop(0, `rgba(${strand},0.07)`);
          shimmerGrd.addColorStop(1, `rgba(${strand},0)`);
          webX.fillStyle = shimmerGrd;
          webX.fillRect(shimmerX - 12, shimmerY - 12, 24, 24);
        }
      }

      for (let r = 1; r <= RINGS; r++) {
        const rp = Math.max(0, Math.min(1, (prog * RINGS * 1.35 - r + 1) / 1.4));
        if (rp <= 0) continue;
        const ep = ease(rp);
        const radius = innerR + (r / RINGS) * (maxR * 0.86 - innerR);

        webX.beginPath();
        for (let s = 0; s <= SPOKES; s++) {
          const angle = (s / SPOKES) * Math.PI * 2;
          const seed1 = Math.sin(s * 5.1 + r * 2.3) * 0.4 + Math.cos(s * 3.7 + r * 4.1) * 0.6;
          const seed2 = Math.cos(s * 4.9 + r * 1.7) * 0.5 + Math.sin(s * 2.3 + r * 6.3) * 0.5;
          const jx = seed1 * 3.5;
          const jy = seed2 * 3.5;
          const x = CX + Math.cos(angle) * radius + jx;
          const y = CY + Math.sin(angle) * radius + jy;
          s === 0 ? webX.moveTo(x, y) : webX.lineTo(x, y);
        }
        webX.closePath();
        const distFactor = 1 - (r / RINGS) * 0.5;
        const alpha = (0.06 + ep * 0.12 + (1 - r / RINGS) * 0.08) * distFactor;
        webX.strokeStyle = `rgba(${strand},${alpha})`;
        webX.lineWidth = 0.4 + ep * 0.3 * (1 - (r / RINGS) * 0.5);
        webX.stroke();
      }

      // Shimmer glints
      glints = glints.filter((g) => g.life > 0);
      for (const g of glints) {
        g.life -= g.decay;
        const glow = webX.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.size * 3);
        glow.addColorStop(0, `rgba(${strand},${g.life * 0.7})`);
        glow.addColorStop(0.5, `rgba(${strand},${g.life * 0.2})`);
        glow.addColorStop(1, `rgba(${strand},0)`);
        webX.fillStyle = glow;
        webX.fillRect(g.x - g.size * 3, g.y - g.size * 3, g.size * 6, g.size * 6);
      }

      // Center dot
      if (prog > 0.9) {
        const dot = ease((prog - 0.9) / 0.1);
        webX.beginPath();
        webX.arc(CX, CY, 2, 0, Math.PI * 2);
        webX.fillStyle = `rgba(${strand},${dot * 0.5})`;
        webX.fill();
      }

      // Pulse rings
      for (const pr of pulseRings) {
        const t = ease3(pr.t);
        webX.beginPath();
        webX.arc(CX, CY, pr.maxR * t, 0, Math.PI * 2);
        webX.strokeStyle = `rgba(${strand},${(1 - t) * 0.12})`;
        webX.lineWidth = 1;
        webX.stroke();
      }

      webX.restore();
    }

    function spawnParticles(n: number, burst: boolean) {
      const maxR = Math.hypot(CX, CY) * 1.18;
      for (let i = 0; i < n; i++) {
        const spoke = Math.floor(Math.random() * 16);
        const angle = (spoke / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
        const d = burst ? 20 + Math.random() * maxR * 0.9 : 50 + Math.random() * (maxR * 0.85 - 50);
        const speed = burst ? 0.8 + Math.random() * 1.2 : 0.15 + Math.random() * 0.3;
        particles.push({
          x: CX + Math.cos(angle) * d,
          y: CY + Math.sin(angle) * d,
          vx: Math.cos(angle) * speed * (burst ? 1 : 0.3) + (Math.random() - 0.5) * 0.2,
          vy: Math.sin(angle) * speed * (burst ? 1 : 0.3) + (Math.random() - 0.5) * 0.2,
          life: 1,
          decay: burst ? 0.018 + Math.random() * 0.022 : 0.006 + Math.random() * 0.009,
          size: Math.random() * (burst ? 2 : 1.4) + 0.3,
          bright: burst ? 0.5 + Math.random() * 0.5 : 0.2 + Math.random() * 0.4,
        });
      }
    }

    function tickParticles() {
      const strand = darkRef.current ? "255,255,255" : "0,0,0";
      prtX.clearRect(0, 0, W, H);
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        prtX.beginPath();
        prtX.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        prtX.fillStyle = `rgba(${strand},${p.life * p.bright * 0.45})`;
        prtX.fill();
      }
    }

    function spawnGlint() {
      const maxR = Math.hypot(CX, CY) * 1.18;
      const spoke = Math.floor(Math.random() * 16);
      const angle = (spoke / 16) * Math.PI * 2;
      const dist = 40 + Math.random() * (maxR * 0.7);
      glints.push({
        x: CX + Math.cos(angle) * dist,
        y: CY + Math.sin(angle) * dist,
        size: 2 + Math.random() * 2,
        life: 1,
        decay: 0.025 + Math.random() * 0.02,
      });
    }

    function tickPulse() {
      pulseRings = pulseRings.filter((pr) => pr.t < 1);
      for (const pr of pulseRings) pr.t = Math.min(1, pr.t + 0.012);
    }

    function updateHud(raw: number) {
      frameCount++;
      if (frameCount % 3 !== 0) return;
      const p = Math.round(raw * 100);
      const threads = Math.round(raw * 192);
      const integrity = Math.min(99.9, 42 + raw * 57.9);
      const signals = ["ACQUIRING…", "SYNC OK", "LOCKED", "NOMINAL", "SIGNAL: STRONG"];
      const sigIdx = Math.min(4, Math.floor(raw * 5));
      const seqs = ["INIT", "THREADING", "WEAVING", "SPINNING", "COMPLETE"];
      const seqIdx = Math.min(4, Math.floor(raw * 5));
      setPct(p);
      setHud({
        threads,
        integrity: parseFloat(integrity.toFixed(1)),
        signal: signals[sigIdx],
        sequence: seqs[seqIdx],
      });
    }

    function boot() {
      resize();
      particles = [];
      pulseRings = [];
      frameCount = 0;
      if (raf) cancelAnimationFrame(raf);
      webX.clearRect(0, 0, W, H);
      prtX.clearRect(0, 0, W, H);
      lastSpawn = 0;
      lastPulse = 0;

      setTimeout(() => setHudVisible(true), 400);

      const DURATION = 2000;
      const start = performance.now();

      function tick(now: number) {
        const elapsed = now - start;
        const raw = Math.min(elapsed / DURATION, 1);
        const prog = ease(raw);

        tickPulse();
        drawWeb(prog, elapsed);
        tickParticles();
        updateHud(raw);

        if (now - lastSpawn > 170) {
          spawnParticles(2, false);
          lastSpawn = now;
        }

        if (prog > 0.3 && now - lastGlint > 90) {
          spawnGlint();
          lastGlint = now;
        }

        if (raw > 0.6 && now - lastPulse > 1200) {
          pulseRings.push({ t: 0, maxR: Math.hypot(CX, CY) * 0.55 });
          lastPulse = now;
        }

        if (raw < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            spawnParticles(70, true);
            function extra(now: number) {
              tickParticles();
              drawWeb(1, now - start);
              if (particles.length > 0 || glints.length > 0) requestAnimationFrame(extra);
            }
            requestAnimationFrame(extra);
            setTimeout(() => setPhase("reveal"), 600);
          }, 500);
        }
      }
      raf = requestAnimationFrame(tick);
    }

    boot();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (phase === "done" && !showCoffee) return null;

  return (
    <>
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden ${
        sliding ? "pointer-events-none" : ""
      } ${isDark ? "bg-[#09090B]" : "bg-white"}`}
      onClick={phase === "reveal" ? dismiss : undefined}
      style={{
        cursor: phase === "reveal" ? "pointer" : "default",
        transition: sliding ? "transform 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
        transform: sliding ? "translateY(100%)" : "translateY(0)",
      }}
    >
      {/* Canvas layers */}
      <div className="absolute inset-0" style={{ opacity: phase === "web" ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <canvas ref={webRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }} />
        <canvas ref={prtRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 4,
            background: "repeating-linear-gradient(0deg,rgba(0,0,0,0) 0px,rgba(0,0,0,0) 3px,rgba(0,0,0,0.012) 3px,rgba(0,0,0,0.012) 4px)",
          }}
        />
      </div>

      {/* Corner brackets */}
      {phase === "web" && (
        <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: hudVisible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
          <svg className="absolute top-5 left-5 w-10 h-10" viewBox="0 0 40 40"><path d="M0 12 L0 0 L12 0" fill="none" stroke={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"} strokeWidth="1" /></svg>
          <svg className="absolute top-5 right-5 w-10 h-10" viewBox="0 0 40 40"><path d="M28 0 L40 0 L40 12" fill="none" stroke={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"} strokeWidth="1" /></svg>
          <svg className="absolute bottom-5 left-5 w-10 h-10" viewBox="0 0 40 40"><path d="M0 28 L0 40 L12 40" fill="none" stroke={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"} strokeWidth="1" /></svg>
          <svg className="absolute bottom-5 right-5 w-10 h-10" viewBox="0 0 40 40"><path d="M28 40 L40 40 L40 28" fill="none" stroke={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"} strokeWidth="1" /></svg>
        </div>
      )}

      {/* HUD panels */}
      {phase === "web" && (
        <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: hudVisible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <div className={`absolute top-8 left-8 font-mono text-[10px] leading-5 select-none ${isDark ? "text-white/40" : "text-black/40"}`}>
            <div className={`tracking-[3px] uppercase mb-0.5 ${isDark ? "text-white/25" : "text-black/25"}`}>Thread Density</div>
            <div className={`tabular-nums ${isDark ? "text-white/50" : "text-black/50"}`}>{hud.threads} / 192</div>
          </div>
          <div className={`absolute top-8 right-8 font-mono text-[10px] leading-5 text-right select-none ${isDark ? "text-white/40" : "text-black/40"}`}>
            <div className={`tracking-[3px] uppercase mb-0.5 ${isDark ? "text-white/25" : "text-black/25"}`}>Web Integrity</div>
            <div className={`tabular-nums ${isDark ? "text-white/50" : "text-black/50"}`}>{hud.integrity}%</div>
          </div>
          <div className={`absolute bottom-8 left-8 font-mono text-[10px] leading-5 select-none ${isDark ? "text-white/40" : "text-black/40"}`}>
            <div className={`tracking-[3px] uppercase mb-0.5 ${isDark ? "text-white/25" : "text-black/25"}`}>Signal ID</div>
            <div className={`tabular-nums ${isDark ? "text-white/50" : "text-black/50"}`}>
              {hud.signal}
              {hud.signal === "LOCKED" && <span className={`inline-block w-1.5 h-1.5 rounded-full ml-1.5 animate-pulse ${isDark ? "bg-white/40" : "bg-black/40"}`} />}
            </div>
          </div>
          <div className={`absolute bottom-8 right-8 font-mono text-[10px] leading-5 text-right select-none ${isDark ? "text-white/40" : "text-black/40"}`}>
            <div className={`tracking-[3px] uppercase mb-0.5 ${isDark ? "text-white/25" : "text-black/25"}`}>Sequence</div>
            <div className={`tabular-nums tracking-wider ${isDark ? "text-white/50" : "text-black/50"}`}>{hud.sequence}</div>
          </div>
        </div>
      )}

      {/* Percentage counter */}
      {phase === "web" && (
        <div
          className="absolute left-0 right-0 z-10 flex justify-center pointer-events-none select-none"
          style={{ top: "calc(50% + 52px)", opacity: hudVisible ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}
        >
          <span className={`font-mono text-[11px] tracking-[6px] tabular-nums ${isDark ? "text-white/30" : "text-black/30"}`}>
            {String(pct).padStart(3, "\u2007")}%
          </span>
        </div>
      )}

      {/* Reveal phase — typographic layout */}
      {phase === "reveal" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center select-none">
          {/* Eyebrow */}
          <div
            className={`text-[10px] tracking-[6px] uppercase mb-6 ${isDark ? "text-white/40" : "text-black/40"}`}
            style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 0.2s forwards" }}
          >
            creative portfolio
          </div>

          {/* Name */}
          <div
            className={`text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[6px] leading-none ${isDark ? "text-white" : "text-black"}`}
            style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 0.45s forwards" }}
          >
            kdraken_
          </div>

          {/* Divider */}
          <div
            className={`w-10 h-[1.5px] my-7 ${isDark ? "bg-white" : "bg-black"}`}
            style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 0.7s forwards" }}
          />

          {/* Tagline */}
          <div
            className={`text-[11px] tracking-[5px] uppercase ${isDark ? "text-white/55" : "text-black/55"}`}
            style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 0.95s forwards" }}
          >
            full-stack developer &nbsp;&middot;&nbsp; laguna, philippines
          </div>

          {/* Enter prompt */}
          <div
            className="mt-14 flex flex-col items-center gap-2"
            style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 1.6s forwards, pulse 2s ease-in-out 2.2s infinite" }}
          >
            <span className={`text-[10px] tracking-[4px] uppercase font-mono ${isDark ? "text-white/35" : "text-black/35"}`}>
              Click or press Enter
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isDark ? "text-white/30" : "text-black/30"}>
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>

    {/* Buy Me a Coffee modal — first session only */}
    {showCoffee && (
      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
        onClick={() => { setShowCoffee(false); unlockScroll(); }}
      >
        <div
          className={`relative max-w-sm w-full rounded-2xl p-8 text-center ${
            isDark ? "bg-[#18181B] border border-[#27272A]" : "bg-white border border-[#E4E4E7] shadow-xl"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
        >
          <button
            onClick={() => { setShowCoffee(false); unlockScroll(); }}
            className={`absolute top-4 right-4 text-xs cursor-pointer ${isDark ? "text-white/30 hover:text-white/60" : "text-black/30 hover:text-black/60"}`}
          >
            ✕
          </button>

          <h3 className={`text-lg font-extrabold tracking-tight mb-2 ${isDark ? "text-white" : "text-black"}`}>
            Enjoying the site?
          </h3>

          <p className={`text-sm mb-5 leading-relaxed ${isDark ? "text-white/70" : "text-black/60"}`}>
            If this portfolio impressed you, consider buying me a coffee. It keeps me building.
          </p>

          <div className="flex flex-col items-center gap-4">
            <img
              src="/files/qr-code.png"
              alt="Buy me a coffee QR code"
              className={`w-36 h-36 rounded-xl object-contain ${isDark ? "bg-white p-1" : "bg-white border border-[#E4E4E7] p-1"}`}
            />

            <a
              href="https://buymeacoffee.com/kendrake"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "#FFDD00",
                color: "#000000",
              }}
            >
              <span className="text-lg">☕</span>
              Buy me a coffee
            </a>
          </div>

          <button
            onClick={() => { setShowCoffee(false); unlockScroll(); }}
            className={`block mx-auto mt-4 text-xs cursor-pointer ${isDark ? "text-white/25 hover:text-white/50" : "text-black/25 hover:text-black/50"}`}
          >
            Maybe later
          </button>
        </div>
      </div>
    )}
    </>
  );
}
