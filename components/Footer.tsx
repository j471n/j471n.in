import Link from "next/link";
import Image from "next/image";
import socialMedia from "@content/socialMedia";
import { navigationRoutes } from "../utils/utils";
import { motion, useAnimation } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { HiOutlineQrcode } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { Song } from "@lib/types";
import { useEffect } from "react";

// Custom animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const slideUpVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const scaleInVariant = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Footer({
  setShowQR,
  showQR,
}: {
  setShowQR: (value: boolean) => void;
  showQR: boolean;
}) {
  const { data: currentSong } = useSWR("/api/now-playing", fetcher);
  const { data: visitors } = useSWR("/api/ga", fetcher);

  return (
    <footer className="w-screen text-gray-600 dark:text-gray-400 font-inter print:hidden border-t border-gray-200 dark:border-neutral-700 mt-20 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="absolute inset-0 dark:opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: false, margin: "-100px" }}
        className="max-w-4xl mx-auto px-5 py-12 2xl:max-w-5xl 3xl:max-w-7xl relative z-10"
      >
        {/* Now Playing Section */}
        <motion.div variants={scaleInVariant} className="mb-12">
          {currentSong?.isPlaying ? (
            <WhenPlaying song={currentSong} />
          ) : (
            <NotPlaying />
          )}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div variants={slideUpVariant} className="md:col-span-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-3"
            >
              Jatin Sharma
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"
            >
              Full-stack developer passionate about creating beautiful and
              functional web experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center gap-2 text-xs"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-darkSecondary border border-gray-300 dark:border-neutral-600 rounded-full"
              >
                <BsDot className="text-green-500 w-5 h-5 animate-pulse" />
                <motion.span
                  key={visitors?.totalVisitors}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-medium text-gray-900 dark:text-white"
                >
                  {visitors?.totalVisitors ?? "---"}
                </motion.span>
                <span className="text-gray-500 dark:text-gray-400">
                  visitors
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={slideUpVariant} className="md:col-span-3">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider"
            >
              Navigation
            </motion.h4>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-2.5"
            >
              {navigationRoutes.slice(0, 5).map((text, index) => (
                <FooterLink
                  key={index}
                  route={text}
                  text={text}
                  index={index}
                />
              ))}
            </motion.ul>
          </motion.div>

          {/* More Links */}
          <motion.div variants={slideUpVariant} className="md:col-span-2">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider"
            >
              More
            </motion.h4>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-2.5"
            >
              {navigationRoutes
                .slice(5, navigationRoutes.length)
                .map((route, index) => {
                  let text = route;
                  if (route === "rss") text = "RSS";
                  return (
                    <FooterLink
                      key={index}
                      route={route}
                      text={text}
                      index={index}
                    />
                  );
                })}
            </motion.ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={slideUpVariant} className="md:col-span-3">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider"
            >
              Connect
            </motion.h4>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-2.5"
            >
              {socialMedia.slice(0, 5).map((platform, index) => (
                <SocialLink key={index} platform={platform} index={index} />
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6, type: "spring" }}
          className="pt-8 border-t border-gray-200 dark:border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Jatin Sharma
            </span>
            <span className="hidden md:inline text-gray-400 dark:text-neutral-600">
              •
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              Built with{" "}
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-white hover:underline font-medium"
              >
                Next.js
              </Link>{" "}
              &{" "}
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-white hover:underline font-medium"
              >
                Vercel
              </Link>
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{
              scale: 1.1,
              rotate: 90,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9, rotate: -90 }}
            onClick={() => setShowQR(!showQR)}
            className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Show QR Code"
          >
            <HiOutlineQrcode className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

// Footer Link Component
function FooterLink({
  route,
  text,
  index,
}: {
  route: string;
  text: string;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
    >
      <Link href={`/${route}`}>
        <motion.span
          whileHover={{ x: 5, color: "currentColor" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors capitalize inline-block relative group"
        >
          <motion.span
            className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            →
          </motion.span>
          {text}
        </motion.span>
      </Link>
    </motion.li>
  );
}

// Social Link Component
function SocialLink({
  platform,
  index,
}: {
  platform: { title: string; url: string };
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
    >
      <Link href={platform.url} target="_blank" rel="noopener noreferrer">
        <motion.span
          whileHover={{ scale: 1.05, x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-block relative group"
        >
          <motion.span
            className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            ↗
          </motion.span>
          {platform.title}
        </motion.span>
      </Link>
    </motion.li>
  );
}

// Not Playing Component
function NotPlaying() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-center gap-3 p-4 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 rounded-lg group hover:border-gray-300 dark:hover:border-neutral-600 transition-all"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="p-2 bg-gray-100 dark:bg-darkPrimary rounded-md"
      >
        <SiSpotify className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </motion.div>
      <div className="flex-1">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Not Playing
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          Spotify
        </motion.p>
      </div>
    </motion.div>
  );
}

// When Playing Component
function WhenPlaying({ song }: { song: Song }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-3"
      >
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          Now Playing
        </p>
      </motion.div>

      <Link
        href={song.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <motion.div
          animate={controls}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-4 p-4 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 rounded-lg hover:border-gray-300 dark:hover:border-neutral-600 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative flex-shrink-0"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                alt={song.title}
                src={song.albumImageUrl}
                width={56}
                height={56}
                quality={50}
                placeholder="blur"
                blurDataURL={song.albumImageUrl}
                className="rounded-md shadow-md"
              />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 p-1 bg-green-500 rounded-full shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <SiSpotify className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 min-w-0 relative z-10"
          >
            <motion.h3
              whileHover={{ x: 3 }}
              className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
            >
              {song.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5"
            >
              {song.artist}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex-shrink-0 relative z-10"
          >
            <div className="flex items-center gap-0.5">
              {[3, 4, 2, 5].map((height, index) => (
                <motion.span
                  key={index}
                  animate={{
                    height: [
                      `${height * 0.25}rem`,
                      `${height * 0.35}rem`,
                      `${height * 0.25}rem`,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-0.5 bg-green-500 rounded-full"
                  style={{ height: `${height * 0.25}rem` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
