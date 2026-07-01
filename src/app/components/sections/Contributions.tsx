"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";
import { ContributionData, ContributionDay } from "@/lib/types";
import { transformContributions, getLevelColor, generateFallbackData } from "@/lib/github";

const CELL = 11;
const GAP = 3;

interface MonthLabel {
  label: string;
  weekIndex: number;
  dayOffset: number;
}

function getMonthLabels(weeks: ContributionData["weeks"]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let lastMonth = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const firstDay = weeks[wi].days[0];
    if (!firstDay) continue;
    const date = new Date(firstDay.date + "T00:00:00");
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({
        label: date.toLocaleString("en-US", { month: "short" }),
        weekIndex: wi,
        dayOffset: 0,
      });
      lastMonth = month;
    }
  }
  return labels;
}

function Tooltip({ day, x, y }: { day: ContributionDay; x: number; y: number }) {
  const formatted = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
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

export default function Contributions() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [tooltip, setTooltip] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetch("/api/contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setData(generateFallbackData());
          return;
        }
        setData(transformContributions(json));
      })
      .catch(() => setData(generateFallbackData()));
  }, []);

  if (!data) return null;

  const monthLabels = getMonthLabels(data.weeks);

  // Build a 7-row grid: pad first week so Sunday starts at row 0
  // GitHub API weeks start on Sunday, so days[0] = Sunday
  // We need to ensure the grid is properly aligned

  return (
    <section id="contributions" className="relative py-10 sm:py-14 xl:py-16 overflow-hidden">
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <SectionHeading eyebrow="Activity" title="Contributions" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-text-2 mb-4 font-mono tracking-wider uppercase" style={{ fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)" }}>
            <span className="text-text-2 font-medium">{data.totalContributions.toLocaleString()}</span>{" "}
            contributions in the last year
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex flex-col min-w-fit">
              {/* Month labels */}
              <div className="flex ml-[36px] mb-1 text-[10px] font-mono text-text-2 relative h-[14px]">
                {monthLabels.map((m, i) => (
                  <span
                    key={i}
                    className="absolute whitespace-nowrap"
                    style={{ left: m.weekIndex * (CELL + GAP) }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Grid: day labels + week columns */}
              <div className="flex">
                {/* Day-of-week labels */}
                <div className="flex flex-col mr-[4px]" style={{ gap: GAP }}>
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-text-2 flex items-center"
                      style={{ height: CELL }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Week columns */}
                <div className="flex" style={{ gap: GAP }}>
                  {data.weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const day = week.days.find((d) => {
                          const dow = new Date(d.date + "T00:00:00").getDay();
                          return dow === dayIndex;
                        });

                        if (!day) {
                          return (
                            <span
                              key={`${wi}-${dayIndex}`}
                              style={{ width: CELL, height: CELL }}
                            />
                          );
                        }

                        return (
                          <button
                            key={day.date}
                            className="rounded-[3px] outline-none focus-visible:ring-0 focus-visible:outline-none transition-all duration-150"
                            style={{
                              width: CELL,
                              height: CELL,
                              backgroundColor: getLevelColor(day.level, isDark),
                              outline: 'none',
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
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-[3px] mt-2 ml-[36px] text-[10px] font-mono text-text-2">
                <span className="mr-1">Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="rounded-[3px]"
                    style={{
                      width: CELL,
                      height: CELL,
                      backgroundColor: getLevelColor(level as 0 | 1 | 2 | 3 | 4, isDark),
                    }}
                  />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {tooltip && <Tooltip day={tooltip.day} x={tooltip.x} y={tooltip.y} />}
    </section>
  );
}
