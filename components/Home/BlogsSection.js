import { HomeHeading } from "../../pages";
import Link from "next/link";
import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import Blog from "../Blog";
import { motion } from "framer-motion";

export default function BlogsSection({ blogs }) {
  return (
    <section className="mx-5 mb-5">
      <HomeHeading title="Recent Posts" />

      <div className="grid grid-cols-1 gap-4 mx-auto md:ml-[20%] xl:ml-[24%]">
        {blogs.map((blog, index) => {
          return <Blog key={`home-blog-${index}`} blog={blog} />;
        })}

        <Link href="/blogs">
          <div
            variants={popUpFromBottomForText}
            className="font-inter font-medium border-transparent border-b-2 lg:hover:border-black dark:lg:hover:border-white transform duration-200 active:scale-90 active:border-black w-fit"
          >
            <motion.a href="/blogs" className="flex items-center gap-1 justify-center">
              Read all posts
              <svg
                xmlns="http://www.w3.org/2000/svg"  
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                ></path>
              </svg>
            </motion.a>
          </div>
        </Link>
      </div>
    </section>
  );
}
