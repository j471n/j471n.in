// Static Data Import--------
import socialMedia from "@content/socialMedia";
import faqs from "@content/faqData";
// Static Data END--------

// Page Components START----------
import BlogsSection from "@components/Home/BlogsSection";
import SkillSection from "@components/Home/SkillSection";
// Page Components END------------

import Image from "next/image";
import Metadata from "@components/MetaData";
import Contact from "@components/Contact";
import FAQ from "@components/FAQ";
import {
  FadeContainer,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "@content/FramerMotionVariants";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { homeProfileImage } from "@utils/utils";
import { getAllPosts } from "@lib/posts";
// import { resumeDownloadLink } from "../utils/utils";
import { pagePreviewImage } from "@utils/utils";
import { getPinnedSkills } from "@lib/dataFetch";
import getRSS from "@lib/generateRSS";
import generateSitemap from "@lib/sitemap";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

export default function Home({ blogs, skills }) {
  return (
    <>
      <Metadata
        description="I am currently perusing my Bachelor Degree in Computer Science. I
              can code in Python, C, C++, etc. I also work on React & Next.js"
        previewImage={pagePreviewImage.home}
      />
      <div className="relative dark:bg-darkPrimary dark:text-gray-100 max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl mx-auto">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid place-content-center py-20  min-h-screen"
        >
          <div className="w-full relative mx-auto flex flex-col items-center gap-10">
            <motion.div
              variants={popUp}
              className="w-44 h-44 xs:w-52 xs:h-52 flex justify-center items-center border-t-4 border-b-4 border-black dark:border-white rounded-full p-3 "
            >
              <Image
                src={homeProfileImage}
                className="rounded-full shadow filter saturate-0"
                width={400}
                height={400}
                alt="cover Profile Image"
                quality={75}
                priority={true}
              />
            </motion.div>

            <div className="w-full flex flex-col p-5 gap-3 select-none text-center ">
              <div className="flex flex-col gap-1">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl lg:text-6xl font-bold font-sarina"
                >
                  Jatin Sharma
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-lg text-gray-500"
                >
                  React Developer, Competitive Programmer
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className=" text-slate-500 dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                I am currently perusing my Bachelor Degree in Computer Science.
                I can code in Python, C, C++, etc.
              </motion.p>
            </div>

            <Link href="/resume" passHref>
              <motion.a
                variants={popUp}
                className="flex items-center gap-2 px-5 py-2 border rounded-md border-gray-500 dark:border-gray-400 select-none active:scale-95 duration-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <FiDownload className="" />
                <p>Resume</p>
              </motion.a>
            </Link>
          </div>
        </motion.section>

        <div>
          {/* <AboutMe /> */}
          <SkillSection skills={skills} />
          <BlogsSection blogs={blogs} />
          {/* <ProjectSection /> */}
          <FAQ faqs={faqs} />
          <Contact socialMedia={socialMedia} />
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }) {
  return (
    <AnimatedHeading
      className="w-full font-bold text-3xl text-left my-2 font-inter"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = getAllPosts().slice(0, 3);
  const skills = getPinnedSkills();
  await getRSS();
  await generateSitemap();

  return {
    props: { blogs, skills },
  };
}
