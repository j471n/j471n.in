import { motion } from "framer-motion";
import siteConfig from "@content/siteConfig";
import skills from "@content/skillsData";
import React, { useState, useMemo } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 160, damping: 20 },
  },
  exit: { opacity: 0, y: 6, scale: 0.96, transition: { duration: 0.12 } },
};

export default function SkillSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { skillsSection } = siteConfig.home;

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category || "Other"));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredSkills = useMemo(
    () =>
      selectedCategory === "All"
        ? skills
        : skills.filter((s) => s.category === selectedCategory),
    [selectedCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    for (const s of skills) {
      const cat = s.category || "Other";
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Section number watermark */}
      <div
        className="absolute -right-2 top-6 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-200 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
        style={{ fontSize: "clamp(5rem, 16vw, 13rem)" }}
        aria-hidden="true"
      >
        02
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        <div className="space-y-3 max-w-xl">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-500">
              {skillsSection.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            {skillsSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5"
          >
            {skillsSection.description}
          </motion.p>
        </div>

        {/* Tech count + category breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0"
        >
          <div className="flex items-end gap-2">
            <span className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white leading-none">
              {skills.length}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2">
              Technologies
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 max-w-xs lg:justify-end">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <span
                  className={`w-1 h-1 rounded-full transition-colors ${
                    selectedCategory === cat
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                />
                {cat}
                <span className="opacity-60">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Marquee divider ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative my-10 overflow-hidden border-y border-gray-200 dark:border-gray-800 py-3.5"
      >
        <div className="flex animate-marquee gap-10 w-max">
          {[...skills, ...skills].map((skill, i) => {
            const Icon = skill.Icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 select-none"
              >
                {/* @ts-ignore */}
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-darkWhite dark:from-darkPrimary to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-darkWhite dark:from-darkPrimary to-transparent pointer-events-none" />
      </motion.div>

      {/* ── Category filter ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold font-mono uppercase tracking-wide transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {cat}
            <span className="ml-1.5 opacity-50 text-[9px]">
              {categoryCounts[cat]}
            </span>
          </button>
        ))}
      </motion.div>

      {/* ── Skills grid — keyed so the whole grid stagger-enters on every filter change ── */}
      <motion.div
        key={selectedCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {filteredSkills.map((skill) => {
          const Icon = skill.Icon;
          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 overflow-hidden cursor-default"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gray-50 dark:bg-darkPrimary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Left accent bar */}
              <div className="absolute left-0 inset-y-0 w-0.5 bg-gray-900 dark:bg-white origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-250 rounded-sm" />

              {/* Icon */}
              <div className="relative flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-white/10 group-hover:bg-gray-900 dark:group-hover:bg-white flex items-center justify-center transition-colors duration-200">
                {/* @ts-ignore */}
                <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-200" />
              </div>

              {/* Name */}
              <span className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 truncate leading-tight">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
