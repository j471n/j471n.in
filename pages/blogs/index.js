import { useState, useRef, useEffect } from "react";
import Blog from "../../components/Blog";
import CoverPage from "../../components/CoverPage";
import LazyLoad from "react-lazyload";
import Tags from "../../components/Tags";
import { useRouter } from "next/router";

export default function Blogs({ blogTags, data }) {
  const [blogs, setBlogs] = useState([]);

  const router = useRouter();
  const query = router.query.tag;

  function sorting(query = "all") {
    var filteredData = [];
    data.map((blog) => {
      // Sort By the query or tag
      if (blog.tag_list.includes(query)) {
        filteredData.push(blog);
      } else {
        // if the tag is missing then sort by on some special params
        switch (query) {
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
  return (
    <>
      <CoverPage
        title="Look at my "
        mainHeading="Blogs"
        className="grid place-items-center"
      />

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

  var temp = [];
  // data.map((blog) => {
  //   // Sort By the query or tag
  //   if (blog.tag_list.includes(query)) {
  //     temp.push(blog);
  //   } else {
  //     // if the tag is missing then sort by on some special params
  //     switch (query) {
  //       case "all":
  //         temp = data;
  //         break;
  //       case "popular":
  //         temp = data
  //           .sort(
  //             (a, b) => a.positive_reactions_count - b.positive_reactions_count
  //           )
  //           .reverse();
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // });

  return {
    props: {
      query,
      blogTags,
      // blogs: !temp.length == 0 ? temp : data,
      data: data,
    },
  };
}
