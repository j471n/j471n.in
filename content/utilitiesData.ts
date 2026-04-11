import {
  SiMacos,
  SiHomebrew,
  SiIterm2,
  SiWarp,
  SiArc,
  SiGooglechrome,
  SiVisualstudiocode,
  SiXcode,
  SiDocker,
  SiInsomnia,
  SiPostman,
  SiPrettier,
  SiPnpm,
  SiBun,
  SiNodedotjs,
  SiFigma,
  SiCanva,
  SiObsstudio,
  SiNotion,
  SiObsidian,
  SiLinear,
  SiGrammarly,
  SiSpotify,
  SiBitwarden,
  SiVercel,
  SiNetlify,
  SiSupabase,
  SiSlack,
  SiDiscord,
  SiZoom,
  SiTelegram,
  SiGithub,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  BsFillTerminalFill,
  BsApple,
  BsGithub,
  BsDatabase,
  BsCommand,
  BsWindowStack,
} from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import SVG from "@components/SVG";
import { Utilities } from "@lib/types";

const utilities: Utilities = {
  title: "Utilities",
  description:
    "The tools, apps, and services I use daily for development, design, and productivity on macOS. This list is always evolving.",
  lastUpdate: "April 11, 2026",
  data: [
    {
      title: "System & OS",
      data: [
        {
          name: "macOS",
          description: "Primary operating system",
          Icon: SiMacos,
          link: "https://www.apple.com/macos/",
        },
        {
          name: "Homebrew",
          description: "Package manager for macOS",
          Icon: SiHomebrew,
          link: "https://brew.sh/",
        },
        {
          name: "Raycast",
          description: "Spotlight replacement & launcher",
          Icon: BsCommand,
          link: "https://www.raycast.com/",
        },
        {
          name: "Rectangle",
          description: "Window management with keyboard shortcuts",
          Icon: BsWindowStack,
          link: "https://rectangleapp.com/",
        },
        {
          name: "Bitwarden",
          description: "Open-source password manager",
          Icon: SiBitwarden,
          link: "https://bitwarden.com/",
        },
        {
          name: "Raindrop.io",
          description: "Bookmark & read-later manager",
          Icon: SVG.RainDrop,
          link: "https://raindrop.io/",
        },
      ],
    },

    {
      title: "Terminal & CLI",
      data: [
        {
          name: "iTerm2",
          description: "Feature-rich terminal emulator",
          Icon: SiIterm2,
          link: "https://iterm2.com/",
        },
        {
          name: "Warp",
          description: "AI-powered modern terminal",
          Icon: SiWarp,
          link: "https://www.warp.dev/",
        },
        {
          name: "Oh My Zsh",
          description: "Zsh configuration framework",
          Icon: BsFillTerminalFill,
          link: "https://ohmyz.sh/",
        },
        {
          name: "Homebrew",
          description: "Package manager for macOS & Linux",
          Icon: SiHomebrew,
          link: "https://brew.sh/",
        },
        {
          name: "Git",
          description: "Version control system",
          Icon: FaGitAlt,
          link: "https://git-scm.com/",
        },
        {
          name: "GitHub CLI",
          description: "GitHub from the command line",
          Icon: BsGithub,
          link: "https://cli.github.com/",
        },
      ],
    },

    {
      title: "Development",
      data: [
        {
          name: "VSCode",
          description: "Primary code editor",
          Icon: SiVisualstudiocode,
          link: "https://code.visualstudio.com/",
        },
        {
          name: "Xcode",
          description: "Apple's IDE for native development",
          Icon: SiXcode,
          link: "https://developer.apple.com/xcode/",
        },
        {
          name: "Docker",
          description: "Containerisation platform",
          Icon: SiDocker,
          link: "https://www.docker.com/products/docker-desktop/",
        },
        {
          name: "TablePlus",
          description: "GUI for relational databases",
          Icon: BsDatabase,
          link: "https://tableplus.com/",
        },
        {
          name: "Insomnia",
          description: "REST & GraphQL API client",
          Icon: SiInsomnia,
          link: "https://insomnia.rest/",
        },
        {
          name: "Postman",
          description: "API platform for building & testing",
          Icon: SiPostman,
          link: "https://www.postman.com/",
        },
        {
          name: "GitHub Desktop",
          description: "Visual Git client",
          Icon: SiGithub,
          link: "https://desktop.github.com/",
        },
        {
          name: "Prettier",
          description: "Opinionated code formatter",
          Icon: SiPrettier,
          link: "https://prettier.io/",
        },
        {
          name: "pnpm",
          description: "Fast, disk-efficient package manager",
          Icon: SiPnpm,
          link: "https://pnpm.io/",
        },
        {
          name: "Bun",
          description: "All-in-one JS runtime & package manager",
          Icon: SiBun,
          link: "https://bun.sh/",
        },
        {
          name: "Node.js",
          description: "JavaScript runtime environment",
          Icon: SiNodedotjs,
          link: "https://nodejs.org/",
        },
        {
          name: "TypeScript",
          description: "Typed superset of JavaScript",
          Icon: SiTypescript,
          link: "https://www.typescriptlang.org/",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          Icon: SiTailwindcss,
          link: "https://tailwindcss.com/",
        },
        {
          name: "Supabase",
          description: "Open-source Firebase alternative",
          Icon: SiSupabase,
          link: "https://supabase.com/",
        },
        {
          name: "Vercel",
          description: "Frontend cloud deployment platform",
          Icon: SiVercel,
          link: "https://vercel.com/",
        },
        {
          name: "Netlify",
          description: "Web hosting & serverless platform",
          Icon: SiNetlify,
          link: "https://www.netlify.com/",
        },
      ],
    },

    {
      title: "Design & Creativity",
      data: [
        {
          name: "Figma",
          description: "Collaborative UI design tool",
          Icon: SiFigma,
          link: "https://www.figma.com/",
        },
        {
          name: "Canva",
          description: "Quick graphics & social media design",
          Icon: SiCanva,
          link: "https://www.canva.com/",
        },
        {
          name: "OBS Studio",
          description: "Screen recording & live streaming",
          Icon: SiObsstudio,
          link: "https://obsproject.com/",
        },
        {
          name: "CleanShot X",
          description: "Screenshot & screen recording for Mac",
          Icon: BsApple,
          link: "https://cleanshot.com/",
        },
      ],
    },

    {
      title: "Productivity",
      data: [
        {
          name: "Notion",
          description: "All-in-one workspace for notes & docs",
          Icon: SiNotion,
          link: "https://www.notion.so/",
        },
        {
          name: "Obsidian",
          description: "Local-first Markdown knowledge base",
          Icon: SiObsidian,
          link: "https://obsidian.md/",
        },
        {
          name: "Linear",
          description: "Issue tracking & project management",
          Icon: SiLinear,
          link: "https://linear.app/",
        },
        {
          name: "Grammarly",
          description: "AI writing assistant & grammar checker",
          Icon: SiGrammarly,
          link: "https://www.grammarly.com/",
        },
        {
          name: "Spotify",
          description: "Music & podcast streaming",
          Icon: SiSpotify,
          link: "https://www.spotify.com/",
        },
        {
          name: "Keka",
          description: "macOS file archiver",
          Icon: BsApple,
          link: "https://www.keka.io/",
        },
        {
          name: "f.lux",
          description: "Blue light filter & display warmth",
          Icon: SVG.Flux,
          link: "https://justgetflux.com/",
        },
      ],
    },

    {
      title: "Browsers",
      data: [
        {
          name: "Arc",
          description: "Primary browser with workspace tabs",
          Icon: SiArc,
          link: "https://arc.net/",
        },
        {
          name: "Chrome",
          description: "Secondary browser for testing",
          Icon: SiGooglechrome,
          link: "https://www.google.com/chrome/",
        },
      ],
    },

    {
      title: "Communication",
      data: [
        {
          name: "Slack",
          description: "Team messaging & collaboration",
          Icon: SiSlack,
          link: "https://slack.com/",
        },
        {
          name: "Discord",
          description: "Developer communities & friends",
          Icon: SiDiscord,
          link: "https://discord.com/",
        },
        {
          name: "Zoom",
          description: "Video meetings",
          Icon: SiZoom,
          link: "https://zoom.us/",
        },
        {
          name: "Telegram",
          description: "Fast & private messaging",
          Icon: SiTelegram,
          link: "https://telegram.org/",
        },
      ],
    },
  ],
};

export default utilities;
