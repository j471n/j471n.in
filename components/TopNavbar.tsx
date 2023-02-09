/* Importing Modules */
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from "../content/FramerMotionVariants";
import { useDarkMode } from "../context/darkModeContext";
import { navigationRoutes } from "../utils/utils";
import Logo from "./SVG/Logo";
import { DarkModeSwitch } from "react-toggle-dark-mode";

/* TopNavbar Component */
export default function TopNavbar() {
  const navRef = useRef<HTMLDivElement>(null);

  /*  Using to control animation as I'll show the name to the mobile navbar when you scroll a bit
   * demo: https://i.imgur.com/5LKI5DY.gif
   */
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  const { isDarkMode, changeDarkMode } = useDarkMode();

  // Adding Shadow, backdrop to the navbar as user scroll the screen
  const addShadowToNavbar = useCallback(() => {
    if (window.pageYOffset > 10) {
      navRef.current!.classList.add(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/70",
          "dark:bg-darkSecondary",
        ]
      );

      control.start("visible");
    } else {
      navRef.current!.classList.remove(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/70",
          "dark:bg-darkSecondary",
        ]
      );
      control.start("hidden");
    }
  }, [control]);

  useEffect(() => {
    window.addEventListener("scroll", addShadowToNavbar);
    return () => {
      window.removeEventListener("scroll", addShadowToNavbar);
    };
  }, [addShadowToNavbar]);

  // to lock the scroll when mobile is open
  function lockScroll() {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("lock-scroll"); // class is define in the global.css
  }

  /* To Lock  the Scroll when user visit the mobile nav page */
  function handleClick() {
    lockScroll();
    setNavOpen(!navOpen);
  }

  return (
    <div
      className="fixed w-full dark:text-white top-0 flex items-center justify-between px-4 py-[10px] sm:px-6 z-50 print:hidden"
      ref={navRef}
    >
      {/* Mobile Navigation Hamburger and MobileMenu */}
      <HamBurger open={navOpen} handleClick={handleClick} />
      <AnimatePresence>
        {navOpen && (
          <MobileMenu links={navigationRoutes} handleClick={handleClick} />
        )}
      </AnimatePresence>

      <Link href="/" className="mr-3" aria-label="Link to Home Page">
        <Logo className="relative hidden w-8 h-8 sm:inline-flex" />
        <div className="w-full sm:!hidden">
          <motion.p
            initial="hidden"
            animate={control}
            variants={{
              hidden: { opacity: 0, scale: 1, display: "none" },
              visible: { opacity: 1, scale: 1, display: "inline-flex" },
            }}
            className="font-sarina"
          >
            Jatin Sharma
          </motion.p>
        </div>
      </Link>

      {/* Top Nav list */}
      <motion.nav className="z-10 hidden sm:flex md:inset-0 md:justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={FadeContainer}
          className="flex items-center md:gap-2"
        >
          {navigationRoutes.slice(0, 7).map((link, index) => {
            return <NavItem key={index} href={`/${link}`} text={link} />;
          })}
        </motion.div>
      </motion.nav>

      {/* DarkMode Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={popUp}
        className="cursor-pointer"
        title="Toggle Theme"
      >
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={changeDarkMode}
          size={24}
        />
      </motion.div>
    </div>
  );
}

// NavItem Container
function NavItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link
      className={`${
        isActive
          ? "font-bold text-gray-800 dark:text-gray-100"
          : " text-gray-600 dark:text-gray-300"
      } sm:inline-block transition-all text-[17px] hidden px-2 md:px-3 py-[3px] hover:bg-black/10  dark:hover:bg-neutral-700/50 rounded-md`}
      href={href === "/home" ? "/" : href}
    >
      <motion.p className="capitalize" variants={popUp}>
        {text}
      </motion.p>
    </Link>
  );
}

// Hamburger Button
function HamBurger({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial="hidden"
      animate="visible"
      variants={popUp}
      className="sm:hidden"
    >
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
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
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
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
const MobileMenu = ({
  links,
  handleClick,
}: {
  links: string[];
  handleClick: () => void;
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 z-10 w-screen h-screen font-normal bg-white dark:bg-darkPrimary sm:hidden"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.nav className="flex flex-col mx-8 mt-28">
        {links.slice(0, 8).map((link, index) => {
          const navlink =
            link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
          return (
            <Link
              href={navlink}
              key={`mobileNav-${index}`}
              onClick={handleClick}
              className="flex w-auto py-4 text-base font-semibold text-gray-900 capitalize border-b border-gray-300 cursor-pointer dark:border-gray-700 dark:text-gray-100"
            >
              <motion.p variants={mobileNavItemSideways}>
                {link === "rss" ? link.toUpperCase() : link}
              </motion.p>
            </Link>
          );
        })}
      </motion.nav>
    </motion.div>
  );
};
