import { MovieType } from "@lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { fromLeftChildren } from "@content/FramerMotionVariants";
import { AiFillStar } from "react-icons/ai";

export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Link href={movie.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        variants={fromLeftChildren}
        className="relative bg-white dark:bg-darkSecondary shadow-md p-3 rounded-3xl group transition-[opacity,transform] duration-500"
      >
        <div className="w-44 h-64 relative -mt-7 rounded-2xl overflow-hidden shadow-lg">
          <Image
            className="object-cover rounded-2xl lg:group-hover:scale-105 transition-transform"
            src={movie.image}
            alt={movie.name}
            width={600}
            height={720}
            style={{
              height: "100%",
            }}
          />
        </div>

        <div className="flex flex-col gap-2 mt-2 mb-1">
          <MovieWatchedStatus isWatched={movie.watched} rating={movie.rating} />
          <p className="-z-1 text-sm font-medium ">{movie.name}</p>
        </div>
      </motion.div>
    </Link>
  );
}

/* This Component displays the current status of a movie, which includes whether it is watched or being watched. */
function MovieWatchedStatus({
  isWatched,
  rating,
}: {
  isWatched: boolean;
  rating?: number;
}) {
  return (
    <div className="flex text-xs items-center justify-between">
      {isWatched ? (
        <>
          <p className="px-4 py-0.5 rounded-full bg-green-400/40 text-green-800 dark:text-green-300">
            Watched
          </p>
          <div className="flex items-center gap-1 font-medium">
            <AiFillStar className="w-4 h-4" />
            <p>{rating}/10</p>
          </div>
        </>
      ) : (
        <p className="relative px-4 py-0.5 rounded-full bg-yellow-300/70 dark:bg-yellow-300 text-yellow-700 animate-pulse">
          Watching
        </p>
      )}
    </div>
  );
}
