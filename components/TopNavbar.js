import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AvatarImage } from "../utils/utils";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  fromLeftVariant,
  fromRightVariant,
  fromTopVariant,
  hamFastFadeContainer,
  headingFromLeft,
  mobileNavItemSideways,
} from "../content/FramerMotionVariants";
import { useDarkMode } from "../context/darkModeContext";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";
import { navigationRoutes } from "../utils/utils";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function TopNavbar() {
  const router = useRouter();
  const navRef = useRef(null);
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  const { isDarkMode, changeDarkMode } = useDarkMode();

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
      className="fixed w-full dark:text-white top-0 flex items-center justify-between px-4 py-[10px] sm:p-4 sm:px-6 z-40 print:hidden"
      ref={navRef}
    >
      {/* Mobile Navigation Hamburger and MobileMenu */}
      <HamBurger open={navOpen} setOpen={setNavOpen} />
      <AnimatePresence>
        {navOpen && (
          <MobileMenu links={navigationRoutes} setNavOpen={setNavOpen} />
        )}
      </AnimatePresence>

      <Link href="/" passHref>
        <div className="flex gap-2 items-center cursor-pointer">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fromLeftVariant}
            className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 hidden sm:inline-flex"
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
            className="absolute sm:!hidden lg:!inline-flex md:relative left-0 right-0 flex justify-center pointer-events-none text-base font-sarina"
          >
            Jatin Sharma
          </motion.p>
        </div>
      </Link>

      {/* Top Nav list */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fromTopVariant}
        className="hidden sm:flex z-10 md:absolute md:inset-0 md:justify-center"
      >
        <AnimatedDiv className="flex items-center">
          {navigationRoutes.map((link, index) => {
            return (
              <NavItem
                key={index}
                href={`/${link}`}
                text={link}
                router={router}
              />
            );
          })}
        </AnimatedDiv>
      </motion.nav>

      {/* DarkMode Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fromRightVariant}
        className="cursor-pointer rounded-full z-30 duration-300 group"
        title="Toggle Theme"
        onClick={() => changeDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <BsSunFill className="h-6 w-6 sm:h-8 sm:w-8 select-none transform duration-100 group-active:scale-50" />
        ) : (
          <BsMoonFill className="h-6 w-6 sm:h-8 sm:w-8 select-none transform duration-100 group-active:scale-50" />
        )}
      </motion.div>
    </div>
  );
}

// NavItem Container
function NavItem({ href, text, router }) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link href={href === "/home" ? "/" : href} passHref>
      <a
        className={`${
          isActive
            ? "font-bold text-gray-800 dark:text-gray-200"
            : "font-medium text-gray-600 dark:text-gray-400"
        } sm:inline-block hover:text-gray-900 dark:hover:text-gray-50 transition-all text-lg mr-4 sm:mr-7 hidden font-inter`}
      >
        <span className="capitalize">{text}</span>
      </a>
    </Link>
  );
}

// Hamburger Button
function HamBurger({ open, setOpen }) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial="hidden"
      animate="visible"
      variants={headingFromLeft}
      className="sm:hidden"
    >
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 cursor-pointer select-none transform duration-300 rounded-md active:scale-50"
          onClick={() => setOpen((open) => !open)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 cursor-pointer select-none transform duration-300  rounded-md active:scale-50"
          onClick={() => setOpen((open) => !open)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </motion.div>
  );
}

// Mobile navigation menu
const MobileMenu = ({ links, setNavOpen }) => {
  return (
    <motion.div
      className="absolute font-normal bg-white dark:bg-darkPrimary w-screen h-screen top-0 left-0 z-10"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.nav className="mt-32 mx-8 flex flex-col">
        {links.map((link, index) => {
          const navlink =
            link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
          return (
            <Link href={navlink} key={index} passHref>
              <motion.a
                href={navlink}
                className="list-none text-xl my-3 uppercase font-inter font-medium tracking-wide"
                variants={mobileNavItemSideways}
                onClick={() => setNavOpen(false)}
              >
                {link}
              </motion.a>
            </Link>
          );
        })}
      </motion.nav>
    </motion.div>
  );
};
