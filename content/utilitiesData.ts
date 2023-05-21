import {
  SiVisualstudiocode,
  SiSublimetext,
  SiMicrosoftedge,
  SiGooglechrome,
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
  SiCanva,
  SiGooglekeep,
  SiNotepadplusplus,
  SiPostman,
} from "react-icons/si";
import {
  BsFillPaletteFill,
  BsFillTerminalFill,
  BsWindows,
  BsGithub,
} from "react-icons/bs";
import { FaGitAlt, FaSearch } from "react-icons/fa";
import SVG from "@components/SVG";
import { Utilities } from "@lib/types";

const utilities: Utilities = {
  title: "Utilities",
  description:
    "In case you are wondering What tech I use, Here's the list of what tech I'm currently using for coding on the daily basis. This list is always changing.",
  lastUpdate: "May 21, 2023",
  data: [
    {
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
          name: "Chrome",
          description: "Primary Browser",
          Icon: SiGooglechrome,
          link: "https://www.google.com/chrome",
        },
        {
          name: "Microsoft Edge",
          description: "Secondary Browser",
          Icon: SiMicrosoftedge,
          link: "https://www.microsoft.com/en-us/edge",
        },
      ],
    },

    {
      title: "Software & Applications",
      data: [
        {
          name: "Bitwarden",
          description: "Password Manager to manage all the login",
          Icon: SiBitwarden,
          link: "https://bitwarden.com/",
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
          name: "Figma",
          description: "Primary Design tool",
          Icon: SiFigma,
          link: "https://www.figma.com/downloads/",
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
          name: "Canva",
          description: "Secondary Design tool",
          Icon: SiCanva,
          link: "https://www.canva.com/",
        },
        {
          name: "Insomnia",
          description: "For testing APIs",
          Icon: SiInsomnia,
          link: "https://insomnia.rest/download",
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
        {
          name: "Google Keep",
          description: "Quick Note",
          Icon: SiGooglekeep,
          link: "https://keep.google.com/",
        },
        {
          name: "Notepad++",
          description: "Quick Code Editing",
          Icon: SiNotepadplusplus,
          link: "https://keep.google.com/",
        },
        {
          name: "7-Zip",
          description: "File Archiver",
          Icon: SVG.Zip7,
          link: "https://www.7-zip.org/download.html",
        },
        {
          name: "Flameshot",
          description: "Screenshot Software",
          Icon: SVG.Flameshot,
          link: "https://flameshot.org/",
        },
        {
          name: "Postman",
          description: "API Testing",
          Icon: SiPostman,
          link: "https://postman.com",
        },
      ],
    },
  ],
};

export default utilities;
