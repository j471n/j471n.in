import React from "react";
import MetaData from "../components/MetaData";
import PageTop from "../components/PageTop";
import StatsCard from "../components/Stats/StatsCard";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import { motion } from "framer-motion";
import { opacityVariant } from "../content/FramerMotionVariants";

export default function Stats({ github }) {
  const { data: devto } = useSWR("/api/stats/devto", fetcher);
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
      title: github && "Github Repos",
      value: github?.repos,
    },
    {
      title: "Github Gists",
      value: github?.gists,
    },
  ];
  return (
    <>
      <MetaData title="Stats" />

      <section className="pageTop">
        <PageTop pageTitle="Statistics">
          These are my personal statistics about me built with Next.js routes.
          It includes My Blogs and github Stats.
        </PageTop>

        <motion.div
          className="grid grid-rows-auto sm:grid-cols-2 gap-5"
          variants={opacityVariant}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={
                stat.value === undefined ? (
                  <div className="w-28 h-8 rounded-sm bg-gray-300 animate-pulse" />
                ) : (
                  stat.value
                )
              }
            />
          ))}
        </motion.div>

        {/* TODO: Add Spotify Stats */}
      </section>
    </>
  );
}
// :
export async function getStaticProps() {
  const github = await fetch(process.env.VERCEL_URL + "/api/stats/github").then(
    (res) => res.json()
  );
  return {
    props: {
      github,
    },
    revalidate: 24 * 60 * 60,
  };
}
