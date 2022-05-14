import { AiFillHtml5 } from "react-icons/ai";
import {
  SiCss3,
  SiJavascript,
  SiSass,
  SiBootstrap,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiMysql,
  SiNodedotjs,
  SiFirebase,
  SiMicrosoftoffice,
  SiFigma,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { VscSymbolStructure } from "react-icons/vsc";

module.exports = [
  {
    id: 1,
    name: "HTML",
    level: 100,
    // icon: "img/skills/html.webp",
    Icon: <AiFillHtml5 className="h-8 w-8" />,
    pinned: true,
    about:
      "The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    id: 2,
    name: "CSS",
    level: 95,
    Icon: <SiCss3 className="h-8 w-8" />,
    pinned: true,
    about:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    id: 3,
    name: "Javascript",
    level: 80,
    Icon: <SiJavascript className="h-8 w-8" />,
    pinned: true,
    about:
      "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: 4,
    name: "SASS",
    level: 80,
    Icon: <SiSass className="h-8 w-8" />,
    pinned: false,
    about:
      'Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. SassScript is the scripting language itself. Sass consists of two syntaxes. The original syntax, called "the indented syntax," uses a syntax similar to Haml.',
    url: "https://sass-lang.com/",
  },
  {
    id: 5,
    name: "Bootstrap",
    level: 90,
    Icon: <SiBootstrap className="h-8 w-8" />,
    pinned: false,
    about:
      "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
    url: "https://getbootstrap.com/",
  },
  {
    id: 6,
    name: "React.js",
    level: 80,
    Icon: <FaReact className="h-8 w-8" />,
    pinned: true,
    about:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
    url: "https://reactjs.org/",
  },
  {
    id: 20,
    name: "Next.js",
    level: 80,
    Icon: <SiNextdotjs className="h-8 w-8" />,
    pinned: true,
    about:
      "Next.js is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites.",
    url: "https://nextjs.org/",
  },
  {
    id: 7,
    name: "Tailwind CSS",
    level: 100,
    icon: "img/skills/tailwind.webp",
    Icon: <SiTailwindcss className="h-8 w-8" />,

    pinned: true,
    about:
      "Tailwind CSS is basically a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.",
    url: "https://tailwindcss.com/",
  },
  {
    id: 8,
    name: "C Programming",
    level: 80,
    Icon: (
      <svg
        className="h-8 w-8  dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 150"
        fill="currentColor"
      >
        <path d="M131.733 36.0091L81.207 7.62009C77.379 5.46909 72.624 5.46909 68.793 7.62009L18.267 36.0091C14.403 38.1811 12 42.2431 12 46.6111V103.392C12 107.757 14.4 111.819 18.267 113.991L68.793 142.383C70.707 143.457 72.855 143.997 75 143.997C77.145 143.997 79.293 143.46 81.207 142.383L131.733 113.994C135.6 111.816 138 107.754 138 103.389V46.6111C138 42.2431 135.597 38.1811 131.733 36.0091ZM75 111C55.149 111 39 94.8511 39 75.0001C39 55.1491 55.149 39.0001 75 39.0001C86.34 39.0001 96.825 44.2651 103.626 53.2231L90.486 60.8311C86.532 56.5111 80.919 54.0001 75 54.0001C63.42 54.0001 54 63.4201 54 75.0001C54 86.5801 63.42 96.0001 75 96.0001C80.919 96.0001 86.532 93.4891 90.486 89.1691L103.626 96.7771C96.825 105.735 86.34 111 75 111Z" />
      </svg>
    ),
    pinned: false,
    about:
      "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions.",
    url: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    id: 9,
    name: "C++",
    level: 60,
    Icon: (
      <svg
        className="h-8 w-8  dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        fill="currentColor"
        viewBox="0 0 50 50"
      >
        <path d="M 43.910156 12.003906 L 27.070313 2.539063 C 25.792969 1.824219 24.207031 1.824219 22.929688 2.539063 L 6.089844 12.003906 C 4.800781 12.726563 4 14.082031 4 15.535156 L 4 34.464844 C 4 35.917969 4.800781 37.273438 6.089844 37.996094 L 22.929688 47.460938 C 23.570313 47.820313 24.285156 48 25 48 C 25.714844 48 26.429688 47.820313 27.070313 47.460938 L 43.910156 37.996094 C 45.199219 37.273438 46 35.917969 46 34.464844 L 46 15.535156 C 46 14.082031 45.199219 12.726563 43.910156 12.003906 Z M 25 37 C 18.382813 37 13 31.617188 13 25 C 13 18.382813 18.382813 13 25 13 C 28.78125 13 32.273438 14.753906 34.542969 17.742188 L 30.160156 20.277344 C 28.84375 18.835938 26.972656 18 25 18 C 21.140625 18 18 21.140625 18 25 C 18 28.859375 21.140625 32 25 32 C 26.972656 32 28.84375 31.164063 30.160156 29.722656 L 34.542969 32.257813 C 32.273438 35.246094 28.78125 37 25 37 Z M 37 26 L 35 26 L 35 28 L 33 28 L 33 26 L 31 26 L 31 24 L 33 24 L 33 22 L 35 22 L 35 24 L 37 24 Z M 44 26 L 42 26 L 42 28 L 40 28 L 40 26 L 38 26 L 38 24 L 40 24 L 40 22 L 42 22 L 42 24 L 44 24 Z"></path>
      </svg>
    ),
    pinned: true,
    about:
      'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".',
    url: "https://en.wikipedia.org/wiki/C%2B%2B",
  },
  {
    id: 10,
    name: "Python",
    level: 85,
    Icon: <SiPython className="h-8 w-8" />,
    pinned: true,
    about:
      "Python is an interpreted high-level general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small- and large-scale projects.",
    url: "https://docs.python.org/3/",
  },
  {
    id: 11,
    name: "MySQL",
    level: 85,
    Icon: <SiMysql className="h-8 w-8" />,
    pinned: true,
    about:
      'MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius\'s daughter, and "SQL", the abbreviation for Structured Query Language.',
    url: "https://www.mysql.com/",
  },
  {
    id: 12,
    name: "Git",
    level: 95,
    Icon: <SiGit className="h-8 w-8" />,
    pinned: true,
    about:
      "Git is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows.",
    url: "https://git-scm.com/",
  },
  {
    id: 14,
    name: "Nodejs",
    level: 50,
    Icon: <SiNodedotjs className="h-8 w-8" />,
    pinned: false,
    about:
      "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
    url: "https://nodejs.org/en/",
  },
  {
    id: 15,
    name: "Firebase",
    level: 60,
    Icon: <SiFirebase className="h-8 w-8" />,
    pinned: true,
    about:
      "Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.",
    url: "https://firebase.google.com/",
  },
  {
    id: 16,
    name: "Data Structure",
    level: 60,
    Icon: <VscSymbolStructure className="h-8 w-8" />,

    pinned: false,
    about:
      "Data structure is a fundamental concept of any programming language, essential for algorithmic design. DS is how data and the relationship amongst different data is represented, that aids in how efficiently various functions or operations or algorithms can be applied.",
    url: "https://en.wikipedia.org/wiki/Data_structure",
  },
  {
    id: 18,
    name: "MS Office",
    level: 70,
    Icon: <SiMicrosoftoffice className="h-8 w-8" />,
    pinned: true,
    about:
      "Microsoft Office is a suite of applications designed to help with productivity and completing common tasks on a computer. You can create and edit documents containing text and images, work with data in spreadsheets and databases, and create presentations and posters. Word. Excel. PowerPoint.",
    url: "https://en.wikipedia.org/wiki/Microsoft_Office",
  },
  {
    id: 19,
    name: "Figma",
    level: 70,
    Icon: <SiFigma className="h-8 w-8" />,
    pinned: false,
    about:
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows. The Figma mobile app for Android and iOS allow viewing and interacting with Figma prototypes in real-time on mobile devices.",
    url: "https://www.figma.com/",
  },
  //start with 21
];
