import Link from "next/link";
import { IoArrowForwardSharp } from "react-icons/io5";

type Props = {
  prevHref: string;
  prevTitle: string;
  nextHref: string;
  nextTitle: string;
};

export default function NextAndPreviousButton({
  prevHref,
  prevTitle,
  nextHref,
  nextTitle,
}: Props) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row ">
      {prevHref && prevTitle && (
        <BlogPageButton href={prevHref} title={prevTitle} type="previous" />
      )}
      {nextHref && nextTitle && (
        <BlogPageButton href={nextHref} title={nextTitle} type="next" />
      )}
    </div>
  );
}

function BlogPageButton({
  href,
  title,
  type,
}: {
  href: string;
  title: string;
  type: "previous" | "next";
}) {
  return (
    <Link
      title={title}
      href={href}
      className={`flex ${
        type === "previous" && "flex-row-reverse"
      } justify-between bg-neutral-800 hover:bg-black !no-underline p-3 rounded-md active:scale-95 transition w-full shadow dark:hover:ring-1 dark:ring-white`}
    >
      <div
        className={`flex flex-col gap-1 ${type === "previous" && "text-right"}`}
      >
        <p className="text-gray-300  !my-0 capitalize text-sm sm:font-light">
          {type} Article
        </p>
        <p className="text-white font-bold sm:font-medium !my-0 text-base">
          {title}
        </p>
      </div>
      <IoArrowForwardSharp
        className={`bg-white text-black p-2 rounded-full w-8 h-8 self-center ${
          type === "previous" && "rotate-180"
        }`}
      />
    </Link>
  );
}
