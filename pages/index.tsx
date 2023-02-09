// Page Components START----------
import BlogsSection from "@components/Home/BlogsSection";
import SkillSection from "@components/Home/SkillSection";
import Image from "next/image";
import Metadata from "@components/MetaData";
import Contact from "@components/Contact";
import {
  FadeContainer,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "@content/FramerMotionVariants";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { homeProfileImage } from "@utils/utils";
import getRSS from "@lib/generateRSS";
import generateSitemap from "@lib/sitemap";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import MDXContent from "@lib/MDXContent";
import pageMeta from "@content/meta";
import React from "react";
import { FrontMatter } from "@lib/types";
import Link from "next/link";

export default function Home({ blogs }: { blogs: FrontMatter[] }) {
  return (
    <>
      <Metadata
        title="Jatin Sharma"
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />
      <div className="relative max-w-4xl mx-auto dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              className="relative flex items-center justify-center p-3 rounded-full w-44 h-44 xs:w-52 xs:h-52 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
            >
              <Image
                src={homeProfileImage}
                className="rounded-full shadow filter saturate-0"
                width={933}
                height={933}
                alt="cover Profile Image"
                quality={75}
                priority
                // style={{
                //   maxWidth: "100%",
                //   height: "auto",
                // }}
              />
            </motion.div>

            <div className="flex flex-col w-full gap-3 p-5 text-center select-none ">
              <div className="flex flex-col gap-1">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl font-bold lg:text-6xl font-sarina"
                >
                  Jatin Sharma
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-lg text-[#383838] dark:text-gray-200"
                >
                  React Developer, Competitive Programmer
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className=" text-[#474747] dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                I am currently pursuing my Bachelor Degree in Computer Science.
                I can code in Python, C, C++, etc.
              </motion.p>
            </div>

            <Link
              href="https://bit.ly/j471nCV"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 transition-transform border border-gray-500 rounded-md outline-none select-none dark:border-gray-400 hover:bg-white dark:hover:bg-neutral-800 active:scale-95"
            >
              <FiDownload />
              <p>Resume</p>
            </Link>
          </div>
        </motion.section>

        <div>
          <SkillSection />
          <BlogsSection blogs={blogs} />
          <Contact />
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-2 text-3xl font-bold text-left font-inter"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = new MDXContent("posts").getAllPosts(3);
  await getRSS();
  await generateSitemap();

  return {
    props: { blogs },
  };
}
