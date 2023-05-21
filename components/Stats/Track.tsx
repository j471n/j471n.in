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
      className="bg-gray-100 hover:bg-white dark:bg-darkPrimary hover:dark:bg-darkSecondary border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden relative xs:pl-16 md:!pl-20 "
    >
      <>
        <div className="absolute hidden text-xl tracking-wider text-gray-500 origin-center transform left-4 md:left-6 font-inter xs:inline-flex">
          #{id + 1}
        </div>

        <div className="relative w-12 h-12 origin-center transform">
          {coverImage ? (
            <Image
              src={coverImage}
              width={50}
              height={50}
              alt={title}
              quality={50}
            ></Image>
          ) : (
            <div className="w-full h-full bg-white animate-pulse"></div>
          )}
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900 origin-left transform md:text-xl dark:text-white font-barlow">
            {title ?? <div className="w-full h-4 bg-white animate-pulse"></div>}
          </p>
          <p className="text-xs text-gray-500 origin-left transform sm:text-sm md:text-base line-clamp-1">
            {artist ?? (
              <div className="w-full h-4 bg-white animate-pulse"></div>
            )}
          </p>
        </div>
      </>
    </Link>
  );
}
