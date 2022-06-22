import { AnimatePresence } from "framer-motion";
import { FadeContainer } from "@content/FramerMotionVariants";
import Blog from "@components/Blog";
import Metadata from "@components/MetaData";
import { pagePreviewImage } from "@utils/utils";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import useBookmarkBlogs from "@hooks/useBookmarkBlogs";

export default function Blogs() {
  const { bookmarkedBlogs } = useBookmarkBlogs("blogs", []);

  return (
    <>
      <Metadata
        title="Bookmarked Blogs -"
        description={"Bookmarked Blogs of Jatin Sharma by you"}
        previewImage={pagePreviewImage.blogs}
      />

      <section className="mt-[52px] md:t-[72px] max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl relative mx-auto py-5 px-2 flex flex-col gap-2 text-neutral-900 dark:text-neutral-200 font-inter pb-10">
        <PageTop pageTitle="Bookmarked Blogs">
          Here you can find article bookmarked by you for Later use.
        </PageTop>

        <section className="relative py-5 px-2 flex flex-col gap-2 min-h-[50vh]">
          <AnimatePresence>
            {bookmarkedBlogs.length != 0 ? (
              <AnimatedDiv
                variants={FadeContainer}
                className="grid grid-cols-1 xs:grid-cols-2 md:!grid-cols-3 gap-4"
              >
                {bookmarkedBlogs.map((blog, index) => {
                  return <Blog key={index} blog={blog} />;
                })}
              </AnimatedDiv>
            ) : (
              <div className="font-inter text-center font-medium dark:text-gray-400 mt-10">
                No Result Found
              </div>
            )}
          </AnimatePresence>
        </section>
      </section>
    </>
  );
}
