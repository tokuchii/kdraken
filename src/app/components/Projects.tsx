import Image from "next/image";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
};

export default function Projects() {
  const projects = [
    {
      title: "ZP Burger House",
      description: "Web-based ordering system with Augmented Reality",
      technologies: [
        "React.js",
        "Flutter",
        "Tailwind CSS",
        "Node.js",
        "Firebase",
        "Hostinger",
        "Three.js",
        "TypeScript",
        "Google Play Services for AR",
      ],
    },
    {
      title: "MPDC Website",
      description: "Luxury real estate website showcasing premium apartments and hotels across the Philippines",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Hostinger", "Tailwind CSS"],
    },
    {
      title: "LeadsAgri Website",
      description: "Website for an agricultural company showcasing products and services with Chat bot AI",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Tailwind CSS"],
    },
    {
      title: "Farmex Website",
      description: "Website for an agricultural company showcasing products and services.",
      technologies: ["SMTP", "Remix", "Tailwind CSS"],
    },
  ];

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState<{ language: string; count: number }[]>([]);

  useEffect(() => {
    fetch("/api/github/repos") // or GitHub API directly if CORS allows
      .then((res) => res.json())
      .then((data: any[]) => {
        const filtered: GitHubRepo[] = data.map((repo: any) => ({
          name: repo.name || "No name",
          description: repo.description || "No description",
          language: repo.language || "Unknown",
        }));
        setRepos(filtered);

        // Count repos per language
        const langCount: Record<string, number> = {};
        filtered.forEach((repo) => {
          const lang = repo.language || "Unknown";
          langCount[lang] = (langCount[lang] || 0) + 1;
        });

        const chartData = Object.entries(langCount).map(([language, count]) => ({ language, count }));
        setLanguageData(chartData);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="relative w-full animate-fade-in">
      {/* Floating logo bubbles (existing code remains unchanged) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-[10%] w-8 h-8 opacity-10 animate-float-slow">
          <div className="relative w-full h-full rounded-full border border-[#4a2f1b] p-0.5">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="animate-spin-slow rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Existing Projects Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#4a2f1b]/30 hover:border-[#c8a165] transition-colors duration-300 relative pb-24"
          >
            <h3 className="text-xl font-semibold text-[#c8a165] mb-2">{project.title}</h3>
            <p className="text-[#c8a165] mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-sm bg-[#4a2f1b]/20 text-[#c8a165] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(project.title === "ZP Burger House" ||
              project.title === "MPDC Website" ||
              project.title === "Farmex Website" ||
              project.title === "LeadsAgri Website") && (
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center ${["LeadsAgri Website", "Farmex Website"].includes(project.title)
                        ? "text-orange-300 bg-orange-300/10"
                        : "text-green-500 bg-green-500/10"
                      }`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {project.title === "LeadsAgri Website" || project.title === "Farmex Website"
                      ? "Ongoing"
                      : "Completed"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.title === "ZP Burger House") window.open("https://zpcalauan.com", "_blank");
                      if (project.title === "MPDC Website") window.open("https://malvedaproperties.com", "_blank");
                      if (project.title === "LeadsAgri Website") window.open("https://leadsagri.site", "_blank");
                      if (project.title === "Farmex Website") window.open("https://farmex.shop", "_blank");
                    }}
                    className="group relative px-4 py-2 text-[#c8a165] text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white"
                  >
                    <span className="relative z-10 transition-colors duration-300">Preview</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4a2f1b] to-[#2c4a1b] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
                    <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-300 ease-out" />
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>


      {/* Progress Graph Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[#c8a165] mb-4 text-center">Progress Graph</h2>
        {languageData.length === 0 ? (
          <p className="text-[#c8a165] text-center">Loading graph...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="language" stroke="#c8a165" />
              <YAxis stroke="#c8a165" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #4a2f1b", color: "#c8a165" }}
              />
              <Bar dataKey="count" fill="#c8a165" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
