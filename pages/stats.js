import React from "react";
import MetaData from "../components/MetaData";
import PageTop from "../components/PageTop";
import StatsCard from "../components/Stats/StatsCard";
import Track from "../components/Stats/Track";
import Artist from "../components/Stats/Artist";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  FadeContainer,
  fromLeftVariant,
} from "../content/FramerMotionVariants";
import AnimatedHeading from "../components/FramerMotion/AnimatedHeading";
import AnimatedText from "../components/FramerMotion/AnimatedText";
import { pagePreviewImage } from "../utils/utils";

export default function Stats() {
  const { data: topTracks } = useSWR("/api/stats/tracks", fetcher);
  const { data: artists } = useSWR("/api/stats/artists", fetcher);
  const { data: devto } = useSWR("/api/stats/devto", fetcher);
  const { data: github } = useSWR("/api/stats/github", fetcher);

  const stats = [
    {
      title: "Total Posts",
      value: devto?.posts.toLocaleString(),
    },
    {
      title: "Blog Followers",
      value: devto?.followers.toLocaleString(),
    },
    {
      title: "Blog Reactions",
      value: devto?.likes.toLocaleString(),
    },
    {
      title: "Blog Views",
      value: devto?.views.toLocaleString(),
    },
    {
      title: "Blog Comments",
      value: devto?.comments.toLocaleString(),
    },
    {
      title: "Github Repos",
      value: github?.repos,
    },
    {
      title: "Github Gists",
      value: github?.gists,
    },
  ];

  return (
    <>
      <MetaData
        title="Statistics -"
        description=" These are my personal statistics about me built with Next.js API
          routes. It includes My Blogs and github Stats and top music stats."
        previewImage={pagePreviewImage.stats}
      />

      <section className="pageTop font-inter">
        <PageTop pageTitle="Statistics">
          These are my personal statistics about me built with Next.js API
          routes. It includes My Blogs and github Stats and top music stats.
        </PageTop>

        {/* Blogs and github stats */}
        <motion.div
          className="grid grid-rows-auto sm:grid-cols-2 gap-5 my-10"
          variants={FadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={
                stat.value === undefined ? (
                  <div className="w-28 h-8 rounded-sm bg-gray-300 dark:bg-neutral-800 animate-pulse" />
                ) : (
                  stat.value
                )
              }
            />
          ))}
        </motion.div>

        {/* Spotify top songs */}
        <motion.div
          className="font-barlow"
          variants={FadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-3xl sm:text-4xl capitalize font-bold text-neutral-900 dark:text-neutral-200"
          >
            My Top streams songs
          </AnimatedHeading>

          <AnimatedText className="mt-4 text-gray-500">
            <span className="font-semibold">
              {topTracks && topTracks[0].title}
            </span>{" "}
            is the most streamed song of mine. Here's my top tracks on Spotify
            updated daily.
          </AnimatedText>
          <div className="flex flex-col my-10 gap-0 font-barlow">
            {topTracks?.map((track, index) => (
              <Track
                key={index}
                track={track}
                url={track.url}
                title={track.title}
                coverImage={track.coverImage.url}
                artist={track.artist}
              />
            ))}
          </div>
        </motion.div>

        {/* Spotify top Artists */}

        <motion.div
          className="font-barlow"
          variants={FadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-3xl sm:text-4xl capitalize font-bold text-neutral-900 dark:text-neutral-200"
          >
            My Top Artists
          </AnimatedHeading>
          <AnimatedText className="mt-4 text-gray-500">
            My currently favorite Artists is{" "}
            <span className="font-semibold">KR$NA</span>{" "}
          </AnimatedText>

          <div className="flex flex-col my-10 gap-0 font-barlow">
            {artists?.map((artist, index) => (
              <Artist
                key={index}
                name={artist.name}
                url={artist.url}
                coverImage={artist.coverImage.url}
                followers={artist.followers}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
