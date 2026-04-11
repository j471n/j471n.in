import { motion, AnimatePresence } from "framer-motion";
import skills from "@content/skillsData";
import React, { useState, useMemo } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export default function SkillSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Memoize categories to avoid recalculation
  const categories = useMemo(() => {
    const categoriesSet = new Set(
      skills.map((skill) => skill.category || "Other")
    );
    return ["All", ...Array.from(categoriesSet)];
  }, []);

  // Memoize filtered skills
  const filteredSkills = useMemo(() => {
    return selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-20 sm:py-24">
      <div className="space-y-4 mb-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase"
        >
          Technical Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          A comprehensive toolkit of modern technologies I work with to build exceptional digital experiences
        </motion.p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <SkillsGrid filteredSkills={filteredSkills} />
    </section>
  );
}

// Category Filter Component
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-3 my-10 justify-start"
    >
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onClick={() => onSelectCategory(category)}
        />
      ))}
    </motion.div>
  );
}

// Category Button Component
interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryButton({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden ${
        isSelected
          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-white/20"
          : "bg-gray-100 dark:bg-darkSecondary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800"
      }`}
    >
      <span className="relative z-10">{category}</span>
      {isSelected && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 bg-gray-900 dark:bg-white"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// Skills Grid Component
interface SkillsGridProps {
  filteredSkills: typeof skills;
}

function SkillsGrid({ filteredSkills }: SkillsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5"
    >
      <AnimatePresence>
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Skill Card Component
interface SkillCardProps {
  skill: (typeof skills)[number];
}

function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.Icon;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        y: -8,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      className="relative p-6 bg-white dark:bg-darkSecondary border-2 border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent skew-x-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Icon Container */}
        <div className="relative">
          {/* Icon Background Glow */}
          <div className="absolute inset-0 bg-gray-900 dark:bg-white rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Icon */}
          <div className="relative p-4 rounded-xl bg-gray-50 dark:bg-gray-900 group-hover:bg-gray-900 dark:group-hover:bg-white transition-all duration-300">
            {/* @ts-ignore */}
            <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
          </div>
        </div>

        {/* Skill Name */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">
            {skill.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
