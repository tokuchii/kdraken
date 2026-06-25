"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { aboutContent, GITHUB_USERNAME } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

export default function About() {
  const [stats, setStats] = useState(aboutContent.stats);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
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
    <section id="about" className="py-16 sm:py-20 xl:py-24">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="Who I am" title="About" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16">
          <FadeIn>
            <div className="space-y-4">
              {aboutContent.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-text-2 leading-relaxed">
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
                <div key={i}>
                  <span className="font-mono text-2xl text-text-1">
                    {stat.value}
                  </span>
                  <p className="font-mono text-[11px] text-text-2 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
