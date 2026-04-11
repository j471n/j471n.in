import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HardcoverBook } from "@lib/types";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const HARDCOVER_BOOK_URL = "https://hardcover.app/books/";
const FALLBACK_COVER = "https://imgur.com/5dYYce8.png";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Stars({
  rating,
  size = "w-3 h-3",
}: {
  rating: number;
  size?: string;
}) {
  const filled = Math.round(rating);
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${size} ${i <= filled ? "text-amber-400" : "text-gray-300 dark:text-neutral-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </>
  );
}

function formatFinishedDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function BookCard({ book }: { book: HardcoverBook }) {
  const href = book.slug
    ? `${HARDCOVER_BOOK_URL}${book.slug}`
    : "https://hardcover.app";

  const authorLine =
    book.authors.length > 0 ? book.authors.join(", ") : "Unknown author";

  const finishedDate =
    book.statusId === 3
      ? book.finishedAt
        ? formatFinishedDate(book.finishedAt)
        : book.updatedAt
          ? formatFinishedDate(book.updatedAt)
          : null
      : null;

  const hasMyRating = book.userRating != null && book.userRating > 0;
  const hasCommunityRating = book.rating != null && book.rating > 0;

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex gap-3 p-3 border border-gray-200 dark:border-neutral-700 bg-white dark:bg-darkSecondary/10 hover:bg-gray-50 dark:hover:bg-darkSecondary/30 transition-colors group"
        aria-label={`${book.title} by ${authorLine} — view on Hardcover`}
      >
        {/* External link icon */}
        <span className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500">
          <HiOutlineExternalLink className="w-4 h-4" />
        </span>

        {/* Cover */}
        <div className="relative flex-shrink-0 w-[88px] h-[132px] overflow-hidden shadow-md">
          <Image
            src={book.coverUrl ?? FALLBACK_COVER}
            alt={`Cover of ${book.title}`}
            fill
            sizes="88px"
            quality={85}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col min-w-0 flex-1 py-0.5 pr-5">
          {/* Author */}
          <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] truncate">
            {authorLine}
          </p>

          {/* Title */}
          <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {book.title}
          </h3>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom meta */}
          <div className="flex flex-col gap-1.5 mt-2">
            {/* Ratings row — personal stars + community avg on one line */}
            {(hasMyRating || hasCommunityRating) && (
              <div className="flex items-center gap-2 flex-wrap">
                {hasMyRating && (
                  <span
                    className="flex items-center gap-0.5"
                    title={`My rating: ${book.userRating!.toFixed(1)}`}
                  >
                    <Stars rating={book.userRating!} />
                    <span className="ml-1 text-[11px] font-medium text-amber-500 dark:text-amber-400 tabular-nums">
                      {book.userRating!.toFixed(1)}
                    </span>
                  </span>
                )}

                {hasMyRating && hasCommunityRating && (
                  <span className="text-gray-300 dark:text-neutral-600 select-none">
                    ·
                  </span>
                )}

                {hasCommunityRating && (
                  <span
                    className="flex items-center gap-0.5 text-[11px] text-gray-400 dark:text-gray-500 tabular-nums"
                    title="Community average rating"
                  >
                    <svg
                      className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d={STAR_PATH} />
                    </svg>
                    <span>{book.rating!.toFixed(1)}</span>
                    <span className="text-[10px] ml-0.5 text-gray-400 dark:text-gray-600">
                      avg
                    </span>
                  </span>
                )}
              </div>
            )}

            {/* Year · pages */}
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 tabular-nums">
              {book.releaseYear != null && <span>{book.releaseYear}</span>}
              {book.releaseYear != null && book.pages != null && (
                <span className="text-gray-300 dark:text-neutral-600">·</span>
              )}
              {book.pages != null && (
                <span>{book.pages.toLocaleString()} pages</span>
              )}
            </div>

            {/* Finished date */}
            {finishedDate && (
              <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                <svg
                  className="w-3 h-3 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>Finished</span>
                <span className="text-gray-400 dark:text-gray-500">·</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {finishedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
