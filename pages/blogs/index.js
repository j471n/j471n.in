import { useState, useRef } from "react";
import Blog from "../../components/Blog";
import Tags from "../../components/Tags";
import { useRouter } from "next/router";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fromBottomVariant } from "../../content/FramerMotionVariants";
import Metadata from "../../components/MetaData";
import Loading from "../../components/Loading";
import PageCover from "../../components/Home/PageCover";

export default function Blogs({ blogTags, blogs, err, allBlogs }) {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [searchResult, setSearchResult] = useState([]);
  const [activeTag, setActiveTag] = useState("all");
  const router = useRouter();
  const searchRef = useRef();
  const searchInputRef = useRef();

  const controls = useAnimation();
  const [ref, inView] = useInView();

  if (!blogs && err) return <Loading />;

  function handleSearch(e) {
    e.preventDefault();
    controls.start("visible");

    setSearchResult(() =>
      searchInputRef.current.value
        ? blogs.filter((blog) =>
            blog.title
              .toLowerCase()
              .includes(searchInputRef.current.value.toLowerCase())
          )
        : []
    );
  }

  return (
    <>
      <Metadata title="Blogs 📰" />
      <PageCover
        imgSrc="/img/cover/blogCover.svg"
        pageTitle="Blog Posts"
        buttonText="View Recent Posts"
        titleClass="text-blue-700"
        imgClass={"dark:brightness-75"}
        buttonClass={"before:bg-blue-900"}
        containerClass="!from-[#847ce3]/80"
      />
      <div id="view" className="px-5 mx-auto dark:bg-darkPrimary">
        <div className="flex flex-col gap-4 items-center max-w-lg justify-center w-full mx-auto">
          <form className="mx-auto mt-4 flex items-center w-full relative">
            <input
              className="px-5 text-gray-500 dark:text-gray-300 py-2 shadow ring-1 ring-gray-200 dark:ring-zinc-600 w-full rounded-full outline-none focus:shadow-md transition duration-200 dark:bg-darkSecondary"
              type="search"
              ref={searchInputRef}
              placeholder="Search articles..."
              onChange={handleSearch}
            />
          </form>
          {/* {comment} */}

          <AnimatePresence>
            {searchResult && (
              <div
                className="mx-10 w-full flex flex-col space-y-3 mb-2 items-center transform duration-300"
                ref={searchRef}
              >
                {searchResult.map((res) => {
                  return (
                    <motion.div
                      key={res.id}
                      className="flex items-center w-full p-2 ring-1 ring-gray-300 dark:text-gray-300 rounded-lg space-x-2 shadow cursor-pointer hover:ring-2 lg:hover:scale-105 transform duration-150"
                      ref={ref}
                      onClick={() => router.push(`/blogs/${res.slug}`)}
                      initial="hidden"
                      animate={controls}
                      variants={fromBottomVariant}
                    >
                      <div className="inline-flex">
                        <Image
                          className="h-full rounded-lg"
                          src={res.cover_image}
                          width={200}
                          height={85}
                          alt="blog cover Image"
                          priority={true}
                        />
                      </div>
                      <p className="text-sm w-full font-medium">{res.title}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {
        <>
          {/* Tags Section */}
          <Tags
            blogs={blogs}
            blogTags={blogTags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            setFilteredBlogs={setFilteredBlogs}
          />
          {/* Main Blogs Page Container */}
          <motion.section layout className="page_container relative">
            <AnimatePresence>
              {filteredBlogs.map((blog) => {
                return (
                  // <LazyLoad key={blog.id}>
                  <Blog key={blog.id} blog={blog} />
                  // </LazyLoad>
                );
              })}
            </AnimatePresence>
          </motion.section>
        </>
      }
    </>
  );
}

export async function getStaticProps(ctx) {
  try {
    const query = ctx.query?.tag || "all";
    const data = await fetch("https://dev.to/api/articles/me", {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    var blogTags = ["all", "popular"];
    data.map((blog) => {
      blog.tag_list.map((tag) => {
        if (!blogTags.includes(tag)) {
          blogTags.push(tag);
        }
      });
    });

    return {
      props: {
        query,
        blogTags,
        allBlogs: data,
        // blogs: !temp.length == 0 ? temp : data,
        blogs: data,
      },
      // updates the page automatically after 1/2 an hour
      revalidate: 30 * 60,
    };
  } catch (err) {
    return {
      props: {
        error: err,
      },
    };
  }
}
