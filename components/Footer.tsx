import Link from "next/link";
import Image from "next/image";
import socialMedia from "@content/socialMedia";
import siteConfig from "@content/siteConfig";
import { navigationRoutes } from "../utils/utils";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { HiOutlineQrcode } from "react-icons/hi";
import { Song } from "@lib/types";

export default function Footer({
  setShowQR,
  showQR,
}: {
  setShowQR: (value: boolean) => void;
  showQR: boolean;
}) {
  const { data: currentSong } = useSWR("/api/now-playing", fetcher);
  const { data: visitors } = useSWR("/api/ga", fetcher);

  const navLinks = navigationRoutes.slice(0, 5);
  const moreLinks = navigationRoutes.slice(5);

  return (
    <footer className="w-screen font-inter print:hidden border-t border-gray-200 dark:border-neutral-700 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* ── Top: Brand + Now Playing ── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {siteConfig.person.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-xs">
              {siteConfig.footer.description}
            </p>
            {/* Visitor stat */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500">
                Visitors
              </span>
              <div className="h-px w-6 bg-gray-200 dark:bg-neutral-700" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                  {visitors?.totalVisitors ?? "—"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Now Playing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-4 block">
              Now Playing
            </span>
            {currentSong?.isPlaying ? (
              <WhenPlaying song={currentSong} />
            ) : (
              <NotPlaying />
            )}
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gray-200 dark:bg-neutral-700 mb-10" />

        {/* ── Links grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 mb-10">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-3 block">
              Navigation
            </span>
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {navLinks.map((text, i) => (
                <FooterLink
                  key={i}
                  href={`/${text}`}
                  text={text}
                  isExternal={false}
                />
              ))}
            </div>
          </motion.div>

          {/* More */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-3 block">
              More
            </span>
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {moreLinks.map((route, i) => (
                <FooterLink
                  key={i}
                  href={`/${route}`}
                  text={route === "rss" ? "RSS" : route}
                  isExternal={false}
                />
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-3 block">
              Connect
            </span>
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {socialMedia.slice(0, 5).map((platform, i) => (
                <FooterLink
                  key={i}
                  href={platform.url}
                  text={platform.title}
                  isExternal={true}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="h-px bg-gray-200 dark:bg-neutral-700 mb-8" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Jatin Sharma
            </span>
            <span className="text-gray-300 dark:text-gray-700 text-xs hidden sm:inline">
              ·
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500 dark:text-gray-500">
              Built with{" "}
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Next.js
              </Link>{" "}
              &{" "}
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Vercel
              </Link>
            </span>
          </div>

          {/* QR button — matches contact CTA invert style */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowQR(!showQR)}
            className="group relative inline-flex items-center gap-2 px-4 py-2 border border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-semibold overflow-hidden hover:text-white dark:hover:text-gray-900 focus:outline-none transition-colors duration-300"
            aria-label="Show QR Code"
          >
            <span className="absolute inset-0 bg-gray-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-2">
              <HiOutlineQrcode className="w-4 h-4" />
              QR Code
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  text,
  isExternal,
}: {
  href: string;
  text: string;
  isExternal: boolean;
}) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between py-2.5 group text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors capitalize"
    >
      <span className="relative">
        <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-current transition-all duration-300" />
        {text}
      </span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
        {isExternal ? "↗" : "→"}
      </span>
    </Link>
  );
}

function NotPlaying() {
  return (
    <div className="flex items-center gap-3 py-1">
      <SiSpotify className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Not Playing
        </p>
        <p className="text-xs font-mono text-gray-500 dark:text-gray-500">
          Spotify
        </p>
      </div>
    </div>
  );
}

function WhenPlaying({ song }: { song: Song }) {
  return (
    <Link
      href={song.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 py-1"
    >
      <div className="relative flex-shrink-0">
        <Image
          alt={song.title}
          src={song.albumImageUrl}
          width={40}
          height={40}
          quality={50}
          className="rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:underline underline-offset-2 decoration-gray-400">
          {song.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate mt-0.5">
          {song.artist}
        </p>
      </div>
      {/* Equaliser bars */}
      <div className="flex items-end gap-0.5 flex-shrink-0 h-5">
        {[3, 4, 2, 5].map((h, i) => (
          <motion.span
            key={i}
            animate={{ height: [`${h * 3}px`, `${h * 4.5}px`, `${h * 3}px`] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-0.5 bg-emerald-500 rounded-full inline-block"
          />
        ))}
      </div>
    </Link>
  );
}
