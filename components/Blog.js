import React from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { FaDev, FaGlobe } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import AnimatedText from "../components/FramerMotion/AnimatedText";
import {
  fromBottomVariant,
  fromRightVariant,
  opacityVariant,
  popUp,
  popUpFromBottomForText,
  smallTextFromBottom,
} from "../content/FramerMotionVariants";
import { useRouter } from "next/router";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import AnimatedButton from "./FramerMotion/AnimatedButton";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";

export default function Blog({ blog }) {
  const router = useRouter();

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  // if upVotes > 100 and view > 1000 and this should be all in 15 days
  const isTrending =
    blog.public_reactions_count >= 100 &&
    blog.page_views_count >= 1000 &&
    Math.abs(
      parseInt(
        (new Date(blog.published_at).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      )
    ) <= 15;

  return (
    <div
      layout
      className="relative h-full w-full break-words shadow shadow-gray-400 dark:shadow-zinc-600  dark:bg-darkSecondary rounded-xl overflow-hidden group flex flex-col select-none"
      variants={fromBottomVariant}
    >
      <AnimatedDiv variants={opacityVariant}>
        <Image
          className="w-full h-full rounded-tl-xl rounded-tr-xl cursor-pointer select-none"
          src={blog.cover_image}
          alt={blog.title}
          width={360}
          height={150}
          layout="responsive"
        />
      </AnimatedDiv>

      <div className="w-full p-4">
        <div className="relative">
          <AnimatedDiv variants={opacityVariant} infinity={true} className="h-14 w-14 rounded-full font-bold uppercase text-center bg-white dark:bg-darkSecondary ring-4 ring-purple-400 flex flex-col justify-center absolute right-0 -top-11 select-none">
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
          </AnimatedDiv>
        </div>

        <div className="mt-5 relative">
          <AnimatedText
            variants={opacityVariant}
            infinity={true}
            className="absolute -top-5 left-0 text-xs uppercase font-bold text-[#ff591c] animate-pulse"
          >
            {isTrending && "Trending"}
          </AnimatedText>

          <AnimatedHeading
            variants={opacityVariant}
            infinity={true}
            className=" text-md font-bold cursor-pointer select-none"
          >
            {blog.title}
          </AnimatedHeading>

          <div className="flex pt-2 items-center truncate space-x-2">
            {blog.tag_list.map((tag) => {
              return (
                <AnimatedText
                  key={tag}
                  infinity={true}
                  variants={popUp}
                  className="rounded-md cursor-pointer uppercase font-bold text-[9px] lg:hover:underline text-purple-600 dark:text-purple-400 select-none"
                >
                  {tag}
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </div>
      {/* Reaction Icons (UpVotes, comments , views) */}
      <AnimatedDiv variants={popUp} infinity={true} className="auto-row flex items-center justify-between p-4 px-8 pt-0">
        {/* Likes/Up votes */}
        <div variants={popUp} infinity={true} className="user_reaction">
          <BiLike />
          <p>{numFormatter(parseInt(blog.public_reactions_count))}</p>
        </div>

        {/* Comments */}
        <div variants={popUp} infinity={true} className="user_reaction">
          <MdInsertComment />
          <p>{numFormatter(parseInt(blog.comments_count))}</p>
        </div>

        {/* Views */}
        {blog.page_views_count && (
          <div variants={popUp} infinity={true} className="user_reaction">
            <AiFillEye />
            <p>{numFormatter(parseInt(blog.page_views_count))}</p>
          </div>
        )}
      </AnimatedDiv>

      <div className="absolute w-full h-full top-full group-hover:top-0 transition-all duration-300  bg-black/70 backdrop-blur-sm cursor-pointer grid place-content-center text-white p-4">
        <AnimatedText
          variants={popUpFromBottomForText}
          infinity={true}
          className="mb-2 font-medium text-sm"
        >
          {blog.description}
        </AnimatedText>

        <div className="flex items-center space-x-2">
          <AnimatedButton
            className="blog-hover-button"
            variants={popUpFromBottomForText}
            infinity={true}
            onClick={() => router.push(`/blogs/${blog.slug}`)}
          >
            <FaGlobe />
            <span>View</span>
          </AnimatedButton>

          <AnimatedButton
            className="blog-hover-button"
            variants={popUpFromBottomForText}
            infinity={true}
            onClick={() => window.open(blog.url)}
          >
            <FaDev />
            <span>Dev.to</span>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
