"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { skillGroups } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";
import { ContributionData, ContributionDay } from "@/lib/types";
import { transformContributions, generateFallbackData } from "@/lib/github";

const CELL_MAX = 11;
const GAP = 2;

function parseUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function Tooltip({ day, x, y }: { day: ContributionDay; x: number; y: number }) {
  const formatted = parseUTC(day.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <div
      className="fixed z-50 px-3 py-2 rounded-md bg-surface border border-border text-xs text-text-1 shadow-xl pointer-events-none font-mono"
      style={{ left: x, top: y - 12, transform: "translate(-50%, -100%)" }}
    >
      <span className="font-medium">{day.count} contributions</span>
      <span className="ml-2 text-text-2">{formatted}</span>
    </div>
  );
}

function useFitCell(weekCount: number, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [cell, setCell] = useState(CELL_MAX);
  useEffect(() => {
    if (!weekCount) return;
    const calc = () => {
      const w = containerRef.current?.offsetWidth ?? window.innerWidth - 32;
      const c = Math.floor((w - (weekCount - 1) * GAP) / weekCount);
      setCell(Math.min(Math.max(c, 4), CELL_MAX));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [weekCount, containerRef]);
  return cell;
}

export default function SkillsAndGithub() {
  const [contribData, setContribData] = useState<ContributionData | null>(null);
  const [tooltip, setTooltip] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setContribData(generateFallbackData());
          return;
        }
        setContribData(transformContributions(json));
      })
      .catch(() => setContribData(generateFallbackData()));
  }, []);

  const CELL = useFitCell(contribData?.weeks.length ?? 0, containerRef);
  const gridWidth = contribData ? contribData.weeks.length * CELL + (contribData.weeks.length - 1) * GAP : 0;

  return (
    <section id="skills" className="relative py-10 sm:py-14 xl:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none hidden lg:block">
        <img
          src="/files/spider3.png"
          alt=""
          className="absolute bottom-[-10%] right-[-5%] h-[70vh] xl:h-[90vh] w-auto object-contain object-bottom-right opacity-10 dark:invert dark:opacity-15"
        />
      </div>
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="What I work with" title="Tech stack" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {skillGroups.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.08}>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-2">
                  {group.category}
                </h3>
                <p className="text-text-1 text-sm leading-relaxed">
                  {group.items.join(" · ")}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {contribData && (
          <>
            <FadeIn delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-[13px] uppercase tracking-widest text-text-2"
                  style={{ fontFamily: "monospace" }}
                >
                  — github
                </h3>
                <a
                  href="https://github.com/tokuchii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] text-text-2 hover:text-text-1 transition-colors"
                  style={{ fontFamily: "monospace" }}
                >
                  @TOKUCHII ↗
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href="https://github.com/tokuchii"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div ref={containerRef} className="mb-3">
                  <div
                    className="flex"
                    style={{ gap: GAP, width: gridWidth }}
                  >
                    {contribData.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col items-center" style={{ gap: GAP }}>
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          const day = week.days.find((d) => {
                            return parseUTC(d.date).getUTCDay() === dayIndex;
                          });

                          if (!day) {
                            return (
                              <span
                                key={`${wi}-${dayIndex}`}
                                style={{ width: CELL, height: CELL }}
                              />
                            );
                          }

                          const hasContrib = day.count > 0;
                          const dotSize = hasContrib ? Math.min(Math.round(3 + day.count * 1.5), CELL) : 3;

                          return (
                            <button
                              key={day.date}
                              className="rounded-full outline-none hover:ring-2 hover:ring-black/20 dark:hover:ring-white/20 transition-all duration-200 hover:scale-125"
                              style={{
                                width: CELL,
                                height: CELL,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                              }}
                              onMouseEnter={(e) =>
                                setTooltip({ day, x: e.clientX, y: e.clientY })
                              }
                              onMouseMove={(e) =>
                                setTooltip((prev) =>
                                  prev ? { ...prev, x: e.clientX, y: e.clientY } : prev
                                )
                              }
                              onMouseLeave={() => setTooltip(null)}
                              aria-label={`${day.count} contributions on ${day.date}`}
                            >
                              <span
                                style={{
                                  width: dotSize,
                                  height: dotSize,
                                  borderRadius: "50%",
                                  backgroundColor: isDark ? "#fafafa" : "#18181b",
                                  opacity: hasContrib ? 1 : 0.12,
                                  display: "block",
                                  flexShrink: 0,
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-sm text-text-2" style={{ fontFamily: "monospace" }}>
                <span className="text-text-1 font-medium">{contribData.totalContributions.toLocaleString()}</span>{" "}
                contributions this year
              </p>
            </FadeIn>
          </>
        )}
      </div>

      {tooltip && <Tooltip day={tooltip.day} x={tooltip.x} y={tooltip.y} />}
    </section>
  );
}
