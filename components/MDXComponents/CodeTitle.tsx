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
    case "ts" || "tsx":
      Icon = SiTypescript;
      break;
    default:
      Icon = BsFileEarmarkCodeFill;
      break;
  }
  return (
    <div className="relative !z-10">
      <div className="bg-white text-darkSecondary dark:bg-darkSecondary dark:text-gray-200  rounded-tl-md rounded-tr-md p-3  flex items-center justify-between font-mono !mt-4 overflow-x-scroll xs:overflow-auto border border-black   dark:border-gray-200/60  ">
        <div className="flex items-center gap-2">
          <Icon className="flex items-center w-4 h-4" />
          <p className="!my-0 font-[500] text-sm">{title || lang}</p>
        </div>
      </div>
    </div>
  );
}
