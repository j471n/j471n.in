import { BsFileEarmarkCodeFill } from "react-icons/bs";
import {
  SiCss3,
  SiPython,
  SiGnubash,
  SiHtml5,
  SiReact,
  SiMarkdown,
  SiNextdotjs,
  SiVercel,
  SiTypescript,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { IoLogoJavascript } from "react-icons/io5";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";

type Props = {
  title?: string;
  lang: string;
};

export default function CodeTitle({ title, lang }: Props) {
  let Icon;
  switch (lang) {
    case "html":
      Icon = SiHtml5;
      break;
    case "css":
      Icon = SiCss3;
      break;
    case "js":
      Icon = IoLogoJavascript;
      break;
    case "bash":
      Icon = SiGnubash;
      break;
    case "py":
      Icon = SiPython;
      break;
    case "json":
      Icon = VscJson;
      break;
    case "jsx":
      Icon = SiReact;
      break;
    case "text":
      Icon = AiOutlineFileText;
      break;
    case "md":
      Icon = SiMarkdown;
      break;
    case "next":
      Icon = SiNextdotjs;
      break;
    case "directory":
      Icon = AiOutlineFolderOpen;
      break;
    case "vercel":
      Icon = SiVercel;
      break;
    case "ts":
    case "tsx":
      Icon = SiTypescript;
      break;
    default:
      Icon = BsFileEarmarkCodeFill;
      break;
  }

  return (
    <div className="!mt-4 mb-[14px]">
      <div className="h-0.5 w-full bg-gray-900 dark:bg-white" />
      <div className="bg-white dark:bg-darkSecondary border border-b-0 border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center gap-2 font-mono overflow-x-auto">
        <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        <span className="text-[10px] tracking-[0.35em] uppercase text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {title || lang}
        </span>
      </div>
    </div>
  );
}
