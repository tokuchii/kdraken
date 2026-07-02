"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { skillGroups } from "@/lib/data";
import { ArrowRightIcon } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { ContributionData, ContributionDay } from "@/lib/types";
import { transformContributions, generateFallbackData } from "@/lib/github";

const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchContributions = useCallback(async (silent = false) => {
    try {
      if (!silent) setIsRefreshing(true);
      const res = await fetch("/api/contributions");
      const json = await res.json();
      if (json.error) {
        setContribData(generateFallbackData());
      } else {
        setContribData(transformContributions(json));
      }
      setLastUpdated(new Date());
    } catch {
      setContribData(generateFallbackData());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchContributions();
    intervalRef.current = setInterval(() => fetchContributions(true), POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchContributions]);

  const CELL = useFitCell(contribData?.weeks.length ?? 0, containerRef);
  const gridWidth = contribData ? contribData.weeks.length * CELL + (contribData.weeks.length - 1) * GAP : 0;

  return (
    <section id="skills" className="relative py-10 sm:py-14 xl:py-16 overflow-hidden">
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-text-2">
              stack
            </h2>
            <a
              href="https://github.com/tokuchii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-text-2 hover:text-text-1 transition-colors flex items-center gap-1"
            >
              VIEW ALL <ArrowRightIcon size={10} />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {[...new Set(showAllSkills
              ? skillGroups.flatMap((g) => g.items)
              : skillGroups.flatMap((g) => g.items).slice(0, 10)
            )].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg border border-border text-[13px] text-text-1 font-mono hover:border-text-2 transition-colors"
              >
                {skill}
              </span>
            ))}
            {!showAllSkills && (
              <button
                onClick={() => setShowAllSkills(true)}
                className="px-3 py-1.5 rounded-lg border border-dashed border-border text-[13px] text-text-2 font-mono hover:border-text-2 hover:text-text-1 transition-colors"
              >
                + more
              </button>
            )}
          </div>
        </FadeIn>

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
              <div className="flex items-center justify-between">
                <p className="text-text-2 tracking-wider uppercase" style={{ fontFamily: "monospace", fontSize: "clamp(0.6875rem, 1vw, 0.75rem)" }}>
                  <span className="text-text-2 font-xs">{contribData.totalContributions.toLocaleString()}</span>{" "}
                  contributions this year
                </p>
                <div className="flex items-center gap-2">
                  {lastUpdated && (
                    <span
                      className="text-text-2"
                      style={{ fontFamily: "monospace", fontSize: "0.6rem" }}
                    >
                      {isRefreshing ? "updating..." : `updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      fetchContributions();
                    }}
                    className="text-text-2 hover:text-text-1 transition-colors p-1 rounded hover:bg-border/50"
                    aria-label="Refresh contributions"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isRefreshing ? "animate-spin" : ""}
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
                    </svg>
                  </button>
                </div>
              </div>
            </FadeIn>
          </>
        )}
      </div>

      {tooltip && <Tooltip day={tooltip.day} x={tooltip.x} y={tooltip.y} />}
    </section>
  );
}
