import Image from "next/image";
import Link from "next/link";
import { popUp } from "../../content/FramerMotionVariants";
import { motion } from "framer-motion";

export default function Track({ name, url, coverImage, followers, id }) {
  return (
    <Link href={url} passHref>
      <a
        href={url}
        className="bg-gray-100 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary border-l first:border-t border-r border-b border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden"
        rel="noreferrer"
        target="_blank"
      >
        <motion.div
          variants={popUp}
          className="text-xl text-gray-500 transform origin-center font-inter tracking-wider hidden xs:inline-flex"
        >
          #{id + 1}
        </motion.div>
        <motion.div
          variants={popUp}
          className="relative w-12 md:w-24 h-12 md:h-24 transform origin-center"
        >
          <Image
            className="rounded-full"
            src={coverImage}
            width={100}
            height={100}
            layout="responsive"
            alt={name}
            quality={50}
          ></Image>
        </motion.div>
        <div>
          <motion.h2
            variants={popUp}
            className="text-base sm:text-lg md:text-xl xl:text-2xl text-gray-900 dark:text-white font-semibold md:font-bold transform origin-left font-barlow"
          >
            {name}
          </motion.h2>
          <motion.p
            variants={popUp}
            className="transform origin-left text-gray-500 text-xs sm:text-sm md:text-base md:font-medium line-clamp-1"
          >
            {followers.toLocaleString()} Followers
          </motion.p>
        </div>
      </a>
    </Link>
  );
}
