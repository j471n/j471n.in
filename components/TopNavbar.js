import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useDarkmode from "../hooks/useDarkmode";
import { RiLightbulbFlashFill } from "react-icons/ri";
import Image from "next/image";
import { AvatarImage } from "../utils/utils";
import { motion } from "framer-motion";
import {
  fromLeftVariant,
  fromRightVariant,
  fromTopVariant,
} from "../content/FramerMotionVariants";

export default function TopNavbar() {
  const routes = ["/", "/skills", "/blogs", "/projects"];
  const router = useRouter();
  const currentRoute = router.pathname;

  const { darkMode, changeDarkMode } = useDarkmode();

  useEffect(() => {
    // Gathering all the top-nav-links it returns an object
    var navLinks = document.querySelectorAll(".top-nav-link");

    // iterating through object and removing the border if exist
    Object.entries(navLinks).forEach(
      // link is an array of id and the item, changing the item
      (link) => (link[1].style.borderBottom = "none")
    );

    // Checking if the current route is valid
    if (routes.includes(currentRoute)) {
      // navLinks.map((link) => console.log(link));
      // this checks the currentRoute index the return it the navLinks
      // then we change the style according to the index e.g. navLinks[0].style.color ="black";
      navLinks[routes.indexOf(currentRoute)].style.borderBottom = "4px solid";
    }
  }, [currentRoute]);

  return (
    <div className="fixed w-full bg-white/30 dark:bg-darkPrimary/50   dark:text-white backdrop-blur-xl top-0 flex items-center justify-between shadow px-4 py-[10px] sm:p-4 z-40 print:hidden">
      {/* <div className="absolute inset-0  opacity-50 "></div> */}

      {/* Name and Image*/}
      <motion.div
        className="text-center sm:text-left text-2xl font-bold z-40"
        title="Jatin Sharma"
      >
        <Link href="/">
          <div className="flex gap-2 items-center cursor-pointer">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fromLeftVariant}
              className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10"
            >
              <Image
                src={AvatarImage}
                width={50}
                height={50}
                alt="Profile Image"
              ></Image>
            </motion.div>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fromTopVariant}
              className="absolute sm:relative left-0 right-0 pointer-events-none"
            >
              Jatin Sharma
            </motion.p>
          </div>
        </Link>
      </motion.div>

      {/* Dark Mode Toggle button */}

      {/* Top Nav list */}
      {/* <AnimatedDiv variants={fromTopVariant}> */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fromTopVariant}
        className="hidden sm:flex z-40"
      >
        <ul className="flex items-center">
          <li className="top-nav-link">
            <Link href="/">About Me</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/skills">Skills</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/projects">Projects</Link>
          </li>
          {/* <li className="top-nav-link">
            <Link href="/contact">Contact</Link>
          </li> */}
        </ul>
      </motion.nav>
      {/* </AnimatedDiv> */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fromRightVariant}
        className="cursor-pointer rounded-full p-1 sm:p-[5px] ring-1 ring-gray-100 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500"
        title="Toggle Theme"
        onClick={() => changeDarkMode(!darkMode)}
      >
        <RiLightbulbFlashFill
          className={`text-2xl sm:text-3xl transition-all duration-500 rotate-180 ${
            darkMode
              ? "text-gray-500 lg:hover:text-yellow-400"
              : "text-yellow-400 lg:hover:text-gray-500"
          }`}
        />
      </motion.div>
    </div>
  );
}
