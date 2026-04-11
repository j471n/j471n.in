// import { SpotifyArtist, SpotifyTrack } from "@lib/types";

// import Artist from "@components/Stats/Artist";
import GitHubActivityGraph from "@components/GitHubActivityGraph";
import GitHubCalendar from "react-github-calendar";
import MetaData from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import React from "react";
import StatsCard from "@components/Stats/StatsCard";
// import Track from "@components/Stats/Track";
import fetcher from "@lib/fetcher";
import pageMeta from "@content/meta";
import { motion } from "framer-motion";
import { useDarkMode } from "@context/darkModeContext";
import useSWR from "swr";

type Stats = {
  title: string;
  value: string;
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* Shared section-header used by each sub-section */
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-8 space-y-3">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export default function Stats() {
  const { isDarkMode } = useDarkMode();

  // const { data: topTracks } = useSWR("/api/stats/tracks", fetcher);
  // const { data: artists } = useSWR("/api/stats/artists", fetcher);
  const { data: devto } = useSWR("/api/stats/devto", fetcher);
  const { data: github } = useSWR("/api/stats/github", fetcher);

  const stats: Stats[] = [
    { title: "Total Posts", value: devto?.posts.toLocaleString() },
    { title: "Blog Followers", value: devto?.followers.toLocaleString() },
    { title: "Blog Reactions", value: devto?.likes.toLocaleString() },
    { title: "Blog Views", value: devto?.views.toLocaleString() },
    { title: "Blog Comments", value: devto?.comments.toLocaleString() },
    { title: "GitHub Repos", value: github?.repos },
    { title: "GitHub Gists", value: github?.gists },
    { title: "GitHub Followers", value: github?.followers },
    { title: "GitHub Stars", value: github?.githubStars },
    { title: "GitHub Forked", value: github?.forks },
  ];

  return (
    <>
      <MetaData
        title={pageMeta.stats.title}
        description={pageMeta.stats.description}
        previewImage={pageMeta.stats.image}
        keywords={pageMeta.stats.keywords}
      />

      <PageHeader
        watermark="stats"
        eyebrow="Dashboard — 001"
        title="Statistics"
        description="Personal stats about my Dev.to blogs, GitHub activity, and top streamed music on Spotify."
        className="pb-24"
      >
        {/* ── Counts grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-px bg-gray-200 dark:bg-darkSecondary border border-gray-200 dark:border-darkSecondary mb-20"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </motion.div>

        {/* ── GitHub Contribution calendar ── */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="GitHub"
            title="Contribution Graph"
            description="My GitHub contribution graph showing coding activity and productivity."
          />
          <div className="overflow-x-auto text-black dark:text-white">
            <GitHubCalendar
              username="j471n"
              colorScheme={isDarkMode ? "dark" : "light"}
            />
          </div>
        </div>

        {/* ── GitHub Activity charts ── */}
        <div className="mb-16">
          <GitHubActivityGraph />
        </div>

        {/* ── Top Tracks ── */}
        {/* <div className="mb-16">
          <SectionHeading
            eyebrow="Spotify"
            title="Top Streamed Songs"
            description={
              <>
                {topTracks ? (
                  <>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {topTracks?.[0]?.title}
                    </span>
                    {" is my most streamed track in the last 4 weeks."}
                  </>
                ) : (
                  "My top tracks on Spotify, updated daily."
                )}
              </>
            }
          />
          <div className="flex flex-col border border-gray-200 dark:border-gray-800">
            {topTracks ? (
              topTracks.map((track: SpotifyTrack, index: number) => (
                <Track
                  key={index}
                  id={index}
                  url={track.url}
                  title={track.title}
                  coverImage={track.coverImage.url}
                  artist={track.artist}
                />
              ))
            ) : (
              <LoadingSongs />
            )}
          </div>
        </div> */}

        {/* ── Top Artists ── */}
        {/* <div className="mb-4">
          <SectionHeading
            eyebrow="Spotify"
            title="Top Artists"
            description={
              <>
                {artists ? (
                  <>
                    {"My most listened artist is "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {artists?.[0]?.name}
                    </span>
                    {" in the last 4 weeks."}
                  </>
                ) : (
                  "My most listened artists on Spotify in the last 4 weeks."
                )}
              </>
            }
          />
          <div className="flex flex-col border border-gray-200 dark:border-gray-800">
            {artists ? (
              artists.length === 0 ? (
                <p className="p-6 text-sm font-mono text-gray-500 dark:text-gray-500">
                  Not enough data to show.
                </p>
              ) : (
                artists.map((artist: SpotifyArtist, index: number) => (
                  <Artist
                    key={index}
                    id={index}
                    name={artist.name!}
                    url={artist.url}
                    coverImage={artist.coverImage.url}
                    popularity={artist.popularity!}
                  />
                ))
              )
            ) : (
              <LoadingArtists />
            )}
          </div>
        </div> */}
      </PageHeader>
    </>
  );
}

// function LoadingSongs() {
//   return (
//     <>
//       {Array.from({ length: 10 }, (_, i) => (
//         <div
//           key={i}
//           className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-darkPrimary"
//         >
//           <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 w-6 text-right flex-shrink-0">
//             {i + 1}
//           </span>
//           <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
//           <div className="flex flex-col gap-1.5 flex-1">
//             <div className="h-3.5 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse" />
//             <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// function LoadingArtists() {
//   return (
//     <>
//       {Array.from({ length: 5 }, (_, i) => (
//         <div
//           key={i}
//           className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-darkPrimary"
//         >
//           <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 w-6 text-right flex-shrink-0">
//             {i + 1}
//           </span>
//           <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
//           <div className="flex flex-col gap-1.5 flex-1">
//             <div className="h-3.5 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse" />
//             <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
