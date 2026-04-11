import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { opacityVariant, popUp } from "@content/FramerMotionVariants";
import { featuredSocialLinks } from "@content/siteConfig";
import siteConfig from "@content/siteConfig";

const socialIconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
};

export default function HeroSection() {
  const { hero } = siteConfig.home;

  return (
    <section className="relative min-h-screen flex items-center py-24 lg:py-0 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6b7280 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.12,
        }}
        aria-hidden="true"
      />

      {/* ── Diagonal stripe — right half ── */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full hero-stripe pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-white dark:from-darkPrimary to-transparent pointer-events-none" />

      {/* ── JS initials — gradient emboss ── */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-200 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
        style={{ fontSize: "clamp(8rem, 24vw, 22rem)" }}
        aria-hidden="true"
      >
        JS
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* ── Corner cross-tick marks ── */}
        {(
          [
            "top-0 left-0",
            "top-0 right-0",
            "bottom-8 left-0",
            "bottom-8 right-0",
          ] as const
        ).map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-5 h-5 pointer-events-none`}
            aria-hidden="true"
          >
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-gray-300 dark:bg-gray-700" />
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center py-16 lg:py-20">
          {/* ── Left content (3 cols) ── */}
          <div className="lg:col-span-3 flex flex-col gap-7 text-center lg:text-left">
            {/* Availability badge — inverted */}
            <motion.div variants={opacityVariant}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 dark:bg-white text-[11px] font-semibold tracking-[0.1em] uppercase text-white dark:text-gray-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                {hero.availabilityBadge}
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <motion.p
                variants={opacityVariant}
                className="text-xs sm:text-sm font-light tracking-[0.5em] uppercase text-gray-500 dark:text-gray-500 mb-4"
              >
                {hero.greeting}
              </motion.p>
              <motion.h1
                variants={opacityVariant}
                className="font-black leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)" }}
              >
                <span className="text-neutral-700 dark:text-gray-200">
                  Jatin
                </span>
                <br />
                <span className="font-sarina font-normal text-gray-900 dark:text-white">
                  Sharma
                </span>
              </motion.h1>
            </div>

            {/* Role line */}
            <motion.div
              variants={opacityVariant}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="h-px w-8 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 whitespace-nowrap">
                {hero.rolePrefix}{" "}
                <Link
                  href={hero.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-700 dark:text-gray-200 font-semibold hover:underline underline-offset-4 decoration-gray-400 dark:decoration-gray-600"
                >
                  {hero.companyName}
                </Link>
              </p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700 hidden sm:block" />
            </motion.div>

            {/* Bio — left accent border */}
            <motion.p
              variants={opacityVariant}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-2 border-gray-300 dark:border-gray-700 pl-5 py-1"
            >
              {hero.roleSuffix.replace(/^\.\s*/, "")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={opacityVariant}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              {/* Primary — solid fill */}
              <Link
                href={hero.primaryCta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm overflow-hidden transition-colors duration-300 hover:bg-neutral-700 dark:hover:bg-gray-100 active:scale-95"
              >
                <FiDownload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-200 relative z-10" />
                <span className="relative z-10">{hero.primaryCta.label}</span>
              </Link>

              {/* Secondary — invert-fill on hover */}
              <Link
                href={hero.secondaryCta.url}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-sm overflow-hidden hover:text-white dark:hover:text-gray-900 transition-colors duration-300 active:scale-95"
              >
                <span className="absolute inset-0 bg-gray-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10">{hero.secondaryCta.label}</span>
                <FiArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 duration-200" />
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={opacityVariant}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 dark:text-gray-500">
                {hero.socialLabel}
              </span>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
              {featuredSocialLinks.map((socialLink) => {
                const Icon =
                  socialIconMap[socialLink.icon as keyof typeof socialIconMap];
                if (!Icon) return null;
                return (
                  <a
                    key={socialLink.title}
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLink.title}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-700 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-darkSecondary transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right image (2 cols) ── */}
          <div className="lg:col-span-2 relative order-first lg:order-last">
            <div className="relative mx-auto max-w-[260px] sm:max-w-[290px] lg:max-w-[240px] xl:max-w-[350px]">
              {/* Diagonal stripe behind image */}
              <div
                className="absolute -inset-8 hero-stripe rounded-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Outer dashed ring +3° */}
              <div
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-gray-400 dark:border-gray-600 rotate-3 scale-[1.06] pointer-events-none"
                aria-hidden="true"
              />
              {/* Inner solid ring -1° */}
              <div
                className="absolute inset-0 rounded-2xl border border-gray-300 dark:border-gray-700 -rotate-1 scale-[1.02] pointer-events-none"
                aria-hidden="true"
              />

              {/* Profile image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-300 dark:shadow-black/60">
                <Image
                  src={siteConfig.person.profileImage}
                  className="object-cover object-top w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  fill
                  alt={siteConfig.person.name}
                  quality={95}
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
              </div>

              {/* Floating card — years */}
              <motion.div
                variants={popUp}
                className="absolute -left-5 sm:-left-10 top-10 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-700 border-t-[3px] border-t-neutral-700 dark:border-t-gray-200 rounded-2xl px-4 py-3.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] flex flex-col items-center min-w-[76px]"
              >
                <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                  {hero.experienceBadge.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 mt-1.5 font-bold">
                  {hero.experienceBadge.title}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-500">
                  {hero.experienceBadge.description}
                </span>
              </motion.div>

              {/* Floating card — projects */}
              <motion.div
                variants={popUp}
                className="absolute -right-5 sm:-right-10 bottom-16 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-700 border-t-[3px] border-t-neutral-700 dark:border-t-gray-200 rounded-2xl px-4 py-3.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] flex flex-col items-center min-w-[76px]"
              >
                <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                  10+
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 mt-1.5 font-bold">
                  Projects
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={opacityVariant}
          className="hidden lg:flex flex-col items-center gap-2 absolute -bottom-4 left-1/2 -translate-x-1/2"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-gray-500 dark:text-gray-500">
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-gray-500 dark:from-gray-400 to-transparent origin-top"
          />
        </motion.div>
      </div>
    </section>
  );
}
