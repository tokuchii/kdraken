"use client";

import { skillGroups } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

export default function SkillsAndGithub() {
  return (
    <section id="skills" className="relative py-10 sm:py-14 xl:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none hidden lg:block">
        <img
          src="/files/spider3.png"
          alt=""
          className="absolute bottom-[-30%] right-[-5%] h-[70vh] xl:h-[90vh] w-auto object-contain object-bottom-right opacity-10 dark:invert dark:opacity-15"
        />
      </div>
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
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
