import Image from "next/image";
import Link from "next/link";
import { popUp } from "../../content/FramerMotionVariants";
import { motion } from "framer-motion";

export default function Track({ url, title, artist, coverImage }) {
  return (
    <Link href={url} passHref>
      <a
        href={url}
        className="bg-gray-100 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden "
        rel="noreferrer"
        target="_blank"
      >
        <motion.div
          variants={popUp}
          className="relative w-12 h-12 transform origin-center"
        >
          <Image
            src={coverImage}
            width={50}
            height={50}
            layout="fixed"
            alt={title}
            quality={50}
          ></Image>
        </motion.div>
        <div>
          <motion.h2
            variants={popUp}
            className="text-base md:text-xl text-gray-900 dark:text-white font-semibold transform origin-left font-barlow"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={popUp}
            className="transform origin-left text-gray-500 text-xs sm:text-sm md:text-base line-clamp-1"
          >
            {artist}
          </motion.p>
        </div>
      </a>
    </Link>
  );
}
