import { motion } from "framer-motion";
import { ISnippet } from "@lib/interface/sanity";
import Image from "next/image";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SnippetCard({ snippet }: { snippet: ISnippet }) {
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={"/snippets/" + snippet.slug.current}
        className="group flex flex-col gap-3 p-5 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors h-full"
      >
        {/* Language icon */}
        <div className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-gray-800 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors flex-shrink-0">
          <Image
            src={snippet.language.image.asset.url}
            alt={snippet.language.name}
            width={22}
            height={22}
            className="object-contain"
          />
        </div>

        {/* Language label */}
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-500">
          {snippet.language.name}
        </span>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug group-hover:underline underline-offset-2">
          {snippet.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
          {snippet.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}
