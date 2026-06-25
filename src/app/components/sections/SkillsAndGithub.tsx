"use client";

import { skillGroups } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

export default function SkillsAndGithub() {
  return (
    <section id="skills" className="py-16 sm:py-20 xl:py-24">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="What I work with" title="Tech stack" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      </div>
    </section>
  );
}
