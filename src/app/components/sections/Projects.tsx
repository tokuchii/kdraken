"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ArrowRightIcon } from "lucide-react";
import { Project } from "@/lib/types";
import FadeIn from "../ui/FadeIn";
import Tag from "../ui/Tag";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/repos")
      .then((res) => res.json())
      .then((repos) => {
        setProjects(repos);
        setLoading(false);
      });
  }, []);

  const displayed = showAll ? projects : projects.slice(0, 5);

  return (
    <section id="projects" className="py-10 sm:py-14 xl:py-16 bg-surface web-pattern">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-extrabold text-text-1 tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Projects
            </h2>
            <a
              href="https://github.com/tokuchii?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-2 hover:text-text-1 transition-colors flex items-center gap-1"
              style={{ fontFamily: "monospace" }}
            >
              ALL PROJECTS <ArrowRightIcon size={12} />
            </a>
          </div>
        </FadeIn>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded-xl h-16 animate-pulse bg-background" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.05}>
                <div className="group flex items-center justify-between p-4 border border-border rounded-xl bg-background hover:border-text-2 transition-all">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-1 truncate" style={{ fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)" }}>
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="shrink-0 font-mono text-[9px] px-1.5 py-0.5 bg-accent text-background rounded-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-text-2 line-clamp-1 mb-2" style={{ fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} label={tag} hoverable={false} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-2 hover:text-text-1 transition-colors"
                        aria-label={`GitHub for ${project.title}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-1 text-xs"
                      >
                        Live <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
            {projects.length > 5 && (
              <FadeIn>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="kinetics-chip w-full py-2.5 text-sm rounded-xl border border-border text-text-2 hover:border-text-2 transition-colors"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </FadeIn>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
