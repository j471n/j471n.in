// Page Components START----------

import { headingFromLeft } from "@content/FramerMotionVariants";

import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { BlogPost } from "@lib/interface/sanity";
import BlogsSection from "@components/Home/BlogsSection";
import Contact from "@components/Contact";
import HeroSection from "@components/Home/HeroSection";
import Metadata from "@components/MetaData";
import React from "react";
import SkillSection from "@components/Home/SkillSection";
import generateSitemap from "@lib/sitemap";
import { getAllPostsMeta } from "@lib/sanityContent";
import getRSS from "@lib/generateRSS";
import pageMeta from "@content/meta";

export default function Home({ blogs }: { blogs: BlogPost[] }) {
  return (
    <>
      <Metadata
        title="Jatin Sharma"
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />
      <div className="relative w-full dark:bg-darkPrimary dark:text-gray-100">
        <HeroSection />

        {/* Content Sections */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SkillSection />
            <BlogsSection blogs={blogs} />
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-2 text-2xl sm:text-3xl font-bold text-left font-inter"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = await getAllPostsMeta(3);

  await getRSS();
  await generateSitemap();

  return {
    props: { blogs },
  };
}
