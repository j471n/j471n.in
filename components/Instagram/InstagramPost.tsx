import { DetailedInstagramPost, MediaType } from "@lib/interface";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbBoxMultiple } from "react-icons/tb";

export default function InstagramPost({
  post,
}: {
  post: DetailedInstagramPost;
}) {
  const previewURL =
    post.media_type === MediaType.Video ? post.thumbnail_url! : post.media_url;
  return (
    <Link
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full aspect-square relative group"
    >
      <div className="absolute hidden inset-0 bg-gradient-to-t from-black to-black/30 p-5 lg:group-hover:flex ">
        <div className="text-white text-sm line-clamp-2 mt-auto">
          {post.caption}
        </div>
      </div>

      {post.media_type !== MediaType.Image && (
        <div
          title={post.media_type.replace("_", " ").toLowerCase()}
          className="absolute right-1 top-1 sm:right-2 sm:top-2 hover:bg-black/50 p-1 sm:p-2 rounded-full"
        >
          {post.media_type === MediaType.Video && (
            <FaPlay className="text-white drop-shadow-md" />
          )}
          {post.media_type === MediaType.CarouselAlbum && (
            <TbBoxMultiple className="text-white drop-shadow-md" />
          )}
        </div>
      )}

      <Image
        src={previewURL}
        width={300}
        height={300}
        alt={post.caption ?? ""}
        className="object-cover h-full w-full"
      />
    </Link>
  );
}
