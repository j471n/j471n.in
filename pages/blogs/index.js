import { useState, useRef, useEffect } from "react";
import Blog from "../../components/Blog";
import CoverPage from "../../components/CoverPage";
import LazyLoad from "react-lazyload";
import Tags from "../../components/Tags";
import { useRouter } from "next/router";
import Image from "next/image";
import Typed from "typed.js";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideFromLeft } from "../../content/FramerMotionVariants";

export default function Blogs({ blogTags, data }) {
  const [blogs, setBlogs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const searchRef = useRef();
  const searchInputRef = useRef();

  const controls = useAnimation();
  const [ref, inView] = useInView();

  const query = router.query.tag || "all";

  function sorting(q = "all") {
    var filteredData = [];
    data.map((blog) => {
      // Sort By the query or tag
      if (blog.tag_list.includes(q)) {
        filteredData.push(blog);
      } else {
        // if the tag is missing then sort by on some special params
        switch (q) {
          case "all":
            filteredData = data;
            break;
          case "popular":
            filteredData = [...data]
              .sort(
                (a, b) => a.public_reactions_count - b.public_reactions_count
              )
              .reverse();

            break;
          default:
            break;
        }
      }
    });

    return filteredData;
  }

  // Sorting the value as the query changes
  useEffect(() => {
    setBlogs(sorting(query));
  }, [query]);

  useEffect(() => {
    router.prefetch("/blogs?tag=popular");
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    controls.start("visible");

    setSearchResult(() =>
      searchInputRef.current.value
        ? blogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchInputRef.current.value)
          )
        : []
    );
  }

  useEffect(() => {
    var options = {
      strings: ["Search Blogs...", "Search Articles...", "Search Content..."],
      typeSpeed: 75,
      backSpeed: 75,
      attr: "placeholder",
      loop: true,
    };
    new Typed(searchInputRef.current, options);
  }, []);

  // useEffect(() => {
  //   // if (inView) {
  // controls.start("visible");

  //   }
  // }, [controls, inView]);

  return (
    <>
      <CoverPage
        title="Look at my "
        mainHeading="Blogs"
        className="grid place-items-center"
      />

      <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-5">
        <form className="mx-auto mt-4 flex items-center w-full">
          <input
            className="px-5 text-gray-500 py-2 shadow ring-gray-400 w-full rounded-full outline-none focus:shadow-md transition duration-200"
            type="search"
            ref={searchInputRef}
            onChange={handleSearch}
          />
        </form>
        {/* {comment} */}
        {/* {searchResult && ( */}
        <div
          className="mx-10 w-full flex flex-col space-y-3 mt-4 items-center transform duration-300"
          ref={searchRef}
        >
          {searchResult.map((res) => {
            return (
              <motion.div
                className="flex items-center w-full p-2 ring-1 ring-gray-300 rounded-lg space-x-2 shadow cursor-pointer hover:ring-2 lg:hover:scale-105 transform duration-150"
                ref={ref}
                onClick={() => router.push(`/blogs/${res.slug}`)}
                initial="hidden"
                animate={controls}
                variants={slideFromLeft}
              >
                <Image
                  className="h-full rounded-lg"
                  src={res.cover_image}
                  width={200}
                  height={85}
                />
                <p className="text-sm w-full font-medium">{res.title}</p>
              </motion.div>
            );
          })}
        </div>
        {/* )} */}
      </div>
      {
        <>
          {/* Tags Section */}
          <Tags blogTags={blogTags} query={query} />
          {/* Main Blogs Page Container */}
          <section className="page_container ">
            {blogs &&
              blogs.map((blog) => {
                return (
                  <LazyLoad key={blog.id} className="h-full w-full">
                    <Blog key={blog.id} blog={blog} />
                  </LazyLoad>
                );
              })}
          </section>
        </>
      }
    </>
  );
}

export async function getServerSideProps(ctx) {
  const query = ctx.query.tag || "all";
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
      // blogs: !temp.length == 0 ? temp : data,
      data: data,
    },
  };
}
