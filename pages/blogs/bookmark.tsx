import { AnimatePresence } from "framer-motion";
import { FadeContainer } from "@content/FramerMotionVariants";
import Blog from "@components/Blog";
import Metadata from "@components/MetaData";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import useBookmarkBlogs from "@hooks/useBookmarkBlogs";
import pageMeta from "@content/meta";

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

      <section className="flex flex-col gap-2 pageTop text-neutral-900 dark:text-neutral-200">
        <PageTop pageTitle="Bookmarks">
          Here you can find article bookmarked by you for Later use.
        </PageTop>

        <section className="relative py-5 px-2 flex flex-col gap-2 min-h-[50vh]">
          <AnimatePresence>
            {bookmarkedBlogs?.length != 0 ? (
              <AnimatedDiv
                variants={FadeContainer}
                className="grid grid-cols-1 gap-4 mx-auto"
              >
                {bookmarkedBlogs?.map((blog, index) => {
                  return <Blog key={index} blog={blog} />;
                })}
              </AnimatedDiv>
            ) : (
              <div className="mt-10 font-medium text-center font-inter dark:text-gray-400">
                Nothing to see here.
              </div>
            )}
          </AnimatePresence>
        </section>
      </section>
    </>
  );
}
