import Image from "next/image";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
};

type LanguageStat = {
  language: string;
  count: number;
  percent: number;
  repos: number;
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
      description:
        "Luxury real estate website showcasing premium apartments and hotels across the Philippines",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Hostinger", "Tailwind CSS"],
    },
    {
      title: "LeadsAgri Website",
      description:
        "Website for an agricultural company showcasing products and services with Chat bot AI",
      technologies: ["Vue.js", "Laravel", "PHP", "SMTP", "Tailwind CSS"],
    },
    {
      title: "Farmex Website",
      description: "Website for an agricultural company showcasing products and services.",
      technologies: ["SMTP", "Remix", "Tailwind CSS"],
    },
  ];

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState<LanguageStat[]>([]);
  const [showAll, setShowAll] = useState(false);

useEffect(() => {
  fetch("/api/github/repos")
    .then((res) => res.json())
    .then((data) => {
      // raw repos still available
      const filtered: GitHubRepo[] = data.repos.map((repo: any) => ({
        name: repo.name || "No name",
        description: repo.description || "No description",
        language: repo.language || "Unknown",
      }));
      setRepos(filtered);

      // 🔹 use the pre-aggregated languages from the API
      if (data.languages) {
        setLanguageData(data.languages);
      }
    })
    .catch((err) => console.error(err));
}, []);
  // Decide which projects to display
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

const projectLinks: Record<string, string> = {
  "ZP Burger House": "https://zpcalauan.com",
  "MPDC Website": "https://malvedaproperties.com",
  "LeadsAgri Website": "https://leadsagri.site",
  "Farmex Website": "https://farmex.shop",
};

const projectStatus: Record<string, "Completed" | "Ongoing"> = {
  "ZP Burger House": "Completed",
  "MPDC Website": "Completed",
  "LeadsAgri Website": "Ongoing",
  "Farmex Website": "Ongoing",
};

  return (
    <div className="relative w-full animate-fade-in">
      {/* Floating logo bubbles */}
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

      {/* Projects Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" }, // only for enter
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.25, ease: "easeIn" }, // no delay, faster exit
              }}
              className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#4a2f1b]/30 
             hover:border-[#c8a165] cursor-pointer 
             transform transition-transform duration-300 ease-in-out 
             relative pb-24 hover:scale-105"
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
                      className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center ${projectStatus[project.title]}

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {["LeadsAgri Website", "Farmex Website"].includes(project.title)
                        ? "Ongoing"
                        : "Completed"}
                    </span>
                    <div className="relative group">
<button
  onClick={(e) => {
    e.stopPropagation();
    const url = projectLinks[project.title];
    if (url) window.open(url, "_blank");
  }}
  className="px-4 py-2 text-[#c8a165] text-sm font-medium rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:text-white border border-[#4a2f1b]/30 hover:border-white"
>
  Preview
</button>


                      {/* Hover preview image */}
                      <motion.div
                        className="absolute bottom-full right-0 w-64 h-40 bg-[#1a1a1a] border border-[#4a2f1b] rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 z-50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={
                            project.title === "ZP Burger House"
                              ? "/previews/zp-burger.gif"
                              : project.title === "MPDC Website"
                                ? "/previews/mpdc.gif"
                                : project.title === "LeadsAgri Website"
                                  ? "/previews/leadsagri.gif"
                                  : project.title === "Farmex Website"
                                    ? "/previews/farmex.gif"
                                    : ""
                          }
                          alt={`${project.title} preview`}
                          width={256}
                          height={160}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </motion.div>
                    </div>

                  </div>
                )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* See More / See Less button */}
      {projects.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-lg border border-[#4a2f1b]/30 text-[#c8a165] hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
      <hr className="my-8 border-t-2 border-[#c8a165]" />

    {/* Progress Graph Section */}
<div className="mt-12">
  <h2 className="text-2xl font-semibold text-[#c8a165] mb-2 text-center">
    Progress Graph
  </h2>
  <p className="flex items-center justify-center gap-1 text-center text-xs text-[#c8a165]/50 italic mb-4">
    <SiGithub className="w-4 h-4" />
    Powered by GitHub
  </p>

  {languageData.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[300px]">
      {/* Bubble Loading Animation */}
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-[#c8a165] rounded-full animate-bounce" />
        <span className="w-3 h-3 bg-[#c8a165] rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-3 h-3 bg-[#c8a165] rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
      <p className="mt-4 text-[#c8a165] text-sm tracking-wide uppercase animate-pulse">
        Loading Graph...
      </p>
    </div>
    ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">

      
{[...languageData]
  .sort((a, b) => b.percent - a.percent)
  .map((lang, index) => {
  const percent = lang.percent;
  const radius = 42;
const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      key={lang.language}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col items-center justify-center"
    >
      {/* Circular progress */}
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="#4a2f1b"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
  cx="48"
  cy="48"
  r={radius}
  stroke="#c8a165"
  strokeWidth="8"
  fill="transparent"
  strokeDasharray={circumference}
  strokeDashoffset={circumference * (1 - lang.percent / 100)}
  strokeLinecap="round"
  initial={{ strokeDashoffset: circumference }}
  animate={{ strokeDashoffset: circumference * (1 - lang.percent / 100) }}
  transition={{ duration: 1 }}
/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#c8a165]">
          {percent}%
        </span>
      </div>

      {/* Label + repo count */}
      <span className="mt-2 text-[#c8a165] font-medium">{lang.language}</span>
      <span className="text-xs text-[#c8a165]/70">
        {lang.repos} repo{lang.repos > 1 ? "s" : ""}
      </span>
    </motion.div>
  );
})}

    </div>
  )}

</div>



    </div>
  );
}
