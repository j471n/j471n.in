import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgSearch } from "react-icons/cg";
import MetaData from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import BookCard from "@components/BookCard";
import CreateAnIssue from "@components/CreateAnIssue";
import pageMeta from "@content/meta";
import { getMyBooks, getMyProfile } from "@lib/hardcover";
import { HardcoverBook, HardcoverProfile } from "@lib/types";
import { debounce } from "@utils/functions";

const TABS = [
  { id: 3, label: "Read" },
  { id: 2, label: "Reading" },
  { id: 1, label: "Want to Read" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const statItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

/* ── Stats section ── */
function BooksStats({
  books,
  profile,
}: {
  books: HardcoverBook[];
  profile: HardcoverProfile;
}) {
  console.log("BooksStats render", { books, profile });
  const readCount = books.filter((b) => b.statusId === 3).length;
  const readingCount = books.filter((b) => b.statusId === 2).length;
  const wantCount = books.filter((b) => b.statusId === 1).length;
  const pagesRead = books
    .filter((b) => b.statusId === 3)
    .reduce((sum, b) => sum + (b.pages ?? 0), 0);

  const stats = [
    { label: "Books Read", value: readCount.toString() },
    { label: "Currently Reading", value: readingCount.toString() },
    { label: "Want to Read", value: wantCount.toString() },
    {
      label: "Pages Read",
      value: pagesRead > 0 ? pagesRead.toLocaleString() : "—",
    },
  ];

  const goal = profile.currentYearGoal;
  const goalPct = goal
    ? Math.min(100, Math.round((goal.progress / goal.target) * 100))
    : 0;

  return (
    <div className="mb-12 space-y-6">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-5 bg-gray-400 dark:bg-neutral-600 flex-shrink-0" />
        <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
          Reading Stats
        </span>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-700"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={statItem}
            className="flex flex-col justify-center p-5 bg-white dark:bg-darkPrimary"
          >
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-2">
              {s.label}
            </p>
            <p className="text-3xl font-black text-gray-900 dark:text-white leading-none tabular-nums">
              {s.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Reading goal */}
      {goal && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="border border-gray-200 dark:border-neutral-700 bg-white dark:bg-darkPrimary p-5"
        >
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1">
                {goal.year} Reading Goal
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {goal.progress}{" "}
                <span className="text-gray-400 dark:text-gray-500 font-normal">
                  / {goal.target} books
                </span>
              </p>
            </div>
            <span
              className={`text-xs font-mono px-2 py-0.5 border ${
                goal.state === "completed"
                  ? "border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {goalPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 dark:bg-neutral-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${goalPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={`h-full ${
                goal.state === "completed"
                  ? "bg-green-500"
                  : "bg-gray-900 dark:bg-white"
              }`}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

const STATUS_LABEL: Record<number, string> = {
  1: "Want to Read",
  2: "Reading",
  3: "Read",
};

/* ── Page ── */
export default function BooksPage({
  books,
  profile,
  error,
}: {
  books: HardcoverBook[];
  profile: HardcoverProfile;
  error: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabId>(3);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<HardcoverBook[]>([]);

  const handleSearch = debounce((value: string) => {
    const trimmed = value.trim().toLowerCase();
    setQuery(trimmed);
    if (trimmed === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      books.filter(
        (b) =>
          b.title.toLowerCase().includes(trimmed) ||
          b.authors.some((a) => a.toLowerCase().includes(trimmed)),
      ),
    );
  }, 300);

  const isSearching = query.length > 0;

  if (error) return <CreateAnIssue />;

  const filtered = books.filter((b) => b.statusId === activeTab);
  const countFor = (id: TabId) => books.filter((b) => b.statusId === id).length;

  return (
    <>
      <MetaData
        title={pageMeta.books.title}
        description={pageMeta.books.description}
        previewImage={pageMeta.books.image}
        keywords={pageMeta.books.keywords}
      />

      <PageHeader
        watermark="books"
        eyebrow="Books — 001"
        title="Books"
        description="Books I've read, am currently reading, or want to read. My personal bookshelf powered by Hardcover."
        className="pb-24"
      >
        {/* Stats */}
        <BooksStats books={books} profile={profile} />

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-5 bg-gray-400 dark:bg-neutral-600 flex-shrink-0" />
          <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
            Bookshelf
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-600 pointer-events-none" />
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search books by title or author…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-600 outline-none focus:border-gray-400 dark:focus:border-neutral-600 transition-colors font-mono"
          />
        </div>

        {/* Tab bar — hidden while searching */}
        {!isSearching && (
          <div className="flex items-center gap-1 mb-8 border-b border-gray-200 dark:border-neutral-700">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = countFor(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-xs font-mono ${
                      isActive
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-400 dark:text-neutral-600"
                    }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="books-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gray-900 dark:bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Books grid — search results or tabbed view */}
        {isSearching ? (
          <>
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-6">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
            {searchResults.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                No books found.
              </p>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {searchResults.map((book) => (
                  <motion.div key={book.id} variants={fadeSlide}>
                    <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-gray-500 dark:text-gray-400 mb-1 block">
                      {STATUS_LABEL[book.statusId]}
                    </span>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={activeTab}
              variants={fadeSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                  Nothing here yet.
                </p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filtered.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [books, profile] = await Promise.all([getMyBooks(), getMyProfile()]);

    console.log("Fetched books and profile", { books, profile });
    return {
      props: { books, profile, error: false },
      revalidate: 86400,
    };
  } catch {
    return {
      props: {
        books: [],
        profile: {
          username: "",
          name: "",
          booksCount: 0,
          currentYearGoal: null,
        },
        error: true,
      },
      revalidate: 3600,
    };
  }
}
