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
import AnimatedText from "@components/FramerMotion/AnimatedText";
import {
  headingFromLeft,
  opacityVariant,
  popUpFromBottomForText,
} from "@content/FramerMotionVariants";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { homeProfileImage } from "@utils/utils";
import { getAllPosts } from "@lib/posts";
// import { resumeDownloadLink } from "../utils/utils";
import { pagePreviewImage } from "@utils/utils";
import getRSS from "@lib/generateRSS";
import { getPinnedSkills } from "@lib/dataFetch";

export default function Home({ blogs, skills }) {
  return (
    <>
      <Metadata
        description="I am currently perusing my Bachelor Degree in Computer Science. I
              can code in Python, C, C++, etc. I also work on React & Next.js"
        previewImage={pagePreviewImage.home}
      />
      <div className="relative dark:bg-darkPrimary dark:text-gray-100 max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl mx-auto">
        <section className="py-20 w-full relative mx-auto flex flex-col-reverse lg:flex-row items-center justify-evenly min-h-screen">
          <div className="w-full flex flex-col p-5 gap-3 select-none text-center lg:text-left">
            <div className="flex flex-col gap-1">
              <AnimatedHeading
                variants={opacityVariant}
                className="text-5xl lg:text-6xl font-bold font-sarina"
              >
                Jatin Sharma
              </AnimatedHeading>
              <AnimatedText
                variants={opacityVariant}
                className="font-medium text-xs md:text-sm lg:text-base  md:ml-5 text-gray-500"
              >
                React Developer, Competitive Programmer
              </AnimatedText>
            </div>

            <AnimatedText
              variants={popUpFromBottomForText}
              className="md:ml-5 md:mr-20 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base"
            >
              I am currently perusing my Bachelor Degree in Computer Science. I
              can code in Python, C, C++, etc.
            </AnimatedText>
          </div>

          <AnimatedDiv className="w-44 h-44" variants={opacityVariant}>
            <Image
              src={homeProfileImage}
              className="rounded-full shadow filter saturate-0"
              layout="responsive"
              width={400}
              height={400}
              alt="cover Profile Image"
              quality={75}
              priority={true}
            />
          </AnimatedDiv>
        </section>

        <div id="view">
          {/* About me */}
          {/* <AboutMe /> */}
          {/* Skills Section */}
          <SkillSection skills={skills} />
          {/* Blogs Section */}
          <BlogsSection blogs={blogs} />
          {/* Project Section */}
          {/* <ProjectSection /> */}
          {/* FAQs */}
          <FAQ faqs={faqs} />
          {/* Contact on Social Media */}
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

  return {
    props: { blogs, skills },
  };
}
