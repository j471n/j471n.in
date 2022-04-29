import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiLightbulbFlashFill } from "react-icons/ri";
import Image from "next/image";
import { AvatarImage } from "../utils/utils";
import { motion, useAnimation } from "framer-motion";
import {
  fromLeftVariant,
  fromRightVariant,
  fromTopVariant,
} from "../content/FramerMotionVariants";
import { useDarkMode } from "../context/darkModeContext";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";

export default function TopNavbar() {
  const router = useRouter();
  const navRef = useRef(null);
  const control = useAnimation();

  const { isDarkMode, changeDarkMode } = useDarkMode();

  // navigation links
  const navlinks = ["home", "skills", "blogs", "certificates", "projects"];

  // Adding Shadow, backdrop to the navbar as user scroll the screen
  function addShadowToNavbar() {
    if (window.pageYOffset > 10) {
      navRef.current.classList.add(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/30",
          "dark:bg-darkSecondary/50",
        ]
      );

      control.start("visible");
    } else {
      navRef.current.classList.remove(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/30",
          "dark:bg-darkSecondary/50",
        ]
      );
      control.start("hidden");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", addShadowToNavbar);
    return () => {
      window.removeEventListener("scroll", addShadowToNavbar);
    };
  }, [addShadowToNavbar]);

  return (
    <div
      className="fixed w-full dark:text-white top-0 flex items-center justify-between px-4 py-[10px] sm:p-4 z-40 print:hidden"
      ref={navRef}
    >
      {/* Name and Image*/}
      <motion.div
        className="text-center sm:text-left text-2xl font-bold z-40"
        title="Jatin Sharma"
      >
        <Link href="/" passHref>
          <div className="flex gap-2 items-center cursor-pointer">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fromLeftVariant}
              className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10"
            >
              <Image
                src={AvatarImage}
                width={64}
                height={64}
                alt="Profile Image"
                priority={true}
              ></Image>
            </motion.div>
            <motion.p
              initial="hidden"
              animate={control}
              variants={{
                hidden: { opacity: 0, scale: 1, display: "none" },
                visible: { opacity: 1, scale: 1, display: "inline-flex" },
              }}
              className="absolute sm:relative left-0 right-0 flex justify-center pointer-events-none text-base font-sarina"
            >
              Jatin Sharma
            </motion.p>
          </div>
        </Link>
      </motion.div>

      {/* Dark Mode Toggle button */}

      {/* Top Nav list */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fromTopVariant}
        className="hidden sm:flex z-10 lg:absolute lg:inset-0 lg:justify-center"
      >
        <AnimatedDiv className="flex items-center">
          {navlinks.map((navlink, index) => {
            return (
              <NavItem
                key={index}
                href={`/${navlink}`}
                text={navlink}
                router={router}
              />
            );
          })}
        </AnimatedDiv>
      </motion.nav>

      {/* </AnimatedDiv> */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fromRightVariant}
        className="cursor-pointer rounded-full p-1 sm:p-[5px] ring-1 ring-gray-100 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 z-50"
        title="Toggle Theme"
        onClick={() => changeDarkMode(!isDarkMode)}
      >
        <RiLightbulbFlashFill
          className={`text-2xl sm:text-3xl transition-all duration-300 rotate-180 ${
            isDarkMode
              ? "text-gray-500 lg:hover:text-yellow-400"
              : "text-yellow-400 lg:hover:text-gray-500"
          }`}
        />
      </motion.div>
    </div>
  );
}

// Navlink
function NavItem({ href, text, router }) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link href={href === "/home" ? "/" : href} passHref>
      <a
        className={`${
          isActive
            ? "font-bold text-gray-800 dark:text-gray-200 border-gray-800 dark:border-gray-200"
            : "font-medium text-gray-600 dark:text-gray-400 border-transparent"
        } sm:inline-block hover:text-gray-900 dark:hover:text-gray-50 transition-all text-lg mr-4 sm:mr-7 hidden border-b-[3px] `}
      >
        <span className="capitalize">{text}</span>
      </a>
    </Link>
  );
}
