import Link from "next/link";
import socialMedia from "../content/socialMedia";
import {
  FadeContainer,
  popUp,
} from "../content/FramerMotionVariants";
import { navigationRoutes } from "../utils/utils";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className=" text-gray-600 dark:text-gray-400/50 w-screen font-inter">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl px-5 py-10 border-t-2 border-gray-200  dark:border-gray-400/10 grid grid-cols-3 gap-10 mx-auto text-sm sm:text-base"
      >
        <div className="flex flex-col gap-4 capitalize">
          {navigationRoutes.map((route, index) => {
            return (
              <Link key={index} href={`/${route}`} passHref>
                <motion.a variants={popUp} href={`/${route}`}>
                  {route}
                </motion.a>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 capitalize">
          {socialMedia.map((platform, index) => {
            if (index > 3) return;
            return (
              <Link key={index} href={platform.url} passHref>
                <motion.a
                  variants={popUp}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={platform.url}
                >
                  {platform.title}
                </motion.a>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 capitalize">
          {socialMedia.map((platform, index) => {
            if (index < 4) return;
            return (
              <Link key={index} href={platform.url} passHref>
                <motion.a
                  variants={popUp}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={platform.url}
                >
                  {platform.title}
                </motion.a>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </footer>
  );
}
