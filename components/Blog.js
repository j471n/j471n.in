import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaShare } from "react-icons/fa";
import { FcLink } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";

export default function Blog({ blog }) {
  const [shareSupport, setShareSupport] = useState(false);

  useEffect(() => {
    window.navigator.share ? setShareSupport(true) : setShareSupport(false);
  }, []);

  const date = blog.published_timestamp;

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

  return (
    <div className="relative sm:pb-[10%] h-full w-full break-words shadow ring-1 ring-gray-400 lg:hover:ring-2 rounded-xl ">
      <Image
        className="w-full h-full rounded-tl-xl rounded-tr-xl cursor-pointer"
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
            <div className="flex items-center rounded-xl cursor-pointer bg-[#FF4500] px-4 py-2 transition-all duration-100 lg:hover:scale-x-110">
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

        <div className="blog_info">
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

          <div className="max-w-[360px] flex flex-col mx-auto">
            <div className="relative sm:absolute bottom-0 left-0 right-0 sm:mb-4 w-full px-2 flex items-center justify-between mt-3">
              {/* Likes/Up votes */}
              <div className="user_reaction group">
                <svg
                  className="text-3xl p-1 rounded-lg mr-1 group-hover:bg-gray-100 lg:group-hover:fill-[#39e58c]"
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
                <MdInsertComment className="text-3xl p-1 rounded-lg mr-1 group-hover:bg-gray-100" />
                <p>{numFormatter(parseInt(blog.comments_count))}</p>
              </div>

              {/* Views */}
              <div className="user_reaction group lg:hover:text-blue-400">
                <AiFillEye className="text-3xl p-1 rounded-lg mr-1 group-hover:bg-gray-100" />
                <p>{numFormatter(parseInt(blog.page_views_count))}</p>
              </div>

              {/* Share and Link */}
              <div className="hidden sm:flex justify-center">
                {shareSupport && (
                  <FaShare className="blog_bottom_icon" onClick={handleShare} />
                )}
                {/* <FcLink
                className="blog_bottom_icon"
                onClick={() => window.open(blog.url)}
              /> */}
              </div>
            </div>
            {/* Mobile Share Option */}
            {shareSupport && (
              <div className="block sm:hidden text-center font-semibold bg-purple-400 py-1 m-1 mt-2 rounded-md">
                <p onClick={handleShare}>Share</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
