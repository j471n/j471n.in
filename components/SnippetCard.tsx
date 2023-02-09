import { Snippet } from "@lib/types";
import { snippetsImages } from "@utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <Link
      href={"/snippets/" + snippet.slug}
      className="w-full p-4 ring-1 ring-gray-300 hover:ring-gray-400 dark:ring-[#444] bg-white dark:bg-transparent dark:hover:bg-darkSecondary dark:hover:ring-[#555] flex flex-col gap-2 rounded"
    >
      <div className="p-1 overflow-hidden w-fit">
        <Image
          src={snippetsImages[`${snippet.image}`]}
          alt={snippet.image}
          width={40}
          height={40}
        ></Image>
      </div>
      <h2 className="text-lg font-bold text-black dark:text-white">
        {snippet.title}
      </h2>
      <p className="-mt-1 text-neutral-500 ">{snippet.excerpt}</p>
    </Link>
  );
}
