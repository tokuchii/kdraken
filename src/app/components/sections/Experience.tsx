"use client";

import { ArrowRightIcon } from "lucide-react";
import { experience } from "@/lib/data";
import FadeIn from "../ui/FadeIn";

function extractYear(dates: string): string {
  const match = dates.match(/(\d{4})/);
  return match ? match[1] : dates;
}

export default function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-14 xl:py-16">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="font-mono text-[11px] uppercase tracking-widest text-text-2"
            >
              experience
            </h2>
            <a
              href="https://github.com/tokuchii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-text-2 hover:text-text-1 transition-colors flex items-center gap-1"
            >
              FULL HISTORY <ArrowRightIcon size={10} />
            </a>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {experience.map((job, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-baseline gap-4 sm:gap-8 py-4 border-b border-border group hover:border-text-2 transition-colors">
                <span className="font-mono text-[13px] text-text-2 shrink-0 w-10">
                  {extractYear(job.dates)}
                </span>
                <span className="font-medium text-text-1 text-[14px] flex-1">
                  {job.role}
                </span>
                <span className="text-text-2 text-[13px] shrink-0 hidden sm:block">
                  {job.company}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
