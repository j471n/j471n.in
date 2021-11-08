import { useState, useRef, useEffect } from "react";
import Loading from "../../components/Loading";
import Blog from "../../components/Blog";
import CoverPage from "../../components/CoverPage";
import LazyLoad from "react-lazyload";

export default function Blogs({ data }) {
  const [blogs, setBlogs] = useState(data);
  const [loading, setLoading] = useState(false);
  const state = useRef();
  const [sortBlogBy, setSortBlogBy] = useState("recent");

  // async function api() {
  //   const res = await fetch("https://dev.to/api/articles/me", {
  //     method: "GET", // The method
  //     mode: "no-cors", // It can be no-cors, cors, same-origin
  //     credentials: "same-origin",
  //     headers: {
  //       // "Access-Control-Allow-Origin": "*",
  //       "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
  //       // "Content-Type": "application/json", // Your headers
  //     },
  //   });

  //   const data = await res.json();
  //   setBlogs(data);
  // }

  // useEffect(() => {
  //   // api()
  //   fetch("https://dev.to/api/articles/me", {
  //     method: "GET", // The method
  //     mode: "no-cors", // It can be no-cors, cors, same-origin
  //     credentials: "same-origin",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
  //       "Content-Type": "application/json", // Your headers
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBlogs(data))
  //     .catch((err) => console.error(err));
  // }, []);


  function sortBy(e) {
    const sort_by = e.target.value;
    setSortBlogBy(sort_by);
    if (sort_by === "popular") {
      setBlogs(
        blogs
          .sort(
            (a, b) => a.positive_reactions_count - b.positive_reactions_count
          )
          .reverse()
      );
    } else if (sort_by === "recent") {
      setBlogs(
        blogs
          .sort(
            (a, b) =>
              new Date(a.published_timestamp) - new Date(b.published_timestamp)
          )
          .reverse()
      );
    }
  }

  return (
    <>
      <CoverPage
        title="Look at my "
        mainHeading="Blogs"
        className="grid place-items-center"
      />

      <div className="w-full mt-3 px-4 flex items-center justify-center">
        {/* <h3 className="title_of_page flex items-center">
          Blogs <span className="text-sm ml-2">({blogs.length})</span>
        </h3> */}

        <select
          className="px-3 py-2 rounded-md outline-none bg-transparent mt-3 border-2 text-xs font-semibold cursor-pointer"
          ref={state}
          name="option"
          value={sortBlogBy}
          onChange={sortBy}
        >
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
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
      )}
    </>
  );
}

export async function getServerSideProps() {
  const blogs = await fetch("https://dev.to/api/articles/me?per_page=1000", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return {
    props: {
      data: blogs,
    },
  };
}
