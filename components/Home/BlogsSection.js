import { HomeHeading } from "../../pages";
import Link from "next/link";
import Image from "next/image";
import {
  opacityVariant,
  popUpFromBottomForText,
} from "../../content/FramerMotionVariants";
import Blog from "../Blog";
import { motion } from "framer-motion";

export default function BlogsSection({ blogs }) {
  return (
    <section className="mx-5">
      <HomeHeading title="Recent Posts" />

      <div className="flex flex-col gap-3 w-full">
        {blogs.map((blog, index) => {
          return (
            <div key={index} className="flex flex-col xs:flex-row items-center gap-2">
              <motion.div
                variants={opacityVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full h-full sm:w-1/2 sm:h-1/2 md:w-2/5 md:h-2/5"
              >
                <Image
                  className="rounded-md"
                  src={blog.image}
                  width={1200}
                  height={630}
                  layout="responsive"
                  alt=""
                  placeholder="blur"
                  blurDataURL={blog.image}
                ></Image>
              </motion.div>
              <Blog blog={blog} className="active:!scale-100" />
            </div>
          );
        })}

        <Link href="/blogs">
          <div
            variants={popUpFromBottomForText}
            className="font-inter font-medium border-transparent border-b-2 lg:hover:border-black transform duration-200 active:scale-90 active:border-black w-fit"
          >
            <motion.a href="/blogs" className="flex items-center gap-1 ">
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
