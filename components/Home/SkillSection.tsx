import { FadeContainer, popUp } from "../../content/FramerMotionVariants";
import { HomeHeading } from "../../pages";
import { motion } from "framer-motion";
import { useDarkMode } from "@context/darkModeContext";
import * as WindowsAnimation from "@lib/windowsAnimation";
import skills from "@content/skillsData";
import React from "react";

export default function SkillSection() {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="mx-5">
      <HomeHeading title="My Top Skills" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="grid my-10 gap-4 grid-cols-3"
      >
        {skills.map((skill, index) => {
          const Icon = skill.Icon;
          return (
            <motion.div
              variants={popUp}
              key={index}
              title={skill.name}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
                WindowsAnimation.showHoverAnimation(e, isDarkMode)
              }
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                WindowsAnimation.removeHoverAnimation(e)
              }
              className="p-4 flex items-center justify-center sm:justify-start gap-4 bg-gray-50 hover:bg-white dark:bg-darkPrimary hover:dark:bg-darkSecondary border rounded-sm border-gray-300 dark:border-neutral-700 transform origin-center md:origin-top group"
            >
              <div className="relative transition group-hover:scale-110 sm:group-hover:scale-100 select-none pointer-events-none">
                {/* @ts-ignore */}
                <Icon className="w-8 h-8" />
              </div>
              <p className="hidden sm:inline-flex text-sm md:text-base font-semibold select-none pointer-events-none">
                {skill.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
