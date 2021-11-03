import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BiShareAlt } from "react-icons/bi";
import { FcLink } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import ShareOnSocialMedia from "./ShareOnSocialMedia";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { popUp } from "../content/FramerMotionVariants";

export default function Blog({ blog }) {
  const [showShare, setShowShare] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  async function handleShare() {
    const image = await fetch(blog.cover_image);
    const blob = await image.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    if (window.navigator.share) {
      window.navigator
        .share({
          title: blog.title,
          text: blog.description,
          url: blog.url,
          files: [file],
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    }
  }

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="relative sm:pb-[10%] h-full w-full break-words shadow ring-1 ring-gray-400 lg:hover:ring-2 rounded-xl "
      initial="hidden"
      animate={controls}
      variants={popUp}
    >
      <Image
        className="w-full h-full rounded-tl-xl rounded-tr-xl cursor-pointer select-none"
        src={blog.cover_image}
        alt={blog.title}
        width={360}
        height={150}
        layout="responsive"
        onClick={() => window.open(blog.url)}
      />

      <div className="w-full p-4 border-t-2  border-gray-400">
        <div className="flex items-center justify-between mb-3 lg:mb-1">
          <a
            className="flex items-center lg:hover:bg-gray-100 lg:p-2 rounded-lg"
            href={`https://dev.to/${blog.user.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="rounded-full"
              src={blog.user.profile_image}
              alt=""
              width={40}
              height={40}
              loading="lazy"
            />
            <div className="text-xs ml-3">
              <p className="font-semibold">{blog.user.name}</p>
              <p>
                {new Date(Date.parse(blog.published_at))
                  .toDateString()
                  .slice(4)}
              </p>
            </div>
          </a>

          {blog.public_reactions_count >= 100 && (
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

        <div className="mb-2">
          <h3 className=" text-xl font-bold">{blog.title}</h3>
          <p className="text-xs sm:text-base">{blog.description}</p>

          <div className="flex pt-2 items-center flex-wrap">
            {blog.tag_list.map((tag) => {
              return (
                <p
                  key={tag}
                  className="bg-gray-100 text-xs p-1 mr-2 mt-2 rounded-md cursor-pointer"
                >
                  #{tag}
                </p>
              );
            })}
          </div>

          {/* <div className="max-w-[360px] flex flex-col mx-auto"> */}
          {/* Reaction, Social Icons, Share Options */}
          <div className="relative sm:absolute bottom-0 left-0 right-0 sm:mb-4 w-full px-0 flex  mt-3 sm:px-3 flex-col sm:flex-row justify-between">
            {/* Reaction and Social Icons */}
            <div className="relative mt-10 sm:mt-0 flex items-center sm:w-2/3 sm:mr-2">
              {/* Reaction Icons */}
              <div
                className={` ${
                  showShare ? "scale-0 invisible" : "scale-100 visible"
                } absolute left-0 right-0 bottom-0 sm:relative flex w-full items-center justify-between duration-150`}
              >
                {/* Likes/Up votes */}
                <div className="user_reaction group">
                  <svg
                    className="text-3xl p-1 rounded-lg  group-hover:bg-gray-100 lg:group-hover:fill-[#39e58c]"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                  >
                    <path d="M13.162 3.813a2 2 0 01.465.465l6.674 9.343a1 1 0 01-1.102 1.539l-4.032-1.21a1 1 0 00-1.277.816l-.767 5.375a1 1 0 01-.99.859h-.266a1 1 0 01-.99-.859l-.767-5.375a1 1 0 00-1.278-.816l-4.031 1.21a1 1 0 01-1.102-1.54l6.674-9.342a2 2 0 012.79-.465z"></path>
                  </svg>
                  <p>{numFormatter(parseInt(blog.public_reactions_count))}</p>
                </div>

                {/* Comments */}
                <div className="user_reaction group lg:hover:text-yellow-400">
                  <MdInsertComment className="text-3xl p-1 rounded-lg group-hover:bg-gray-100" />
                  <p>{numFormatter(parseInt(blog.comments_count))}</p>
                </div>

                {/* Views */}
                <div className="user_reaction group lg:hover:text-blue-400">
                  <AiFillEye className="text-3xl p-1 rounded-lg group-hover:bg-gray-100" />
                  <p>{numFormatter(parseInt(blog.page_views_count))}</p>
                </div>
              </div>

              {/* Social Media icons */}
              <ShareOnSocialMedia
                className={`${
                  showShare ? "visible scale-100" : " invisible scale-0"
                } absolute w-full h-full -top-5 sm:-top-0 bg-white flex items-center justify-between sm:justify-evenly transition-all duration-150`}
                title={blog.title}
                url={blog.url}
                summary={blog.description}
                body={blog.description}
                subject={blog.title}
                handleShare={handleShare}
              />
            </div>

            {/* Share and Link */}
            <div className="flex justify-evenly items-center mt-2 sm:mt-0">
              {/* Share Button Container */}
              <div className="text-center mr-1 w-full">
                <BiShareAlt
                  className="blog_bottom_icon hidden sm:inline-flex"
                  onClick={() => setShowShare(!showShare)}
                />

                <p
                  className="blog_bottom_button"
                  onClick={() => setShowShare(!showShare)}
                >
                  Share
                </p>
              </div>
              {/* Visit Button Container */}
              <div className="text-center ml-1 w-full">
                <FcLink
                  className="blog_bottom_icon hidden sm:inline-flex"
                  onClick={() => window.open(blog.url)}
                />

                <a
                  className="blog_bottom_button"
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              </div>
            </div>

            {/* Mobile Share Option */}
            {/* <div className="flex relative justify-center sm:hidden text-center font-medium mt-2">
              
              </div> */}
            {/* shareable icons */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
