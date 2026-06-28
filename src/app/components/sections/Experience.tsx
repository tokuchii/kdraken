"use client";

import { experience } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

export default function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-14 xl:py-16 bg-surface web-pattern">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="Where I've worked" title="Experience" />

        <div className="relative pl-6 lg:pl-8 border-l border-border space-y-8 lg:space-y-10">
          {experience.map((job, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="relative">
                <div className="absolute -left-[calc(1.5rem+4px)] lg:-left-[calc(2rem+4px)] top-1 w-2 h-2 rounded-full bg-accent" />

                <h3 className="font-extrabold text-base text-text-1 tracking-tight">
                  {job.role}
                </h3>
                <p className="text-sm text-text-2">
                  {job.company}
                  {job.location && (
                    <span className="text-text-2"> → {job.location}</span>
                  )}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="text-sm text-text-2 leading-relaxed">
                      · {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
