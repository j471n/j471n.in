import Image from "next/image";
import Link from "next/link";

export default function EmbedBlog({
  img,
  text,
  url,
}: {
  img: string;
  text: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      className="flex items-center gap-3 my-5 px-2 py-2 sm:py-0 border-black dark:border-white border-2 shadow-[5px_5px_black] dark:rounded-md dark:shadow-none select-none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex">
        <Image
          src={img}
          width={100}
          height={55}
          placeholder="blur"
          blurDataURL={img}
          alt="blog image"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <p className="font-bold sm:text-lg">{text}</p>
    </Link>
  );
}
