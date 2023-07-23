import React, { useState } from "react";

import { AiFillStar } from "react-icons/ai";
import { ITMDBData } from "@lib/interface";
import Image from "next/image";
import { fromLeftChildren } from "@content/FramerMotionVariants";
import { motion } from "framer-motion";

const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w780";

export default function MovieCard({ movie }: { movie: ITMDBData }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <motion.div
      variants={fromLeftChildren}
      className="relative bg-white dark:bg-darkSecondary shadow-md p-3 rounded-3xl group transition-[opacity,transform] duration-500"
    >
      <div className="relative h-64 overflow-hidden shadow-lg w-44 -mt-7 rounded-2xl">
        {loading && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center bg-neutral-700"
              style={{
                zIndex: 1,
              }}
            ></div>
            <span
              className="h-full w-full absolute inset-0 left-full"
              style={{
                zIndex: 2,
                background:
                  "linear-gradient(90deg, transparent, #ffffff50, transparent)",
                animation: "loadingAnimation 1.5s linear infinite",
              }}
            ></span>
          </>
        )}
        <Image
          className="object-cover transition-transform rounded-2xl lg:group-hover:scale-105"
          src={TMDB_IMAGE_PREFIX + movie.poster_path}
          alt={(movie?.original_title ?? movie?.original_name) as string}
          width={600}
          height={720}
          style={{
            height: "100%",
          }}
          onLoadingComplete={handleImageLoaded}
        />
      </div>

      <div className="flex flex-col gap-2 mt-2 mb-1 max-w-full">
        <MovieWatchedStatus rating={movie.rating} />
        <p
          className="text-sm font-medium -z-1 line-clamp-1"
          title={movie?.original_title ?? movie?.original_name}
        >
          {movie?.original_title ?? movie?.original_name}
        </p>
      </div>
    </motion.div>
  );
}

/* This Component displays the current status of a movie, which includes whether it is watched or being watched. */
function MovieWatchedStatus({ rating }: { rating?: number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      {rating ? (
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
