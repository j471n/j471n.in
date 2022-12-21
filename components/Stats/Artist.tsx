import Image from "next/image";
import Link from "next/link";
import { popUpFromBottomForText } from "@content/FramerMotionVariants";
import { motion } from "framer-motion";

type ArtistProps = {
  name: string;
  url: string;
  coverImage: string;
  followers: string;
  id: number;
};

export default function Artist({
  name,
  url,
  coverImage,
  followers,
  id,
}: ArtistProps) {
  return (
    <Link rel="noreferrer" target="_blank" href={url}>
      <motion.div
        variants={popUpFromBottomForText}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-100 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary border-l first:border-t border-r border-b border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden"
      >
        <div className="text-xl text-gray-500 transform origin-center font-inter tracking-wider hidden xs:inline-flex">
          #{id + 1}
        </div>
        <div className="relative w-12 md:w-24 h-12 md:h-24 transform origin-center">
          <Image
            className="rounded-full"
            src={coverImage}
            width={100}
            height={100}
            alt={name}
            quality={50}
            style={{
              height: "100%",
            }}
          ></Image>
        </div>
        <div>
          <h2 className="text-base sm:text-lg md:text-xl xl:text-2xl text-gray-900 dark:text-white font-semibold md:font-bold transform origin-left font-barlow">
            {name}
          </h2>
          <p className="transform origin-left text-gray-500 text-xs sm:text-sm md:text-base md:font-medium line-clamp-1">
            {followers.toLocaleString()} Followers
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
