import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ITMDBData } from "@lib/interface";
import Image from "next/image";
import { motion } from "framer-motion";

const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w780";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

export default function MovieCard({ movie }: { movie: ITMDBData }) {
  const [loading, setLoading] = useState(true);
  const title = movie?.original_title ?? movie?.original_name ?? "";

  return (
    <motion.div
      variants={cardVariants}
      className="group flex-shrink-0 w-[148px] flex flex-col bg-white dark:bg-darkPrimary border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
    >
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-darkSecondary">
        {loading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )}
        <Image
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={TMDB_IMAGE_PREFIX + movie.poster_path}
          alt={title}
          width={296}
          height={444}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <WatchStatus rating={movie.rating} />
        <p
          className="text-xs font-medium text-gray-900 dark:text-white leading-snug line-clamp-2"
          title={title}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

function WatchStatus({ rating }: { rating?: number }) {
  return (
    <div className="flex items-center justify-between gap-1">
      {rating ? (
        <>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5">
            Watched
          </span>
          <span className="flex items-center gap-0.5 text-[10px] font-mono text-gray-600 dark:text-gray-400">
            <AiFillStar className="w-3 h-3 text-amber-500" />
            {rating}
          </span>
        </>
      ) : (
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 animate-pulse">
          Watching
        </span>
      )}
    </div>
  );
}
