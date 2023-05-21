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
      className="flex items-center gap-5 p-4 overflow-hidden bg-gray-100 border-b border-l border-r border-gray-300 hover:bg-white dark:bg-darkPrimary hover:dark:bg-darkSecondary first:border-t dark:border-neutral-600 font-barlow"
    >
      <>
        <div className="hidden text-xl tracking-wider text-gray-500 origin-center transform font-inter xs:inline-flex">
          #{id + 1}
        </div>
        <div className="relative w-12 h-12 origin-center transform md:w-24 md:h-24">
          <Image
            className="rounded-full"
            src={coverImage}
            width={100}
            height={100}
            alt={name}
            quality={50}
            style={{
              height: "100%",
            }}
          ></Image>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 origin-left transform sm:text-lg md:text-xl xl:text-2xl dark:text-white md:font-bold font-barlow">
            {name}
          </h2>
          <p className="text-xs text-gray-500 origin-left transform sm:text-sm md:text-base md:font-medium line-clamp-1">
            Popularity: {popularity}
          </p>
        </div>
      </>
    </Link>
  );
}
