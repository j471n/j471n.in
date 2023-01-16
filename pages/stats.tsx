import React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  FadeContainer,
  fromLeftVariant,
  popUpFromBottomForText,
} from "@content/FramerMotionVariants";
import fetcher from "@lib/fetcher";
import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";
import StatsCard from "@components/Stats/StatsCard";
import Track from "@components/Stats/Track";
import Artist from "@components/Stats/Artist";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import AnimatedText from "@components/FramerMotion/AnimatedText";
import pageMeta from "@content/meta";
import { SpotifyArtist, SpotifyTrack } from "@lib/types";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";

type Stats = {
  title: string;
  value: string;
};

export default function Stats() {
  const { data: topTracks } = useSWR("/api/stats/tracks", fetcher);
  const { data: artists } = useSWR("/api/stats/artists", fetcher);
  const { data: devto } = useSWR("/api/stats/devto", fetcher);
  const { data: github } = useSWR("/api/stats/github", fetcher);

  const stats: Stats[] = [
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
    {
      title: "Github Followers",
      value: github?.followers,
    },
    {
      title: "Github Stars",
      value: github?.githubStars,
    },
    {
      title: "Repositories Forked",
      value: github?.forks,
    },
  ];

  return (
    <>
      <MetaData
        title={pageMeta.stats.title}
        description={pageMeta.stats.description}
        previewImage={pageMeta.stats.image}
        keywords={pageMeta.stats.keywords}
      />

      <section className="pageTop font-inter">
        <PageTop pageTitle="Statistics">
          <p>
            These are my personal statistics about my Dev.to Blogs, Github and
            Top Streamed Music on Spotify.
          </p>
        </PageTop>

        {/* Blogs and github stats */}
        <AnimatedDiv
          className="grid xs:grid-cols-2 sm:!grid-cols-3 md:!grid-cols-4 gap-5 my-10"
          variants={FadeContainer}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </AnimatedDiv>

        {/* Spotify top songs */}
        <div className="font-barlow">
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-3xl sm:text-4xl capitalize font-bold text-neutral-900 dark:text-neutral-200"
          >
            My Top streams songs
          </AnimatedHeading>

          <AnimatedText
            variants={popUpFromBottomForText}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            <span className="font-semibold">
              {topTracks && topTracks[0].title}
            </span>{" "}
            is the most streamed song of mine in last 4 weeks. Here's my top
            tracks on Spotify updated daily.
          </AnimatedText>
          <div className="flex flex-col my-10 gap-0 font-barlow">
            {topTracks?.map((track: SpotifyTrack, index: number) => (
              <Track
                key={index}
                id={index}
                url={track.url}
                title={track.title}
                coverImage={track.coverImage.url}
                artist={track.artist}
              />
            ))}
          </div>
        </div>

        {/* Spotify top Artists */}

        <div className="font-barlow">
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-3xl sm:text-4xl capitalize font-bold text-neutral-900 dark:text-neutral-200"
          >
            My Top Artists
          </AnimatedHeading>
          <AnimatedText
            variants={popUpFromBottomForText}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            My most listened Artist is{" "}
            <span className="font-semibold">{artists && artists[0].name}</span>{" "}
            in last 4 weeks on Spotify.
          </AnimatedText>

          <div className="flex flex-col my-10 gap-0 font-barlow">
            {artists?.map((artist: SpotifyArtist, index: number) => (
              <Artist
                key={index}
                id={index}
                name={artist.name!}
                url={artist.url}
                coverImage={artist.coverImage.url}
                followers={artist.followers!}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
