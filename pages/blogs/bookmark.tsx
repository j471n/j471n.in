import { motion } from "framer-motion";
import Blog from "@components/Blog";
import Metadata from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import useBookmarkBlogs from "@hooks/useBookmarkBlogs";
import pageMeta from "@content/meta";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export default function Blogs() {
  const { bookmarkedBlogs } = useBookmarkBlogs("blogs", []);

  return (
    <>
      <Metadata
        title={pageMeta.bookmark.title}
        description={pageMeta.bookmark.description}
        previewImage={pageMeta.bookmark.image}
        keywords={pageMeta.bookmark.keywords}
      />

      <PageHeader
        watermark="saved"
        eyebrow="Bookmarks"
        title="Reading List"
        description="Articles you've saved to read later. Stored locally in your browser."
        className="pb-24"
      >
        {bookmarkedBlogs?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="border border-gray-200 dark:border-neutral-700"
          >
            {bookmarkedBlogs.map((blog, index) => (
              <Blog key={index} blog={blog} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center font-mono text-[11px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-600">
            No bookmarks yet
          </div>
        )}
      </PageHeader>
    </>
  );
}
