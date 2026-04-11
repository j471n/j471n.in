import { ILinkedinResponse, ITMDBData } from "@lib/interface";
import { IStaticPage } from "@lib/interface/sanity";
import Image from "next/image";
import MovieCard from "@components/MovieCard";
import MetaData from "@components/MetaData";
import MDXComponents from "@components/MDXComponents";
import PageHeader from "@components/PageHeader";
import { MDXRemote } from "next-mdx-remote";
import { fetchTMDBData } from "@lib/tmdb";
import { getStaticPageFromSlug } from "@lib/sanityContent";
import { getUserDataValue } from "@lib/supabase";
import { months } from "@utils/date";
import { motion } from "framer-motion";
import pageMeta from "@content/meta";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

export default function About({
  about,
  movies,
  linkedin,
}: {
  about: IStaticPage;
  movies: ITMDBData[];
  linkedin: string;
}) {
  const parsedLinkedIn: ILinkedinResponse = JSON.parse(linkedin);
  return (
    <>
      <MetaData
        title={pageMeta.about.title}
        description={pageMeta.about.description}
        previewImage={pageMeta.about.image}
        keywords={pageMeta.about.keywords}
      />

      <PageHeader
        watermark="/about"
        eyebrow="Profile — 001"
        title={about.title}
        description={about.excerpt}
        className="pb-16"
      >
        {/* Prose content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose dark:prose-invert prose-gray max-w-max
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
              prose-a:text-gray-900 dark:prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-gray-400 dark:prose-a:decoration-gray-600
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-li:text-gray-600 dark:prose-li:text-gray-400
              prose-blockquote:border-l-2 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:not-italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
              prose-code:text-gray-900 dark:prose-code:text-white prose-code:bg-gray-100 dark:prose-code:bg-darkSecondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
        >
          <MDXRemote
            {...about.content}
            frontmatter={{
              slug: about.slug.current,
              excerpt: about.excerpt,
              title: about.title,
              date: about.publishedAt,
              keywords: about.keywords,
              image: about.mainImage.asset.url,
            }}
            components={MDXComponents}
          />
        </motion.div>
      </PageHeader>

      {/* ── Experience ── */}
      <div className="relative w-full px-6 sm:px-8 lg:px-12 pb-20 print:hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
                Career
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Recent Experience
            </motion.h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          </div>

          {/* Experience cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
          >
            {parsedLinkedIn.experiences.map((experience) => (
              <motion.div
                key={experience.company_linkedin_profile_url}
                variants={itemVariants}
                className="bg-white dark:bg-darkPrimary p-6 flex gap-5 flex-col xs:flex-row"
              >
                {/* Logo */}
                <div className="flex-shrink-0 w-12 h-12 border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center bg-white">
                  <Image
                    src={experience.logo_url}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                    alt={experience.company}
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col gap-3 flex-grow ${
                    experience.job_titles.length > 1 ? "ml-8" : ""
                  }`}
                >
                  {experience.job_titles.length > 1 && (
                    <h2 className="text-base font-bold text-gray-900 dark:text-white -ml-8 font-mono uppercase tracking-wider">
                      {experience.company}
                    </h2>
                  )}

                  {experience.job_titles.map((job, i) => (
                    <div key={job.title} className="relative w-full">
                      {experience.job_titles.length > 1 && (
                        <span
                          className={`absolute -left-[25px] w-px bg-gray-300 dark:bg-gray-700 ${
                            i === experience.job_titles.length - 1
                              ? "h-3 top-2"
                              : "h-full top-2"
                          }`}
                        />
                      )}
                      {experience.job_titles.length > 1 && (
                        <span className="absolute -left-[28.5px] top-[9px] h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 ring-2 ring-white dark:ring-darkPrimary" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            {job.title}
                          </h3>
                          {experience.job_titles.length === 1 && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {experience.company}
                            </p>
                          )}
                          {job.location && (
                            <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-0.5">
                              {job.location}
                            </p>
                          )}
                        </div>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-500 whitespace-nowrap sm:text-right flex-shrink-0">
                          {months[job.starts_at.month - 1]} {job.starts_at.year}
                          {" — "}
                          {!job.ends_at
                            ? "Present"
                            : `${months[job.ends_at.month - 1]} ${job.ends_at.year}`}
                        </p>
                      </div>

                      {job.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                          {job.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Movies & TV ── */}
      <div className="relative w-full px-6 sm:px-8 lg:px-12 pb-24 print:hidden overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
                Watching
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Movies & TV Series
            </motion.h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          </div>

          {/* Horizontal scroll strip */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex items-stretch gap-3 overflow-x-auto pb-4 horizontal-scrollbar"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const about = await getStaticPageFromSlug("about");

  const movies = await fetchTMDBData();
  const { data: linkedin } = await getUserDataValue("linkedin");

  return {
    props: {
      about,
      movies,
      linkedin,
    },
    revalidate: 60 * 60 * 6, // every 6 hours (TMDB rate limit friendly)
  };
}
