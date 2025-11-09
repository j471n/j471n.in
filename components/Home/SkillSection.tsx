import { HomeHeading } from "../../pages";
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

// Skill categories configuration
const SKILL_CATEGORIES = [
  { key: "Frontend", label: "Frontend" },
  { key: "Backend", label: "Backend" },
  { key: "Database", label: "Database" },
  { key: "Tools", label: "Tools" },
] as const;

type SkillCategory = (typeof SKILL_CATEGORIES)[number]["key"];

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

  // Memoize category counts
  const categoryCounts = useMemo(() => {
    return SKILL_CATEGORIES.reduce((acc, category) => {
      acc[category.key] = skills.filter(
        (s) => s.category === category.key
      ).length;
      return acc;
    }, {} as Record<SkillCategory, number>);
  }, []);

  return (
    <section className="mx-5 mb-10">
      <HomeHeading title="My Top Skills" />

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
      className="flex flex-wrap gap-2 my-8 justify-start"
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isSelected
          ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
          : "bg-gray-200 dark:bg-darkSecondary text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/10"
      }`}
    >
      {category}
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
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
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
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative p-5 bg-white dark:bg-darkPrimary border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-shadow duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/8 group-hover:via-purple-500/8 group-hover:to-pink-500/8 rounded-xl transition-all duration-500" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-darkSecondary group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          {/* @ts-ignore */}
          <Icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Skill Name */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {skill.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {skill.category || "Other"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
