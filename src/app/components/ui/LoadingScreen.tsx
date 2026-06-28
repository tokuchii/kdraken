"use client";

import { useState, useEffect, useMemo } from "react";

const SPOKES = 16;
const RINGS = 12;
const CX = 500;
const CY = 500;
const MAX_R = 700;

function jitter(seed: number, amp: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 2 * amp;
}

function WebSVG({ mirror }: { mirror?: boolean }) {
  const spokes = useMemo(() => {
    return Array.from({ length: SPOKES }, (_, i) => {
      const angle = (i * 360) / SPOKES + jitter(i, 2);
      const rad = (angle * Math.PI) / 180;
      const len = MAX_R + jitter(i + 100, 30);
      return {
        x2: CX + len * Math.cos(rad),
        y2: CY + len * Math.sin(rad),
        delay: i * 55,
      };
    });
  }, []);

  const rings = useMemo(() => {
    return Array.from({ length: RINGS }, (_, i) => {
      const baseR = 40 + i * 55;
      const r = baseR + jitter(i + 200, 8);
      const cxOff = jitter(i + 300, 6);
      const cyOff = jitter(i + 400, 6);
      const circ = 2 * Math.PI * r;
      return { r, cx: CX + cxOff, cy: CY + cyOff, circ, delay: 250 + i * 90 };
    });
  }, []);

  const dustParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const spokeIdx = Math.floor(jitter(i + 500, 1000)) % SPOKES;
      const ringIdx = Math.floor(jitter(i + 600, 1000)) % RINGS;
      const angle = ((spokeIdx < 0 ? spokeIdx + SPOKES : spokeIdx) * 360) / SPOKES;
      const rad = (angle * Math.PI) / 180;
      const r = rings[Math.abs(ringIdx)]?.r ?? 100;
      const x = CX + r * Math.cos(rad) + jitter(i + 700, 20);
      const y = CY + r * Math.sin(rad) + jitter(i + 800, 20);
      const size = 1.5 + jitter(i + 900, 1);
      const dur = 3 + jitter(i + 1000, 2);
      const delay = jitter(i + 1100, 3);
      return { x, y, size, dur, delay };
    });
  }, [rings]);

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        {spokes.map((s, i) => {
          const angle = (i * 360) / SPOKES;
          const rad = (angle * Math.PI) / 180;
          const gx = CX + MAX_R * Math.cos(rad);
          const gy = CY + MAX_R * Math.sin(rad);
          return (
            <linearGradient
              key={`sg-${i}`}
              id={`spoke-grad-${i}${mirror ? "m" : ""}`}
              x1={CX}
              y1={CY}
              x2={gx}
              y2={gy}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.85" />
              <stop offset="40%" stopColor="var(--color-accent)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.08" />
            </linearGradient>
          );
        })}
      </defs>

      {spokes.map((s, i) => (
        <line
          key={`s-${i}`}
          x1={CX}
          y1={CY}
          x2={s.x2}
          y2={s.y2}
          stroke={`url(#spoke-grad-${i}${mirror ? "m" : ""})`}
          strokeWidth="1.2"
          style={{
            strokeDasharray: MAX_R + 50,
            strokeDashoffset: MAX_R + 50,
            animation: `drawLine 1.4s cubic-bezier(0.25,0.1,0.25,1) ${s.delay}ms forwards`,
          }}
        />
      ))}

      {rings.map((ring, i) => {
        const jitterPath = Array.from({ length: 60 }, (_, j) => {
          const a = (j / 60) * Math.PI * 2;
          const rr = ring.r + jitter(i * 60 + j + 1200, 4);
          const px = ring.cx + rr * Math.cos(a);
          const py = ring.cy + rr * Math.sin(a);
          return `${j === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`;
        }).join(" ") + " Z";
        return (
          <path
            key={`r-${i}`}
            d={jitterPath}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.9"
            opacity={0.4 - i * 0.015}
            style={{
              strokeDasharray: ring.circ + 50,
              strokeDashoffset: ring.circ + 50,
              animation: `drawRing 1.8s cubic-bezier(0.25,0.1,0.25,1) ${ring.delay}ms forwards`,
            }}
          />
        );
      })}

      {dustParticles.map((p, i) => (
        <circle
          key={`dust-${i}`}
          r={p.size}
          fill="var(--color-accent)"
          opacity="0"
          style={{
            animation: `dustFloat ${p.dur}s ease-in-out ${1.2 + Math.abs(p.delay)}s infinite`,
          }}
        >
          <animateMotion
            dur={`${p.dur}s`}
            repeatCount="indefinite"
            begin={`${1.2 + Math.abs(p.delay)}s`}
            path={`M ${p.x} ${p.y} C ${p.x + jitter(i, 30)} ${p.y - 20} ${p.x - 15} ${p.y + 25} ${p.x + 10} ${p.y - 5}`}
          />
        </circle>
      ))}

      {/* Center spider body */}
      <g style={{ opacity: 0, animation: "fadeIn 0.4s ease-out 0.6s forwards" }}>
        <ellipse cx={CX} cy={CY - 10} rx="9" ry="13" fill="var(--color-accent)" />
        <ellipse cx={CX} cy={CY + 10} rx="6" ry="6" fill="var(--color-accent)" />
        {[-1, 1].map((side) =>
          [0, 1, 2, 3].map((i) => (
            <path
              key={`${side}-${i}`}
              d={`M ${CX + side * 7} ${CY - 14 + i * 7} Q ${CX + side * (30 + i * 8)} ${CY - 20 + i * 10} ${CX + side * (40 + i * 10)} ${CY - 12 + i * 12}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))
        )}
        <ellipse cx={CX - 5} cy={CY - 14} rx="4" ry="3" fill="var(--color-background)" opacity="0.95" />
        <ellipse cx={CX + 5} cy={CY - 14} rx="4" ry="3" fill="var(--color-background)" opacity="0.95" />
      </g>
    </svg>
  );
}

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "opening" | "done">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 2800);
    const t2 = setTimeout(() => setPhase("done"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden ${
        phase === "opening" ? "pointer-events-none" : ""
      }`}
    >
      {/* Left curtain */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-background transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "opening" ? "-translate-x-full" : ""
        }`}
      >
        <WebSVG />
      </div>

      {/* Right curtain */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-background transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "opening" ? "translate-x-full" : ""
        }`}
      >
        <WebSVG mirror />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Center seam */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px z-10 transition-opacity duration-300 ${
          phase === "opening" ? "opacity-0" : "opacity-40"
        }`}
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 12px 2px var(--color-accent)",
        }}
      />

      <style jsx>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawRing {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes dustFloat {
          0%, 100% { opacity: 0; }
          30% { opacity: 0.5; }
          70% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
