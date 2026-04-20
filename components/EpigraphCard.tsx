import { useState } from "react";
import { IEpigraph, EpigraphSourceType } from "@lib/interface/sanity";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { FiCopy, FiCheck, FiSearch } from "react-icons/fi";

const SOURCE_LABELS: Record<EpigraphSourceType, string> = {
  book: "Book",
  movie: "Film",
  tvShow: "Series",
  person: "Person",
  song: "Song",
  podcast: "Podcast",
  other: "Other",
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const quoteComponents = {
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-900 dark:text-white text-base sm:text-lg leading-[1.85] font-normal italic mb-2 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="not-italic font-semibold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="not-italic text-gray-500 dark:text-gray-400">{children}</em>
  ),
};

export default function EpigraphCard({
  epigraph,
  index,
}: {
  epigraph: IEpigraph;
  index: number;
}) {
  const [copied, setCopied] = useState(false);
  const sourceLabel = SOURCE_LABELS[epigraph.sourceType] ?? epigraph.sourceType;

  const handleCopy = () => {
    navigator.clipboard.writeText(epigraph.quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.article
      variants={rowVariants}
      className="group py-6 sm:py-8"
      style={
        {
          contentVisibility: "auto",
          containIntrinsicSize: "0 120px",
        } as React.CSSProperties
      }
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Header: index left, meta right */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-gray-300 dark:text-neutral-700 tabular-nums select-none shrink-0">
            {String(index + 1).padStart(3, "0")}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {epigraph.year && (
              <span className="font-mono text-[9px] text-gray-400 dark:text-neutral-600 select-none">
                {epigraph.year}
              </span>
            )}
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-gray-600 dark:text-gray-500 border border-gray-200 dark:border-neutral-700 px-1.5 py-0.5 leading-none">
              {sourceLabel}
            </span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 border-gray-200 dark:border-neutral-700 group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-200 pl-3">
          <ReactMarkdown components={quoteComponents}>
            {epigraph.quote}
          </ReactMarkdown>
        </blockquote>

        {/* Attribution */}
        <Attribution epigraph={epigraph} />

        {/* Footer: tags + copy */}
        <Footer
          tags={epigraph.tags}
          copied={copied}
          onCopy={handleCopy}
          searchQuery={epigraph.sourceTitle}
        />
      </div>

      {/* ── Desktop layout: three-column ledger ── */}
      <div className="hidden sm:grid grid-cols-[5rem_1px_1fr] gap-0">
        {/* Left: index + rotated source + year */}
        <div className="flex flex-col items-end gap-3 pr-6 pt-0.5">
          <span className="font-mono text-[10px] text-gray-300 dark:text-neutral-700 tabular-nums select-none leading-none">
            {String(index + 1).padStart(3, "0")}
          </span>
          <span
            className="font-mono text-[8px] tracking-[0.4em] uppercase text-gray-400 dark:text-neutral-600 select-none flex-1 flex items-center"
            style={
              {
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              } as React.CSSProperties
            }
          >
            {sourceLabel}
          </span>
          {epigraph.year && (
            <span className="font-mono text-[9px] text-gray-400 dark:text-neutral-600 select-none">
              {epigraph.year}
            </span>
          )}
        </div>

        {/* Vertical rule */}
        <div className="w-px bg-gray-200 dark:bg-neutral-800 group-hover:bg-gray-900 dark:group-hover:bg-white transition-colors duration-200" />

        {/* Right: quote + attribution + footer */}
        <div className="flex flex-col gap-3 pl-7">
          <blockquote>
            <ReactMarkdown components={quoteComponents}>
              {epigraph.quote}
            </ReactMarkdown>
          </blockquote>
          <Attribution epigraph={epigraph} />
          <Footer
            tags={epigraph.tags}
            copied={copied}
            onCopy={handleCopy}
            searchQuery={epigraph.sourceTitle}
          />
        </div>
      </div>
    </motion.article>
  );
}

function Attribution({ epigraph }: { epigraph: IEpigraph }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      <span className="text-gray-400 dark:text-neutral-600 text-sm select-none leading-none">
        —
      </span>
      {epigraph.speaker && (
        <>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-tight">
            {epigraph.speaker}
          </span>
          {(epigraph.sourceTitle || epigraph.sourceMeta) && (
            <span className="text-gray-300 dark:text-neutral-700 text-xs select-none">
              ,
            </span>
          )}
        </>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 italic hover:text-gray-900 dark:hover:text-white  decoration-gray-300 dark:decoration-neutral-700 hover:decoration-gray-900 dark:hover:decoration-white transition-colors duration-150">
        {epigraph.sourceTitle}
      </p>
      {epigraph.sourceMeta && (
        <>
          <span className="text-gray-300 dark:text-neutral-700 text-xs select-none">
            /
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500 tracking-wide">
            {epigraph.sourceMeta}
          </span>
        </>
      )}
    </div>
  );
}

function Footer({
  tags,
  copied,
  onCopy,
  searchQuery,
}: {
  tags?: string[];
  copied: boolean;
  onCopy: () => void;
  searchQuery: string;
}) {
  return (
    <div className="flex items-center gap-4 pt-0.5">
      {/* Copy button */}
      <button
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy quote"}
        className={`flex items-center gap-1.5 shrink-0 transition-colors duration-150 ${
          copied
            ? "text-gray-900 dark:text-white"
            : "text-gray-400 dark:text-neutral-600 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        {copied ? <FiCheck size={11} /> : <FiCopy size={11} />}
        <span className="font-mono text-[9px] tracking-wider uppercase">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>

      {/* Google search */}
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Search on Google"
        className="flex items-center gap-1.5 shrink-0 text-gray-400 dark:text-neutral-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
      >
        <FiSearch size={11} />
        <span className="font-mono text-[9px] tracking-wider uppercase">
          Search
        </span>
      </a>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-widest uppercase text-gray-400 dark:text-neutral-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
