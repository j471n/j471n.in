import { BsGithub } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import Link from "next/link";
import OgImage from "@components/OgImage";

export default function Project({ project }) {
  return (
    <div className="card">
      <OgImage
        src={project.coverURL}
        alt={project.name}
        darkSrc={project.darkCoverURL}
      />

      <div className="flex flex-col justify-start gap-3">
        <h1 className="font-bold capitalize text-neutral-900 dark:text-neutral-200">
          {project.name}
        </h1>
        <p className="text-sm text-gray-400 dark:text-neutral-400 truncate-2">
          {project.description}
        </p>

        <div className="flex items-center gap-1 flex-wrap">
          {project.tools.map((tool, index) => {
            return (
              <span
                key={`${tool}-${index}`}
                className="bg-gray-100 dark:bg-darkPrimary text-gray-500 rounded px-2 py-1 text-xs"
              >
                {tool}
              </span>
            );
          })}
        </div>

        <div className="mt-auto p-2 w-fit flex items-center gap-4">
          <Link href={project.githubURL} passHref>
            <a
              title="Source Code on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              href={project.githubURL}
              className="text-gray-500 hover:text-black dark:hover:text-white"
            >
              <BsGithub className="w-6 h-6 hover:scale-110 active:scale-90 transition-all" />
            </a>
          </Link>

          {project.previewURL && (
            <Link href={project.previewURL} passHref>
              <a
                title="Live Preview"
                target="_blank"
                rel="noopener noreferrer"
                href={project.previewURL}
                className="text-gray-500 hover:text-black dark:hover:text-white"
              >
                <MdOutlineLink className="w-6 h-6 hover:scale-110 active:scale-90 transition-all" />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
