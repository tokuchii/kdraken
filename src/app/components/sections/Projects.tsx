"use client";

import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full-Stack",
  "Open Source",
] as const;

const categoryMap: Record<string, string> = {
  All: "all",
  Frontend: "frontend",
  Backend: "backend",
  "Full-Stack": "fullstack",
  "Open Source": "opensource",
};

const INITIAL_COUNT = 6;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/repos")
      .then((res) => res.json())
      .then((repos) => {
        setProjects(repos);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === categoryMap[activeCategory]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="py-10 sm:py-14 xl:py-16 bg-surface web-pattern">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="Selected work" title="Projects" />

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`shrink-0 px-4 py-2 text-sm rounded-full border transition-colors duration-200 min-h-[44px] ${
                activeCategory === cat
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-2 border-border hover:border-text-2"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded-xl h-48 animate-pulse bg-surface" />
            ))}
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayed.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          {filtered.length > INITIAL_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 mx-auto block px-6 py-2 text-sm rounded-full border border-border text-text-2 hover:border-text-2 transition-colors duration-200"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          )}
          </>
        )}
      </div>
    </section>
  );
}
