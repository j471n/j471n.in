import { SkillType } from "@lib/types";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiMysql,
  SiFirebase,
  SiTypescript,
  SiReact,
  SiC,
  SiCplusplus,
  SiFigma,
  SiSupabase,
  SiNodedotjs,
  SiDjango,
  SiRedux,
  SiDocker,
  SiVercel,
} from "react-icons/si";

const skills: SkillType[] = [
  {
    name: "HTML",
    Icon: SiHtml5,
    category: "Frontend",
  },
  {
    name: "CSS",
    Icon: SiCss3,
    category: "Frontend",
  },
  {
    name: "Javascript",
    Icon: SiJavascript,
    category: "Frontend",
  },
  {
    name: "Typescript",
    Icon: SiTypescript,
    category: "Frontend",
  },
  {
    name: "React.js",
    Icon: SiReact,
    category: "Frontend",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    category: "Frontend",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    category: "Backend",
  },
  {
    name: "Python",
    Icon: SiPython,
    category: "Backend",
  },
  {
    name: "Django",
    Icon: SiDjango,
    category: "Backend",
  },
  {
    name: "C Programming",
    Icon: SiC,
    category: "Programming",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
    category: "Programming",
  },
  {
    name: "MySQL",
    Icon: SiMysql,
    category: "Database",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    category: "Database",
  },
  {
    name: "Supabase",
    Icon: SiSupabase,
    category: "Database",
  },
  {
    name: "Git",
    Icon: SiGit,
    category: "Tools",
  },
  {
    name: "Figma",
    Icon: SiFigma,
    category: "Tools",
  },
  {
    name: "Redux",
    Icon: SiRedux,
    category: "Frontend",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    category: "Tools",
  },
  {
    name: "Vercel",
    Icon: SiVercel,
    category: "Tools",
  },
];

export default skills;
