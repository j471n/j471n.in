import { MovieType } from "@lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { fromLeftChildren } from "@content/FramerMotionVariants";

export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Link href={movie.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        variants={fromLeftChildren}
        className="relative h-[280px] bg-white dark:bg-darkSecondary shadow-md p-3 rounded-3xl group transition-all duration-200"
      >
        <div className="w-44 h-64 relative -mt-7 md:-mt-0 md:group-hover:-mt-7 rounded-2xl transition-all duration-200">
          <Image
            className="object-cover rounded-2xl"
            src={movie.image}
            alt={movie.name}
            width={600}
            height={720}
            style={{
              height: "100%",
            }}
          />
        </div>

        <p className="-z-1 text-sm font-medium my-2 text-center absolute bottom-1 left-0 right-0 transition-opacity opacity-100 md:opacity-0 md:group-hover:opacity-100">
          {movie.name}
        </p>
      </motion.div>
    </Link>
  );
}
