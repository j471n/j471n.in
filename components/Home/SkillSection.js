import { FadeContainer, popUp } from "../../content/FramerMotionVariants";
import skillsData from "../../content/skillsData";
import { HomeHeading } from "../../pages";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SkillSection() {
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
        {skillsData.map((skill, index) => {
          if (!skill.pinned) return;
          return (
            <motion.div
              variants={popUp}
              key={index}
              title={skill.name}
              className="p-4 flex items-center justify-center sm:justify-start gap-4 bg-gray-50 hover:bg-gray-100 dark:bg-darkPrimary hover:dark:bg-darkSecondary border rounded-sm border-gray-300 dark:border-neutral-700 transform origin-center md:origin-top group"
            >
              <div className="relative transition group-hover:scale-110 sm:group-hover:scale-100">
                {skill.Icon}
              </div>
              <p className="hidden sm:inline-flex text-sm md:text-base font-semibold">
                {skill.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
