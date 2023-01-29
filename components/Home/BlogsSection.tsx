import { HomeHeading } from "../../pages";
import Link from "next/link";
import Blog from "../Blog";
import { FrontMatter } from "@lib/types";

export default function BlogsSection({ blogs }: { blogs: FrontMatter[] }) {
  return (
    <section className="mx-5 mb-5">
      <HomeHeading title="Recent Posts" />

      <div className="grid grid-cols-1 gap-4 mx-auto">
        {blogs.map((blog, index) => {
          return <Blog key={`home-blog-${index}`} blog={blog} animate />;
        })}

        <Link
          href="/blogs"
          className="font-inter font-medium border-transparent transition active:scale-95 active:border-black w-fit group flex items-center gap-1 justify-center md:ml-7"
        >
          Read all posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 ml-1 group-hover:translate-x-2 transition"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}
