import Link from "next/link";
import Image from "next/image";
import socialMedia from "@content/socialMedia";
import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "../content/FramerMotionVariants";
import { navigationRoutes } from "../utils/utils";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { HiOutlineQrcode } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { Song } from "@lib/types";
import NextLogo from "./SVG/NextLogo";
import VercelLogo from "./SVG/VercelLogo";

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
    <footer className=" text-gray-600 dark:text-gray-400/50 w-screen font-inter mb-14 print:hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl p-5 border-t-2 border-gray-200  dark:border-gray-400/10 mx-auto text-sm sm:text-base flex flex-col gap-5"
      >
        <div>
          {currentSong?.isPlaying ? (
            <WhenPlaying song={currentSong} />
          ) : (
            <NotPlaying />
          )}
        </div>

        <section className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes.slice(0, 5).map((text, index) => {
              return <FooterLink key={index} route={text} text={text} />;
            })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes
              .slice(5, navigationRoutes.length)
              .map((route, index) => {
                let text = route;
                if (route === "rss") text = "RSS";
                return <FooterLink key={index} route={route} text={text} />;
              })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {socialMedia.slice(0, 5).map((platform, index) => {
              return (
                <Link
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.p
                    className="hover:text-black dark:hover:text-white w-fit"
                    variants={popUp}
                  >
                    {platform.title}
                  </motion.p>
                </Link>
              );
            })}
          </div>
        </section>
        <motion.div
          variants={opacityVariant}
          className="w-full flex justify-between items-center gap-4 mt-5"
        >
          <div className="flex items-center relative bg-white dark:bg-darkSecondary rounded-full px-4 py-1 text-xs sm:text-sm">
            <BsDot className="w-7 h-7 -ml-2 text-green-500 animate-ping" />
            <p>
              {visitors?.totalVisitors} visitors in last {visitors?.days} days
            </p>
          </div>
          <div
            onClick={() => setShowQR(!showQR)}
            className="bg-gray-700 text-white p-3 rounded-full cursor-pointer transition-all active:scale-90 hover:scale-105"
          >
            <HiOutlineQrcode className="w-5 h-5 " />
          </div>
        </motion.div>

        <motion.div
          variants={opacityVariant}
          className="flex items-center gap-2 justify-center text-black dark:text-white mt-5"
        >
          <span>Powered by</span>

          <Link target="_blank" aria-label="Next.js" rel="noreferrer" href="https://nextjs.org">
            <NextLogo />
          </Link>
          <span>and</span>
          <Link target="_blank" aria-label="Vercel" rel="noreferrer" href="https://vercel.com">
            <VercelLogo />
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function FooterLink({ route, text }: { route: string; text: string }) {
  return (
    <Link href={`/${route}`}>
      <motion.p
        className="hover:text-black dark:hover:text-white w-fit"
        variants={popUp}
      >
        {text}
      </motion.p>
    </Link>
  );
}

function NotPlaying() {
  return (
    <div className="flex items-center gap-2 flex-row-reverse sm:flex-row justify-between sm:justify-start">
      <SiSpotify className="w-6 h-6" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <div className="font-semibold md:text-lg text-black dark:text-white">
          Not Playing
        </div>
        <span className="hidden md:inline-flex">—</span>
        <p className="text-gray-500 text-xs sm:text-sm">Spotify</p>
      </div>
    </div>
  );
}

function WhenPlaying({ song }: { song: Song }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold dark:text-gray-300">Now Playing</h4>
      <Link
        href={song.songUrl}
        className="flex items-center justify-between bg-gray-200 dark:bg-darkSecondary  p-3 sm:p-4 rounded-sm"
      >
        <div className=" flex items-center gap-2">
          <div className="w-10 h-10">
            <Image
              alt={song.title}
              src={song.albumImageUrl}
              width={40}
              height={40}
              quality={50}
              placeholder="blur"
              blurDataURL={song.albumImageUrl}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <h3 className="font-semibold md:text-lg text-black dark:text-white animate-">
              {song.title}
            </h3>
            <span className="hidden md:inline-flex dark:text-gray-300">—</span>

            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {song.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SiSpotify className="w-6 h-6 text-green-500 animate-[spin_2s_linear_infinite]" />
        </div>
      </Link>
    </div>
  );
}
