"use client";

import { ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import Tag from "./Tag";
import FadeIn from "./FadeIn";

const accentColors = [
  "#BFDBFE",
  "#BBF7D0",
  "#FDE68A",
  "#FECACA",
  "#DDD6FE",
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const accentColor = accentColors[project.accentIndex % accentColors.length];

  return (
    <FadeIn delay={index * 0.08}>
      <div className="group relative border border-border rounded-xl overflow-hidden bg-background hover:border-accent h-full flex flex-col kinetics-spring-card spider-sense web-corner">
        <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-base text-text-1 group-hover:underline underline-offset-4">
              {project.title}
            </h3>
            {project.featured && (
              <span className="shrink-0 font-mono text-[10px] px-2 py-0.5 bg-text-1 text-background rounded-sm">
                Featured
              </span>
            )}
          </div>

          <p className="text-sm text-text-2 line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} hoverable={false} />
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-2 hover:text-text-1 transition-colors"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-2 hover:text-accent transition-colors flex items-center gap-1"
                >
                  Live <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
