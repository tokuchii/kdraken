"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBump(true), delay);
    const reset = setTimeout(() => setBump(false), delay + 400);
    return () => { clearTimeout(timer); clearTimeout(reset); };
  }, [delay, value]);

  return (
    <div>
      <span className={`kinetics-bump ${bump ? "animate-bump" : ""} font-mono text-2xl text-text-1 font-extrabold`}>
        {value}
      </span>
      <p className="font-mono text-[11px] text-text-2 mt-1">{label}</p>
    </div>
  );
}

export default function About() {
  const [stats, setStats] = useState(aboutContent.stats);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((user) => {
        if (user.public_repos) {
          setStats([
            { value: `${user.public_repos}+`, label: "projects" },
            { value: "3+", label: "languages" },
            { value: "4", label: "frameworks" },
            { value: "∞", label: "learning" },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-10 sm:py-14 xl:py-16">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="Who I am" title="About" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16">
          <FadeIn>
            <div className="space-y-4">
              {aboutContent.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-text-2 leading-relaxed" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)" }}>
                  {paragraph}
                </p>
              ))}

              <a
                href={aboutContent.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1 text-sm text-accent mt-2"
              >
                View resume <ArrowUpRight size={14} />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {stats.map((stat, i) => (
                <AnimatedStat key={i} value={stat.value} label={stat.label} delay={600 + i * 150} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
