// Static Data Import--------
import socialMedia from "../content/socialMedia";
import faqs from "../content/faqData";
// Static Data END--------

// Page Components START----------
import AboutMe from "../components/Home/AboutMe";
import SkillSection from "../components/Home/SkillSection";
import BlogsSection from "../components/Home/BlogsSection";
import CertificationSection from "../components/Home/CertificationSection";
import ProjectSection from "../components/Home/ProjectSection";
// Page Components END------------

import Image from "next/image";
import Metadata from "../components/MetaData";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import AnimatedText from "../components/FramerMotion/AnimatedText";
import {
  headingFromLeft,
  opacityVariant,
  popUp,
} from "../content/FramerMotionVariants";
import AnimatedHeading from "../components/FramerMotion/AnimatedHeading";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";
import AnimatedButton from "../components/FramerMotion/AnimatedButton";
import { homeProfileImage } from "../utils/utils";
import TopContainer from "../components/Home/TopContainer";
import { buttonsLinearVariant } from "../content/FramerMotionVariants";
import { resumeDownloadLink } from "../utils/utils";

export default function Home({ blogs }) {
  return (
    <>
      <Metadata title="About" />
      <div className="dark:bg-darkPrimary dark:text-gray-100">
        {/* HomPage */}
        <TopContainer className="!from-purple-900/50">
          <div className="w-full md:w-1/2 grid place-items-center">
            <div className="text-center md:text-left my-7 md:my-0">
              <AnimatedText
                variants={opacityVariant}
                className="uppercase font-medium text-[10px] xs:text-sm sm:text-base text-center sm:text-left text-slate-700 dark:text-gray-400"
              >
                Hi there! I'm
              </AnimatedText>
              <AnimatedHeading
                variants={opacityVariant}
                className="capitalize font-bold text-4xl sm:text-4xl lg:text-6xl 3xl:text-8xl font-sarina text-gray-800 dark:text-gray-300"
              >
                Jatin Sharma
              </AnimatedHeading>
              <AnimatedText
                variants={opacityVariant}
                className="text-base sm:text-xl font-thin  uppercase tracking-widest font-merriweather text-slate-700 dark:text-gray-400"
              >
                React Developer
              </AnimatedText>

              <div className="flex gap-2 mt-4 md:mt-4 justify-center md:justify-start text-xs sm:text-base">
                <AnimatedButton
                  variants={buttonsLinearVariant}
                  className="px-8 py-3 sm:px-6 sm:py-2 rounded-full  font-semibold relative ring-2 ring-purple-700 select-none text-purple-700 lg:hover:bg-purple-700 lg:hover:text-purple-100 dark:text-purple-200"
                  onClick={() => (window.location.href = "#view")}
                >
                  About me
                </AnimatedButton>
                <AnimatedButton
                  variants={buttonsLinearVariant}
                  className="px-8 py-3 sm:px-6 sm:py-2 rounded-full  font-semibold relative  bg-purple-700 select-none text-purple-200"
                  onClick={() => window.open(resumeDownloadLink, "_self")}
                >
                  Download CV
                </AnimatedButton>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid place-items-center">
            <AnimatedDiv
              variants={popUp}
              className="relative w-3/5 xs:w-1/3 sm:!w-2/5 md:!w-1/2 group"
            >
              <div
                className="absolute inset-0 bg-purple-800 animate-[spin_3s_linear_infinite]"
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              ></div>
              <Image
                src={homeProfileImage}
                className="rounded-full shadow"
                layout="responsive"
                width={400}
                height={400}
                alt="cover Profile Image"
                quality={75}
                priority={true}
              />
            </AnimatedDiv>
          </div>
        </TopContainer>

        <div id="view">
          {/* About me */}
          <AboutMe />
          {/* Skills Section */}
          <SkillSection />
          {/* Blogs Section */}
          <BlogsSection blogs={blogs} />
          {/* Certification Section */}
          <CertificationSection />
          {/* Project Section */}
          <ProjectSection />
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
      className="w-full font-bold text-2xl text-center my-2 font-exo"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = await fetch("https://dev.to/api/articles/me?per_page=10", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  }).then((res) => res.json());
  return {
    props: {
      blogs,
    },
    // updates the page automatically after 1 hour
    revalidate: 60 * 60,
  };
}
