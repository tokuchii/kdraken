import { SkillGroup, Job, NavLink } from "./types";

export const GITHUB_USERNAME = "tokuchii";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript", "PHP", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Vue", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PHP (Laravel)", "REST API"],
  },
  {
    category: "Database",
    items: ["MySQL", "Firebase", "MongoDB"],
  },
  {
    category: "Tools",
    items: ["Axios", "Vite", "Vercel", "Hostinger", "Firebase"],
  },
];

export const experience: Job[] = [
  {
    role: "Junior Blockchain Developer",
    company: "LeadsAgriventures",
    location: "Calauan, Laguna",
    dates: "2024 — 2025",
    bullets: [
      "Integrated blockchain-based features into existing systems, contributing to smart contract workflows alongside the core development team",
      "Improved website performance and responsiveness across devices, ensuring consistent UX on both desktop and mobile viewports",
      "Collaborated with cross-functional teams to deliver feature updates and bug fixes on schedule, following agile workflows",
    ],
    type: "work",
  },
  {
    role: "Junior Software Developer",
    company: "Malveda Properties and Development Corp.",
    location: "Biñan, Laguna",
    dates: "2024 — 2025",
    bullets: [
      "Collaborated closely with the development team as a Junior Full-stack Software Developer",
      "Handled both frontend and backend development tasks",
      "Managed and maintained company websites for MPDC and LAV",
      "Ensured overall website performance and responsiveness",
    ],
    type: "work",
  },
  {
    role: "On-the-Job Trainee",
    company: "LeadsAgriventures",
    location: "Calauan, Laguna",
    dates: "2024",
    bullets: [
      "Worked as a Junior Full-stack Software Developer trainee",
      "Troubleshot issues and applied updates as needed",
      "Contributed to frontend and backend development tasks",
    ],
    type: "work",
  },
  {
    role: "SPES Trainee",
    company: "Municipality of Calauan",
    location: "Calauan, Laguna",
    dates: "2023",
    bullets: [
      "Encoder — Filing and organizing lists of transactions from all departments",
      "Maintained physical and digital records",
    ],
    type: "work",
  },
  {
    role: "Associated Staff",
    company: "7-Eleven",
    location: "Calauan, Laguna",
    dates: "2022 — 2023",
    bullets: [
      "Provided customer service and handled transactions",
      "Helped maintain daily store operations",
    ],
    type: "work",
  },
  {
    role: "Service Crew",
    company: "Angel's Pizza",
    location: "Sta. Cruz, Laguna",
    dates: "2021 — 2022",
    bullets: [
      "Frontline Services Department",
      "Assisted with customer service and daily operations",
    ],
    type: "work",
  },
  {
    role: "Bachelor of Science in Information Technology",
    company: "Laguna University",
    location: "Laguna, Philippines",
    dates: "2020 — 2025",
    bullets: [
      "Relevant coursework in software development and web technologies",
    ],
    type: "education",
  },
];

export const socialLinks = {
  github: "https://github.com/tokuchii",
  linkedin: "https://www.linkedin.com/in/kenneth-kieser-macabos-026867367/",
  facebook: "https://www.facebook.com/kenneth.kieser.macabos/",
  instagram: "https://www.instagram.com/kdrakenn_/",
  email: "keisermacabos@gmail.com",
  phone: "+63 936 168 7804",
  website: "https://kdraken.vercel.app",
};

export const aboutContent = {
  paragraphs: [
    "An aspiring Software Engineer from Laguna, Philippines. While I may not possess the innate intelligence of some gifted individuals, I am passionate about programming. I enjoy coding and continuously strive to improve my skills in developing applications, websites, and systems.",
    "I work with JavaScript, PHP, SQL, and modern frameworks like Vue, React, and Next.js to build web applications. From property management systems to lead tracking platforms, I enjoy creating tools that solve real problems.",
    "I approach problems methodically: break them down, understand the constraints, then build iteratively. I believe good code is simple code, and I'm always looking for ways to improve my craft.",
    "Currently exploring new technologies and deepening my understanding of full-stack development. Always learning, always building.",
  ],
  resumeUrl: "/files/macabos_cv.pdf",
  stats: [
    { value: "8+", label: "projects" },
    { value: "5", label: "languages" },
    { value: "4", label: "frameworks" },
    { value: "∞", label: "learning" },
  ],
};
