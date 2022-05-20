import Image from "next/image";
import Link from "next/link";
import { fromTopVariant, popUp } from "../../content/FramerMotionVariants";
import { motion } from "framer-motion";

export default function Track({ url, title, artist, coverImage, id }) {
  return (
    <Link href={url} passHref>
      <motion.a
        variants={{
          hidden: { y: -200, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        href={url}
        className="bg-gray-100 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden relative xs:pl-16 md:!pl-20 "
        rel="noreferrer"
        target="_blank"
      >
        <motion.div
          variants={popUp}
          className="absolute left-4 md:left-6 text-xl text-gray-500 transform origin-center font-inter tracking-wider hidden xs:inline-flex"
        >
          #{id + 1}
        </motion.div>

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
      </motion.a>
    </Link>
  );
}
