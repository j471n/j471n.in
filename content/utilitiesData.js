import {
  SiVisualstudiocode,
  SiSublimetext,
  SiMicrosoftedge,
  SiGooglechrome,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiPrettier,
  SiPnpm,
  SiYarn,
  SiFigma,
  SiInsomnia,
  SiBitwarden,
  SiSpotify,
  SiObsstudio,
  SiGrammarly,
} from "react-icons/si";
import {
  BsFillPaletteFill,
  BsFillTerminalFill,
  BsWindows,
  BsGithub,
} from "react-icons/bs";
import { FaGitAlt, FaSearch } from "react-icons/fa";

import SVG from "@components/SVG";

const utilities = {
  title: "Utilities",
  description:
    "In case you are wondering What tech I use, Here's the list of what tech I'm currently using for coding on the daily basis. This list is always changing.",
  lastUpdate: "June 30, 2022",
  system: {
    title: "System",
    data: [
      {
        name: "VSCode",
        description: "Primary Code editor",
        Icon: SiVisualstudiocode,
        link: "https://code.visualstudio.com/download",
      },
      {
        name: "Sublime Text",
        description: "Text editor",
        Icon: SiSublimetext,
        link: "https://www.techspot.com/downloads/5546-sublime-text.html",
      },
      {
        name: "Andromeda",
        description: "VS Code theme",
        Icon: BsFillPaletteFill,
        link: "https://marketplace.visualstudio.com/items?itemName=EliverLara.andromeda",
      },
      {
        name: "Oh-my-zsh",
        description: "Terminal Theme",
        Icon: BsFillTerminalFill,
        link: "https://ohmyz.sh/",
      },
      {
        name: "Windows 11",
        description: "Operating System",
        Icon: BsWindows,
        link: "https://www.microsoft.com/software-download/windows11",
      },
      {
        name: "Microsoft Edge",
        description: "Primary Browser",
        Icon: SiMicrosoftedge,
        link: "https://www.microsoft.com/en-us/edge",
      },
      {
        name: "Chrome",
        description: "Secondary Browser",
        Icon: SiGooglechrome,
        link: "https://www.google.com/chrome",
      },
    ],
  },

  tools: {
    title: "Coding Tools",
    data: [
      {
        name: "React.js",
        description: "Primary Front-end library",
        Icon: SiReact,
        link: "https://reactjs.org/",
      },
      {
        name: "Next.js",
        description: "Primary Web Development Framework",
        Icon: SiNextdotjs,
        link: "https://nextjs.org/",
      },
      {
        name: "TailwindCSS",
        description: "For styling the fron-end",
        Icon: SiTailwindcss,
        link: "https://tailwindcss.com/",
      },
      {
        name: "Vercel",
        description: "Hosting for Projects",
        Icon: SiVercel,
        link: "http://vercel.com/",
      },
      {
        name: "Prettier",
        description: "For Code formatting",
        Icon: SiPrettier,
        link: "https://prettier.io/",
      },
      {
        name: "Git",
        description: "Version Control",
        Icon: FaGitAlt,
        link: "https://git-scm.com/downloads",
      },
      {
        name: "Github Desktop",
        description: "To Manage the Github Project and Changes",
        Icon: BsGithub,
        link: "https://desktop.github.com/",
      },
      {
        name: "pnpm",
        description: "Primary Package Manager",
        Icon: SiPnpm,
        link: "https://pnpm.io/installation",
      },
      {
        name: "yarn",
        description: "Alternative Package Manager",
        Icon: SiYarn,
        link: "https://classic.yarnpkg.com/lang/en/docs/install/",
      },
      {
        name: "Figma",
        description: "Primary Design tool",
        Icon: SiFigma,
        link: "https://www.figma.com/downloads/",
      },
      {
        name: "Insomnia",
        description: "For testing APIs",
        Icon: SiInsomnia,
        link: "https://insomnia.rest/download",
      },
    ],
  },

  software: {
    title: "Software/Applications",
    data: [
      {
        name: "Bitwarden",
        description: "Password Manager to manage all the login",
        Icon: SiBitwarden,
        link: "https://bitwarden.com/",
      },
      {
        name: "OBS Studio",
        description: "Screen Recorder",
        Icon: SiObsstudio,
        link: "https://obsproject.com/",
      },
      {
        name: "Spotify",
        description: "To Listen Music",
        Icon: SiSpotify,
        link: "https://www.spotify.com/us/download/windows/",
      },
      {
        name: "Grammarly",
        description: "Typing assistant that reviews spelling, grammar, etc.",
        Icon: SiGrammarly,
        link: "https://www.grammarly.com/",
      },
      {
        name: "Everything Search",
        description: "For Quick searching in Windows",
        Icon: FaSearch,
        link: "https://www.voidtools.com/downloads/",
      },

      {
        name: "ShareX",
        description:
          "To capture or record and share it with a single press of a ke",
        Icon: SVG.ShareX,
        link: "https://getsharex.com/downloads/",
      },
      {
        name: "Ditto",
        description: "Clipboard Manager",
        Icon: SVG.Ditto,
        link: "https://ditto-cp.sourceforge.io/",
      },
      {
        name: "f.lux",
        description: "To adjusts a display's color according to the time",
        Icon: SVG.Flux,
        link: "https://justgetflux.com/",
      },

      {
        name: "Microsoft Todo",
        description: "To manage all my todos",
        Icon: SVG.MicrosoftToDo,
        link: "https://todo.microsoft.com/tasks/",
      },
      {
        name: "Raindrop.io",
        description: "Bookmark Manager",
        Icon: SVG.RainDrop,
        link: "https://raindrop.io/",
      },
    ],
  },
};

export default utilities;
