import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BiShareAlt, BiLike } from "react-icons/bi";
import { FcLink } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import ShareOnSocialMedia from "./ShareOnSocialMedia";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideFromBottom } from "../content/FramerMotionVariants";

export default function Blog({ blog }) {
  const [showShare, setShowShare] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  // const time = ;
  // console.log;

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  function displayShareIcons() {
    if (showShare) return setShowShare(false);
    setShowShare(true);
    setTimeout(() => {
      setShowShare(false);
    }, 5000);
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="relative sm:pb-[10%] h-full w-full break-words shadow shadow-gray-400 dark:shadow-zinc-600  dark:bg-darkSecondary rounded-xl "
      initial="hidden"
      animate={controls}
      variants={slideFromBottom}
    >
      <Image
        className="w-full h-full rounded-tl-xl rounded-tr-xl cursor-pointer select-none"
        src={blog.cover_image}
        alt={blog.title}
        width={360}
        height={150}
        layout="responsive"
        onClick={() => window.open(`blogs/${blog.slug}`, "_self")}
      />

      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-3 lg:mb-1 relative">
          <div className="h-14 w-14 rounded-full font-bold uppercase text-center bg-white dark:bg-darkSecondary ring-4 ring-purple-400 flex flex-col justify-center absolute right-0 -top-11 select-none">
            <p className="text-xl">
              {new Date(Date.parse(blog.published_at))
                .toDateString()
                .slice(8, 10)}
            </p>
            <p className="text-xs">
              {new Date(Date.parse(blog.published_at))
                .toDateString()
                .slice(4, 7)}
            </p>
          </div>

          {/* Checking if the post reaction is more than 100 and post is not more than 30 days old then show the hot sign */}
          {blog.public_reactions_count >= 100 &&
            Math.abs(
              parseInt(
                (new Date(blog.published_at).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24)
              )
            ) <= 15 && (
              <div className="flex items-center rounded-xl cursor-pointer bg-[#FF4500] px-4 py-2 transform duration-100 lg:hover:scale-110 lg:hover:-rotate-6">
                <Image
                  className="rounded-full"
                  src="/img/fire-icon.jpg"
                  alt=""
                  height={20}
                  width={16}
                />
                <p className="text-xs font-bold text-white ml-3">Hot</p>
              </div>
            )}
        </div>

        <div className="mb-2 mt-5">
          <h3
            className=" text-xl font-bold lg:hover:underline cursor-pointer select-none "
            onClick={() => window.open(`blogs/${blog.slug}`, "_self")}
          >
            {blog.title}
          </h3>
          <p className="text-xs sm:text-sm  line-clamp-2">{blog.description}</p>

          <div className="flex pt-2 items-center flex-wrap space-x-2">
            {blog.tag_list.map((tag) => {
              return (
                <p
                  key={tag}
                  className="text-xs mt-2 rounded-md cursor-pointer uppercase font-bold text-[9px] lg:text-xs lg:hover:underline text-purple-600 dark:text-purple-400 select-none"
                >
                  {tag}
                </p>
              );
            })}
          </div>

          {/* Reaction, Social Icons, Share Options */}
          <div className="relative sm:absolute bottom-0 left-0 right-0 sm:mb-4 w-full px-0 flex  mt-3 sm:px-3 flex-col sm:flex-row justify-between select-none">
            {/* Reaction and Social Icons */}
            <div className="relative mt-10 sm:mt-0 flex items-center sm:w-2/3 sm:mr-2">
              {/* Reaction Icons */}
              <div
                className={` ${
                  showShare ? "scale-0 invisible" : "scale-100 visible"
                } absolute left-0 right-0 bottom-0 sm:relative flex w-full items-center justify-evenly sm:justify-start space-x-3 duration-150 text-base`}
              >
                {/* Likes/Up votes */}
                <div className="user_reaction lg:hover:text-[#39e58c]">
                  <BiLike />
                  <p>{numFormatter(parseInt(blog.public_reactions_count))}</p>
                </div>

                {/* Comments */}
                <div className="user_reaction lg:hover:text-yellow-400">
                  <MdInsertComment />
                  <p>{numFormatter(parseInt(blog.comments_count))}</p>
                </div>

                {/* Views */}
                {blog.page_views_count && (
                  <div className="user_reaction lg:hover:text-blue-400">
                    <AiFillEye />
                    <p>{numFormatter(parseInt(blog.page_views_count))}</p>
                  </div>
                )}
              </div>

              {/* Social Media icons */}
              <ShareOnSocialMedia
                className={`${
                  showShare ? "visible scale-100" : " invisible scale-0"
                } absolute w-full h-full -top-5 sm:-top-0 bg-white dark:bg-darkSecondary flex items-center justify-between sm:justify-evenly transition-all duration-150`}
                title={blog.title}
                url={blog.url}
                summary={blog.description}
                cover_image={blog.cover_image}
              />
            </div>

            {/* Share and Link */}
            <div className="flex justify-between items-center mt-2 sm:mt-0">
              {/* Share Button Container */}
              <BiShareAlt
                className="blog_bottom_icon w-full  mr-1 clickable_button dark:hover:bg-darkPrimary"
                onClick={displayShareIcons}
              />

              {/* Visit Button Container */}
              <FcLink
                className="blog_bottom_icon w-full ml-1 clickable_button dark:hover:bg-darkPrimary"
                onClick={() => window.open(blog.url)}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
