export interface Technology {
  name: string;
  slug: string;
  hex: string;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  points: string[];
}

export interface OwnerInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export const owner: OwnerInfo = {
  name: "Leonardo Pacheco",
  title: "Full Stack Developer",
  bio: "Passionate developer with expertise in building modern, scalable web applications. I love working with React, Next.js, and AI technologies.",
  location: "Portugal",
  email: "leonardo@example.com",
  github: "https://github.com/leonardo",
  linkedin: "https://linkedin.com/in/leonardo",
};

export const technologies: Technology[] = [
  { name: "React", slug: "react", hex: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", hex: "000000" },
  { name: "TypeScript", slug: "typescript", hex: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4" },
  { name: "Node.js", slug: "nodedotjs", hex: "339933" },
  { name: "OpenAI", slug: "openai", hex: "412991" },
  { name: "Vercel", slug: "vercel", hex: "000000" },
  { name: "GitHub", slug: "github", hex: "181717" },
  { name: "JavaScript", slug: "javascript", hex: "F7DF1E" },
  { name: "HTML5", slug: "html5", hex: "E34F26" },
  { name: "CSS3", slug: "css3", hex: "1572B6" },
  { name: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
  { name: "Prisma", slug: "prisma", hex: "2D3748" },
  { name: "Docker", slug: "docker", hex: "2496ED" },
  { name: "AWS", slug: "amazonaws", hex: "232F3E" },
  { name: "Git", slug: "git", hex: "F05032" },
  { name: "Framer Motion", slug: "framer", hex: "0055FF" },
  { name: "Python", slug: "python", hex: "3776AB" },
];

export const projects: Project[] = [
  {
    name: "Personal Portfolio v2",
    description: "A high-performance portfolio with an integrated AI chatbot and 3D interactive technology sphere.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
    links: {
      github: "https://github.com/leonardo/portfolio2",
    },
  },
  {
    name: "AI SaaS Platform",
    description: "A subscription-based platform offering various AI-powered tools for content creation.",
    tags: ["Next.js", "Stripe", "OpenAI", "Prisma"],
    links: {
      live: "https://ai-saas.example.com",
    },
  },
];

export const experience: Experience[] = [
  {
    company: "Tech Solutions Inc.",
    role: "Senior Frontend Developer",
    dates: "Jan 2022 - Present",
    points: [
      "Led the development of a flagship SaaS product using Next.js and TypeScript.",
      "Optimized application performance, resulting in a 40% reduction in load times.",
      "Mentored junior developers and established best practices for code quality.",
    ],
  },
  {
    company: "Creative Web Agency",
    role: "Full Stack Developer",
    dates: "Jun 2019 - Dec 2021",
    points: [
      "Developed custom web solutions for diverse clients ranging from startups to enterprises.",
      "Implemented responsive designs and ensured cross-browser compatibility.",
      "Integrated third-party APIs and managed database migrations.",
    ],
  },
];
