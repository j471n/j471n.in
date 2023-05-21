import React from "react";
import useSWR from "swr";
import { FadeContainer, opacityVariant } from "@content/FramerMotionVariants";
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
          className="grid xs:grid-cols-2 sm:!grid-cols-3 xl:!grid-cols-4 gap-5 my-10"
          variants={FadeContainer}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </AnimatedDiv>

        {/* Spotify top songs */}
        <div className="font-barlow">
          <AnimatedHeading
            variants={opacityVariant}
            className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
          >
            My Top streams songs
          </AnimatedHeading>

          <AnimatedText
            variants={opacityVariant}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            <span className="font-semibold">
              {topTracks ? (
                topTracks[0].title
              ) : (
                <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
              )}
            </span>{" "}
            is the most streamed song of mine in last 4 weeks. Here's my top
            tracks on Spotify updated daily.
          </AnimatedText>
          <div className="flex flex-col gap-0 my-10 font-barlow">
            {topTracks ? (
              topTracks?.map((track: SpotifyTrack, index: number) => (
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
        </div>

        {/* Spotify top Artists */}

        <div className="font-barlow">
          <AnimatedHeading
            variants={opacityVariant}
            className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
          >
            My Top Artists
          </AnimatedHeading>
          <AnimatedText
            variants={opacityVariant}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            My most listened Artist is{" "}
            <span className="font-semibold">
              {artists ? (
                artists[0].name
              ) : (
                <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
              )}
            </span>{" "}
            in last 4 weeks on Spotify.
          </AnimatedText>

          <div className="flex flex-col gap-0 my-10 font-barlow">
            {artists ? (
              artists?.map((artist: SpotifyArtist, index: number) => (
                <Artist
                  key={index}
                  id={index}
                  name={artist.name!}
                  url={artist.url}
                  coverImage={artist.coverImage.url}
                  popularity={artist.popularity!}
                />
              ))
            ) : (
              <LoadingArtists />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// Loading Components
function LoadingSongs() {
  return (
    <>
      {Array.from(Array(10).keys()).map((item) => (
        <div
          key={item}
          className="bg-gray-100 h-[80.8px] first:h-[81.6px] first:md:h-[85.6px] md:h-[84.8px]  dark:bg-darkPrimary  border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden relative xs:pl-16 md:!pl-20 "
        >
          <div className="absolute hidden tracking-wider origin-center transform left-4 md:left-6 font-inter xs:inline-flex">
            #{item + 1}
          </div>

          <div className="relative w-12 h-12 origin-center transform bg-white dark:bg-darkSecondary animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <p className="animate-pulse w-40 h-6 md:h-[28px] bg-white dark:bg-darkSecondary"></p>
            <p className="h-4 bg-white animate-pulse w-28 md:h-6 dark:bg-darkSecondary delay-125"></p>
          </div>
        </div>
      ))}
    </>
  );
}

function LoadingArtists() {
  return (
    <>
      {Array.from(Array(5).keys()).map((item) => (
        <div
          key={item}
          className="h-[80.8px] first:h-[81.6px] first:md:h-[129.6px] md:h-[128.8px]  bg-gray-100  dark:bg-darkPrimary  border-l first:border-t border-r border-b border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden"
        >
          <>
            <div className="hidden tracking-wider origin-center transform font-inter xs:inline-flex">
              #{item + 1}
            </div>
            <div
              aria-label="image"
              className="relative w-12 h-12 bg-white rounded-full animate-pulse dark:bg-darkSecondary md:w-24 md:h-24"
            ></div>
            <div className="flex flex-col gap-1">
              <h2
                aria-label="artist-name"
                className="animate-pulse h-6 md:h-[28px] w-40 bg-white dark:bg-darkSecondary"
              ></h2>
              <p
                aria-label="followers"
                className="w-20 h-4 bg-white animate-pulse md:h-6 dark:bg-darkSecondary"
              ></p>
            </div>
          </>
        </div>
      ))}
    </>
  );
}
