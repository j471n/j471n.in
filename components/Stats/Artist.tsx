import Image from "next/image";
import Link from "next/link";

type ArtistProps = {
  name: string;
  url: string;
  coverImage: string;
  popularity: number;
  id: number;
};

export default function Artist({
  name,
  url,
  coverImage,
  popularity,
  id,
}: ArtistProps) {
  return (
    <Link
      rel="noreferrer"
      target="_blank"
      href={url}
      className="group flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors duration-200 last:border-b-0"
    >
      <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 w-5 text-right flex-shrink-0">
        {id + 1}
      </span>
      <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
        <Image
          src={coverImage}
          width={40}
          height={40}
          alt={name}
          quality={60}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-gray-900 dark:group-hover:text-white">
          {name}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Popularity: {popularity}
        </p>
      </div>
    </Link>
  );
}
