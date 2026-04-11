import { BsGithub } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectType } from "@lib/types";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function Project({
  project,
  featured = false,
}: {
  project: ProjectType;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`flex border border-gray-200 dark:border-neutral-700 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors group ${
        featured
          ? "sm:col-span-2 lg:col-span-3 flex-col md:flex-row"
          : "flex-col"
      }`}
    >
      {/* Cover image */}
      {project.coverImage && (
        <div
          className={`relative overflow-hidden flex-shrink-0 border-gray-200 dark:border-neutral-700 ${
            featured
              ? "w-full h-56 md:h-auto md:w-80 lg:w-[420px] border-b md:border-b-0 md:border-l order-first md:order-last"
              : "w-full h-40 border-b"
          }`}
        >
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            quality={50}
            placeholder="blur"
            blurDataURL={project.coverImage}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`flex flex-col flex-1 gap-3 ${
          featured ? "p-6 lg:p-8" : "p-4"
        }`}
      >
        {featured && (
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-600">
            Featured
          </span>
        )}

        <div className="flex-1 space-y-2">
          <h2
            className={`font-bold text-gray-900 dark:text-white leading-snug ${
              featured ? "text-xl sm:text-2xl" : "text-sm"
            }`}
          >
            {project.name}
          </h2>
          <p
            className={`text-sm text-gray-600 dark:text-gray-400 ${
              featured ? "line-clamp-4 max-w-xl" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {(featured ? project.tools : project.tools.slice(0, 4)).map(
              (tool, index) => (
                <span
                  key={`${tool}-${index}`}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500"
                >
                  {tool}
                </span>
              ),
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-neutral-700 mt-auto">
          <Link
            href={project.githubURL}
            title="Source Code on GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <BsGithub className="w-3.5 h-3.5" />
            Code
          </Link>

          {project.previewURL && (
            <Link
              href={project.previewURL}
              title="Live Preview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <MdOutlineLink className="w-3.5 h-3.5" />
              Preview
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
