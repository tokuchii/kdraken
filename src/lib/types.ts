export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured?: boolean;
  category: "frontend" | "backend" | "fullstack" | "opensource";
  accentIndex: number;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Job {
  role: string;
  company: string;
  location?: string;
  dates: string;
  bullets: string[];
  type: "work" | "education";
}

export interface NavLink {
  label: string;
  href: string;
}
