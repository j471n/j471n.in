import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Link from "next/link";
import { BsListUl } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CgSearch } from "react-icons/cg";
import { TableOfContents as TableOfContentType } from "@lib/types";
import { stringToSlug } from "@lib/toc";

export default function TableOfContents({
  tableOfContents,
}: {
  tableOfContents: TableOfContentType[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  if (!tableOfContents.length) return null;

  const filtered = search.trim()
    ? tableOfContents.filter((t) =>
        t.heading.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : tableOfContents;

  return (
    <>
      {/* FAB — flat, no shadow */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle Table of Contents"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 h-9 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-[10px] tracking-[0.35em] uppercase print:hidden"
      >
        <BsListUl className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="hidden sm:inline">Contents</span>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="toc-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 print:hidden"
          />
        )}
      </AnimatePresence>

      {/* Right drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="toc-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            style={{ zIndex: 100 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-80 bg-white dark:bg-darkPrimary border-r border-gray-200 dark:border-neutral-700 flex flex-col print:hidden"
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full bg-gray-900 dark:bg-white flex-shrink-0" />

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-neutral-700 flex-shrink-0">
              <div>
                <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-500 block leading-none mb-1">
                  Navigation
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Table of Contents
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-white transition-colors"
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-gray-200 dark:border-neutral-700 flex-shrink-0">
              <div className="relative">
                <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter sections…"
                  className="w-full pl-8 pr-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* TOC items */}
            <nav className="flex-1 overflow-y-auto py-4">
              {filtered.length === 0 ? (
                <p className="px-5 py-6 font-mono text-[11px] tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500 text-center">
                  No results
                </p>
              ) : (
                filtered.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${stringToSlug(item.id)}`}
                    onClick={() => {
                      setOpen(false);
                      setSearch("");
                    }}
                    style={{ paddingLeft: `${(item.level - 1) * 14 + 20}px` }}
                    className={`flex items-start gap-2.5 py-3 pr-6 text-sm border-l-2 transition-all group ${
                      item.level === 1
                        ? "border-transparent hover:border-gray-900 dark:hover:border-white text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5"
                        : "border-transparent hover:border-gray-400 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.level > 1 && (
                      <span className="mt-[6px] w-1 h-1 rounded-full bg-current flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="leading-snug">{item.heading}</span>
                  </Link>
                ))
              )}
            </nav>

            {/* Footer */}
            <div className="px-5 py-3.5 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-darkSecondary flex-shrink-0 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500">
                {filtered.length} section{filtered.length !== 1 ? "s" : ""}
              </span>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
