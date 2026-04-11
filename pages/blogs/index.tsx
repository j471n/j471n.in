import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { BiRss } from "react-icons/bi";
import Blog from "@components/Blog";
import { BlogPost } from "@lib/interface/sanity";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import Metadata from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import { debounce } from "@utils/functions";
import { getAllPostsMeta } from "@lib/sanityContent";
import pageMeta from "@content/meta";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export default function Blogs({ blogs }: { blogs: BlogPost[] }) {
  const [filteredBlogs, setFilteredBlogs] = useState([...blogs]);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null!);

  const handleSearch = debounce((value: string) => {
    setQuery(value);
    setFilteredBlogs(
      blogs.filter((post: BlogPost) =>
        post.title.toLowerCase().includes(value.trim().toLowerCase()),
      ),
    );
  }, 300);

  function handleAutoSearch(e: KeyboardEvent) {
    if (e.code === "Slash" && e.ctrlKey) {
      searchRef.current?.focus();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleAutoSearch);
    return () => document.removeEventListener("keydown", handleAutoSearch);
  }, []);

  return (
    <>
      <Metadata
        title={pageMeta.blogs.title}
        description={pageMeta.blogs.description}
        previewImage={pageMeta.blogs.image}
        keywords={pageMeta.blogs.keywords}
      />

      <PageHeader
        watermark="blog"
        eyebrow="Writing — 001"
        title="Blog"
        description={`Writing about web development and tech since 2021. ${blogs.length} articles published.`}
        className="pb-24"
      >
        {/* Search bar */}
        <div className="relative mb-8 max-w-xl">
          <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles… (Ctrl + /)"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors font-mono"
          />
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
            {query
              ? `${filteredBlogs.length} result${filteredBlogs.length !== 1 ? "s" : ""} for "${query}"`
              : `${blogs.length} articles`}
          </span>
          <Link
            href="/rss"
            title="RSS Feed"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <BiRss className="w-3.5 h-3.5" />
            RSS
          </Link>
        </div>

        {/* Blog list */}
        <AnimatePresence exitBeforeEnter>
          {filteredBlogs.length > 0 ? (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="border border-gray-200 dark:border-neutral-700"
            >
              {filteredBlogs.map((blog, index) => (
                <Blog key={blog.slug.current} blog={blog} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center font-mono text-[11px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-600"
            >
              No results found
            </motion.p>
          )}
        </AnimatePresence>
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  const results = await getAllPostsMeta();
  return {
    props: { blogs: results },
    revalidate: 60,
  };
}
