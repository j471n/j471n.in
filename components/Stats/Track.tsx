import Image from "next/image";
import Link from "next/link";

type TrackProps = {
  url: string;
  title: string;
  artist: string;
  coverImage: string;
  id: number;
};

export default function Track({
  url,
  title,
  artist,
  coverImage,
  id,
}: TrackProps) {
  return (
    <Link
      href={url}
      rel="noreferrer"
      target="_blank"
      className="group flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors duration-200 last:border-b-0"
    >
      <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 w-5 text-right flex-shrink-0">
        {id + 1}
      </span>
      <div className="flex-shrink-0 w-10 h-10 overflow-hidden border border-gray-200 dark:border-gray-700">
        {coverImage ? (
          <Image
            src={coverImage}
            width={40}
            height={40}
            alt={title}
            quality={60}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-gray-900 dark:group-hover:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 truncate mt-0.5">
          {artist}
        </p>
      </div>
    </Link>
  );
}
