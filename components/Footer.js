import Link from "next/link";
import Image from "next/image";
import socialMedia from "../content/socialMedia";
import { FadeContainer, popUp } from "../content/FramerMotionVariants";
import { navigationRoutes } from "../utils/utils";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { HiOutlineQrcode } from "react-icons/hi";

export default function Footer({ setShowQR, showQR }) {
  const { data: currentSong } = useSWR("/api/now-playing", fetcher);

  return (
    <footer className=" text-gray-600 dark:text-gray-400/50 w-screen font-inter mb-20 print:hidden">
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

          <div></div>
        </div>

        <section className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes.slice(0, 4).map((text, index) => {
              return (
                <FooterLink key={index} id={index} route={text} text={text} />
              );
            })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes
              .slice(4, navigationRoutes.length)
              .map((route, index) => {
                let text = route;
                if (route === "rss") text = "RSS";
                return <FooterLink key={index} route={route} text={text} />;
              })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {socialMedia.slice(0, 4).map((platform, index) => {
              return (
                <Link key={index} href={platform.url} passHref>
                  <motion.a
                    className="hover:text-black dark:hover:text-white w-fit"
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
        </section>
      </motion.div>

      <div className="w-full flex justify-center">
        <div
          onClick={() => setShowQR(!showQR)}
          className="bg-gray-700 text-white p-4 rounded-full cursor-pointer transition-all active:scale-90 hover:scale-105"
        >
          <HiOutlineQrcode className="w-6 h-6 " />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ route, text }) {
  return (
    <Link href={`/${route}`} passHref>
      <motion.a
        className="hover:text-black dark:hover:text-white w-fit"
        variants={popUp}
        href={`/${route}`}
      >
        {text}
      </motion.a>
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

function WhenPlaying({ song }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold">Now Playing</h4>
      <Link href={song.songUrl} passHref>
        <a
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
                layout="fixed"
                quality={50}
                placeholder="blur"
                blurDataURL={song.albumImageUrl}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <h3 className="font-semibold md:text-lg text-black dark:text-white animate-">
                {song.title}
              </h3>
              <span className="hidden md:inline-flex">—</span>

              <p className="text-gray-600 text-xs sm:text-sm">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SiSpotify className="w-6 h-6 text-green-500 animate-[spin_2s_linear_infinite]" />
          </div>
        </a>
      </Link>
    </div>
  );
}
