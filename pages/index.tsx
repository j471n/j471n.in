// Page Components START----------

import {
  FadeContainer,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "@content/FramerMotionVariants";

import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { BlogPost } from "@lib/interface/sanity";
import BlogsSection from "@components/Home/BlogsSection";
import Contact from "@components/Contact";
import StatsSection from "@components/Home/StatsSection";
import {
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Metadata from "@components/MetaData";
import React from "react";
import SkillSection from "@components/Home/SkillSection";
import generateSitemap from "@lib/sitemap";
import { getAllPostsMeta } from "@lib/sanityContent";
import getRSS from "@lib/generateRSS";
import { homeProfileImage } from "@utils/utils";
import { motion } from "framer-motion";
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
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="relative min-h-screen flex items-center py-20 px-6 sm:px-8 lg:px-12 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-0 w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            <div
              className="absolute bottom-20 left-0 w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-20 animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <div className="space-y-6">
                  <motion.div variants={opacityVariant}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-darkSecondary text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Available for new projects
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={opacityVariant}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight"
                  >
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                      Jatin Sharma
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={opacityVariant}
                    className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    Technical Lead at{" "}
                    <Link
                      href="https://www.linkedin.com/company/konnectnxt/"
                      target="_blank"
                      className="font-semibold text-gray-900 dark:text-white hover:underline"
                      rel="noopener noreferrer"
                    >
                      KonnectNXT
                    </Link>
                    . Building exceptional web experiences with modern
                    technologies.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  variants={opacityVariant}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link
                    href="https://bit.ly/j471nCV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <FiDownload className="w-5 h-5" />
                    Download Resume
                  </Link>

                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:border-gray-900 dark:hover:border-white hover:bg-gray-50 dark:hover:bg-darkSecondary transition-all active:scale-95"
                  >
                    Get in Touch
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={opacityVariant}
                  className="flex items-center gap-4 justify-center lg:justify-start"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    Connect:
                  </span>
                  {[
                    {
                      icon: FiGithub,
                      href: "https://github.com/j471n",
                      label: "GitHub",
                    },
                    {
                      icon: FiLinkedin,
                      href: "https://linkedin.com/in/j471n",
                      label: "LinkedIn",
                    },
                    {
                      icon: FiTwitter,
                      href: "https://twitter.com/j471n_",
                      label: "Twitter",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-darkSecondary transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right Image */}
              <motion.div
                variants={popUp}
                className="relative order-first lg:order-last"
              >
                <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl blur-2xl opacity-30"></div>

                  {/* Image Container */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-2xl">
                    <Image
                      src={homeProfileImage}
                      className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      fill
                      alt="Jatin Sharma"
                      quality={95}
                      priority
                    />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-darkSecondary border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        5+
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Years
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content Sections */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <StatsSection />
            <SkillSection />
            <BlogsSection blogs={blogs} />
          </div>

          {/* Contact Section - Full Width */}
          <Contact />
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
