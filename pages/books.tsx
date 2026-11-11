import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CgSearch } from "react-icons/cg";
import { FiBox, FiGrid, FiX } from "react-icons/fi";
import MetaData from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import BookCard from "@components/BookCard";
import Bookshelf3D from "@components/Bookshelf3D";
import CreateAnIssue from "@components/CreateAnIssue";
import pageMeta from "@content/meta";
import { getMyBooks, getMyProfile } from "@lib/hardcover";
import { HardcoverBook, HardcoverProfile } from "@lib/types";
import { useDebounce } from "@hooks/useDebounce";
import { TIME_IN_SECONDS } from "@utils/utils";

const TABS = [
  { id: 0, label: "All books" },
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
  const [view, setView] = useState<"classic" | "3d">("3d");
  const reducedMotion = useReducedMotion();
  const debouncedQuery = useDebounce(query, 250).trim().toLowerCase();
  const isSearching = debouncedQuery.length > 0;

  useEffect(() => {
    try {
      if (localStorage.getItem("books-view") === "3d") setView("3d");
    } catch {
      // The view toggle still works when browser storage is unavailable.
    }
  }, []);

  const changeView = (nextView: "classic" | "3d") => {
    setView(nextView);
    try {
      localStorage.setItem("books-view", nextView);
    } catch {
      // Saving a preference is optional.
    }
  };

  const visibleBooks = useMemo(
    () =>
      books.filter((book) => {
        if (isSearching) {
          return (
            book.title.toLowerCase().includes(debouncedQuery) ||
            book.authors.some((author) =>
              author.toLowerCase().includes(debouncedQuery),
            )
          );
        }
        return activeTab === 0 || book.statusId === activeTab;
      }),
    [books, activeTab, debouncedQuery, isSearching],
  );

  if (error) return <CreateAnIssue />;

  const countFor = (id: TabId) =>
    id === 0 ? books.length : books.filter((b) => b.statusId === id).length;

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
        <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-5 bg-gray-400 dark:bg-neutral-600 flex-shrink-0" />
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
              Bookshelf
            </span>
          </div>
          <div
            className="inline-flex border border-gray-200 dark:border-neutral-700 p-1 gap-1"
            role="group"
            aria-label="Bookshelf view"
          >
            {(
              [
                { id: "classic", label: "Classic", Icon: FiGrid },
                { id: "3d", label: "3D Library", Icon: FiBox },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                type="button"
                key={id}
                onClick={() => changeView(id)}
                aria-pressed={view === id}
                aria-controls="books-collection"
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 ${view === id ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-darkSecondary"}`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-600 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search books by title or author"
            placeholder="Search books by title or author…"
            className="w-full pl-9 pr-12 py-2.5 text-sm bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-600 outline-none focus:border-gray-400 dark:focus:border-neutral-600 transition-colors font-mono [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear book search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400"
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Tab bar — hidden while searching */}
        {!isSearching && (
          <div
            className="flex items-center gap-1 mb-8 border-b border-gray-200 dark:border-neutral-700 overflow-x-auto"
            role="group"
            aria-label="Filter books by reading status"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = countFor(tab.id);
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`relative px-3 sm:px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap font-medium transition-colors ${
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

        {isSearching && (
          <p
            className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-6"
            role="status"
          >
            {visibleBooks.length} result{visibleBooks.length !== 1 ? "s" : ""}{" "}
            for &ldquo;{query.trim()}&rdquo;
          </p>
        )}

        <div id="books-collection">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={`${view}-${activeTab}-${debouncedQuery}`}
              variants={reducedMotion ? undefined : fadeSlide}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              exit={reducedMotion ? undefined : "exit"}
            >
              {visibleBooks.length === 0 ? (
                <div className="border border-dashed border-gray-200 dark:border-neutral-700 py-16 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isSearching
                      ? "No books match your search."
                      : "No books on this shelf yet."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveTab(0);
                    }}
                    className="mt-4 text-xs font-medium underline underline-offset-4 text-gray-700 dark:text-gray-300"
                  >
                    Browse all books
                  </button>
                </div>
              ) : view === "3d" ? (
                <Bookshelf3D
                  books={visibleBooks}
                  label={
                    isSearching
                      ? "Search results"
                      : TABS.find((tab) => tab.id === activeTab)!.label
                  }
                />
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {visibleBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [books, profile] = await Promise.all([getMyBooks(), getMyProfile()]);

    return {
      props: { books, profile, error: false },
      revalidate: TIME_IN_SECONDS.ONE_DAY,
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
      revalidate: TIME_IN_SECONDS.ONE_DAY,
    };
  }
}
