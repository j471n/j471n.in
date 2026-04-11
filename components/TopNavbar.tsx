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
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  const { isDarkMode, changeDarkMode } = useDarkMode();

  const addShadowToNavbar = useCallback(() => {
    if (window.pageYOffset > 10) {
      navRef.current!.classList.add(
        ...[
          "border-b",
          "border-gray-200",
          "dark:border-neutral-700",
          "backdrop-blur-xl",
          "bg-white/80",
          "dark:bg-darkPrimary/90",
        ],
      );
      control.start("visible");
    } else {
      navRef.current!.classList.remove(
        ...[
          "border-b",
          "border-gray-200",
          "dark:border-neutral-700",
          "backdrop-blur-xl",
          "bg-white/80",
          "dark:bg-darkPrimary/90",
        ],
      );
      control.start("hidden");
    }
  }, [control]);

  useEffect(() => {
    window.addEventListener("scroll", addShadowToNavbar);
    return () => window.removeEventListener("scroll", addShadowToNavbar);
  }, [addShadowToNavbar]);

  function lockScroll() {
    document.getElementsByTagName("html")[0].classList.toggle("lock-scroll");
  }

  function handleClick() {
    lockScroll();
    setNavOpen(!navOpen);
  }

  return (
    <>
      <div
        className="fixed w-full top-0 z-50 print:hidden transition-colors duration-200"
        ref={navRef}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-14">
          {/* Logo / name */}
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <Logo className="w-7 h-7 text-black dark:text-white" />
            <motion.span
              initial="hidden"
              animate={control}
              variants={{
                hidden: { opacity: 0, x: -6 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
              }}
              className="font-sarina text-gray-900 dark:text-white text-sm hidden sm:inline"
            >
              Jatin Sharma
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="hidden sm:flex items-center gap-1"
          >
            {navigationRoutes.slice(0, 8).map((link, i) => (
              <NavItem key={i} href={`/${link}`} text={link} />
            ))}
          </motion.nav>

          {/* Right — dark mode + hamburger */}
          <div className="flex items-center gap-4">
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
                size={20}
              />
            </motion.div>

            {/* Hamburger — mobile only */}
            <HamBurger open={navOpen} handleClick={handleClick} />
          </div>
        </div>
      </div>

      {/* Mobile menu — rendered outside navRef to avoid backdrop-filter
          creating a new fixed containing block that clips the overlay */}
      <AnimatePresence>
        {navOpen && (
          <MobileMenu links={navigationRoutes} handleClick={handleClick} />
        )}
      </AnimatePresence>
    </>
  );
}

// NavItem
function NavItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link
      href={href === "/home" ? "/" : href}
      className={`relative px-3 py-1.5 text-sm font-medium capitalize transition-colors rounded group ${
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <motion.span variants={popUp}>{text}</motion.span>
      {/* active underline */}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-px bg-gray-900 dark:bg-white"
        />
      )}
    </Link>
  );
}

// Hamburger — sm:hidden
function HamBurger({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  return (
    <motion.button
      initial="hidden"
      animate="visible"
      variants={popUp}
      onClick={handleClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer select-none"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block w-5 h-px bg-gray-900 dark:bg-white origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="block w-5 h-px bg-gray-900 dark:bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block w-5 h-px bg-gray-900 dark:bg-white origin-center"
      />
    </motion.button>
  );
}

// Mobile menu — full-screen
const MobileMenu = ({
  links,
  handleClick,
}: {
  links: string[];
  handleClick: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 top-14 z-40 bg-white dark:bg-darkPrimary sm:hidden overflow-y-auto"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Watermark */}
      <div
        className="absolute right-4 top-2 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-200 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
        style={{ fontSize: "clamp(4rem, 20vw, 7rem)" }}
        aria-hidden="true"
      >
        MENU
      </div>

      <nav className="px-6 pt-8 pb-16">
        {/* mono label */}
        <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500 mb-6 block">
          Navigation
        </span>

        <motion.div
          className="divide-y divide-gray-200 dark:divide-neutral-700"
          variants={hamFastFadeContainer}
          initial="hidden"
          animate="visible"
        >
          {links.slice(0, 8).map((link, index) => {
            const href =
              link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
            const label = link === "rss" ? "RSS" : link;
            return (
              <motion.div
                key={`mobileNav-${index}`}
                variants={mobileNavItemSideways}
              >
                <Link
                  href={href}
                  onClick={handleClick}
                  className="flex items-center justify-between py-4 group"
                >
                  <span className="text-2xl font-bold capitalize text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                    {label}
                  </span>
                  <span className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white font-mono text-sm transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </nav>
    </motion.div>
  );
};
